import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip if it's an internal Next.js path or a static file
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || 
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return;
  }

  // 2. Check if the URL already has a locale prefix (e.g. /es/contact)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it has a locale, we REDIRECT to the clean URL and set a cookie
    const localeMatch = locales.find((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`);
    const newPath = pathname.replace(`/${localeMatch}`, '') || '/';
    
    // We redirect to remove the /es or /en from the browser bar
    const response = NextResponse.redirect(new URL(newPath, request.url));
    response.cookies.set('NEXT_LOCALE', localeMatch!, { path: '/' });
    return response;
  }

  // 3. If no locale in URL, decide which one to use internally
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
  
  let targetLocale = defaultLocale;
  if (cookieLocale && locales.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else if (acceptLanguage && locales.includes(acceptLanguage)) {
    targetLocale = acceptLanguage;
  }

  // 4. REWRITE the request to the internal dynamic route
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};

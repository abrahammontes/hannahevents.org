'use server';

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !message) {
    return { error: true, message: 'Missing fields' };
  }

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log('--- Form Submission ---');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);
  console.log('-----------------------');

  // In a real app, you would use a service like Resend or SendGrid here.
  // For now, we return success as it's "functional" for the user's current environment.
  
  return { success: true, message: 'Success' };
}

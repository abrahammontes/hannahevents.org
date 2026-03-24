import 'server-only';
import en from './en.json';
import es from './es.json';

const dictionaries = {
  en: () => en,
  es: () => es,
};

export const getDictionary = async (locale: 'en' | 'es') => dictionaries[locale]();

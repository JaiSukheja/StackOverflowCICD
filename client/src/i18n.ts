// src/i18n.js or src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import the translation files for each language
import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import fr from './locales/fr/translation.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

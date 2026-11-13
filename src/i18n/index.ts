import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/locales/en.json';
import hi from '@/i18n/locales/hi.json';
import zh from '@/i18n/locales/zh.json';
import pa from '@/i18n/locales/pa.json';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    zh: { translation: zh },
    pa: { translation: pa },
  },
  lng: localStorage.getItem('i18nextLng') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
// Update html lang attribute whenever language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});


export default i18n;

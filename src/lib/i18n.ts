import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslations from '@/locales/pt.yml';
import enTranslations from '@/locales/en.yml';

const savedLanguage = localStorage.getItem('sensen-language') || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations },
    },
    lng: savedLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('sensen-language', lng);
  document.documentElement.lang = lng;
});

export default i18n;

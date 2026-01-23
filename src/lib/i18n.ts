/**
 * @fileoverview Configuração central do sistema de internacionalização (i18n).
 * 
 * Define os idiomas suportados (PT-BR e EN), carrega as traduções dos arquivos YAML,
 * e persiste a preferência do usuário no localStorage.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslations from '@/locales/pt.yml';
import enTranslations from '@/locales/en.yml';

/** Chave usada para persistir a preferência de idioma no localStorage */
const LANGUAGE_STORAGE_KEY = 'sensen-language';

/** Idioma padrão quando nenhuma preferência está salva */
const DEFAULT_LANGUAGE = 'pt';

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations },
    },
    lng: savedLanguage,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      // React já escapa valores, desativa para evitar duplo escape
      escapeValue: false,
    },
    react: {
      // Evita erros de Suspense em SSR e simplifica carregamento síncrono
      useSuspense: false,
    },
  });

// Sincroniza mudanças de idioma com localStorage e atributo lang do HTML
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

export default i18n;

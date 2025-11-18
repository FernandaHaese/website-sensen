import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'pt';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'sensen-language',
    }
  )
);

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (translations: { en: string; pt: string }) => {
    return translations[language] || translations.en;
  };
  
  return { t, language };
};

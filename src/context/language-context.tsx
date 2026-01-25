"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { get } from '@/lib/utils';
import { translations } from '@/lib/translations';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('bn');

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'bn' ? 'en' : 'bn'));
  };

  const t = (key: string): string => {
    const value = get(translations, key);
    if (value && typeof value === 'object' && lang in value) {
      return value[lang];
    }
    return key;
  };

  const value = useMemo(() => ({ lang, toggleLanguage, t }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} aria-label="Toggle language">
      {lang === 'bn' ? 'EN' : 'বাংলা'}
    </Button>
  );
}

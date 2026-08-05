'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button 
      onClick={() => setLanguage(language === 'en' ? 'as' : 'en')}
      className="flex items-center gap-1 hover:text-yellow-400 transition font-bold"
    >
      <Globe size={14} />
      {language === 'en' ? 'EN | অসমীয়া' : 'অসমীয়া | EN'}
    </button>
  );
}

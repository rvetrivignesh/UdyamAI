import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'hi', name: 'Hindi', label: 'हिंदी' },
  { code: 'te', name: 'Telugu', label: 'తెలుగు' }
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <div className="flex items-center gap-1.5 bg-black/20 border border-white/20 px-2 py-0.5 rounded text-xs">
      <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
      <span className="text-[10px] text-slate-300 uppercase font-semibold hidden md:inline">{t('selectLanguage')}:</span>
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`px-2 py-0.5 text-[11px] font-bold rounded transition-colors ${
                isActive
                  ? 'bg-amber-400 text-[#0b2545] shadow-xs'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={`Switch language to ${lang.name}`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

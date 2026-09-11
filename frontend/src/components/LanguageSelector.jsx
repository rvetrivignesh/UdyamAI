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
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
      <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
      <span className="text-xs font-semibold text-slate-500 hidden sm:inline">{t('selectLanguage')}:</span>
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm font-bold scale-105'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
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

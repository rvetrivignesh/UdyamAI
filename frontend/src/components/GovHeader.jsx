import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { Landmark, ArrowLeft, ShieldCheck, FileCheck } from 'lucide-react';

export default function GovHeader({ showBack = false, onBack }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-300 shadow-sm sticky top-0 z-50">
      {/* National Tricolor Top Stripe */}
      <div className="gov-tricolor-bar" />

      {/* Top Utility Bar */}
      <div className="bg-[#0b2545] text-white text-[11px] md:text-xs py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">
              {t('govIndia')}
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-200 hidden sm:inline">
              {t('govMinistry')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-medium hidden md:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 inline" /> {t('govPortalTag')}
            </span>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="mr-2 p-1.5 text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-300 rounded transition-colors flex items-center gap-1 text-xs md:text-sm font-semibold"
              title={t('backButton')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('backButton')}</span>
            </button>
          )}

          {/* Emblem / Portal Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded bg-[#0b2545] border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-black text-[#0b2545] tracking-tight leading-none uppercase">
                  UdyamAI
                </h1>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Official Portal
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-slate-600 font-medium">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Official Reference / Verification Badge */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded">
          <FileCheck className="w-4 h-4 text-emerald-700" />
          <span>MSME Feasibility & PMEGP Norms Compliant</span>
        </div>
      </div>
    </header>
  );
}

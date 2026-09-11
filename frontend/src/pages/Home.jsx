import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import Button from '../components/Button';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight leading-none">
              UdyamAI
            </h1>
            <p className="text-xs text-slate-500 font-medium">Rural Business Advisor</p>
          </div>
        </div>

        <LanguageSelector />
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 text-emerald-800 text-sm font-bold mb-8 animate-fade-in border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          {t('homeHeading')}
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight mb-4 leading-tight">
          {t('appTitle')}
        </h2>

        <p className="text-xl md:text-2xl font-semibold text-slate-600 max-w-2xl mb-10 leading-relaxed">
          {t('appSubtitle')}
        </p>

        {/* Feature Cards / Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12 text-left">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{t('tagline1')}</h3>
              <p className="text-xs text-slate-500">Analyze local demand & growth potential</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{t('tagline2')}</h3>
              <p className="text-xs text-slate-500">Calculate EMI, schemes & repayment caps</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{t('tagline3')}</h3>
              <p className="text-xs text-slate-500">Identify financial risks before borrowing</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/input')}
          icon={ArrowRight}
          className="text-xl px-10 py-5 shadow-xl hover:shadow-2xl"
        >
          {t('startPlanning')}
        </Button>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© 2026 UdyamAI — Rural Business AI Advisor (Phase 1)</p>
      </footer>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GovHeader from '../components/GovHeader';
import Button from '../components/Button';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Users,
  MapPin
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Official Government Header */}
      <GovHeader />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Official Banner / Gazette Notice Header */}
        <div className="bg-white border-t-4 border-t-[#ff9933] border-x border-b border-slate-300 p-6 md:p-10 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider rounded">
                <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></span>
                {t('homeHeading')}
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-[#0b2545] tracking-tight leading-tight uppercase">
                {t('appTitle')}
              </h2>

              <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                {t('appSubtitle')}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/input')}
                icon={ArrowRight}
                size="lg"
                variant="govGreen"
                className="shadow-md"
              >
                {t('startPlanning')}
              </Button>
            </div>
          </div>

          {/* Key Advisories & Core Features (Sharp 4px Border Radius Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 border border-slate-300 p-5 rounded hover:border-[#0b2545] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-900 text-amber-400 rounded">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0b2545] text-base">
                  {t('tagline1')}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {t('tagline1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 border border-slate-300 p-5 rounded hover:border-[#0b2545] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-emerald-900 text-emerald-300 rounded">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0b2545] text-base">
                  {t('tagline2')}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {t('tagline2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 border border-slate-300 p-5 rounded hover:border-[#0b2545] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-rose-900 text-rose-300 rounded">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0b2545] text-base">
                  {t('tagline3')}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {t('tagline3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* National Advisory & Scheme Alignment Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-300 p-4 rounded flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">PMEGP Scheme Norms</p>
              <p className="text-xs font-bold text-slate-800">10% - 15% Beneficiary Margin</p>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-4 rounded flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-700 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Mudra Tarun / Kishore</p>
              <p className="text-xs font-bold text-slate-800">Up to ₹50 Lakhs Coverage</p>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-4 rounded flex items-center gap-3">
            <MapPin className="w-8 h-8 text-emerald-700 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Pan-India Coverage</p>
              <p className="text-xs font-bold text-slate-800">36 States & 750+ Districts</p>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-4 rounded flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-700 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Multi-Language Portal</p>
              <p className="text-xs font-bold text-slate-800">English, हिंदी, తెలుగు</p>
            </div>
          </div>
        </div>

        {/* Start Planning Callout */}
        <div className="bg-[#0b2545] text-white p-6 md:p-8 rounded border border-slate-400 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-amber-400 mb-1">
              Ready to verify your rural business feasibility?
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Enter your location and available margin capital to generate comprehensive scheme calculations and local market analysis.
            </p>
          </div>
          <Button
            onClick={() => navigate('/input')}
            icon={ArrowRight}
            variant="govAmber"
            size="lg"
            className="shrink-0 w-full md:w-auto"
          >
            {t('startPlanning')}
          </Button>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="bg-white border-t border-slate-300 py-6 px-4 text-center text-xs text-slate-600">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-semibold text-slate-800">{t('footerCopyright')}</p>
          <p className="text-[11px] text-slate-500">
            Compliant with Government of India MSME guidelines, PMEGP credit-linked subsidy criteria & RBI prudential banking guidelines.
          </p>
        </div>
      </footer>
    </div>
  );
}

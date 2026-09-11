import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { calculateFinance, generateFeasibilityReport, formatINR } from '../services/api';
import LanguageSelector from '../components/LanguageSelector';
import FinancialSummary from '../components/FinancialSummary';
import SchemeCard from '../components/SchemeCard';
import FeasibilityReport from '../components/FeasibilityReport';
import Button from '../components/Button';
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  Clock,
  BarChart2,
  Table as TableIcon,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Printer,
  FileText,
  Landmark
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function FinancialPlan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // AI Feasibility Report State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [aiReport, setAiReport] = useState(null);
  const [aiError, setAiError] = useState(null);

  const marginCapital = state?.marginCapital || 100000;
  const category = state?.category || 'Dairy';
  const locationInfo = state?.location || {};
  const currentLang = i18n.language || 'en';

  const loadingSteps = [
    t('aiLoadingTitle'),
    t('aiStep1'),
    t('aiStep2'),
    t('aiStep3'),
    t('aiStep4')
  ];

  // 1. Fetch Financial Calculation
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    calculateFinance(marginCapital)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
          if (res.isSupported) {
            fetchAiReport(currentLang);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("API error:", err);
          setError("Failed to connect to backend server. Make sure the server is running.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [marginCapital]);

  // Re-fetch AI report when language changes if data is loaded
  useEffect(() => {
    if (data?.isSupported) {
      fetchAiReport(currentLang);
    }
  }, [currentLang]);

  // 2. Fetch AI Feasibility Report with Progress Sequence
  const fetchAiReport = async (lang) => {
    setAiLoading(true);
    setAiError(null);
    setAiStep(0);

    const stepInterval = setInterval(() => {
      setAiStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const res = await generateFeasibilityReport({
        village: locationInfo.village || '',
        block: locationInfo.block || '',
        district: locationInfo.district || '',
        businessCategory: category,
        marginCapital: Number(marginCapital),
        language: lang
      });

      clearInterval(stepInterval);

      if (res.feasibilityReport) {
        setAiReport(res.feasibilityReport);
      } else if (res.message) {
        setAiError(res.message);
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error("AI Report generation error:", err);
      setAiError(t('aiErrorMsg'));
    } finally {
      setAiLoading(false);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between pb-12 print:bg-white print:pb-0">
      {/* Header (Hidden in Print) */}
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full print:hidden">
        <button
          onClick={() => navigate('/input')}
          className="flex items-center gap-2 text-slate-700 font-semibold hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('backButton')}</span>
        </button>

        <LanguageSelector />
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-4 print:p-0">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm my-8">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-slate-700">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center my-8">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Connection Error</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <Button onClick={() => navigate('/input')} variant="outline">
              {t('backButton')}
            </Button>
          </div>
        ) : !data?.isSupported ? (
          /* Unsupported Project Cost Alert */
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 my-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-amber-950 mb-2">
                  {t('unsupportedTitle')}
                </h3>
                <p className="text-base md:text-lg text-amber-900 mb-4 leading-relaxed">
                  {t('unsupportedMessage', {
                    margin: formatINR(data?.marginCapital || marginCapital),
                    projectCost: formatINR(data?.projectCost || marginCapital * 10)
                  })}
                </p>
                <p className="text-sm font-semibold text-amber-800 bg-amber-100/60 p-4 rounded-xl border border-amber-200 mb-6">
                  {t('unsupportedAction')}
                </p>
                <Button onClick={() => navigate('/input')} icon={ArrowLeft}>
                  {t('backButton')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Navigation Tabs (Hidden in Print) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none print:hidden">
              <button
                onClick={() => scrollToSection('financial-summary')}
                className="px-4 py-2 bg-white text-slate-700 font-bold text-xs md:text-sm rounded-full border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shrink-0 shadow-sm transition-all"
              >
                {t('navFinancial')}
              </button>
              <button
                onClick={() => scrollToSection('scheme-details')}
                className="px-4 py-2 bg-white text-slate-700 font-bold text-xs md:text-sm rounded-full border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shrink-0 shadow-sm transition-all"
              >
                {t('navScheme')}
              </button>
              <button
                onClick={() => scrollToSection('repayment-schedule')}
                className="px-4 py-2 bg-white text-slate-700 font-bold text-xs md:text-sm rounded-full border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shrink-0 shadow-sm transition-all"
              >
                {t('navSchedule')}
              </button>
              <button
                onClick={() => scrollToSection('feasibility-section')}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs md:text-sm rounded-full shrink-0 shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('navFeasibility')}</span>
              </button>
            </div>

            {/* Title Header */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-200">
                  <span>{t(`categories.${category}`)}</span>
                  {locationInfo.district && <span>• {locationInfo.district}</span>}
                  {locationInfo.village && <span>({locationInfo.village})</span>}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {t('financialPlanTitle')}
                </h2>
                <p className="text-slate-500 text-sm md:text-base">
                  {t('financialPlanSubtitle')}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3 print:hidden">
                <Button onClick={handlePrint} variant="outline" icon={Printer}>
                  {t('printReport')}
                </Button>
                <Button onClick={() => navigate('/input')} variant="outline" icon={ArrowLeft}>
                  Adjust Margin
                </Button>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div id="financial-summary">
              <FinancialSummary
                marginCapital={data.marginCapital}
                projectCost={data.projectCost}
                loanAmount={data.loanAmount}
              />
            </div>

            {/* Recommended Scheme Card */}
            <div id="scheme-details">
              <SchemeCard scheme={data.scheme} />
            </div>

            {/* EMI & Total Cost Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Repayment & Interest Summary</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    {t('estimatedEmi')}
                  </p>
                  <p className="text-3xl md:text-4xl font-black text-emerald-950">
                    {formatINR(data.emi.monthlyEmi)}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">per month for {data.scheme.tenureYears} years</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t('totalRepayment')}
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {formatINR(data.emi.totalRepayment)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Principal + Total Interest</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t('totalInterest')}
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {formatINR(data.emi.totalInterest)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">At {data.scheme.interestRate}% interest p.a.</p>
                </div>
              </div>

              {/* Moratorium Note Box */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 md:p-5 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm md:text-base">
                    {t('moratoriumNotice')}
                  </h4>
                  <p className="text-xs md:text-sm text-blue-800 mt-1 leading-relaxed">
                    {t('moratoriumDescription', { months: data.scheme.moratoriumMonths })}
                  </p>
                </div>
              </div>
            </div>

            {/* Repayment Schedule Chart (Hidden in Print) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm print:hidden">
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <span>Principal vs Interest Trend</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mb-6">
                Visualizing quarterly principal reduction over time.
              </p>

              <div className="h-64 md:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.repaymentSchedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="quarter" label={{ value: 'Quarter', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip formatter={(value) => [formatINR(value)]} />
                    <Legend />
                    <Bar dataKey="principal" name="Principal" fill="#059669" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interest" name="Interest" fill="#9333ea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quarterly Repayment Schedule Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm overflow-hidden" id="repayment-schedule">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TableIcon className="w-5 h-5 text-emerald-600" />
                  <span>{t('scheduleHeading')}</span>
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-500 mb-6">
                {t('scheduleDisclaimer')}
              </p>

              {/* Desktop Table View (>= md screens) */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">{t('quarter')}</th>
                      <th className="py-3.5 px-4">{t('openingBalance')}</th>
                      <th className="py-3.5 px-4 text-emerald-700">{t('principal')}</th>
                      <th className="py-3.5 px-4 text-purple-700">{t('interest')}</th>
                      <th className="py-3.5 px-4">{t('payment')}</th>
                      <th className="py-3.5 px-4">{t('closingBalance')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {data.repaymentSchedule.map((row) => (
                      <tr key={row.quarter} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.quarter}</td>
                        <td className="py-3 px-4 text-slate-700">{formatINR(row.openingBalance)}</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">{formatINR(row.principal)}</td>
                        <td className="py-3 px-4 text-purple-700 font-semibold">{formatINR(row.interest)}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{formatINR(row.payment)}</td>
                        <td className="py-3 px-4 text-slate-700">{formatINR(row.closingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Quarter Cards View (< md screens) */}
              <div className="block md:hidden space-y-3">
                {data.repaymentSchedule.map((row) => (
                  <div key={row.quarter} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-extrabold text-sm text-slate-900">{t('quarter')} {row.quarter}</span>
                      <span className="font-bold text-sm text-emerald-700">{t('payment')}: {formatINR(row.payment)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">{t('openingBalance')}</span>
                        <span className="font-semibold text-slate-800">{formatINR(row.openingBalance)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{t('closingBalance')}</span>
                        <span className="font-semibold text-slate-800">{formatINR(row.closingBalance)}</span>
                      </div>
                      <div>
                        <span className="text-emerald-700 block font-semibold">{t('principal')}</span>
                        <span className="font-bold text-emerald-800">{formatINR(row.principal)}</span>
                      </div>
                      <div>
                        <span className="text-purple-700 block font-semibold">{t('interest')}</span>
                        <span className="font-bold text-purple-800">{formatINR(row.interest)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feasibility Report Section */}
            <div className="pt-6 border-t border-slate-200">
              {aiLoading ? (
                <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
                    {loadingSteps[aiStep]}
                  </h3>
                  <div className="max-w-md mx-auto space-y-2">
                    {loadingSteps.map((stepText, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                          idx === aiStep
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 scale-105 shadow-sm'
                            : idx < aiStep
                            ? 'text-slate-400 opacity-60'
                            : 'text-slate-300'
                        }`}
                      >
                        {idx < aiStep ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : idx === aiStep ? (
                          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></span>
                        )}
                        <span>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : aiError ? (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 text-center">
                  <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-amber-950 mb-2">{t('aiErrorMsg')}</h3>
                  <Button onClick={() => fetchAiReport(currentLang)} variant="outline" icon={RefreshCw} className="mt-2">
                    Try Again
                  </Button>
                </div>
              ) : (
                <FeasibilityReport report={aiReport} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 print:hidden">
        <p>© 2026 UdyamAI — Rural Business AI Advisor</p>
      </footer>
    </div>
  );
}

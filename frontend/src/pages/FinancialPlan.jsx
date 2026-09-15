import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { calculateFinance, generateFeasibilityReport, formatINR } from '../services/api';
import { getLocalizedReport } from '../services/reportTranslator';
import GovHeader from '../components/GovHeader';
import FinancialSummary from '../components/FinancialSummary';
import SchemeCard from '../components/SchemeCard';
import FeasibilityReport, {
  MarketReachSection,
  OpportunitiesAndSwotSection,
  RiskAssessmentSection,
  CompetitorPricingSection,
  OperationalCostsSection,
  OverallRecommendationSection
} from '../components/FeasibilityReport';
import Button from '../components/Button';
import {
  ArrowLeft,
  ArrowRight,
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
  Building,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckSquare
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

const TOTAL_SECTIONS = 10;

export default function FinancialPlan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // AI Feasibility Report State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [rawAiReport, setRawAiReport] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Single-Heading Section Page Navigation (1 to 10)
  const [activeSection, setActiveSection] = useState(1);
  const [showFullReport, setShowFullReport] = useState(false);

  const marginCapital = state?.marginCapital || 100000;
  const category = state?.category || 'Dairy';
  const locationInfo = state?.location || {};

  const loadingSteps = [
    t('aiLoadingTitle'),
    t('aiStep1'),
    t('aiStep2'),
    t('aiStep3'),
    t('aiStep4')
  ];

  // SECTION DEFINITIONS: Exactly one heading per section
  const sectionTabs = [
    { id: 1, key: 'navFinancial', label: t('navFinancial'), icon: Building },
    { id: 2, key: 'navScheme', label: t('navScheme'), icon: CheckCircle2 },
    { id: 3, key: 'navRepayment', label: t('navRepayment'), icon: Calendar },
    { id: 4, key: 'navSchedule', label: t('navSchedule'), icon: TableIcon },
    { id: 5, key: 'navMarketReach', label: t('navMarketReach'), icon: Sparkles },
    { id: 6, key: 'navOpportunities', label: t('navOpportunities'), icon: Layers },
    { id: 7, key: 'navRisks', label: t('navRisks'), icon: AlertTriangle },
    { id: 8, key: 'navCompetitor', label: t('navCompetitor'), icon: FileText },
    { id: 9, key: 'navCosts', label: t('navCosts'), icon: BarChart2 },
    { id: 10, key: 'navRecommendation', label: t('navRecommendation'), icon: CheckSquare }
  ];

  // 1. Initial Load: Fetch Financial Calculation and AI Feasibility Report EXACTLY ONCE
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
            // Fetch AI report only once upon initial load
            fetchAiReportOnce(currentLang, res);
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

  // Execute AI Report API call exactly once
  const fetchAiReportOnce = async (lang, financeData) => {
    setAiLoading(true);
    setAiError(null);
    setAiStep(0);

    const stepInterval = setInterval(() => {
      setAiStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1000);

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
        setRawAiReport(res.feasibilityReport);
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

  // 2. Client-side localization: Automatically translates the cached report with ZERO API calls
  const aiReport = useMemo(() => {
    if (!rawAiReport) return null;
    return getLocalizedReport(rawAiReport, currentLang);
  }, [rawAiReport, currentLang]);

  const handlePrint = () => {
    setShowFullReport(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const nextSection = () => {
    if (activeSection < TOTAL_SECTIONS) {
      setActiveSection((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between print:bg-white pb-8">
      {/* Official Government Header */}
      <div className="print:hidden">
        <GovHeader showBack onBack={() => navigate('/input')} />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-4 md:py-6 print:p-0">
        {loading ? (
          <div className="bg-white border border-slate-300 rounded p-12 text-center shadow-xs my-8">
            <div className="w-12 h-12 border-4 border-[#0b2545] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-base font-bold text-slate-800">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-300 rounded p-8 text-center my-8">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-red-950 mb-2">Connection Error</h3>
            <p className="text-sm text-red-700 mb-6">{error}</p>
            <Button onClick={() => navigate('/input')} variant="outline">
              {t('backButton')}
            </Button>
          </div>
        ) : !data?.isSupported ? (
          /* Unsupported Project Cost Alert */
          <div className="bg-amber-50 border-2 border-amber-300 rounded p-6 md:p-8 my-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-200 text-amber-900 rounded shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-amber-950 mb-2 uppercase">
                  {t('unsupportedTitle')}
                </h3>
                <p className="text-sm md:text-base text-amber-900 mb-4 leading-relaxed font-medium">
                  {t('unsupportedMessage', {
                    margin: formatINR(data?.marginCapital || marginCapital),
                    projectCost: formatINR(data?.projectCost || marginCapital * 10)
                  })}
                </p>
                <p className="text-xs md:text-sm font-semibold text-amber-900 bg-amber-100 p-3 rounded border border-amber-300 mb-6">
                  {t('unsupportedAction')}
                </p>
                <Button onClick={() => navigate('/input')} icon={ArrowLeft} variant="primary">
                  {t('backButton')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Enterprise Report Title & Meta Bar */}
            <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-4 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded uppercase">
                    {t(`categories.${category}`)}
                  </span>
                  {locationInfo.district && (
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded">
                      {locationInfo.district}
                      {locationInfo.stateName ? `, ${locationInfo.stateName}` : ''}
                    </span>
                  )}
                  {locationInfo.village && (
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded">
                      {locationInfo.village}
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase tracking-tight">
                  {t('financialPlanTitle')}
                </h2>
                <p className="text-xs md:text-sm text-slate-600">
                  {t('financialPlanSubtitle')}
                </p>
              </div>

              {/* Action Buttons: Full View / Print & Adjust Margin */}
              <div className="shrink-0 flex items-center gap-2 print:hidden">
                <Button
                  onClick={() => setShowFullReport(!showFullReport)}
                  variant="outline"
                  size="sm"
                  icon={Eye}
                >
                  {showFullReport ? t('singlePageView') : t('viewFullReport')}
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm" icon={Printer}>
                  {t('printReport')}
                </Button>
                <Button
                  onClick={() => navigate('/input')}
                  variant="primary"
                  size="sm"
                  icon={ArrowLeft}
                >
                  {t('adjustMargin')}
                </Button>
              </div>
            </div>

            {/* AI Loading Progress Bar if Generating */}
            {aiLoading && (
              <div className="bg-white border-2 border-blue-300 rounded p-6 text-center shadow-xs my-4">
                <div className="w-10 h-10 border-4 border-[#0b2545] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-base md:text-lg font-bold text-[#0b2545] mb-3 uppercase">
                  {loadingSteps[aiStep]}
                </h3>
                <div className="max-w-md mx-auto space-y-1.5">
                  {loadingSteps.map((stepText, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded text-xs font-semibold transition-all ${
                        idx === aiStep
                          ? 'bg-blue-50 text-blue-900 border border-blue-300 font-bold'
                          : idx < aiStep
                          ? 'text-slate-500 opacity-60'
                          : 'text-slate-300'
                      }`}
                    >
                      {idx < aiStep ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] shrink-0" />
                      ) : idx === aiStep ? (
                        <Sparkles className="w-3.5 h-3.5 text-blue-700 animate-pulse shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"></span>
                      )}
                      <span>{stepText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error in AI generation */}
            {aiError && !aiLoading && (
              <div className="bg-amber-50 border border-amber-300 rounded p-4 text-center my-4">
                <p className="text-xs md:text-sm font-bold text-amber-950 mb-2">{aiError}</p>
                <Button
                  onClick={() => fetchAiReportOnce(currentLang, data)}
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW MODE A: FULL REPORT VIEW (All sections or Printing) */}
            {/* ======================================================== */}
            {showFullReport ? (
              <div className="space-y-6">
                {/* 1. Financial Summary */}
                <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
                  <h3 className="text-lg font-black text-[#0b2545] uppercase mb-2 border-b border-slate-200 pb-2">
                    {t('navFinancial')}
                  </h3>
                  <FinancialSummary
                    marginCapital={data.marginCapital}
                    projectCost={data.projectCost}
                    loanAmount={data.loanAmount}
                  />
                </div>

                {/* 2. Government Scheme */}
                <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
                  <h3 className="text-lg font-black text-[#0b2545] uppercase mb-2 border-b border-slate-200 pb-2">
                    {t('navScheme')}
                  </h3>
                  <SchemeCard scheme={data.scheme} />
                </div>

                {/* 3. Repayment & Interest Summary */}
                <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
                  <h3 className="text-lg font-black text-[#0b2545] uppercase mb-4 border-b border-slate-200 pb-2">
                    {t('repaymentSummaryTitle')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-300 rounded p-4 text-center">
                      <p className="text-xs font-bold text-emerald-900 uppercase">{t('estimatedEmi')}</p>
                      <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{formatINR(data.emi.monthlyEmi)}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        {t('repaymentPerMonth', { years: data.scheme.tenureYears })}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-300 rounded p-4 text-center">
                      <p className="text-xs font-bold text-slate-700 uppercase">{t('totalRepayment')}</p>
                      <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{formatINR(data.emi.totalRepayment)}</p>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1">{t('principalPlusInterest')}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-300 rounded p-4 text-center">
                      <p className="text-xs font-bold text-slate-700 uppercase">{t('totalInterest')}</p>
                      <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{formatINR(data.emi.totalInterest)}</p>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1">
                        {t('interestAtRate', { rate: data.scheme.interestRate })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 flex items-start gap-2 text-xs md:text-sm text-blue-900">
                    <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">{t('moratoriumNotice')}</h4>
                      <p className="text-xs text-blue-800 mt-0.5">
                        {t('moratoriumDescription', { months: data.scheme.moratoriumMonths })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Repayment Schedule Table */}
                <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
                  <h3 className="text-lg font-black text-[#0b2545] uppercase mb-2 border-b border-slate-200 pb-2">
                    {t('scheduleHeading')}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{t('scheduleDisclaimer')}</p>
                  <div className="overflow-x-auto rounded border border-slate-300">
                    <table className="w-full text-left text-xs md:text-sm gov-table">
                      <thead>
                        <tr>
                          <th className="py-2.5 px-3">{t('quarter')}</th>
                          <th className="py-2.5 px-3">{t('openingBalance')}</th>
                          <th className="py-2.5 px-3">{t('principal')}</th>
                          <th className="py-2.5 px-3">{t('interest')}</th>
                          <th className="py-2.5 px-3">{t('payment')}</th>
                          <th className="py-2.5 px-3">{t('closingBalance')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {data.repaymentSchedule.map((row) => (
                          <tr key={row.quarter} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-slate-900">{row.quarter}</td>
                            <td className="py-2 px-3 text-slate-700">{formatINR(row.openingBalance)}</td>
                            <td className="py-2 px-3 text-[#138808] font-semibold">{formatINR(row.principal)}</td>
                            <td className="py-2 px-3 text-purple-700 font-semibold">{formatINR(row.interest)}</td>
                            <td className="py-2 px-3 font-bold text-slate-900">{formatINR(row.payment)}</td>
                            <td className="py-2 px-3 text-slate-700">{formatINR(row.closingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Feasibility Sections 5 to 10 */}
                {aiReport && <FeasibilityReport report={aiReport} />}
              </div>
            ) : (
              /* ========================================================================= */
              /* VIEW MODE B: SINGLE-HEADING PAGINATED STEP VIEW (Exactly One Heading/Page) */
              /* ========================================================================= */
              <div className="space-y-4">
                {/* Official Section Navigation Bar (Tabs / Step Bar) */}
                <div className="bg-white border border-slate-300 rounded p-2 shadow-xs">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        {t('page')} {activeSection} {t('of')} {TOTAL_SECTIONS}:
                      </span>
                      <span className="text-xs md:text-sm font-black text-[#0b2545] uppercase truncate max-w-[200px] sm:max-w-md">
                        {sectionTabs.find((s) => s.id === activeSection)?.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className="px-2.5 py-1 text-xs font-bold border border-slate-300 rounded bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t('previousSection')}</span>
                      </button>
                      <button
                        onClick={nextSection}
                        disabled={activeSection === TOTAL_SECTIONS}
                        className="px-2.5 py-1 text-xs font-bold border border-[#0b2545] rounded bg-[#0b2545] text-white hover:bg-[#134074] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <span className="hidden sm:inline">{t('nextSection')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Tabs / Step Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {sectionTabs.map((tab) => {
                      const isActive = activeSection === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveSection(tab.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded border whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                            isActive
                              ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isActive ? 'bg-amber-400 text-[#0b2545] font-black' : 'bg-slate-200 text-slate-800'
                          }`}>
                            {tab.id}
                          </span>
                          <span className="hidden md:inline">{tab.label.split('.')[1] || tab.label}</span>
                          <span className="md:hidden">{tab.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ============================================== */}
                {/* SECTION 1: ONLY FINANCIAL SUMMARY & OUTLAY     */}
                {/* ============================================== */}
                {activeSection === 1 && (
                  <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                      <div className="p-2.5 bg-[#0b2545] text-amber-400 rounded">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Capital Analysis</span>
                        <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                          {t('navFinancial')}
                        </h3>
                      </div>
                    </div>

                    <FinancialSummary
                      marginCapital={data.marginCapital}
                      projectCost={data.projectCost}
                      loanAmount={data.loanAmount}
                    />

                    <div className="mt-6 bg-slate-50 border border-slate-300 rounded p-4 text-xs md:text-sm text-slate-700 leading-relaxed space-y-2">
                      <h4 className="font-bold text-[#0b2545] uppercase text-xs">Official Assessment Note:</h4>
                      <p>
                        • Beneficiary Margin Contribution: <strong>{formatINR(data.marginCapital)}</strong> (10% of total outlay).
                      </p>
                      <p>
                        • Maximum Eligible Term Loan Facility: <strong>{formatINR(data.loanAmount)}</strong> under MSME Credit-Linked Scheme guidelines.
                      </p>
                    </div>
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 2: ONLY RECOMMENDED GOVERNMENT SCHEME */}
                {/* ============================================== */}
                {activeSection === 2 && (
                  <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                      <div className="p-2.5 bg-amber-100 text-amber-800 rounded">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Policy & Scheme Alignment</span>
                        <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                          {t('navScheme')}
                        </h3>
                      </div>
                    </div>

                    <SchemeCard scheme={data.scheme} />
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 3: ONLY REPAYMENT & INTEREST SUMMARY  */}
                {/* ============================================== */}
                {activeSection === 3 && (
                  <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs animate-fade-in">
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
                      <div className="p-2.5 bg-blue-900 text-white rounded">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">EMI & Debt Obligations</span>
                        <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                          {t('repaymentSummaryTitle')}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-emerald-50 border border-emerald-300 rounded p-5 text-center">
                        <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                          {t('estimatedEmi')}
                        </p>
                        <p className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                          {formatINR(data.emi.monthlyEmi)}
                        </p>
                        <p className="text-xs text-emerald-700 font-semibold mt-1">
                          {t('repaymentPerMonth', { years: data.scheme.tenureYears })}
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-300 rounded p-5 text-center">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {t('totalRepayment')}
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                          {formatINR(data.emi.totalRepayment)}
                        </p>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          {t('principalPlusInterest')}
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-300 rounded p-5 text-center">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {t('totalInterest')}
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                          {formatINR(data.emi.totalInterest)}
                        </p>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          {t('interestAtRate', { rate: data.scheme.interestRate })}
                        </p>
                      </div>
                    </div>

                    {/* Moratorium Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-950 text-sm md:text-base">
                          {t('moratoriumNotice')}
                        </h4>
                        <p className="text-xs md:text-sm text-blue-900 mt-1 leading-relaxed">
                          {t('moratoriumDescription', { months: data.scheme.moratoriumMonths })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 4: ONLY REPAYMENT SCHEDULE & TREND     */}
                {/* ============================================== */}
                {activeSection === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Principal vs Interest Trend */}
                    <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs">
                      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-slate-200">
                        <div className="p-2 bg-emerald-800 text-white rounded">
                          <BarChart2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-[#0b2545] uppercase">
                          {t('principalTrendHeading')}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-6">
                        {t('principalTrendDesc')}
                      </p>

                      <div className="h-64 md:h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.repaymentSchedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="quarter" label={{ value: 'Quarter', position: 'insideBottom', offset: -5 }} />
                            <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip formatter={(value) => [formatINR(value)]} />
                            <Legend />
                            <Bar dataKey="principal" name="Principal" fill="#138808" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="interest" name="Interest" fill="#0b2545" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Quarterly Repayment Table */}
                    <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs overflow-hidden">
                      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-slate-200">
                        <div className="p-2 bg-[#0b2545] text-white rounded">
                          <TableIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-[#0b2545] uppercase">
                          {t('scheduleHeading')}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{t('scheduleDisclaimer')}</p>

                      <div className="overflow-x-auto rounded border border-slate-300">
                        <table className="w-full text-left text-xs md:text-sm gov-table">
                          <thead>
                            <tr>
                              <th className="py-2.5 px-3">{t('quarter')}</th>
                              <th className="py-2.5 px-3">{t('openingBalance')}</th>
                              <th className="py-2.5 px-3">{t('principal')}</th>
                              <th className="py-2.5 px-3">{t('interest')}</th>
                              <th className="py-2.5 px-3">{t('payment')}</th>
                              <th className="py-2.5 px-3">{t('closingBalance')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 font-medium">
                            {data.repaymentSchedule.map((row) => (
                              <tr key={row.quarter} className="hover:bg-slate-50">
                                <td className="py-2 px-3 font-bold text-slate-900">{row.quarter}</td>
                                <td className="py-2 px-3 text-slate-700">{formatINR(row.openingBalance)}</td>
                                <td className="py-2 px-3 text-[#138808] font-semibold">{formatINR(row.principal)}</td>
                                <td className="py-2 px-3 text-blue-900 font-semibold">{formatINR(row.interest)}</td>
                                <td className="py-2 px-3 font-bold text-slate-900">{formatINR(row.payment)}</td>
                                <td className="py-2 px-3 text-slate-700">{formatINR(row.closingBalance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 5: ONLY MARKET REACH & CONSUMER BASE   */}
                {/* ============================================== */}
                {activeSection === 5 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <MarketReachSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 6: ONLY OPPORTUNITIES & SWOT MATRIX    */}
                {/* ============================================== */}
                {activeSection === 6 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <OpportunitiesAndSwotSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 7: ONLY LOCAL RISKS & MITIGATION       */}
                {/* ============================================== */}
                {activeSection === 7 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <RiskAssessmentSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 8: ONLY COMPETITOR LANDSCAPE & PRICING */}
                {/* ============================================== */}
                {activeSection === 8 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <CompetitorPricingSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 9: ONLY OPERATIONAL & WORKING CAPITAL  */}
                {/* ============================================== */}
                {activeSection === 9 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <OperationalCostsSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* ============================================== */}
                {/* SECTION 10: ONLY OVERALL ASSESSMENT & CHECKLIST */}
                {/* ============================================== */}
                {activeSection === 10 && (
                  <div className="animate-fade-in">
                    {aiReport ? (
                      <OverallRecommendationSection report={aiReport} />
                    ) : (
                      <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500">
                        {t('aiLoadingTitle')}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Pagination Bar: Next / Previous Controls */}
                <div className="bg-white border border-slate-300 rounded p-4 flex items-center justify-between gap-4 mt-6">
                  <Button
                    onClick={prevSection}
                    disabled={activeSection === 1}
                    variant="outline"
                    icon={ArrowLeft}
                  >
                    {t('previousSection')}
                  </Button>

                  <span className="text-xs md:text-sm font-bold text-slate-600">
                    {t('page')} {activeSection} / {TOTAL_SECTIONS}
                  </span>

                  {activeSection < TOTAL_SECTIONS ? (
                    <Button
                      onClick={nextSection}
                      variant="primary"
                      icon={ArrowRight}
                    >
                      {t('nextSection')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePrint}
                      variant="govGreen"
                      icon={Printer}
                    >
                      {t('printReport')}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-300 py-4 px-4 text-center text-xs text-slate-500 print:hidden mt-8">
        <p>{t('footerCopyright')}</p>
      </footer>
    </div>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import ExpenseChart from './ExpenseChart';
import {
  Compass,
  Lightbulb,
  ShieldAlert,
  Users,
  Tag,
  Wrench,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  CheckSquare,
  Award
} from 'lucide-react';

export default function FeasibilityReport({ report }) {
  const { t } = useTranslation();

  if (!report) return null;

  const {
    marketReach,
    opportunityAnalysis,
    swot,
    threats,
    competitorMapping,
    pricing,
    operationalCosts,
    workingCapital,
    suitabilityRating = 'Suitable',
    actionItems = [],
    recommendation
  } = report;

  const totalOpCost = (operationalCosts || []).reduce((acc, c) => acc + (Number(c.estimate) || 0), 0);

  const getSuitabilityStyle = (rating) => {
    const r = (rating || '').toLowerCase();
    if (r.includes('caution')) {
      return {
        badge: 'bg-rose-600 text-white border-rose-700',
        bg: 'from-rose-50 to-orange-50 border-rose-200',
        text: 'text-rose-950',
        icon: AlertCircle,
        label: t('suitabilityNeedsCaution') || 'Needs Caution'
      };
    }
    if (r.includes('moderate')) {
      return {
        badge: 'bg-amber-500 text-white border-amber-600',
        bg: 'from-amber-50 to-yellow-50 border-amber-200',
        text: 'text-amber-950',
        icon: TrendingUp,
        label: t('suitabilityModerately') || 'Moderately Suitable'
      };
    }
    return {
      badge: 'bg-emerald-600 text-white border-emerald-700',
      bg: 'from-emerald-50 to-teal-50 border-emerald-200',
      text: 'text-emerald-950',
      icon: CheckCircle2,
      label: t('suitabilitySuitable') || 'Suitable'
    };
  };

  const suitability = getSuitabilityStyle(suitabilityRating);
  const SuitabilityIcon = suitability.icon;

  const getImpactBadge = (impact) => {
    const imp = (impact || '').toLowerCase();
    if (imp.includes('high')) return 'bg-red-100 text-red-800 border-red-200';
    if (imp.includes('medium')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getCompLevelBadge = (level) => {
    const lvl = (level || '').toLowerCase();
    if (lvl.includes('high')) return 'bg-red-500 text-white';
    if (lvl.includes('medium')) return 'bg-amber-500 text-white';
    return 'bg-emerald-600 text-white';
  };

  return (
    <div className="space-y-8 animate-fade-in my-8" id="feasibility-section">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Hyper-Local AI Feasibility Analysis
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
          {t('aiReportTitle')}
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          {t('aiReportSubtitle')}
        </p>
      </div>

      {/* AI Recommendation Highlight & Suitability Badge Card */}
      <div className={`bg-gradient-to-br ${suitability.bg} border-2 rounded-3xl p-6 md:p-8 shadow-md`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white text-slate-900 rounded-2xl shadow-sm border border-slate-200">
              <Award className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Overall Feasibility Assessment</span>
              <h3 className={`text-2xl font-black ${suitability.text}`}>
                {t('aiRecommendationHeading')}
              </h3>
            </div>
          </div>

          <div className="shrink-0">
            <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm md:text-base shadow-sm border ${suitability.badge}`}>
              <SuitabilityIcon className="w-5 h-5" />
              <span>{suitability.label}</span>
            </span>
          </div>
        </div>

        <p className="text-base md:text-lg text-slate-800 leading-relaxed font-medium mb-6">
          {recommendation}
        </p>

        {/* Action Items Checklist */}
        {actionItems && actionItems.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/80">
            <h4 className="font-extrabold text-slate-900 text-sm md:text-base mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>Before Applying for Loan — Important Checklist:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {actionItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-slate-500 mt-4 italic">
          * Note: All AI insights are estimates intended to assist decision-making. Success depends on execution and local conditions.
        </p>
      </div>

      {/* Market Reach & Distribution Channels */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {t('marketReachHeading')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">{t('consumerBase')}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{marketReach.consumerBase}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Market Reach Overview</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{marketReach.summary}</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-3">{t('distributionChannels')}</h4>
          <div className="flex flex-wrap gap-2">
            {marketReach.distributionChannels.map((channel, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-50 text-blue-800 border border-blue-200 text-xs md:text-sm font-bold rounded-xl"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunity Analysis */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {t('opportunitiesHeading')}
          </h3>
        </div>

        <p className="text-slate-700 mb-6 text-sm md:text-base">{opportunityAnalysis.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunityAnalysis.opportunities.map((opp, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
              <TrendingUp className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-amber-950">{opp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Analysis Matrix */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
          {t('swotHeading')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5">
            <h4 className="font-extrabold text-emerald-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              {t('strengths')}
            </h4>
            <ul className="space-y-2">
              {swot.strengths.map((item, i) => (
                <li key={i} className="text-xs md:text-sm text-emerald-950 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5">
            <h4 className="font-extrabold text-rose-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span>
              {t('weaknesses')}
            </h4>
            <ul className="space-y-2">
              {swot.weaknesses.map((item, i) => (
                <li key={i} className="text-xs md:text-sm text-rose-950 flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
            <h4 className="font-extrabold text-blue-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              {t('opportunities')}
            </h4>
            <ul className="space-y-2">
              {swot.opportunities.map((item, i) => (
                <li key={i} className="text-xs md:text-sm text-blue-950 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5">
            <h4 className="font-extrabold text-purple-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600"></span>
              {t('threats')}
            </h4>
            <ul className="space-y-2">
              {swot.threats.map((item, i) => (
                <li key={i} className="text-xs md:text-sm text-purple-950 flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Local Risks & Mitigations */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {t('localRisksHeading')}
          </h3>
        </div>

        <div className="space-y-4">
          {threats.map((tItem, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h4 className="font-bold text-slate-900 text-base">{tItem.risk}</h4>
                <span className={`px-3 py-1 text-xs font-extrabold rounded-full border ${getImpactBadge(tItem.impact)}`}>
                  {tItem.impact} Impact
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                <span className="font-bold text-slate-800">{t('mitigation')}: </span>
                {tItem.mitigation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Mapping & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Competitor Landscape */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-900">{t('competitorHeading')}</h3>
              </div>
              <span className={`px-3 py-1 text-xs font-black uppercase rounded-full shadow-sm ${getCompLevelBadge(competitorMapping.competitionLevel)}`}>
                {competitorMapping.competitionLevel} Competition
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {competitorMapping.summary}
            </p>
          </div>
        </div>

        {/* Pricing Recommendation */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900">{t('pricingHeading')}</h3>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 mb-4 text-center">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t('recommendedPrice')}</p>
            <p className="text-2xl font-black text-emerald-950 mt-1">{pricing.recommendedPrice}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">Market Range: {pricing.priceRange}</p>
          </div>

          <p className="text-xs md:text-sm text-slate-600">
            <span className="font-bold text-slate-800">{t('pricingReason')}: </span>
            {pricing.reason}
          </p>
        </div>
      </div>

      {/* Operational Costs & Working Capital */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Operational Costs */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-900">{t('operationalCostsHeading')}</h3>
            </div>
            {totalOpCost > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Total: {formatINR(totalOpCost)}
              </span>
            )}
          </div>

          <ExpenseChart costs={operationalCosts} />

          <div className="space-y-3 mt-4">
            {operationalCosts.map((cost, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-900 text-xs md:text-sm">{cost.category}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{cost.note}</p>
                </div>
                {cost.estimate > 0 && (
                  <span className="text-xs font-bold text-slate-900 shrink-0 ml-3">{formatINR(cost.estimate)}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Working Capital Breakdown */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-slate-900">{t('workingCapitalHeading')}</h3>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 mb-4 text-center">
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">{t('workingCapitalEstimate')}</p>
            <p className="text-2xl font-black text-purple-950 mt-1">{formatINR(workingCapital.estimate)}</p>
          </div>

          <div className="space-y-2">
            {workingCapital.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs md:text-sm p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800">{item.item}</span>
                <span className="text-slate-600">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';

/**
 * 5. Market Reach Section
 */
export function MarketReachSection({ report }) {
  const { t } = useTranslation();
  if (!report?.marketReach) return null;
  const { marketReach } = report;

  return (
    <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
        <div className="p-2.5 bg-blue-900 text-amber-400 rounded">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Market Dynamics</span>
          <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
            {t('marketReachHeading')}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded border border-slate-300 p-4">
          <h4 className="font-bold text-[#0b2545] text-sm uppercase mb-2">
            {t('consumerBase')}
          </h4>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {marketReach.consumerBase}
          </p>
        </div>

        <div className="bg-slate-50 rounded border border-slate-300 p-4">
          <h4 className="font-bold text-[#0b2545] text-sm uppercase mb-2">
            {t('marketReachOverview')}
          </h4>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {marketReach.summary}
          </p>
        </div>
      </div>

      <div className="bg-blue-50/60 border border-blue-200 rounded p-4">
        <h4 className="font-bold text-[#0b2545] text-xs md:text-sm uppercase mb-3">
          {t('distributionChannels')}
        </h4>
        <div className="flex flex-wrap gap-2">
          {(marketReach.distributionChannels || []).map((channel, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-white text-blue-950 border border-blue-300 text-xs font-bold rounded shadow-xs"
            >
              • {channel}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Market Opportunities & SWOT Section
 */
export function OpportunitiesAndSwotSection({ report }) {
  const { t } = useTranslation();
  if (!report) return null;
  const { opportunityAnalysis, swot } = report;

  return (
    <div className="space-y-6">
      {/* Opportunities */}
      {opportunityAnalysis && (
        <div className="bg-white border-t-4 border-t-amber-600 border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demand Potential</span>
              <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                {t('opportunitiesHeading')}
              </h3>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-700 mb-5 leading-relaxed font-medium bg-amber-50/50 p-3 rounded border border-amber-200">
            {opportunityAnalysis.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(opportunityAnalysis.opportunities || []).map((opp, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-slate-50 border border-slate-300 rounded p-3">
                <TrendingUp className="w-4 h-4 text-[#138808] shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm font-semibold text-slate-900">{opp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SWOT Matrix */}
      {swot && (
        <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2.5 bg-[#0b2545] text-white rounded">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Strategic Assessment</span>
              <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                {t('swotHeading')}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-emerald-50/80 border border-emerald-300 rounded p-4">
              <h4 className="font-extrabold text-emerald-950 text-sm uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#138808]"></span>
                {t('strengths')}
              </h4>
              <ul className="space-y-2">
                {(swot.strengths || []).map((item, i) => (
                  <li key={i} className="text-xs md:text-sm text-emerald-950 flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-rose-50/80 border border-rose-300 rounded p-4">
              <h4 className="font-extrabold text-rose-950 text-sm uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                {t('weaknesses')}
              </h4>
              <ul className="space-y-2">
                {(swot.weaknesses || []).map((item, i) => (
                  <li key={i} className="text-xs md:text-sm text-rose-950 flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-blue-50/80 border border-blue-300 rounded p-4">
              <h4 className="font-extrabold text-blue-950 text-sm uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                {t('opportunities')}
              </h4>
              <ul className="space-y-2">
                {(swot.opportunities || []).map((item, i) => (
                  <li key={i} className="text-xs md:text-sm text-blue-950 flex items-start gap-2">
                    <span className="text-blue-700 font-bold">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-purple-50/80 border border-purple-300 rounded p-4">
              <h4 className="font-extrabold text-purple-950 text-sm uppercase mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                {t('threats')}
              </h4>
              <ul className="space-y-2">
                {(swot.threats || []).map((item, i) => (
                  <li key={i} className="text-xs md:text-sm text-purple-950 flex items-start gap-2">
                    <span className="text-purple-700 font-bold">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 7. Risk Assessment Section
 */
export function RiskAssessmentSection({ report }) {
  const { t } = useTranslation();
  if (!report?.threats) return null;

  const getImpactBadge = (impact) => {
    const imp = (impact || '').toLowerCase();
    if (imp.includes('high') || imp.includes('उच्च') || imp.includes('అధిక')) {
      return 'bg-red-100 text-red-900 border-red-300';
    }
    if (imp.includes('medium') || imp.includes('मध्यम') || imp.includes('మధ్యస్థ')) {
      return 'bg-amber-100 text-amber-900 border-amber-300';
    }
    return 'bg-blue-100 text-blue-900 border-blue-300';
  };

  return (
    <div className="bg-white border-t-4 border-t-rose-600 border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
        <div className="p-2.5 bg-rose-100 text-rose-800 rounded">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prudential Safeguards</span>
          <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
            {t('localRisksHeading')}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {report.threats.map((tItem, i) => (
          <div key={i} className="bg-slate-50 border border-slate-300 rounded p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm md:text-base">
                {tItem.risk}
              </h4>
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded border uppercase self-start sm:self-auto ${getImpactBadge(tItem.impact)}`}>
                {t('impact')}: {tItem.impact}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 uppercase text-xs">{t('mitigation')}: </span>
              {tItem.mitigation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. Competitor Landscape & Pricing Section
 */
export function CompetitorPricingSection({ report }) {
  const { t } = useTranslation();
  if (!report) return null;
  const { competitorMapping, pricing } = report;

  const getCompBadge = (level) => {
    const lvl = (level || '').toLowerCase();
    if (lvl.includes('high') || lvl.includes('उच्च') || lvl.includes('అధిక')) {
      return 'bg-red-700 text-white';
    }
    if (lvl.includes('medium') || lvl.includes('मध्यम') || lvl.includes('మధ్యస్థ')) {
      return 'bg-amber-600 text-white';
    }
    return 'bg-[#138808] text-white';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Competitor Landscape */}
      {competitorMapping && (
        <div className="bg-white border-t-4 border-t-blue-700 border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-800" />
                <h3 className="text-lg font-black text-[#0b2545] uppercase">
                  {t('competitorHeading')}
                </h3>
              </div>
              <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded shadow-xs ${getCompBadge(competitorMapping.competitionLevel)}`}>
                {competitorMapping.competitionLevel}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              {competitorMapping.summary}
            </p>
          </div>
        </div>
      )}

      {/* Pricing Strategy */}
      {pricing && (
        <div className="bg-white border-t-4 border-t-emerald-700 border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
            <Tag className="w-5 h-5 text-emerald-800" />
            <h3 className="text-lg font-black text-[#0b2545] uppercase">
              {t('pricingHeading')}
            </h3>
          </div>

          <div className="bg-emerald-50 rounded p-4 border border-emerald-300 mb-4 text-center">
            <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">{t('recommendedPrice')}</p>
            <p className="text-2xl font-black text-emerald-950 mt-1">{pricing.recommendedPrice}</p>
            <p className="text-xs text-emerald-800 font-semibold mt-1">{t('priceRange')}: {pricing.priceRange}</p>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            <span className="font-bold text-slate-900 uppercase text-xs">{t('pricingReason')}: </span>
            {pricing.reason}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * 9. Operational Costs & Working Capital Section
 */
export function OperationalCostsSection({ report }) {
  const { t } = useTranslation();
  if (!report) return null;
  const { operationalCosts, workingCapital } = report;

  const totalOpCost = (operationalCosts || []).reduce((acc, c) => acc + (Number(c.estimate) || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Operational Costs */}
      {operationalCosts && (
        <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-slate-800" />
              <h3 className="text-lg font-black text-[#0b2545] uppercase">
                {t('operationalCostsHeading')}
              </h3>
            </div>
            {totalOpCost > 0 && (
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
                Total: {formatINR(totalOpCost)}
              </span>
            )}
          </div>

          <ExpenseChart costs={operationalCosts} />

          <div className="space-y-2 mt-4">
            {operationalCosts.map((cost, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded border border-slate-300 flex justify-between items-start text-xs md:text-sm">
                <div>
                  <p className="font-bold text-slate-900">{cost.category}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{cost.note}</p>
                </div>
                {cost.estimate > 0 && (
                  <span className="font-black text-slate-900 shrink-0 ml-3">{formatINR(cost.estimate)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Working Capital Breakdown */}
      {workingCapital && (
        <div className="bg-white border-t-4 border-t-purple-700 border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
            <PiggyBank className="w-5 h-5 text-purple-800" />
            <h3 className="text-lg font-black text-[#0b2545] uppercase">
              {t('workingCapitalHeading')}
            </h3>
          </div>

          <div className="bg-purple-50 rounded p-4 border border-purple-300 mb-4 text-center">
            <p className="text-xs font-bold text-purple-900 uppercase tracking-wider">{t('workingCapitalEstimate')}</p>
            <p className="text-2xl font-black text-purple-950 mt-1">{formatINR(workingCapital.estimate)}</p>
          </div>

          <div className="space-y-2">
            {(workingCapital.breakdown || []).map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs md:text-sm p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">{item.item}</span>
                <span className="text-slate-600 font-medium">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 10. Overall Assessment & Checklist Section
 */
export function OverallRecommendationSection({ report }) {
  const { t } = useTranslation();
  if (!report) return null;

  const { suitabilityRating = 'Suitable', actionItems = [], recommendation } = report;

  const getSuitabilityStyle = (rating) => {
    const r = (rating || '').toLowerCase();
    if (r.includes('caution') || r.includes('सावधानी') || r.includes('జాగ్రత్త')) {
      return {
        badge: 'bg-rose-700 text-white border-rose-800',
        bg: 'bg-rose-50/50 border-rose-300',
        text: 'text-rose-950',
        icon: AlertCircle,
        label: t('suitabilityNeedsCaution') || 'Needs Caution'
      };
    }
    if (r.includes('moderate') || r.includes('मध्यम') || r.includes('మధ్యస్థ')) {
      return {
        badge: 'bg-amber-600 text-white border-amber-700',
        bg: 'bg-amber-50/50 border-amber-300',
        text: 'text-amber-950',
        icon: TrendingUp,
        label: t('suitabilityModerately') || 'Moderately Suitable'
      };
    }
    return {
      badge: 'bg-[#138808] text-white border-green-800',
      bg: 'bg-emerald-50/50 border-emerald-300',
      text: 'text-emerald-950',
      icon: CheckCircle2,
      label: t('suitabilitySuitable') || 'Suitable'
    };
  };

  const suitability = getSuitabilityStyle(suitabilityRating);
  const SuitabilityIcon = suitability.icon;

  return (
    <div className="space-y-6">
      <div className={`bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 rounded p-5 md:p-8 shadow-xs`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0b2545] text-amber-400 rounded">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Government Enterprise Advisory</span>
              <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase">
                {t('aiRecommendationHeading')}
              </h3>
            </div>
          </div>

          <div className="shrink-0">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded font-bold text-sm shadow-xs border ${suitability.badge}`}>
              <SuitabilityIcon className="w-4 h-4" />
              <span>{suitability.label}</span>
            </span>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-800 leading-relaxed font-medium mb-6 bg-slate-50 p-4 rounded border border-slate-300">
          {recommendation}
        </p>

        {/* Action Items Checklist */}
        {actionItems && actionItems.length > 0 && (
          <div className="bg-slate-50 rounded p-4 border border-slate-300">
            <h4 className="font-black text-[#0b2545] text-xs md:text-sm uppercase mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#138808]" />
              <span>{t('checklistHeading')}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {actionItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs md:text-sm font-semibold text-slate-800 bg-white p-2.5 rounded border border-slate-200">
                  <span className="w-4 h-4 rounded bg-[#0b2545] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-slate-500 mt-4 italic">
          {t('disclaimerNote')}
        </p>
      </div>
    </div>
  );
}

/**
 * Full Combined Feasibility Report (Used when rendering Full Report View or Printing)
 */
export default function FeasibilityReport({ report }) {
  if (!report) return null;

  return (
    <div className="space-y-6">
      <MarketReachSection report={report} />
      <OpportunitiesAndSwotSection report={report} />
      <RiskAssessmentSection report={report} />
      <CompetitorPricingSection report={report} />
      <OperationalCostsSection report={report} />
      <OverallRecommendationSection report={report} />
    </div>
  );
}

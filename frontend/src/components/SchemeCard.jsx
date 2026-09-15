import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import { Award, Percent, Calendar, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

export default function SchemeCard({ scheme }) {
  const { t } = useTranslation();

  if (!scheme) return null;

  return (
    <div className="bg-white border-t-4 border-t-amber-500 border-x border-b border-slate-300 rounded p-5 md:p-6 shadow-xs my-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
              {t('recommendedScheme')}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[#0b2545] uppercase tracking-tight">
              {scheme.name}
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span>Government Subsidized Scheme</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-700 mb-6 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
        {scheme.description}
      </p>

      {/* 4 Metric Boxes (Sharp 4px Borders) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-300 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Percent className="w-4 h-4 text-emerald-700" />
            <p className="text-xs text-slate-600 font-bold uppercase">{t('interestRate')}</p>
          </div>
          <p className="text-lg md:text-xl font-black text-slate-900">{scheme.interestRate}%</p>
          <p className="text-[11px] text-slate-500">Subsidized p.a.</p>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-700" />
            <p className="text-xs text-slate-600 font-bold uppercase">{t('tenure')}</p>
          </div>
          <p className="text-lg md:text-xl font-black text-slate-900">{scheme.tenureYears} {t('years')}</p>
          <p className="text-[11px] text-slate-500">Repayment Period</p>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-purple-700" />
            <p className="text-xs text-slate-600 font-bold uppercase">{t('moratorium')}</p>
          </div>
          <p className="text-lg md:text-xl font-black text-slate-900">{scheme.moratoriumMonths} {t('months')}</p>
          <p className="text-[11px] text-slate-500">Grace Period</p>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <p className="text-xs text-slate-600 font-bold uppercase">{t('maxLoanLimit')}</p>
          </div>
          <p className="text-lg md:text-xl font-black text-slate-900">{formatINR(scheme.maximumLoan)}</p>
          <p className="text-[11px] text-slate-500">Project Ceiling</p>
        </div>
      </div>
    </div>
  );
}

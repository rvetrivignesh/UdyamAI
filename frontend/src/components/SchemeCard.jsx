import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import { Award, Percent, Calendar, Clock, ShieldAlert } from 'lucide-react';

export default function SchemeCard({ scheme }) {
  const { t } = useTranslation();

  if (!scheme) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 rounded-3xl p-1 shadow-lg my-6">
      <div className="bg-white rounded-[22px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              {t('recommendedScheme')}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              {scheme.name}
            </h3>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-600 mb-6">
          {scheme.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">{t('interestRate')}</p>
              <p className="text-lg md:text-xl font-extrabold text-slate-900">{scheme.interestRate}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">{t('tenure')}</p>
              <p className="text-lg md:text-xl font-extrabold text-slate-900">{scheme.tenureYears} {t('years')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">{t('moratorium')}</p>
              <p className="text-lg md:text-xl font-extrabold text-slate-900">{scheme.moratoriumMonths} {t('months')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">{t('maxLoanLimit')}</p>
              <p className="text-lg md:text-xl font-extrabold text-slate-900">{formatINR(scheme.maximumLoan)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

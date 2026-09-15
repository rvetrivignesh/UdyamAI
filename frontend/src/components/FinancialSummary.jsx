import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import { Wallet, Landmark, PiggyBank } from 'lucide-react';

export default function FinancialSummary({ marginCapital, projectCost, loanAmount }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {/* Your Contribution Card */}
      <div className="bg-white border-t-4 border-t-blue-700 border-x border-b border-slate-300 p-4 md:p-5 rounded shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-900 tracking-wider uppercase">
            {t('yourContribution')}
          </span>
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-800">
            <PiggyBank className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-black text-slate-900">
          {formatINR(marginCapital)}
        </div>
        <p className="text-xs text-blue-700 mt-1 font-semibold">10% Beneficiary Margin (Own Capital)</p>
      </div>

      {/* Total Project Cost Card */}
      <div className="bg-white border-t-4 border-t-[#138808] border-x border-b border-slate-300 p-4 md:p-5 rounded shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-emerald-900 tracking-wider uppercase">
            {t('totalProjectCost')}
          </span>
          <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-black text-slate-900">
          {formatINR(projectCost)}
        </div>
        <p className="text-xs text-emerald-700 mt-1 font-semibold">100% Total Estimated Project Outlay</p>
      </div>

      {/* Expected Loan Card */}
      <div className="bg-white border-t-4 border-t-[#0b2545] border-x border-b border-slate-300 p-4 md:p-5 rounded shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">
            {t('expectedLoan')}
          </span>
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[#0b2545]">
            <Landmark className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-black text-slate-900">
          {formatINR(loanAmount)}
        </div>
        <p className="text-xs text-slate-600 mt-1 font-semibold">Up to 90% Sanctionable Term Loan</p>
      </div>
    </div>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import { Wallet, Landmark, PiggyBank } from 'lucide-react';

export default function FinancialSummary({ marginCapital, projectCost, loanAmount }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-6">
      {/* Your Contribution Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs md:text-sm font-bold text-blue-700 tracking-wider uppercase">
            {t('yourContribution')}
          </span>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <PiggyBank className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-blue-950">
          {formatINR(marginCapital)}
        </div>
        <p className="text-xs text-blue-600 mt-2 font-medium">10% Beneficiary Margin</p>
      </div>

      {/* Total Project Cost Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs md:text-sm font-bold text-emerald-700 tracking-wider uppercase">
            {t('totalProjectCost')}
          </span>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-emerald-950">
          {formatINR(projectCost)}
        </div>
        <p className="text-xs text-emerald-600 mt-2 font-medium">100% Calculated Value</p>
      </div>

      {/* Expected Loan Card */}
      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs md:text-sm font-bold text-purple-700 tracking-wider uppercase">
            {t('expectedLoan')}
          </span>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Landmark className="w-5 h-5" />
          </div>
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-purple-950">
          {formatINR(loanAmount)}
        </div>
        <p className="text-xs text-purple-600 mt-2 font-medium">Up to 90% Scheme Loan</p>
      </div>
    </div>
  );
}

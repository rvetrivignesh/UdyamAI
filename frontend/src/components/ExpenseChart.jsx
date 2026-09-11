import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatINR } from '../services/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';

const COLORS = ['#059669', '#2563eb', '#9333ea', '#d97706', '#dc2626', '#0891b2'];

export default function ExpenseChart({ costs }) {
  const { t } = useTranslation();

  if (!costs || costs.length === 0) return null;

  const chartData = costs.map((c, i) => ({
    name: c.category || `Category ${i + 1}`,
    amount: Number(c.estimate) || 0,
    note: c.note
  }));

  const hasAmounts = chartData.some(d => d.amount > 0);

  if (!hasAmounts) {
    return null;
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 my-4">
      <h4 className="font-bold text-slate-800 text-sm md:text-base mb-1">
        {t('operationalCostsHeading')} Breakdown
      </h4>
      <p className="text-xs text-slate-500 mb-4">Visual breakdown of estimated monthly operational expenditures.</p>

      <div className="h-56 md:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
            <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              formatter={(val) => [formatINR(val), 'Estimated Cost']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

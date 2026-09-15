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

const COLORS = ['#0b2545', '#138808', '#d97706', '#2563eb', '#9333ea', '#dc2626'];

export default function ExpenseChart({ costs }) {
  const { t } = useTranslation();

  if (!costs || costs.length === 0) return null;

  const chartData = costs.map((c, i) => ({
    name: c.category || `Category ${i + 1}`,
    amount: Number(c.estimate) || 0,
    note: c.note
  }));

  const hasAmounts = chartData.some((d) => d.amount > 0);

  if (!hasAmounts) {
    return null;
  }

  return (
    <div className="bg-slate-50 border border-slate-300 rounded p-4 md:p-5 my-4">
      <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wide mb-1">
        {t('operationalCostsHeading')}
      </h4>
      <p className="text-[11px] text-slate-500 mb-4">
        Visual expenditure allocation breakdown per month.
      </p>

      <div className="h-56 md:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
            <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip
              formatter={(val) => [formatINR(val), 'Estimated Amount']}
              contentStyle={{ borderRadius: '4px', border: '1px solid #94a3b8' }}
            />
            <Bar dataKey="amount" radius={[2, 2, 0, 0]}>
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

import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCount } from '../../utils/format';

interface DetectionChartProps {
  spam: number;
  ham: number;
}

export function DetectionChart({ spam, ham }: DetectionChartProps) {
  const total = spam + ham;
  const data = [
  { name: 'Spam', value: spam, color: '#ef4444' },
  { name: 'Ham', value: ham, color: '#10b981' }];


  if (total === 0) {
    return (
      <p className="py-10 text-center text-[13px] text-ink-500">
        No email analyses yet.
      </p>);

  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-48 w-48 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
              startAngle={90}
              endAngle={-270}>
              
              {data.map((entry) =>
              <Cell key={entry.name} fill={entry.color} />
              )}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [formatCount(value), name]}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #e7e9ef',
                fontSize: 12,
                boxShadow: '0 8px 24px -12px rgba(13,21,38,0.18)'
              }} />
            
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-bold text-ink-900">{formatCount(total)}</span>
          <span className="text-[11px] text-ink-500">classified</span>
        </div>
      </div>

      <ul className="w-full space-y-3">
        {data.map((entry) =>
        <li key={entry.name} className="rounded-xl border border-line bg-canvas px-4 py-3">
            <div className="flex items-center gap-2">
              <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }} />
            
              <span className="text-[13px] font-medium text-ink-700">{entry.name}</span>
              <span className="ml-auto font-mono text-[13px] font-semibold text-ink-900">
                {formatCount(entry.value)}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
              className="h-full rounded-full"
              style={{
                width: `${entry.value / total * 100}%`,
                backgroundColor: entry.color
              }} />
            
            </div>
            <p className="mt-1.5 font-mono text-[11px] text-ink-500">
              {(entry.value / total * 100).toFixed(1)}% of total
            </p>
          </li>
        )}
      </ul>
    </div>);

}
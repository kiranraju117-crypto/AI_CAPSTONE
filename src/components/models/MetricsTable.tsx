import React from 'react';
import type { ModelMetrics } from '../../types';
import { formatPercent } from '../../utils/format';
import { InfoTip } from '../ui/InfoTip';

interface MetricsTableProps {
  metrics: ModelMetrics[];
  loading?: boolean;
  compact?: boolean;
}

const COLUMN_TIPS: Record<string, string> = {
  Accuracy: 'Share of all emails classified correctly on the held-out test set.',
  Precision: 'Of the emails predicted spam, the share that truly were spam.',
  Recall: 'Of the actual spam emails, the share the model caught.',
  'F1 Score': 'Harmonic mean of precision and recall — balances both.'
};

export function MetricsTable({ metrics, loading = false, compact = false }: MetricsTableProps) {
  if (loading) {
    return (
      <div className="space-y-2 px-6 py-5">
        {[0, 1, 2, 3].map((row) =>
        <div key={row} className="h-9 animate-pulse rounded-md bg-line" />
        )}
      </div>);

  }

  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full min-w-[520px] text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-500">
              Model
            </th>
            {Object.keys(COLUMN_TIPS).map((column) =>
            <th
              key={column}
              className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-500">
              
                <span className="inline-flex items-center gap-1">
                  {column}
                  <InfoTip label={column} description={COLUMN_TIPS[column]} />
                </span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {metrics.map((row) =>
          <tr
            key={row.model}
            className="border-b border-line last:border-0 transition-colors duration-150 ease-out hover:bg-canvas">
            
              <td
              className={`px-6 ${compact ? 'py-2.5' : 'py-3.5'} text-[13px] font-medium text-ink-900`}>
              
                {row.model}
              </td>
              {[row.accuracy, row.precision, row.recall, row.f1].map((value, index) =>
            <td
              key={index}
              className={`px-4 ${compact ? 'py-2.5' : 'py-3.5'} text-right font-mono text-[13px] ${
              value === null ? 'text-ink-400' : 'text-ink-900'}`
              }>
              
                  {formatPercent(value, 1)}
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}
import React from 'react';
import { EyeIcon } from 'lucide-react';
import type { DetectionRecord } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate, formatPercent } from '../../utils/format';

interface DetectionTableProps {
  records: DetectionRecord[];
  onView: (record: DetectionRecord) => void;
  showStatus?: boolean;
  loading?: boolean;
}

export function DetectionTable({
  records,
  onView,
  showStatus = false,
  loading = false
}: DetectionTableProps) {
  if (loading) {
    return (
      <div className="space-y-2 px-6 py-5">
        {[0, 1, 2, 3, 4].map((row) =>
        <div key={row} className="h-10 animate-pulse rounded-md bg-line" />
        )}
      </div>);

  }

  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-line">
            <Th className="pl-6">Email / Subject</Th>
            <Th>Classification</Th>
            <Th align="right">Confidence</Th>
            <Th>Model</Th>
            <Th>Date</Th>
            {showStatus ? <Th>Status</Th> : null}
            <Th align="right" className="pr-6">
              {showStatus ? 'View' : 'Action'}
            </Th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) =>
          <tr
            key={record.id}
            className="border-b border-line last:border-0 transition-colors duration-150 ease-out hover:bg-canvas">
            
              <td className="max-w-[320px] py-3.5 pl-6 pr-4">
                <p className="truncate text-[13px] font-medium text-ink-900">
                  {record.subject}
                </p>
                <p className="truncate text-[12px] text-ink-500">{record.body}</p>
              </td>
              <td className="px-4 py-3.5">
                <StatusBadge classification={record.classification} />
              </td>
              <td className="px-4 py-3.5 text-right font-mono text-[13px] text-ink-900">
                {formatPercent(record.confidence)}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-[12.5px] text-ink-700">
                {record.model}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-[12.5px] text-ink-500">
                {formatDate(record.date)}
              </td>
              {showStatus ?
            <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-ham-500" />
                    Completed
                  </span>
                </td> :
            null}
              <td className="py-3.5 pl-4 pr-6 text-right">
                <button
                type="button"
                onClick={() => onView(record)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-700 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-brand-700">
                
                  <EyeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  View
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}

function Th({
  children,
  align = 'left',
  className = ''




}: {children: React.ReactNode;align?: 'left' | 'right';className?: string;}) {
  return (
    <th
      className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-500 ${
      align === 'right' ? 'text-right' : 'text-left'} ${
      className}`}>
      
      {children}
    </th>);

}
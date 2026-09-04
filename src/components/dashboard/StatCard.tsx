import React from "react";
import { cn } from "../../utils/format";
import { BoxIcon } from "lucide-react";
type Tone = 'brand' | 'spam' | 'ham' | 'neutral';
interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: BoxIcon;
  tone?: Tone;
  loading?: boolean;
  emphasis?: boolean;
}
const TONES: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-600',
  spam: 'bg-spam-50 text-spam-600',
  ham: 'bg-ham-50 text-ham-600',
  neutral: 'bg-canvas text-ink-500'
};
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'brand',
  loading = false,
  emphasis = false
}: StatCardProps) {
  return <div className={cn('rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-150 ease-out hover:shadow-lift', emphasis && 'ring-1 ring-brand-100')}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-ink-500">{label}</span>
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', TONES[tone])}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {loading ? <div className="mt-4 h-8 w-24 animate-pulse rounded-md bg-line" /> : <p className={cn('mt-3 font-mono font-bold tracking-tight text-ink-900', emphasis ? 'text-[30px]' : 'text-[26px]')}>
          {value}
        </p>}

      {hint ? <p className="mt-1 text-[11.5px] text-ink-400">{hint}</p> : null}
    </div>;
}
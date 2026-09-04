import React from 'react';
import { CheckIcon, SigmaIcon, TargetIcon, TreesIcon, ZapIcon } from 'lucide-react';
import type { ModelMetrics, ModelProfile } from '../../types';
import { formatPercent } from '../../utils/format';
import { cn } from '../../utils/format';

const ICONS = {
  zap: ZapIcon,
  sigma: SigmaIcon,
  target: TargetIcon,
  trees: TreesIcon
};

interface ModelCardProps {
  profile: ModelProfile;
  metrics?: ModelMetrics;
  active?: boolean;
  onSelect?: () => void;
}

export function ModelCard({ profile, metrics, active = false, onSelect }: ModelCardProps) {
  const Icon = ICONS[profile.icon];

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-2xl border bg-surface p-5 shadow-card transition-all duration-150 ease-out hover:shadow-lift',
        active ? 'border-brand-300 ring-1 ring-brand-100' : 'border-line'
      )}>
      
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold leading-tight text-ink-900">
            {profile.name}
          </h3>
          <p className="mt-1 text-[12.5px] leading-5 text-ink-500">{profile.tagline}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {profile.traits.map((trait) =>
        <li key={trait} className="flex items-start gap-2 text-[12.5px] text-ink-700">
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ham-600" aria-hidden="true" />
            {trait}
          </li>
        )}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between rounded-xl border border-line bg-canvas px-3 py-2.5">
          <span className="text-[11px] font-medium text-ink-500">Test accuracy</span>
          <span
            className={cn(
              'font-mono text-[13px] font-semibold',
              metrics?.accuracy == null ? 'text-ink-400' : 'text-ink-900'
            )}>
            
            {formatPercent(metrics?.accuracy ?? null, 1)}
          </span>
        </div>
        {onSelect ?
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            'mt-3 h-9 w-full rounded-lg text-[13px] font-medium transition-colors duration-150 ease-out',
            active ?
            'bg-brand-50 text-brand-700' :
            'border border-line-strong text-ink-700 hover:border-ink-400 hover:text-ink-900'
          )}>
          
            {active ? 'Active classifier' : 'Use this model'}
          </button> :
        null}
      </div>
    </div>);

}
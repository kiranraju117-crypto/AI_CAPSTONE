import React from "react";
import { cn } from "../../utils/format";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: 'neutral' | 'error' | 'warning';
  className?: string;
}
const TONES = {
  neutral: 'border-line bg-canvas text-brand-600',
  error: 'border-spam-200 bg-spam-50 text-spam-600',
  warning: 'border-warn-100 bg-warn-50 text-warn-600'
} as const;
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  tone = 'neutral',
  className
}: EmptyStateProps) {
  return <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl border', TONES[tone])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm font-semibold text-ink-900">{title}</p>
      {description ? <p className="mt-1.5 max-w-xs text-[13px] leading-5 text-ink-500">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>;
}
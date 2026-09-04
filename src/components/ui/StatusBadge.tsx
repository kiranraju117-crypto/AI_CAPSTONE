import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon } from 'lucide-react';
import type { Classification } from '../../types';
import { cn } from '../../utils/format';

interface StatusBadgeProps {
  classification: Classification;
  size?: 'sm' | 'md';
  withIcon?: boolean;
}

export function StatusBadge({ classification, size = 'sm', withIcon = true }: StatusBadgeProps) {
  const isSpam = classification === 'spam';
  const Icon = isSpam ? AlertTriangleIcon : CheckCircle2Icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border font-semibold tracking-wide',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        isSpam ?
        'border-spam-200 bg-spam-50 text-spam-700' :
        'border-ham-200 bg-ham-50 text-ham-700'
      )}>
      
      {withIcon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {isSpam ? 'SPAM' : 'HAM'}
    </span>);

}
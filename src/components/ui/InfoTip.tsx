import React, { useState } from 'react';
import { HelpCircleIcon } from 'lucide-react';

interface InfoTipProps {
  label: string;
  description: string;
}

/** Small tooltip for technical ML terminology. */
export function InfoTip({ label, description }: InfoTipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={`What is ${label}?`}
        className="text-ink-400 transition-colors duration-150 ease-out hover:text-brand-600"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}>
        
        <HelpCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {open ?
      <span
        role="tooltip"
        className="absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-lg border border-line bg-ink-900 px-3 py-2 text-[11px] font-normal leading-4 text-white shadow-panel">
        
          <span className="mb-0.5 block font-semibold">{label}</span>
          {description}
        </span> :
      null}
    </span>);

}
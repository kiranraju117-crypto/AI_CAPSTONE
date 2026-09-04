import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BrainIcon } from 'lucide-react';

const STAGES = [
'Text preprocessing',
'TF-IDF feature extraction',
'ML classification',
'Scoring confidence'];


export function AnalyzingState() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, STAGES.length - 1));
    }, 340);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 bg-brand-50">
        <motion.span
          className="absolute inset-0 rounded-xl border border-brand-300"
          animate={{ opacity: [0.8, 0.1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
        
        <BrainIcon className="h-5 w-5 text-brand-600" aria-hidden="true" />
      </span>

      <p className="mt-4 text-sm font-semibold text-ink-900">
        Analyzing email with machine-learning model...
      </p>

      <ul className="mt-5 w-full max-w-xs space-y-2 text-left" aria-live="polite">
        {STAGES.map((label, index) =>
        <li key={label} className="flex items-center gap-2.5">
            <span
            className={`h-1.5 w-1.5 rounded-full ${
            index <= stage ? 'bg-brand-500' : 'bg-line-strong'}`
            } />
          
            <span
            className={`text-[12px] ${index <= stage ? 'text-ink-700' : 'text-ink-400'}`}>
            
              {label}
            </span>
            {index < stage ?
          <span className="ml-auto font-mono text-[11px] text-ham-600">done</span> :
          null}
          </li>
        )}
      </ul>

      <div className="mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full w-1/3 rounded-full bg-brand-500"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }} />
        
      </div>
    </div>);

}
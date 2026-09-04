import React from 'react';
import { motion } from 'framer-motion';
import type { Classification } from '../../types';
import { formatPercent } from '../../utils/format';

interface ConfidenceMeterProps {
  spamProbability: number;
  classification: Classification;
}

export function ConfidenceMeter({ spamProbability, classification }: ConfidenceMeterProps) {
  const isSpam = classification === 'spam';
  const hamProbability = 1 - spamProbability;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-500">
          Spam probability
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={`font-mono text-lg font-semibold ${isSpam ? 'text-spam-600' : 'text-ham-600'}`}>
          
          {formatPercent(spamProbability)}
        </motion.span>
      </div>

      <div
        className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={Math.round(spamProbability * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Spam probability">
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${spamProbability * 100}%` }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={`h-full rounded-full ${isSpam ? 'bg-spam-500' : 'bg-ham-500'}`} />
        
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ProbabilityTile label="Spam probability" value={spamProbability} tone="spam" />
        <ProbabilityTile label="Ham probability" value={hamProbability} tone="ham" />
      </div>
    </div>);

}

function ProbabilityTile({
  label,
  value,
  tone




}: {label: string;value: number;tone: 'spam' | 'ham';}) {
  return (
    <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
      <p className="text-[11px] font-medium text-ink-500">{label}</p>
      <p
        className={`mt-0.5 font-mono text-[15px] font-semibold ${
        tone === 'spam' ? 'text-spam-600' : 'text-ham-600'}`
        }>
        
        {formatPercent(value, 1)}
      </p>
    </div>);

}
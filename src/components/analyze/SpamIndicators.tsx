import React from 'react';
import { motion } from 'framer-motion';
import { TagIcon } from 'lucide-react';

interface SpamIndicatorsProps {
  indicators: string[];
  classification: 'spam' | 'ham';
}

export function SpamIndicators({ indicators, classification }: SpamIndicatorsProps) {
  if (indicators.length === 0) {
    return (
      <p className="text-[13px] leading-5 text-ink-500">
        No strong spam indicators were detected in this message.
      </p>);

  }

  return (
    <ul className="flex flex-wrap gap-2">
      {indicators.map((term, index) =>
      <motion.li
        key={term}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}>
        
          <span
          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[12px] ${
          classification === 'spam' ?
          'border-spam-200 bg-spam-50 text-spam-700' :
          'border-line bg-canvas text-ink-700'}`
          }>
          
            <TagIcon className="h-3 w-3" aria-hidden="true" />
            {term}
          </span>
        </motion.li>
      )}
    </ul>);

}
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import type { DetectionRecord } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfidenceMeter } from '../analyze/ConfidenceMeter';
import { SpamIndicators } from '../analyze/SpamIndicators';
import { formatDate } from '../../utils/format';

interface DetailDrawerProps {
  record: DetectionRecord | null;
  onClose: () => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function DetailDrawer({ record, onClose }: DetailDrawerProps) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {record ?
      <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="fixed inset-0 z-40 bg-ink-900/35"
          onClick={onClose}
          aria-hidden="true" />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Email analysis detail"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: EASE }}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-panel">
          
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
                  Analysis {record.id}
                </p>
                <h2 className="mt-1 truncate text-[15px] font-semibold text-ink-900">
                  {record.subject}
                </h2>
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close detail panel"
              className="rounded-lg p-1.5 text-ink-500 transition-colors duration-150 ease-out hover:bg-canvas hover:text-ink-900">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5 scroll-thin">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge classification={record.classification} size="md" />
                <span className="text-[12px] text-ink-500">{formatDate(record.date)}</span>
                <span className="ml-auto rounded-md border border-line bg-canvas px-2 py-1 font-mono text-[11px] text-ink-700">
                  {record.model}
                </span>
              </div>

              <ConfidenceMeter
              spamProbability={record.spamProbability}
              classification={record.classification} />
            

              <section>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-500">
                  Email body
                </h3>
                <p className="rounded-xl border border-line bg-canvas px-4 py-3 text-[13px] leading-6 text-ink-700">
                  {record.body}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-500">
                  Spam indicators
                </h3>
                <SpamIndicators
                indicators={record.indicators}
                classification={record.classification} />
              
              </section>

              <section>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-500">
                  Explanation
                </h3>
                <p className="text-[13px] leading-6 text-ink-700">{record.explanation}</p>
              </section>
            </div>
          </motion.aside>
        </> :
      null}
    </AnimatePresence>);

}
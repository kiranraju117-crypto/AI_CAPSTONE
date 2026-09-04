import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, CpuIcon } from 'lucide-react';
import type { PredictionResult } from '../../types';
import { Card, CardHeader } from '../ui/Card';
import { ConfidenceMeter } from './ConfidenceMeter';
import { SpamIndicators } from './SpamIndicators';
import { InfoTip } from '../ui/InfoTip';
import { formatPercent } from '../../utils/format';

interface ClassificationResultProps {
  result: PredictionResult;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function ClassificationResult({ result }: ClassificationResultProps) {
  const isSpam = result.prediction === 'spam';
  const Icon = isSpam ? AlertTriangleIcon : CheckCircle2Icon;

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.26, ease: EASE }}
        className={`rounded-2xl border p-6 ${
        isSpam ? 'border-spam-200 bg-spam-50' : 'border-ham-200 bg-ham-50'}`
        }>
        
        <div className="flex items-start gap-4">
          <motion.span
            initial={{ scale: 0.96, opacity: 0 }}
            animate={
            isSpam ?
            { scale: 1, opacity: 1, rotate: [0, -6, 6, 0] } :
            { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.3, ease: EASE }}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            isSpam ? 'bg-spam-600' : 'bg-ham-600'}`
            }>
            
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </motion.span>

          <div className="min-w-0 flex-1">
            <p
              className={`text-[19px] font-bold leading-tight ${
              isSpam ? 'text-spam-700' : 'text-ham-700'}`
              }>
              
              {isSpam ? 'SPAM EMAIL' : 'HAM / LEGITIMATE EMAIL'}
            </p>
            <p className="mt-1 text-[13px] text-ink-700">
              Status:{' '}
              <span className="font-semibold">{isSpam ? 'Suspicious' : 'Normal'}</span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
              Confidence
            </p>
            <p
              className={`font-mono text-2xl font-bold ${
              isSpam ? 'text-spam-700' : 'text-ham-700'}`
              }>
              
              {formatPercent(result.confidence)}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/70 pt-5">
          <ConfidenceMeter
            spamProbability={result.spamProbability}
            classification={result.prediction} />
          
        </div>
      </motion.div>

      <Card as="section">
        <CardHeader title="Detection Analysis" />
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-b-2xl bg-line">
          <Field label="Classification">
            <span className={isSpam ? 'text-spam-700' : 'text-ham-700'}>
              {isSpam ? 'SPAM' : 'HAM'}
            </span>
          </Field>
          <Field label="Confidence">{formatPercent(result.confidence, 1)}</Field>
          <Field label="Model Used">{result.model}</Field>
          <Field label="Processing Status">
            <span className="inline-flex items-center gap-1.5 text-ham-700">
              <CpuIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Completed
            </span>
          </Field>
        </dl>
      </Card>

      <Card as="section">
        <CardHeader
          title="Spam Indicators"
          action={
          <InfoTip
            label="Spam indicators"
            description="Terms with high TF-IDF weight that pushed the classifier toward the spam class." />

          } />
        
        <div className="px-6 py-5">
          <SpamIndicators indicators={result.indicators} classification={result.prediction} />
        </div>
      </Card>

      <Card as="section">
        <CardHeader
          title={
          isSpam ?
          'Why was this classified as spam?' :
          'Why was this classified as legitimate?'
          } />
        
        <p className="px-6 py-5 text-[13px] leading-6 text-ink-700">{result.explanation}</p>
      </Card>
    </div>);

}

function Field({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <div className="bg-surface px-6 py-4">
      <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-500">
        {label}
      </dt>
      <dd className="mt-1 text-[13px] font-semibold text-ink-900">{children}</dd>
    </div>);

}
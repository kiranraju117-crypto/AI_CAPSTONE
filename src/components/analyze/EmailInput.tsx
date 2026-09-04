import React from 'react';
import { EraserIcon, ScanSearchIcon, SparklesIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader } from '../ui/Card';
import { SAMPLE_EMAILS } from '../../data/sampleEmails';
import { MODEL_PROFILES } from '../../data/models';
import type { ModelName } from '../../types';

interface EmailInputProps {
  subject: string;
  body: string;
  model: ModelName;
  isAnalyzing: boolean;
  onSubjectChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onModelChange: (model: ModelName) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onUseSample: (id: 'spam' | 'ham') => void;
}

export function EmailInput({
  subject,
  body,
  model,
  isAnalyzing,
  onSubjectChange,
  onBodyChange,
  onModelChange,
  onAnalyze,
  onClear,
  onUseSample
}: EmailInputProps) {
  return (
    <Card as="section">
      <CardHeader
        title="Email Input"
        description="Subject and body are combined before preprocessing."
        action={
        <div className="hidden items-center gap-1.5 text-[11px] text-ink-500 sm:flex">
            <SparklesIcon className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
            Use sample email
          </div>
        } />
      

      <div className="space-y-5 px-6 py-5">
        <div className="flex flex-wrap gap-2">
          {SAMPLE_EMAILS.map((sample) =>
          <button
            key={sample.id}
            type="button"
            onClick={() => onUseSample(sample.id)}
            className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink-700 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-brand-700">
            
              {sample.label}
            </button>
          )}
        </div>

        <div>
          <label
            htmlFor="email-subject"
            className="mb-1.5 block text-[12px] font-semibold text-ink-700">
            
            Subject
          </label>
          <input
            id="email-subject"
            value={subject}
            onChange={(event) => onSubjectChange(event.target.value)}
            placeholder="Enter email subject..."
            className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors duration-150 ease-out focus:border-brand-400 focus:outline-none" />
          
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor="email-body" className="text-[12px] font-semibold text-ink-700">
              Email Body
            </label>
            <span className="font-mono text-[11px] text-ink-400">
              {body.trim().split(/\s+/).filter(Boolean).length} tokens
            </span>
          </div>
          <textarea
            id="email-body"
            value={body}
            onChange={(event) => onBodyChange(event.target.value)}
            rows={12}
            placeholder="Paste the full email body here..."
            className="w-full resize-y rounded-xl border border-line bg-surface px-3.5 py-3 text-sm leading-6 text-ink-900 placeholder:text-ink-400 transition-colors duration-150 ease-out focus:border-brand-400 focus:outline-none scroll-thin" />
          
        </div>

        <div>
          <label
            htmlFor="model-select"
            className="mb-1.5 block text-[12px] font-semibold text-ink-700">
            
            Classifier
          </label>
          <select
            id="model-select"
            value={model}
            onChange={(event) => onModelChange(event.target.value as ModelName)}
            className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink-900 transition-colors duration-150 ease-out focus:border-brand-400 focus:outline-none">
            
            {MODEL_PROFILES.map((profile) =>
            <option key={profile.name} value={profile.name}>
                {profile.name}
              </option>
            )}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <Button onClick={onAnalyze} disabled={isAnalyzing}>
            <ScanSearchIcon className="h-4 w-4" aria-hidden="true" />
            {isAnalyzing ? 'Analyzing email...' : 'Analyze Email'}
          </Button>
          <Button variant="secondary" onClick={onClear} disabled={isAnalyzing}>
            <EraserIcon className="h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </div>
    </Card>);

}
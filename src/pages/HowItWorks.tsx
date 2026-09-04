import React from 'react';
import {
  BracesIcon,
  BrainIcon,
  ChevronRightIcon,
  CpuIcon,
  DatabaseIcon,
  MailIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  SigmaIcon } from
'lucide-react';
import { PageHeading } from '../components/ui/PageHeading';
import { Card, CardHeader } from '../components/ui/Card';
import { PipelineStep } from '../components/pipeline/PipelineStep';
import {
  ARCHITECTURE_FLOW,
  PIPELINE_STAGES,
  TFIDF_EXAMPLE_TERMS,
  TRAINING_STEPS } from
'../data/pipeline';

const ICONS = {
  mail: MailIcon,
  braces: BracesIcon,
  sigma: SigmaIcon,
  brain: BrainIcon,
  shield: ShieldCheckIcon,
  cpu: CpuIcon,
  scan: ScanSearchIcon
} as const;

export function HowItWorks() {
  return (
    <>
      <PageHeading
        title="How Spam Detection Works"
        subtitle="From raw email text to a SPAM or HAM decision, stage by stage." />
      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <section className="xl:col-span-3">
          <ol className="list-none">
            {PIPELINE_STAGES.map((stage, index) =>
            <PipelineStep
              key={stage.title}
              index={index}
              title={stage.title}
              description={stage.description}
              icon={ICONS[stage.icon]}
              isLast={index === PIPELINE_STAGES.length - 1} />

            )}
          </ol>
        </section>

        <div className="space-y-6 xl:col-span-2">
          <Card as="section">
            <CardHeader title="Why TF-IDF?" />
            <div className="px-6 py-5">
              <p className="text-[13px] leading-6 text-ink-700">
                TF-IDF converts email text into numerical vectors and highlights informative
                terms while reducing the importance of words that appear across many documents.
              </p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-500">
                Example feature phrases
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {TFIDF_EXAMPLE_TERMS.map((term) =>
                <li
                  key={term}
                  className="rounded-md border border-line bg-canvas px-2.5 py-1 font-mono text-[12px] text-ink-700">
                  
                    {term}
                  </li>
                )}
              </ul>
            </div>
          </Card>

          <Card as="section">
            <CardHeader
              title="Training Dataset"
              action={<DatabaseIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />} />
            
            <dl className="divide-y divide-line px-6 py-2">
              <DatasetRow label="Dataset type" value="Labelled email dataset" />
              <DatasetRow label="Classes" value="SPAM · HAM" />
              <DatasetRow label="Labels" value="1 = Spam · 0 = Ham" />
              <DatasetRow label="Typical fields" value="Email text · Subject · Label" />
              <DatasetRow label="Train / test split" value="80:20 or 70:30" />
            </dl>
            <p className="border-t border-line px-6 py-4 text-[12px] leading-5 text-ink-500">
              Stratified splitting can be used when class proportions are imbalanced. No specific
              dataset is claimed until one is configured by the backend.
            </p>
          </Card>
        </div>
      </div>

      <Card as="section" className="mt-6">
        <CardHeader
          title="Training Process"
          description="How the classifier is prepared before it serves predictions." />
        
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-b-2xl bg-line sm:grid-cols-2 xl:grid-cols-3">
          {TRAINING_STEPS.map((step, index) =>
          <li key={step} className="flex items-start gap-3 bg-surface px-6 py-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 font-mono text-[11px] font-semibold text-brand-600">
                {index + 1}
              </span>
              <span className="text-[13px] leading-5 text-ink-700">{step}</span>
            </li>
          )}
        </ol>
      </Card>

      <Card as="section" className="mt-6">
        <CardHeader
          title="System Architecture"
          description="End-to-end flow of a single prediction request." />
        
        <div className="flex flex-wrap items-center gap-2 px-6 py-6">
          {ARCHITECTURE_FLOW.map((node, index) => {
            const Icon = ICONS[node.icon];
            return (
              <React.Fragment key={node.label}>
                <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-2.5">
                  <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  <span className="text-[12.5px] font-medium text-ink-900">{node.label}</span>
                </div>
                {index < ARCHITECTURE_FLOW.length - 1 ?
                <ChevronRightIcon
                  className="h-4 w-4 shrink-0 text-ink-400"
                  aria-hidden="true" /> :

                null}
              </React.Fragment>);

          })}
        </div>
      </Card>
    </>);

}

function DatasetRow({ label, value }: {label: string;value: string;}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[12.5px] text-ink-500">{label}</dt>
      <dd className="text-right text-[12.5px] font-medium text-ink-900">{value}</dd>
    </div>);

}
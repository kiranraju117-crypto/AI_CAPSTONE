import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { BarChart3Icon, TrophyIcon } from 'lucide-react';
import { PageHeading } from '../components/ui/PageHeading';
import { Card, CardHeader } from '../components/ui/Card';
import { ModelCard } from '../components/models/ModelCard';
import { MetricsTable } from '../components/models/MetricsTable';
import { EmptyState } from '../components/ui/EmptyState';
import { MODEL_PROFILES } from '../data/models';
import { useDetection } from '../contexts/DetectionContext';
import { formatPercent } from '../utils/format';

export function ModelPerformance() {
  const { metrics, metricsLoading, hasMetrics, activeModel, setActiveModel } = useDetection();

  const chartData = metrics.
  filter((row) => row.accuracy !== null).
  map((row) => ({ name: row.model.replace('Multinomial ', ''), accuracy: (row.accuracy ?? 0) * 100 }));

  const best = metrics.
  filter((row) => row.accuracy !== null).
  sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0))[0];

  return (
    <>
      <PageHeading
        title="Model Performance"
        subtitle="Compare machine-learning algorithms used for email spam classification." />
      

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {MODEL_PROFILES.map((profile) =>
        <ModelCard
          key={profile.name}
          profile={profile}
          metrics={metrics.find((row) => row.model === profile.name)}
          active={activeModel === profile.name}
          onSelect={() => setActiveModel(profile.name)} />

        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card as="section" className="xl:col-span-2">
          <CardHeader
            title="Accuracy Comparison"
            description="Held-out test accuracy per classifier." />
          
          {metricsLoading ?
          <div className="px-6 py-6">
              <div className="h-64 animate-pulse rounded-xl bg-line" />
            </div> :
          chartData.length === 0 ?
          <EmptyState
            icon={BarChart3Icon}
            title="No metrics yet"
            description="Model evaluation metrics will appear after training." /> :


          <div className="h-64 px-4 py-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
                  <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#6b788e' }}
                  axisLine={false}
                  tickLine={false} />
                
                  <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: '#6b788e' }}
                  axisLine={false}
                  tickLine={false}
                  unit="%" />
                
                  <Tooltip
                  cursor={{ fill: '#f6f7f9' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Accuracy']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e7e9ef', fontSize: 12 }} />
                
                  <Bar dataKey="accuracy" fill="#5b66e8" radius={[6, 6, 0, 0]} maxBarSize={56} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        </Card>

        <Card as="section">
          <CardHeader
            title="Best Performing Model"
            description="Selected from backend evaluation results." />
          
          {hasMetrics && best ?
          <div className="px-6 py-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <TrophyIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[17px] font-semibold text-ink-900">{best.model}</p>
              <dl className="mt-4 space-y-2">
                {[
              ['Accuracy', best.accuracy],
              ['Precision', best.precision],
              ['Recall', best.recall],
              ['F1 Score', best.f1]].
              map(([label, value]) =>
              <div
                key={label as string}
                className="flex items-center justify-between border-b border-line pb-2 last:border-0">
                
                    <dt className="text-[12.5px] text-ink-500">{label as string}</dt>
                    <dd className="font-mono text-[13px] font-semibold text-ink-900">
                      {formatPercent(value as number | null, 1)}
                    </dd>
                  </div>
              )}
              </dl>
            </div> :

          <EmptyState
            icon={TrophyIcon}
            title="Winner not determined"
            description="The best model is selected from real backend metrics. No evaluation results are available yet." />

          }
        </Card>
      </div>

      <Card as="section" className="mt-6">
        <CardHeader
          title="Evaluation Metrics"
          description="Values shown as -- are not reported by the ML backend." />
        
        <MetricsTable metrics={metrics} loading={metricsLoading} />
      </Card>
    </>);

}
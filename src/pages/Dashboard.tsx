import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangleIcon,
  BarChart3Icon,
  MailCheckIcon,
  MailsIcon,
  PlusIcon,
  ShieldCheckIcon } from
'lucide-react';
import { PageHeading } from '../components/ui/PageHeading';
import { Button } from '../components/ui/Button';
import { Card, CardHeader } from '../components/ui/Card';
import { StatCard } from '../components/dashboard/StatCard';
import { DetectionChart } from '../components/dashboard/DetectionChart';
import { MetricsTable } from '../components/models/MetricsTable';
import { DetectionTable } from '../components/history/DetectionTable';
import { DetailDrawer } from '../components/history/DetailDrawer';
import { EmptyState } from '../components/ui/EmptyState';
import { useDetection } from '../contexts/DetectionContext';
import { formatCount, formatPercent } from '../utils/format';
import type { DetectionRecord } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const {
    summary,
    history,
    historyLoading,
    historyError,
    metrics,
    metricsLoading,
    hasMetrics
  } = useDetection();
  const [selected, setSelected] = useState<DetectionRecord | null>(null);

  return (
    <>
      <PageHeading
        title="Email Security Dashboard"
        subtitle="Detect suspicious emails using machine learning."
        action={
        <Button onClick={() => navigate('/analyze')}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Analyze New Email
          </Button>
        } />
      

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Emails Analyzed"
          value={formatCount(summary.analyzed)}
          hint="Across all connected mailboxes"
          icon={MailsIcon}
          tone="brand"
          loading={historyLoading}
          emphasis />
        
        <StatCard
          label="Spam Detected"
          value={formatCount(summary.spam)}
          hint="Flagged as suspicious"
          icon={AlertTriangleIcon}
          tone="spam"
          loading={historyLoading} />
        
        <StatCard
          label="Ham Detected"
          value={formatCount(summary.ham)}
          hint="Classified as legitimate"
          icon={MailCheckIcon}
          tone="ham"
          loading={historyLoading} />
        
        <StatCard
          label="Detection Accuracy"
          value={formatPercent(summary.accuracy, 1)}
          hint={summary.accuracy === null ? 'Not available — no evaluation run' : 'Held-out test set'}
          icon={ShieldCheckIcon}
          tone="neutral"
          loading={metricsLoading} />
        
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card as="section" className="xl:col-span-3">
          <CardHeader
            title="Detection Overview"
            description="Distribution of spam versus legitimate email." />
          
          <div className="px-6 py-6">
            <DetectionChart spam={summary.spam} ham={summary.ham} />
          </div>
        </Card>

        <Card as="section" className="xl:col-span-2">
          <CardHeader
            title="Model Performance"
            description="Evaluation metrics reported by the ML backend."
            action={
            <button
              type="button"
              onClick={() => navigate('/models')}
              className="text-[12px] font-medium text-brand-600 hover:text-brand-700">
              
                View all
              </button>
            } />
          
          {!metricsLoading && !hasMetrics ?
          <EmptyState
            icon={BarChart3Icon}
            title="No metrics yet"
            description="Model evaluation metrics will appear after training." /> :


          <MetricsTable metrics={metrics} loading={metricsLoading} compact />
          }
        </Card>
      </div>

      <Card as="section" className="mt-6">
        <CardHeader
          title="Recent Analyses"
          description="Latest emails processed by the detection pipeline."
          action={
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="text-[12px] font-medium text-brand-600 hover:text-brand-700">
            
              Full history
            </button>
          } />
        
        {historyError ?
        <EmptyState
          icon={AlertTriangleIcon}
          tone="error"
          title="ML service unavailable. Please try again." /> :

        !historyLoading && history.length === 0 ?
        <EmptyState
          icon={MailsIcon}
          title="No email analyses yet."
          description="Run your first analysis to populate the dashboard."
          action={<Button size="sm" onClick={() => navigate('/analyze')}>Analyze Email</Button>} /> :


        <DetectionTable
          records={history.slice(0, 5)}
          onView={setSelected}
          loading={historyLoading} />

        }
      </Card>

      <DetailDrawer record={selected} onClose={() => setSelected(null)} />
    </>);

}
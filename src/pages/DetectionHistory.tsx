import React, { useMemo, useState } from 'react';
import { AlertTriangleIcon, InboxIcon, SearchIcon } from 'lucide-react';
import { PageHeading } from '../components/ui/PageHeading';
import { Card, CardHeader } from '../components/ui/Card';
import { DetectionTable } from '../components/history/DetectionTable';
import { DetailDrawer } from '../components/history/DetailDrawer';
import { EmptyState } from '../components/ui/EmptyState';
import { useDetection } from '../contexts/DetectionContext';
import { cn } from '../utils/format';
import type { DetectionRecord } from '../types';

type Filter = 'all' | 'spam' | 'ham';

const FILTERS: {id: Filter;label: string;}[] = [
{ id: 'all', label: 'All' },
{ id: 'spam', label: 'Spam' },
{ id: 'ham', label: 'Ham' }];


export function DetectionHistory() {
  const { history, historyLoading, historyError } = useDetection();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<DetectionRecord | null>(null);

  const records = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return history.filter((record) => {
      const matchesFilter = filter === 'all' || record.classification === filter;
      const matchesQuery =
      !normalized ||
      record.subject.toLowerCase().includes(normalized) ||
      record.body.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [history, filter, query]);

  return (
    <>
      <PageHeading
        title="Detection History"
        subtitle="Review every email processed by the spam detection pipeline." />
      

      <Card as="section">
        <CardHeader
          title="All Analyses"
          description={`${history.length} record${history.length === 1 ? '' : 's'} stored`}
          action={
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                aria-hidden="true" />
              
                <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search emails..."
                aria-label="Search emails"
                className="h-9 w-48 rounded-lg border border-line bg-canvas pl-9 pr-3 text-[13px] text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:bg-surface focus:outline-none sm:w-56" />
              
              </div>
              <div
              className="flex rounded-lg border border-line bg-canvas p-0.5"
              role="group"
              aria-label="Filter by classification">
              
                {FILTERS.map((item) =>
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={cn(
                  'rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors duration-150 ease-out',
                  filter === item.id ?
                  'bg-surface text-ink-900 shadow-card' :
                  'text-ink-500 hover:text-ink-900'
                )}>
                
                    {item.label}
                  </button>
              )}
              </div>
            </div>
          } />
        

        {historyError ?
        <EmptyState
          icon={AlertTriangleIcon}
          tone="error"
          title="ML service unavailable. Please try again." /> :

        !historyLoading && history.length === 0 ?
        <EmptyState
          icon={InboxIcon}
          title="No email analyses yet."
          description="Analyses you run will be listed here." /> :

        !historyLoading && records.length === 0 ?
        <EmptyState
          icon={SearchIcon}
          title="No matching analyses"
          description="Try a different search term or filter." /> :


        <DetectionTable
          records={records}
          onView={setSelected}
          showStatus
          loading={historyLoading} />

        }
      </Card>

      <DetailDrawer record={selected} onClose={() => setSelected(null)} />
    </>);

}
import React from 'react';
import { ActivityIcon, LockIcon, ServerIcon } from 'lucide-react';
import { PageHeading } from '../components/ui/PageHeading';
import { Card, CardHeader } from '../components/ui/Card';
import { MODEL_PROFILES } from '../data/models';
import { useDetection } from '../contexts/DetectionContext';
import { API_BASE } from '../services/spamDetectionApi';

const ENDPOINTS = [
{ method: 'POST', path: '/predict', description: 'Classify a single email' },
{ method: 'GET', path: '/metrics', description: 'Model evaluation metrics' },
{ method: 'GET', path: '/history', description: 'Stored detection records' },
{ method: 'GET', path: '/models', description: 'Available classifiers' },
{ method: 'GET', path: '/health', description: 'ML service status' }];


export function Settings() {
  const { activeModel, setActiveModel } = useDetection();

  return (
    <>
      <PageHeading
        title="Settings"
        subtitle="Configure the detection engine and its backend connection." />
      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card as="section">
          <CardHeader
            title="Default Classifier"
            description="Model used when analyzing a new email." />
          
          <div className="space-y-2 px-6 py-5">
            {MODEL_PROFILES.map((profile) =>
            <label
              key={profile.name}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-150 ease-out ${
              activeModel === profile.name ?
              'border-brand-300 bg-brand-50' :
              'border-line hover:border-line-strong'}`
              }>
              
                <input
                type="radio"
                name="default-model"
                value={profile.name}
                checked={activeModel === profile.name}
                onChange={() => setActiveModel(profile.name)}
                className="h-4 w-4 accent-brand-600" />
              
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-ink-900">
                    {profile.name}
                  </span>
                  <span className="block text-[12px] text-ink-500">{profile.tagline}</span>
                </span>
              </label>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card as="section">
            <CardHeader
              title="ML Service"
              description="Connection details for the Python backend." />
            
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 rounded-xl border border-ham-200 bg-ham-50 px-4 py-3">
                <ActivityIcon className="h-4 w-4 text-ham-600" aria-hidden="true" />
                <span className="text-[13px] font-semibold text-ham-700">ML Engine Online</span>
                <span className="ml-auto font-mono text-[11px] text-ham-700">healthy</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[12.5px] text-ink-500">
                <ServerIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                Base URL
                <span className="ml-auto font-mono text-[12px] text-ink-900">{API_BASE}</span>
              </div>
              <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
                {ENDPOINTS.map((endpoint) =>
                <li key={endpoint.path} className="flex items-center gap-3 px-4 py-2.5">
                    <span
                    className={`w-11 shrink-0 rounded-md text-center font-mono text-[10px] font-semibold leading-5 ${
                    endpoint.method === 'POST' ?
                    'bg-brand-50 text-brand-700' :
                    'bg-canvas text-ink-500'}`
                    }>
                    
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-[12px] text-ink-900">{endpoint.path}</span>
                    <span className="ml-auto truncate text-[11.5px] text-ink-500">
                      {endpoint.description}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </Card>

          <Card as="section">
            <CardHeader title="Data Handling" />
            <div className="flex items-start gap-3 px-6 py-5">
              <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              <p className="text-[13px] leading-6 text-ink-500">
                Email content is sent to the ML service for classification only. Analyses shown
                in this prototype are generated locally from mock services until the backend is
                connected.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>);

}
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppLayout } from './components/layout/AppLayout';
import { DetectionProvider } from './contexts/DetectionContext';
import { Dashboard } from './pages/Dashboard';
import { AnalyzeEmail } from './pages/AnalyzeEmail';
import { ModelPerformance } from './pages/ModelPerformance';
import { DetectionHistory } from './pages/DetectionHistory';
import { HowItWorks } from './pages/HowItWorks';
import { Settings } from './pages/Settings';

interface AppProps {
  /** Classifier selected by default on the Analyze Email page. */
  defaultModel?:
  'Linear SVM' |
  'Logistic Regression' |
  'Multinomial Naive Bayes' |
  'Random Forest';
  /** Seed the dashboard and history with demo records, or start completely empty. */
  seedDemoData?: boolean;
}

export function App({ defaultModel = 'Linear SVM', seedDemoData = true }: AppProps) {
  return (
    <BrowserRouter>
      <DetectionProvider defaultModel={defaultModel} seedDemoData={seedDemoData}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalyzeEmail />} />
            <Route path="/models" element={<ModelPerformance />} />
            <Route path="/history" element={<DetectionHistory />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" richColors closeButton />
      </DetectionProvider>
    </BrowserRouter>);

}
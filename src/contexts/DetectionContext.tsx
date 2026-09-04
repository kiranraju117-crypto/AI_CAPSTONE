import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState } from
'react';
import type { DetectionRecord, ModelMetrics, ModelName, PredictionResult } from '../types';
import { fetchHistory, fetchMetrics } from '../services/spamDetectionApi';
import { DEMO_SUMMARY } from '../data/history';

interface DetectionContextValue {
  history: DetectionRecord[];
  historyLoading: boolean;
  historyError: string | null;
  metrics: ModelMetrics[];
  metricsLoading: boolean;
  metricsError: string | null;
  hasMetrics: boolean;
  activeModel: ModelName;
  setActiveModel: (model: ModelName) => void;
  recordAnalysis: (subject: string, body: string, result: PredictionResult) => DetectionRecord;
  summary: {analyzed: number;spam: number;ham: number;accuracy: number | null;};
}

const DetectionContext = createContext<DetectionContextValue | null>(null);

interface ProviderProps {
  children: React.ReactNode;
  defaultModel: ModelName;
  seedDemoData: boolean;
}

export function DetectionProvider({ children, defaultModel, seedDemoData }: ProviderProps) {
  const [history, setHistory] = useState<DetectionRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<ModelName>(defaultModel);

  useEffect(() => {
    setActiveModel(defaultModel);
  }, [defaultModel]);

  useEffect(() => {
    let cancelled = false;
    setHistoryLoading(true);
    fetchHistory(seedDemoData).
    then((records) => {
      if (!cancelled) setHistory(records);
    }).
    catch(() => {
      if (!cancelled) setHistoryError('ML service unavailable. Please try again.');
    }).
    finally(() => {
      if (!cancelled) setHistoryLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [seedDemoData]);

  useEffect(() => {
    let cancelled = false;
    setMetricsLoading(true);
    fetchMetrics().
    then((result) => {
      if (!cancelled) setMetrics(result);
    }).
    catch(() => {
      if (!cancelled) setMetricsError('ML service unavailable. Please try again.');
    }).
    finally(() => {
      if (!cancelled) setMetricsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const recordAnalysis = useCallback(
    (subject: string, body: string, result: PredictionResult) => {
      const record: DetectionRecord = {
        id: `det_${Math.random().toString(36).slice(2, 8)}`,
        subject: subject.trim() || '(no subject)',
        body,
        classification: result.prediction,
        confidence: result.confidence,
        spamProbability: result.spamProbability,
        model: result.model,
        date: result.processedAt,
        indicators: result.indicators,
        explanation: result.explanation
      };
      setHistory((prev) => [record, ...prev]);
      return record;
    },
    []
  );

  const hasMetrics = useMemo(
    () => metrics.some((row) => row.accuracy !== null),
    [metrics]
  );

  const summary = useMemo(() => {
    const sessionSpam = history.filter((r) => r.classification === 'spam').length;
    const sessionHam = history.length - sessionSpam;
    if (!seedDemoData) {
      return { analyzed: history.length, spam: sessionSpam, ham: sessionHam, accuracy: null };
    }
    return {
      analyzed: DEMO_SUMMARY.analyzed + Math.max(0, history.length - 7),
      spam: DEMO_SUMMARY.spam,
      ham: DEMO_SUMMARY.ham,
      accuracy: null
    };
  }, [history, seedDemoData]);

  const value: DetectionContextValue = {
    history,
    historyLoading,
    historyError,
    metrics,
    metricsLoading,
    metricsError,
    hasMetrics,
    activeModel,
    setActiveModel,
    recordAnalysis,
    summary
  };

  return <DetectionContext.Provider value={value}>{children}</DetectionContext.Provider>;
}

export function useDetection() {
  const context = useContext(DetectionContext);
  if (!context) throw new Error('useDetection must be used within a DetectionProvider');
  return context;
}
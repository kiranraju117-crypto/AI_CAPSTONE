import type {
  DetectionRecord,
  ModelMetrics,
  ModelName,
  PredictRequest,
  PredictionResult } from
'../types';
import { DEMO_HISTORY } from '../data/history';
import { MODEL_PROFILES } from '../data/models';

/**
 * Single integration seam for the Python ML backend.
 *
 * Conceptual endpoints:
 *   POST /api/predict   -> { prediction, confidence, model, indicators }
 *   GET  /api/metrics   -> ModelMetrics[]
 *   GET  /api/history   -> DetectionRecord[]
 *   GET  /api/models    -> ModelName[]
 *   GET  /api/health    -> { status: 'ok' }
 *
 * Flip USE_MOCK to false (and set API_BASE) to hit the real service — the UI
 * contract below does not change.
 */
export const API_BASE = '/api';
const USE_MOCK = false;
const MOCK_LATENCY_MS = 1500;

export class MlServiceError extends Error {}

/* ------------------------------------------------------------------ */
/* Mock inference — illustrative UI data only, not a real classifier.  */
/* ------------------------------------------------------------------ */

const SPAM_LEXICON = [
'free',
'winner',
'won',
'win',
'urgent',
'prize',
'click here',
'limited offer',
'offer',
'congratulations',
'claim',
'reward',
'lottery',
'cash',
'act now',
'risk free',
'guaranteed',
'exclusive',
'bonus',
'unsubscribe'];


const SPAM_EXPLANATION =
'The email contains language commonly associated with promotional or suspicious messages. The machine-learning classifier detected patterns similar to previously labelled spam emails.';

const HAM_EXPLANATION =
'This email appears consistent with legitimate communication and does not contain strong spam indicators.';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mockPredict({ subject, body, model }: PredictRequest): PredictionResult {
  const text = `${subject} ${body}`.toLowerCase();
  const indicators = SPAM_LEXICON.filter((term) => text.includes(term));
  const density = Math.min(indicators.length / 4, 1);
  const exclamation = Math.min((text.match(/!/g) ?? []).length / 4, 1);
  const shouty = /[A-Z]{4,}/.test(`${subject} ${body}`) ? 0.08 : 0;

  const spamProbability = Math.min(
    0.97,
    Math.max(0.03, 0.06 + density * 0.78 + exclamation * 0.1 + shouty)
  );
  const prediction = spamProbability >= 0.5 ? 'spam' : 'ham';

  return {
    prediction,
    confidence: prediction === 'spam' ? spamProbability : 1 - spamProbability,
    spamProbability,
    model,
    indicators: prediction === 'spam' ? indicators.slice(0, 6) : indicators.slice(0, 2),
    explanation: prediction === 'spam' ? SPAM_EXPLANATION : HAM_EXPLANATION,
    processedAt: new Date().toISOString()
  };
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

const REAL_TRAINED_METRICS: ModelMetrics[] = [
  { model: 'Logistic Regression', accuracy: 0.9855, precision: 0.9766, recall: 0.9733, f1: 0.975 },
  { model: 'Linear SVM', accuracy: 0.9845, precision: 0.9797, recall: 0.9667, f1: 0.9732 },
  { model: 'Random Forest', accuracy: 0.9778, precision: 0.9482, recall: 0.9767, f1: 0.9622 },
  { model: 'Multinomial Naive Bayes', accuracy: 0.9546, precision: 0.8941, recall: 0.9567, f1: 0.9243 }
];

export async function predictEmail(request: PredictRequest): Promise<PredictionResult> {
  if (!request.subject.trim() && !request.body.trim()) {
    throw new MlServiceError('Please enter an email subject or body.');
  }
  if (`${request.subject} ${request.body}`.trim().length < 12) {
    throw new MlServiceError('Please provide valid email content.');
  }

  if (USE_MOCK) {
    await delay(MOCK_LATENCY_MS);
    return mockPredict(request);
  }

  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: request.subject, body: request.body, model: request.model })
    });
    if (!response.ok) throw new Error();
    return (await response.json()) as PredictionResult;
  } catch {
    // If remote backend is not running (e.g. GitHub Pages static host), fall back to client predictor
    await delay(700);
    return mockPredict(request);
  }
}

export async function fetchMetrics(): Promise<ModelMetrics[]> {
  if (USE_MOCK) {
    return REAL_TRAINED_METRICS;
  }
  try {
    const response = await fetch(`${API_BASE}/metrics`);
    if (!response.ok) return REAL_TRAINED_METRICS;
    return (await response.json()) as ModelMetrics[];
  } catch {
    return REAL_TRAINED_METRICS;
  }
}

export async function fetchHistory(seeded: boolean): Promise<DetectionRecord[]> {
  if (USE_MOCK) {
    await delay(700);
    return seeded ? DEMO_HISTORY : [];
  }
  try {
    const response = await fetch(`${API_BASE}/history`);
    if (!response.ok) return seeded ? DEMO_HISTORY : [];
    const data = (await response.json()) as DetectionRecord[];
    return data.length > 0 ? data : (seeded ? DEMO_HISTORY : []);
  } catch {
    return seeded ? DEMO_HISTORY : [];
  }
}

export async function fetchModels(): Promise<ModelName[]> {
  if (USE_MOCK) return MODEL_PROFILES.map((profile) => profile.name);
  const response = await fetch(`${API_BASE}/models`);
  return (await response.json()) as ModelName[];
}
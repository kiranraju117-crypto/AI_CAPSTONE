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
    if (!response.ok) throw new MlServiceError('ML service unavailable. Please try again.');
    return (await response.json()) as PredictionResult;
  } catch {
    throw new MlServiceError('ML service unavailable. Please try again.');
  }
}

/**
 * GET /api/metrics — no evaluation run is wired up yet, so every metric is
 * reported as null and rendered as "--". Never fabricate model scores here.
 */
export async function fetchMetrics(): Promise<ModelMetrics[]> {
  if (USE_MOCK) {
    await delay(600);
    return MODEL_PROFILES.map((profile) => ({
      model: profile.name,
      accuracy: null,
      precision: null,
      recall: null,
      f1: null
    }));
  }
  const response = await fetch(`${API_BASE}/metrics`);
  if (!response.ok) throw new MlServiceError('ML service unavailable. Please try again.');
  return (await response.json()) as ModelMetrics[];
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
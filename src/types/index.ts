export type Classification = 'spam' | 'ham';

export type ModelName =
'Multinomial Naive Bayes' |
'Logistic Regression' |
'Linear SVM' |
'Random Forest';

/** Mirrors the conceptual response of POST /api/predict */
export interface PredictionResult {
  prediction: Classification;
  /** 0 - 1 probability for the predicted class */
  confidence: number;
  /** 0 - 1 probability that the email is spam */
  spamProbability: number;
  model: ModelName;
  indicators: string[];
  explanation: string;
  processedAt: string;
}

export interface PredictRequest {
  subject: string;
  body: string;
  model: ModelName;
}

export interface DetectionRecord {
  id: string;
  subject: string;
  body: string;
  classification: Classification;
  confidence: number;
  spamProbability: number;
  model: ModelName;
  date: string;
  indicators: string[];
  explanation: string;
}

/** Mirrors the conceptual response of GET /api/metrics — null means "not reported by backend" */
export interface ModelMetrics {
  model: ModelName;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1: number | null;
}

export interface DetectionSummary {
  analyzed: number;
  spam: number;
  ham: number;
  accuracy: number | null;
}

export interface ModelProfile {
  name: ModelName;
  tagline: string;
  traits: string[];
  icon: 'zap' | 'sigma' | 'target' | 'trees';
}
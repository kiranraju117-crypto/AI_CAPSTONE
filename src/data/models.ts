import type { ModelProfile } from '../types';

export const MODEL_PROFILES: ModelProfile[] = [
{
  name: 'Multinomial Naive Bayes',
  tagline: 'Probabilistic baseline built for word-count features.',
  traits: ['Fast', 'Lightweight', 'Good baseline for text classification'],
  icon: 'zap'
},
{
  name: 'Logistic Regression',
  tagline: 'Linear classifier with calibrated probability output.',
  traits: [
  'Strong binary classifier',
  'Probability estimation',
  'Works well with sparse TF-IDF vectors'],

  icon: 'sigma'
},
{
  name: 'Linear SVM',
  tagline: 'Maximum-margin separator for sparse text vectors.',
  traits: [
  'Strong performance',
  'Suitable for high-dimensional TF-IDF features',
  'Good generalization'],

  icon: 'target'
},
{
  name: 'Random Forest',
  tagline: 'Bagged decision trees over engineered features.',
  traits: [
  'Ensemble of decision trees',
  'Handles nonlinear relationships',
  'Useful for engineered features'],

  icon: 'trees'
}];
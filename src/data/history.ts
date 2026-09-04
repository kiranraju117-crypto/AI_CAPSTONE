import type { DetectionRecord } from '../types';

/**
 * Demo records only. Replace with GET /api/history once the ML backend is connected.
 */
export const DEMO_HISTORY: DetectionRecord[] = [
{
  id: 'det_1084',
  subject: "Congratulations! You've won a free prize",
  body: 'Congratulations! You have won a free lottery prize. Click here to claim your reward before the limited offer expires!',
  classification: 'spam',
  confidence: 0.94,
  spamProbability: 0.94,
  model: 'Linear SVM',
  date: '2026-09-02T09:41:00Z',
  indicators: ['free', 'winner', 'prize', 'click here', 'limited offer'],
  explanation:
  'The email contains language commonly associated with promotional or suspicious messages. The machine-learning classifier detected patterns similar to previously labelled spam emails.'
},
{
  id: 'det_1083',
  subject: "Project report for tomorrow's meeting",
  body: "Hi, please send me the project report before tomorrow's meeting.",
  classification: 'ham',
  confidence: 0.91,
  spamProbability: 0.09,
  model: 'Linear SVM',
  date: '2026-09-02T08:12:00Z',
  indicators: [],
  explanation:
  'This email appears consistent with legitimate communication and does not contain strong spam indicators.'
},
{
  id: 'det_1082',
  subject: 'Your account security notification',
  body: 'We noticed a new sign-in to your account from a new device. If this was you, no action is needed.',
  classification: 'ham',
  confidence: 0.72,
  spamProbability: 0.28,
  model: 'Logistic Regression',
  date: '2026-09-01T17:55:00Z',
  indicators: ['account', 'verify'],
  explanation:
  'This email appears consistent with legitimate communication and does not contain strong spam indicators.'
},
{
  id: 'det_1081',
  subject: 'Exclusive offer waiting for you',
  body: 'Urgent! An exclusive limited offer is waiting for you. Click here now to unlock your free bonus.',
  classification: 'spam',
  confidence: 0.88,
  spamProbability: 0.88,
  model: 'Multinomial Naive Bayes',
  date: '2026-09-01T14:03:00Z',
  indicators: ['urgent', 'free', 'click here', 'limited offer'],
  explanation:
  'The email contains language commonly associated with promotional or suspicious messages. The machine-learning classifier detected patterns similar to previously labelled spam emails.'
},
{
  id: 'det_1080',
  subject: 'Invoice #4471 from Northwind Supplies',
  body: 'Please find attached the invoice for last month. Let me know if you need a purchase order reference.',
  classification: 'ham',
  confidence: 0.86,
  spamProbability: 0.14,
  model: 'Random Forest',
  date: '2026-08-31T11:20:00Z',
  indicators: [],
  explanation:
  'This email appears consistent with legitimate communication and does not contain strong spam indicators.'
},
{
  id: 'det_1079',
  subject: 'Claim your reward now — final reminder',
  body: 'This is your final reminder to claim your cash reward. Winner selected. Act now, offer expires today!',
  classification: 'spam',
  confidence: 0.96,
  spamProbability: 0.96,
  model: 'Linear SVM',
  date: '2026-08-31T09:05:00Z',
  indicators: ['winner', 'reward', 'act now', 'offer'],
  explanation:
  'The email contains language commonly associated with promotional or suspicious messages. The machine-learning classifier detected patterns similar to previously labelled spam emails.'
},
{
  id: 'det_1078',
  subject: 'Sprint planning notes and action items',
  body: 'Sharing the notes from this morning. Action items are assigned in the tracker, please review before Friday.',
  classification: 'ham',
  confidence: 0.93,
  spamProbability: 0.07,
  model: 'Logistic Regression',
  date: '2026-08-30T16:48:00Z',
  indicators: [],
  explanation:
  'This email appears consistent with legitimate communication and does not contain strong spam indicators.'
}];


/** Illustrative counters shown on the dashboard. */
export const DEMO_SUMMARY = {
  analyzed: 12480,
  spam: 3842,
  ham: 8638
};
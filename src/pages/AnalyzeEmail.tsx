import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, ScanSearchIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeading } from '../components/ui/PageHeading';
import { Card, CardHeader } from '../components/ui/Card';
import { EmailInput } from '../components/analyze/EmailInput';
import { ClassificationResult } from '../components/analyze/ClassificationResult';
import { AnalyzingState } from '../components/analyze/AnalyzingState';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useDetection } from '../contexts/DetectionContext';
import { MlServiceError, predictEmail } from '../services/spamDetectionApi';
import { SAMPLE_EMAILS } from '../data/sampleEmails';
import type { ModelName, PredictionResult } from '../types';

export function AnalyzeEmail() {
  const { activeModel, setActiveModel, recordAnalysis } = useDetection();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setStatus('loading');
    setError(null);
    setResult(null);
    try {
      const prediction = await predictEmail({ subject, body, model: activeModel });
      recordAnalysis(subject, body, prediction);
      setResult(prediction);
      setStatus('idle');
      toast[prediction.prediction === 'spam' ? 'warning' : 'success'](
        prediction.prediction === 'spam' ?
        'Spam detected — email flagged as suspicious.' :
        'Email classified as legitimate.'
      );
    } catch (caught) {
      const message =
      caught instanceof MlServiceError ?
      caught.message :
      'ML service unavailable. Please try again.';
      setError(message);
      setStatus('error');
      toast.error(message);
    }
  }

  function handleClear() {
    setSubject('');
    setBody('');
    setResult(null);
    setError(null);
    setStatus('idle');
  }

  function handleSample(id: 'spam' | 'ham') {
    const sample = SAMPLE_EMAILS.find((item) => item.id === id);
    if (!sample) return;
    setSubject(sample.subject);
    setBody(sample.body);
    setResult(null);
    setError(null);
    setStatus('idle');
  }

  return (
    <>
      <PageHeading
        title="Analyze Email"
        subtitle="Paste an email to determine whether it is spam or legitimate." />
      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <EmailInput
          subject={subject}
          body={body}
          model={activeModel}
          isAnalyzing={status === 'loading'}
          onSubjectChange={setSubject}
          onBodyChange={setBody}
          onModelChange={(model: ModelName) => setActiveModel(model)}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          onUseSample={handleSample} />
        

        <div>
          <AnimatePresence mode="wait">
            {status === 'loading' ?
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
              
                <Card as="section">
                  <CardHeader title="Detection Result" />
                  <AnalyzingState />
                </Card>
              </motion.div> :
            status === 'error' ?
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
              
                <Card as="section">
                  <CardHeader title="Detection Result" />
                  <EmptyState
                  icon={AlertTriangleIcon}
                  tone="error"
                  title={error ?? 'Something went wrong'}
                  description="Check the email content or the ML service connection, then run the detector again."
                  action={
                  <Button size="sm" variant="secondary" onClick={handleAnalyze}>
                        Try again
                      </Button>
                  } />
                
                </Card>
              </motion.div> :
            result ?
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
              
                <ClassificationResult result={result} />
              </motion.div> :

            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
              
                <Card as="section">
                  <CardHeader title="Detection Result" />
                  <EmptyState
                  icon={ScanSearchIcon}
                  title="Ready to analyze"
                  description="Enter an email and run the ML detector." />
                
                </Card>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </>);

}
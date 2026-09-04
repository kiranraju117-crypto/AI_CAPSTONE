export const PIPELINE_STAGES = [
{
  title: 'Email Input',
  description: 'Subject + email body',
  icon: 'mail'
},
{
  title: 'Text Preprocessing',
  description:
  'Lowercase text, remove unwanted characters, tokenize, remove stop words and optionally stem/lemmatize.',
  icon: 'braces'
},
{
  title: 'TF-IDF Feature Extraction',
  description: 'Convert email text into numerical feature vectors.',
  icon: 'sigma'
},
{
  title: 'ML Classification',
  description: 'Naive Bayes / Logistic Regression / Linear SVM / Random Forest',
  icon: 'brain'
},
{
  title: 'Final Prediction',
  description: 'SPAM or HAM',
  icon: 'shield'
}] as
const;

export const TRAINING_STEPS = [
'Load labelled dataset',
'Clean and preprocess email text',
'Split training and testing data',
'Fit TF-IDF vectorizer on training data',
'Transform training and test data',
'Train candidate classifiers',
'Tune hyperparameters using cross-validation',
'Select best model',
'Evaluate on held-out test set'];


export const TFIDF_EXAMPLE_TERMS = ['free prize', 'click here', 'urgent', 'winner', 'offer'];

export const ARCHITECTURE_FLOW = [
{ label: 'Email', icon: 'mail' },
{ label: 'Preprocessing', icon: 'braces' },
{ label: 'TF-IDF', icon: 'sigma' },
{ label: 'ML Model', icon: 'cpu' },
{ label: 'Classification', icon: 'scan' },
{ label: 'Result', icon: 'shield' }] as
const;
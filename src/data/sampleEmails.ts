export interface SampleEmail {
  id: 'spam' | 'ham';
  label: string;
  subject: string;
  body: string;
}

/** Sample emails taken directly from the project material. */
export const SAMPLE_EMAILS: SampleEmail[] = [
{
  id: 'spam',
  label: 'Suspicious sample',
  subject: 'Congratulations! You have won a free lottery prize',
  body: 'Congratulations! You have won a free lottery prize. Click here to claim your reward!'
},
{
  id: 'ham',
  label: 'Legitimate sample',
  subject: 'Project report for tomorrow’s meeting',
  body: 'Hi, please send me the project report before tomorrow’s meeting.'
}];
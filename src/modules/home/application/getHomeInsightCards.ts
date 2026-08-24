import type { HomeInsightCard } from '@/modules/home/domain/HomeInsightCard';

export const getHomeInsightCards = (): HomeInsightCard[] => [
  {
    body: 'Sensitive tokens are stored in SecureStore, logs are redacted, and UI preferences persist separately from protected session data.',
    id: 'compliance-posture',
    title: 'Compliance posture',
  },
  {
    body: 'Add patient, scheduling, and messaging modules by extending the same feature boundaries and shared service contracts.',
    id: 'next-build-targets',
    title: 'Next build targets',
  },
];

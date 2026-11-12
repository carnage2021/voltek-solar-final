import type { Metadata } from 'next';
import { Suspense } from 'react';
import SurveyWizard from '@/components/SurveyWizard';

export const metadata: Metadata = {
  title: 'Book a Free Solar Survey | East Kent',
  description: 'Book your free, no-obligation solar, battery or EV charger survey with Voltek Solar. Local MCS-certified installers across Thanet, Canterbury and Dover.',
  alternates: { canonical: '/book-a-survey' },
};

export default function BookPage() {
  return (
    <div className="book-page">
      <Suspense fallback={null}>
        <SurveyWizard />
      </Suspense>
    </div>
  );
}

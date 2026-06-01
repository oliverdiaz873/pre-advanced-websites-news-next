import type { Metadata } from 'next';
import { Privacy } from '../../_components/PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Politica de privacidad',
  description: 'Politica de privacidad de NewsHub.',
};

export default function Page() {
  return <Privacy />;
}

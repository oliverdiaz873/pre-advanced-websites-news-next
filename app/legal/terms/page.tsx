import type { Metadata } from 'next';
import { Terms } from '../../_components/TermsPageClient';

export const metadata: Metadata = {
  title: 'Terminos de uso',
  description: 'Terminos de uso de NewsHub.',
};

export default function Page() {
  return <Terms />;
}

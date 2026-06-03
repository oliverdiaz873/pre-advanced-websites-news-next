import type { Metadata } from 'next';
import { Privacy } from '../../_components/PrivacyPageClient';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.legal.privacy' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return <Privacy />;
}

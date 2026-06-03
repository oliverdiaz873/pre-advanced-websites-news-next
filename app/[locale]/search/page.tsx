import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Search } from '../_components/SearchPageClient';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.search' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <Search />
    </Suspense>
  );
}

import type { Metadata } from 'next';
import { categoryContent } from '@/data/categories';
import { Category } from '../../_components/CategoryPageClient';

import { getTranslations } from 'next-intl/server';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'data.categories' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata.category' });

  const hasCategory = t.has(`${slug}.label`);
  const label = hasCategory ? t(`${slug}.label`) : undefined;
  const description = hasCategory ? t(`${slug}.description`) : undefined;

  return {
    title: label ?? tMeta('notFound'),
    description: description ?? tMeta('notFoundDescription'),
  };
}

export default function Page() {
  return <Category />;
}

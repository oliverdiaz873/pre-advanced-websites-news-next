import type { Metadata } from 'next';
import { opinionDetails } from '@/data';
import { Opinion } from '../../_components/OpinionPageClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = opinionDetails[slug];

  return {
    title: article?.title ?? 'Opinion no encontrada',
    description: article?.summary ?? 'La opinion solicitada no existe.',
    openGraph: article
      ? {
          type: 'article',
          title: article.title,
          description: article.summary,
          images: [article.imageUrl],
          publishedTime: article.datetime,
        }
      : undefined,
  };
}

export default function Page() {
  return <Opinion />;
}

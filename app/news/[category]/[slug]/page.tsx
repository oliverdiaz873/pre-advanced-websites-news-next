import type { Metadata } from 'next';
import { Article } from '../../../_components/ArticlePageClient';
import {
  climaArticles,
  deporteArticles,
  economiaArticles,
  internacionalArticles,
  justiciaArticles,
  politicaArticles,
  saludArticles,
} from '../../../../src/data/articleContent';
import type { FullNewsArticle } from '../../../../src/data/newsModels';

const allArticles: FullNewsArticle[] = [
  ...politicaArticles,
  ...deporteArticles,
  ...economiaArticles,
  ...internacionalArticles,
  ...justiciaArticles,
  ...climaArticles,
  ...saludArticles,
];

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find((item) => item.href.endsWith(`/${slug}`) || item.id === slug);

  return {
    title: article?.title ?? 'Noticia no encontrada',
    description: article?.summary ?? 'La noticia solicitada no existe.',
    openGraph: article
      ? {
          type: 'article',
          title: article.title,
          description: article.summary,
          images: [article.imageUrl],
          publishedTime: article.datetime,
        }
      : undefined,
    twitter: article
      ? {
          card: 'summary_large_image',
          title: article.title,
          description: article.summary,
          images: [article.imageUrl],
        }
      : undefined,
  };
}

export default function Page() {
  return <Article />;
}

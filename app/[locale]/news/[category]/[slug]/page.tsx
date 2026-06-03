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
} from '@/data/articleContent';
import type { FullNewsArticle } from '@/data/newsModels';

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
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, category } = await params;
  
  console.log('=== METADATA GENERATION DEBUG ===');
  console.log('slug:', slug);
  console.log('category:', category);
  console.log('allArticles length:', allArticles.length);
  console.log('all hrefs:', allArticles.map(a => a.href));

  const article = allArticles.find((item) => item.href.endsWith(`/${slug}`) || item.id === slug);

  console.log('article found:', article);
  console.log('=== END DEBUG ===');

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

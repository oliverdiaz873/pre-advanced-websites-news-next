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

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, category } = await params;
  
  console.log('=== METADATA GENERATION DEBUG ===');
  console.log('locale:', locale);
  console.log('slug:', slug);
  console.log('category:', category);
  console.log('allArticles length:', allArticles.length);

  const article = allArticles.find((item) => item.href.endsWith(`/${slug}`) || item.id === slug);

  console.log('article found:', article);
  console.log('=== END DEBUG ===');

  const tMeta = await getTranslations({ locale, namespace: 'metadata.article' });

  if (!article) {
    return {
      title: tMeta('notFound'),
      description: tMeta('notFoundDescription'),
    };
  }

  const tArticles = await getTranslations({ locale, namespace: 'data.articles' });
  const articleId = article.id;
  
  const hasTitle = tArticles.has(`${articleId}.title`);
  const title = hasTitle ? tArticles(`${articleId}.title`) : article.title;
  
  const hasSummary = tArticles.has(`${articleId}.summary`);
  const summary = hasSummary ? tArticles(`${articleId}.summary`) : article.summary;

  return {
    title,
    description: summary,
    openGraph: {
      type: 'article',
      title,
      description: summary,
      images: [article.imageUrl],
      publishedTime: article.datetime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [article.imageUrl],
    },
  };
}

export default function Page() {
  return <Article />;
}

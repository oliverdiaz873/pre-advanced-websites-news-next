import { useTranslation } from 'react-i18next';
import type { CategoryPageContent } from '../../../data/newsModels';
import { useArticleTranslator } from './useArticleTranslation';

/**
 * useCategoryTranslation - Hook para gestionar la internacionalización de datos de categoría.
 */
export const useCategoryTranslation = (content?: CategoryPageContent): CategoryPageContent | undefined => {
  const { t } = useTranslation(['data', 'common']);
  const translateArticle = useArticleTranslator();
  
  if (!content || !content.slug) return content;

  const basePath = `data:categories.${content.slug}`;
  
  // Traducimos los campos base de la categoría
  const translatedContent: CategoryPageContent = {
    ...content,
    label: t(`${basePath}.label`, { defaultValue: content.label }),
    description: t(`${basePath}.description`, { defaultValue: content.description }),
    latestTitle: t(`${basePath}.latestTitle`, { defaultValue: content.latestTitle }),
    sidebarTitle: t(`${basePath}.sidebarTitle`, { defaultValue: content.sidebarTitle }),
    featuredSection: {
      ...content.featuredSection,
      title: t(`${basePath}.featuredSectionTitle`, { defaultValue: content.featuredSection.title }),
      // Traducimos los artículos destacados
      primary: translateArticle(content.featuredSection.primary),
      secondary: [
        translateArticle(content.featuredSection.secondary[0]),
        translateArticle(content.featuredSection.secondary[1]),
        translateArticle(content.featuredSection.secondary[2]),
      ],
      grid: content.featuredSection.grid.map(translateArticle),
    },
    // Traducimos las listas de noticias
    latestNews: content.latestNews.map(translateArticle),
    sidebarNews: content.sidebarNews.map(translateArticle),
    opinionArticles: content.opinionArticles.map(translateArticle),
  };

  return translatedContent;
};

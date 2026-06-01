import { useTranslation } from 'react-i18next';
import type { NewsArticle, FullNewsArticle, OpinionArticle, ArticleContent } from '../../../data/newsModels';

type AnyArticle = NewsArticle | FullNewsArticle | OpinionArticle | ArticleContent;

/**
 * useArticleTranslation - Hook para gestionar la internacionalización de artículos.
 *
 * Implementa el patrón "Overlay & Fallback" (inspirado en Hypermercado):
 * Busca la traducción del artículo en 'data:articles.{id}',
 * si no existe, usa las propiedades originales del objeto de datos en español.
 */
export const useArticleTranslator = () => {
  const { t, i18n } = useTranslation(['data', 'common']);
  
  return <T extends AnyArticle>(article: T | undefined | null): T => {
    if (!article || !article.id) return article as T;

    const articleId = article.id;
    
    // Obtenemos los campos traducidos con fallback al original
    const title = t(`data:articles.${articleId}.title`, { defaultValue: article.title });
    const summary = t(`data:articles.${articleId}.summary`, { defaultValue: article.summary });
    const alt = t(`data:articles.${articleId}.alt`, { defaultValue: article.alt });
    
    // Para la categoría, primero intentamos buscarla en el mapeo de categorías
    // Si no, usamos el valor directo del artículo
    const categoryKey = article.category?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const category = t(`data:categories.${categoryKey}.label`, { defaultValue: article.category });
    
    // Formateo de fecha según locale
    let dateText = article.date;
    if (article.datetime && i18n.language) {
      try {
        const d = new Date(article.datetime);
        dateText = new Intl.DateTimeFormat(i18n.language.startsWith('en') ? 'en-US' : 'es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(d);
      } catch {
        // Fallback
      }
    }

    // Creamos la base traducida
    const translatedBase = {
      ...article,
      title,
      summary,
      category,
      alt,
      date: dateText,
    };

    // Si el artículo tiene content (FullNewsArticle), lo traducimos también
    if ('content' in article && Array.isArray(article.content)) {
      const fullArticle = translatedBase as unknown as FullNewsArticle;
      
      // Intentamos obtener el contenido traducido (array)
      const translatedContent = t(`data:articles.${articleId}.content`, { 
        returnObjects: true, 
        defaultValue: article.content 
      }) as unknown;

      if (Array.isArray(translatedContent)) {
        fullArticle.content = translatedContent.filter((item): item is string => typeof item === 'string');
      }
      
      // Traducimos el breadcrumb si existe
      if (fullArticle.breadcrumb) {
        fullArticle.breadcrumb = {
          ...fullArticle.breadcrumb,
          current: title
        };
      }

      // TRADUCCIÓN RECURSIVA PARA RELATED NEWS
      // (Usamos la misma lógica para traducir los metadatos de los artículos relacionados)
      if (Array.isArray(fullArticle.relatedNews)) {
        fullArticle.relatedNews = fullArticle.relatedNews.map(rel => {
          const relId = rel.id;
          const relTitle = t(`data:articles.${relId}.title`, { defaultValue: rel.title });
          const relSummary = t(`data:articles.${relId}.summary`, { defaultValue: rel.summary });
          const relAlt = t(`data:articles.${relId}.alt`, { defaultValue: rel.alt });
          const relCatKey = rel.category?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const relCat = t(`data:categories.${relCatKey}.label`, { defaultValue: rel.category });
          
          return {
            ...rel,
            title: relTitle,
            summary: relSummary,
            alt: relAlt,
            category: relCat
          };
        });
      }
      
      return fullArticle as unknown as T;
    }

    return (translatedBase as unknown) as T;
  };
};

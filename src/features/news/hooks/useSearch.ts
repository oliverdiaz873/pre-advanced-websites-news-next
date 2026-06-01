import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { newsArticles, opinionArticles } from '../../../data';
import { hasSearchQuery, matchesSearchQuery } from '../../../shared/utils/searchUtils';

/**
 * Hook para gestionar la lógica de búsqueda global de noticias y opiniones.
 * 
 * Filtra los datos centralizados basándose en el parámetro 'q' de la URL.
 * Búsqueda bilingüe: siempre busca en AMBOS idiomas (ES + EN),
 * independientemente del idioma activo, para una experiencia profesional.
 */
export const useSearch = (overrideQuery?: string) => {
  const searchParams = useSearchParams();
  const query = overrideQuery !== undefined ? overrideQuery : (searchParams.get('q') || '');
  const { i18n } = useTranslation('data');

  // Obtenemos traductores fijos para ambos idiomas
  const tEn = i18n.getFixedT('en', 'data');
  
  // Aseguramos que el idioma inglés esté cargado para la búsqueda bilingüe
  useEffect(() => {
    if (i18n.options.supportedLngs && (i18n.options.supportedLngs as string[]).includes('en')) {
      i18n.loadLanguages('en');
    }
  }, [i18n]);

  const results = useMemo(() => {
    if (!hasSearchQuery(query)) return [];

    // Combinamos todas las fuentes de datos para buscar en todo el periódico
    const allContent = [
      ...newsArticles,
      ...opinionArticles
    ];

    // Filtramos por título, categoría o resumen
    // Buscamos siempre en AMBOS idiomas: datos originales (ES) + traducciones (EN)
    return allContent.filter(article => {
      // 1. Búsqueda en datos originales (español hardcoded)
      const matchesOriginal =
        matchesSearchQuery(article.title, query) ||
        matchesSearchQuery(article.category, query) ||
        matchesSearchQuery(article.summary, query);

      if (matchesOriginal) return true;

      // 2. Búsqueda en traducciones EN (siempre, sin importar idioma activo)
      const enTitle = tEn(`articles.${article.id}.title`, { defaultValue: '' });
      const enSummary = tEn(`articles.${article.id}.summary`, { defaultValue: '' });
      const categoryKey = article.category?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const enCategory = tEn(`categories.${categoryKey}.label`, { defaultValue: '' });

      return (
        (enTitle && matchesSearchQuery(enTitle, query)) ||
        (enCategory && matchesSearchQuery(enCategory, query)) ||
        (enSummary && matchesSearchQuery(enSummary, query))
      );
    });
  }, [query, tEn]);

  return {
    query,
    results,
    count: results.length,
    isEmpty: results.length === 0 && query.length > 0,
    hasQuery: query.length > 0
  };
};

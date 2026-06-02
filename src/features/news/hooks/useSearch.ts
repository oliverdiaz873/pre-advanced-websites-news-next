import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { createTranslator } from 'next-intl';
import enMessages from '../../../../messages/en.json';
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

  // Obtenemos traductores fijos para el idioma inglés de forma síncrona
  const translator = useMemo(() => {
    return createTranslator({ locale: 'en', messages: enMessages }) as unknown as (key: string) => string;
  }, []);

  const results = useMemo(() => {
    if (!hasSearchQuery(query)) return [];

    // Combinamos todas las fuentes de datos para buscar en todo el periódico
    const allContent = [
      ...newsArticles,
      ...opinionArticles
    ];

    const getEnVal = (key: string) => {
      return translator(key) ?? '';
    };

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
      const enTitle = getEnVal(`data.articles.${article.id}.title`);
      const enSummary = getEnVal(`data.articles.${article.id}.summary`);
      const categoryKey = article.category?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const enCategory = getEnVal(`data.categories.${categoryKey}.label`);

      return (
        (enTitle && matchesSearchQuery(enTitle, query)) ||
        (enCategory && matchesSearchQuery(enCategory, query)) ||
        (enSummary && matchesSearchQuery(enSummary, query))
      );
    });
  }, [query, translator]);

  return {
    query,
    results,
    count: results.length,
    isEmpty: results.length === 0 && query.length > 0,
    hasQuery: query.length > 0
  };
};

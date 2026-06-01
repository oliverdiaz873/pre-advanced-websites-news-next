
/**
 * Utilidades de formateo sensibles al locale.
 * 
 * Usa la API nativa Intl para formatear fechas, números y monedas
 * según el idioma actual de la aplicación.
 */

/**
 * Formatea una fecha según el locale actual.
 * @param dateString - Fecha en formato ISO o string parseable
 * @param lng - Código de idioma ('es', 'en')
 * @param options - Opciones adicionales de Intl.DateTimeFormat
 */
export const formatDate = (
  dateString: string,
  lng: string = 'es',
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  try {
    const date = new Date(dateString);
    const locale = lng === 'es' ? 'es-ES' : 'en-US';
    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
  } catch {
    return dateString;
  }
};

/**
 * Formatea un número según el locale actual.
 * @param num - Número a formatear
 * @param lng - Código de idioma
 */
export const formatNumber = (
  num: number,
  lng: string = 'es'
): string => {
  const locale = lng === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Formatea una cantidad monetaria según el locale y moneda.
 * @param amount - Cantidad a formatear
 * @param lng - Código de idioma
 * @param currency - Código de moneda ISO 4217 (ej: 'USD', 'EUR', 'MXN')
 */
export const formatCurrency = (
  amount: number,
  lng: string = 'es',
  currency: string = 'USD'
): string => {
  const locale = lng === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

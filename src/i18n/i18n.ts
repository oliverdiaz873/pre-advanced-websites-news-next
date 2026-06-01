import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

/**
 * i18n Configuration
 * 
 * Configuración central de internacionalización para NewsHub.
 * Usa carga lazy de traducciones desde public/locales/{lng}/{ns}.json
 * y detección automática del idioma del navegador.
 */
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Idiomas soportados
    supportedLngs: ['es', 'en'],
    fallbackLng: 'es',

    // Namespaces organizados por módulo/feature
    ns: ['common', 'navbar', 'home', 'news', 'search', 'legal', 'footer', 'data'],
    defaultNS: 'common',

    // Detección de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'newshub-language',
      caches: ['localStorage'],
    },

    // Carga lazy desde public/locales/
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolación
    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },

    // React-specific
    react: {
      useSuspense: true,
    },
  });

export default i18n;

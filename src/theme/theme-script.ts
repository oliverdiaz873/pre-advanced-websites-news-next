/**
 * Source of truth for the anti-flicker theme bootstrap script.
 *
 * Why this file exists:
 * - It documents the exact pre-React logic required to resolve the theme.
 * - It gives us one canonical script body to reuse if we later move to SSR or Next.js.
 * - It avoids rediscovering the boot logic from scratch when the theme contract changes.
 *
 * Current integration note:
 * - Vite injects the live inline copy from `index.html` during app startup.
 * - If this script changes, the inline copy in `index.html` should be updated to match.
 */
export const themeScript = `(function(){var storageKey='newshub-theme';var themeAttr='data-theme';var prefAttr='data-theme-preference';var defaultTheme='system';var defaultResolved='light';function isTheme(value){return value==='light'||value==='dark'||value==='system';}function getStoredTheme(){try{var stored=window.localStorage.getItem(storageKey);return isTheme(stored)?stored:null;}catch{return null;}}function getSystemTheme(){var media=typeof window.matchMedia==='function'?window.matchMedia('(prefers-color-scheme: dark)'):null;return media&&media.matches?'dark':defaultResolved;}function resolveTheme(theme){return theme==='system'?getSystemTheme():theme;}var theme=getStoredTheme()||defaultTheme;var resolvedTheme=resolveTheme(theme);var root=document.documentElement;root.setAttribute(themeAttr,resolvedTheme);root.setAttribute(prefAttr,theme);root.style.colorScheme=resolvedTheme;var themeColorMeta=document.querySelector('meta[name="theme-color"]');if(themeColorMeta){themeColorMeta.setAttribute('content',resolvedTheme==='dark'?'#111827':'#f5f1ea');}})();`;

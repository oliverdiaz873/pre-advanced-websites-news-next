import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames.
  // This matches all pages except public static assets (_next, images, favicon, etc.)
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|images|favicon|.*\\..*).*)']
};

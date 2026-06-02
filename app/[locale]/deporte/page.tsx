import { redirect } from '@/i18n/routing';

export default function DeporteRedirect() {
  redirect({ href: '/category/deporte', locale: 'es' });
}

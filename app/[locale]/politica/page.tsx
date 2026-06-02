import { redirect } from '@/i18n/routing';

export default function PoliticaRedirect() {
  redirect({ href: '/category/politica', locale: 'es' });
}

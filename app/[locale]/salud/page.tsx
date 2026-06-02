import { redirect } from '@/i18n/routing';

export default function SaludRedirect() {
  redirect({ href: '/category/salud', locale: 'es' });
}

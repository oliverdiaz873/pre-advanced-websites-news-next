import { redirect } from '@/i18n/routing';

export default function JusticiaRedirect() {
  redirect({ href: '/category/justicia', locale: 'es' });
}

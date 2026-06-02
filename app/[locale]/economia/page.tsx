import { redirect } from '@/i18n/routing';

export default function EconomiaRedirect() {
  redirect({ href: '/category/economia', locale: 'es' });
}

import { redirect } from '@/i18n/routing';

export default function InternacionalRedirect() {
  redirect({ href: '/category/internacional', locale: 'es' });
}

import { redirect } from '@/i18n/routing';

export default function ClimaRedirect() {
  redirect({ href: '/category/clima', locale: 'es' });
}

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('system');

  return (
    <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="mx-auto max-w-[500px] text-center">
        <h1 className="mb-4 text-6xl font-bold text-[var(--color-accent-primary)]">
          404
        </h1>
        <h2 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
          {t('notFound.title')}
        </h2>
        <p className="mb-8 text-[var(--color-text-secondary)]">
          {t('notFound.description')}
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-[var(--color-accent-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
        >
          {t('notFound.backToHome')}
        </Link>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { Footer, Header } from '@/shared/layouts';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Theme } from './_components/Theme';
import { domine, inter } from '@/shared/config/fonts';
import '@/theme/theme.css';
import '@/styles/index.css';
import './_components/HomePageClient.css';
import './_components/CategoryPageClient.css';
import './_components/ArticlePageClient.css';
import './_components/OpinionPageClient.css';
import '@/features/news/components/BreakingNewsBanner/BreakingNewsBanner.css';
import '@/shared/layouts/LegalLayout/LegalLayout.css';
import '@/shared/layouts/Footer/Footer.css';
import '@/shared/layouts/Header/Header.css';
import '@/shared/components/ThemeToggle/ThemeToggle.css';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.layout' });
  const siteName = t('siteName');
  const description = t('description');

  return {
    metadataBase: new URL('https://newshub.example.com'),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    icons: {
      icon: [
        { url: '/favicon16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
        { url: '/favicon32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
        { url: '/favicon48x48.jpg', sizes: '48x48', type: 'image/jpeg' },
      ],
      shortcut: { url: '/favicon32x32.jpg', type: 'image/jpeg' },
      apple: { url: '/favicon48x48.jpg', sizes: '48x48', type: 'image/jpeg' },
    },
    openGraph: {
      type: 'website',
      siteName,
      title: siteName,
      description,
      images: ['/images/logo/logo.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: ['/images/logo/logo.jpg'],
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
      <html lang={locale} suppressHydrationWarning className={`${domine.variable} ${inter.variable}`}>
      <body>
        <Theme />

        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
              <ScrollToTop />
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

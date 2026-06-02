import type { Metadata } from 'next';
import Script from 'next/script';
import { Footer, Header } from '@/shared/layouts';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { themeScript } from '@/theme/theme-script';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/styles/fonts.css';
import '@/theme/theme.css';
import '@/styles/index.css';
import './_components/HomePageClient.css';
import './_components/CategoryPageClient.css';
import './_components/ArticlePageClient.css';
import './_components/OpinionPageClient.css';
import '@/features/news/components/RecentNewsSidebar/RecentNewsSidebar.css';
import '@/features/news/components/OpinionSidebar/OpinionSidebar.css';
import '@/features/news/components/BreakingNewsBanner/BreakingNewsBanner.css';
import '@/features/navigation/components/Breadcrumb/Breadcrumb.css';
import '@/shared/layouts/LegalLayout/LegalLayout.css';
import '@/shared/layouts/Footer/Footer.css';
import '@/shared/layouts/Header/Header.css';
import '@/shared/components/ThemeToggle/ThemeToggle.css';

const siteName = 'NewsHub';
const defaultDescription =
  'Mantente informado con las ultimas noticias internacionales, politica, economia, deportes y mas.';

export const metadata: Metadata = {
  metadataBase: new URL('https://newshub.example.com'),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName,
    title: siteName,
    description: defaultDescription,
    images: ['/images/logo/logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: ['/images/logo/logo.jpg'],
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeScript}
        </Script>
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

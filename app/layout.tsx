import type { Metadata } from 'next';
import Script from 'next/script';
import { Footer, Header } from '../src/shared/layouts';
import { ScrollToTop } from '../src/shared/components/ScrollToTop';
import { themeScript } from '../src/theme/theme-script';
import { Providers } from './providers';
import '../src/styles/fonts.css';
import '../src/theme/theme.css';
import '../src/styles/index.css';
import './_components/HomePageClient.css';
import './_components/CategoryPageClient.css';
import './_components/ArticlePageClient.css';
import './_components/OpinionPageClient.css';
import '../src/features/news/components/RecentNewsSidebar/RecentNewsSidebar.css';
import '../src/features/news/components/OpinionSidebar/OpinionSidebar.css';
import '../src/features/news/components/BreakingNewsBanner/BreakingNewsBanner.css';
import '../src/features/navigation/components/Breadcrumb/Breadcrumb.css';
import '../src/shared/layouts/LegalLayout/LegalLayout.css';
import '../src/shared/layouts/Footer/Footer.css';
import '../src/shared/layouts/Header/Header.css';
import '../src/shared/components/ThemeToggle/ThemeToggle.css';

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Providers>
          <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
            <ScrollToTop />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

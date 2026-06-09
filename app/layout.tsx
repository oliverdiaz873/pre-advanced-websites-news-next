import type { Metadata } from 'next';
import Script from 'next/script';
import { domine } from '@/shared/config/fonts';
import { themeScript } from '@/theme/theme-script';
import '@/theme/theme.css';
import '@/styles/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://newshub.example.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={domine.variable}>
      <body>
        <Script id="theme-script" strategy="beforeInteractive">{themeScript}</Script>
        {children}
      </body>
    </html>
  );
}

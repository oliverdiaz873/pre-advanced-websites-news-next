'use client';

import { Suspense, type PropsWithChildren } from 'react';
import '../src/i18n';
import { ThemeProvider } from '../src/theme';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        {children}
      </Suspense>
    </ThemeProvider>
  );
}

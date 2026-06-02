import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Search } from '../_components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Busqueda',
  description: 'Busca noticias y opiniones publicadas en NewsHub.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <Search />
    </Suspense>
  );
}

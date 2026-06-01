import type { Metadata } from 'next';
import { Home } from './_components/HomePageClient';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Las noticias mas importantes del mundo, politica, economia y deportes en un solo lugar.',
};

export default function Page() {
  return <Home />;
}

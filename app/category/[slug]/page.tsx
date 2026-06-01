import type { Metadata } from 'next';
import { categoryContent } from '../../../src/data/categories';
import { Category } from '../../_components/CategoryPageClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = categoryContent[slug];

  return {
    title: content?.label ?? 'Categoria no encontrada',
    description: content?.description ?? 'La categoria solicitada no existe.',
  };
}

export default function Page() {
  return <Category />;
}

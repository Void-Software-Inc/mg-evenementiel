import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import WeddingImageGallery from './components/WeddingImageGallery';

export const metadata: Metadata = {
  title: 'Traiteur pour Mariages - MG Événementiel',
  description: 'Service traiteur spécialisé dans les mariages. Menus raffinés et service sur-mesure pour le plus beau jour de votre vie.',
  openGraph: {
    title: 'Traiteur pour Mariages - MG Événementiel',
    description: 'Service traiteur spécialisé dans les mariages. Menus raffinés et service sur-mesure pour le plus beau jour de votre vie.',
    url: 'https://www.mgevenements.fr/traiteur/mariage',
    siteName: 'MG Événementiel',
    images: [
      {
        url: 'https://www.mgevenements.fr/favicon_io/favicon.ico',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgevenements.fr/traiteur/mariage',
  },
};

const TraiteurMariagePage = () => {
  return (
    <>
      <WeddingImageGallery />
      <BackToTop />
    </>
  );
};

export default TraiteurMariagePage; 
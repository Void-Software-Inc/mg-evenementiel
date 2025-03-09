import type { Metadata } from 'next';
import { ProductProvider } from '@/app/context/ProductContext';
import { BackToTop } from "@/components/global/BackToTop";
import TraiteurDisplay from './TraiteurDisplay';

export const metadata: Metadata = {
  title: 'Traiteur - MG Événementiel',
  description: 'Découvrez notre service traiteur pour vos événements dans le Sud de la France.',
  openGraph: {
    title: 'Traiteur - MG Événementiel',
    description: 'Découvrez notre service traiteur pour vos événements dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/traiteur',
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
    canonical: 'https://www.mgevenements.fr/traiteur',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Traiteur - MG Événementiel",
  "description": "Découvrez notre service traiteur pour vos événements dans le Sud de la France.",
  "url": "https://www.mgevenements.fr/traiteur",
  "isPartOf": {
    "@type": "WebSite",
    "name": "MG Événementiel",
    "url": "https://www.mgevenements.fr"
  }
};

const TraiteurPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductProvider>
        <TraiteurDisplay />
      </ProductProvider>
      <div className="h-12 w-full bg-white"></div>
      <BackToTop />
    </>
  );
};

export default TraiteurPage; 
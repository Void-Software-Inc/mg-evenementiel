import type { Metadata } from 'next';
import { ProductProvider } from '@/app/context/ProductContext';
import { BackToTop } from "@/components/global/BackToTop";
import TraiteurDisplay from '../TraiteurDisplay';

export const metadata: Metadata = {
  title: 'Catalogue Traiteur - MG Événementiel',
  description: 'Découvrez notre catalogue traiteur pour vos événements dans le Sud de la France.',
  openGraph: {
    title: 'Catalogue Traiteur - MG Événementiel',
    description: 'Découvrez notre catalogue traiteur pour vos événements dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/traiteur/catalogue',
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
    canonical: 'https://www.mgevenements.fr/traiteur/catalogue',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Catalogue Traiteur - MG Événementiel",
  "description": "Découvrez notre catalogue traiteur pour vos événements dans le Sud de la France.",
  "url": "https://www.mgevenements.fr/traiteur/catalogue",
  "isPartOf": {
    "@type": "WebSite",
    "name": "MG Événementiel",
    "url": "https://www.mgevenements.fr"
  }
};

const TraiteurCataloguePage = () => {
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

export default TraiteurCataloguePage; 
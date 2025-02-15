import type { Metadata } from 'next';
import CatalogDisplay from "./components/CatalogDisplay";
import { ProductProvider } from '@/app/context/ProductContext';
import { BackToTop } from "@/components/global/BackToTop";

export const metadata: Metadata = {
  title: 'Catalogue - MG Événementiel',
  description: 'Découvrez notre catalogue de mobilier et de matériel à louer pour vos événements dans le Sud de la France.',
  openGraph: {
    title: 'Catalogue - MG Événementiel',
    description: 'Découvrez notre catalogue de mobilier et de matériel à louer pour vos événements dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/catalogue',
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
    canonical: 'https://www.mgevenements.fr/catalogue',
  },
}

// JSON-LD data as a separate variable
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MG Événementiel",
  "url": "https://www.mgevenements.fr",
  "logo": "https://www.mgevenements.fr/favicon_io/favicon.ico",
  "description": "Découvrez notre catalogue de mobilier et de matériel à louer pour vos événements dans le Sud de la France.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressRegion": "Occitanie",
    "addressCountry": "France"
  },
  "sameAs": [
    "https://www.mariages.net/chapiteau-mariage/mg-evenementiel--e331790",
    "https://www.instagram.com/mg_evenementiel/"
  ]
};

const CataloguePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductProvider>
        <CatalogDisplay />
      </ProductProvider>
      <div className="h-12 w-full bg-white"></div>
      <BackToTop />
    </>
  );
};

export default CataloguePage;
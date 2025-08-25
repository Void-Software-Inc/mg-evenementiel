import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import TraiteurWhiteNavbar from "@/components/traiteur/TraiteurWhiteNavbar";
import TraiteurPresentation from "@/components/traiteur/TraiteurPresentation";
import TraiteurStats from "@/components/traiteur/TraiteurStats";
import TraiteurServices from "@/components/traiteur/TraiteurServices";
import TraiteurPromo from "@/components/traiteur/TraiteurPromo";
import TraiteurFaqSection from "@/components/traiteur/TraiteurFaqSection";
import Link from 'next/link';
import Image from 'next/image';
import CorporateMenus from './professionnel/components/CorporateMenus';

export const metadata: Metadata = {
  title: 'Service Traiteur - MG Événementiel',
  description: 'Découvrez nos services traiteur pour tous vos événements : mariages, événements privés et professionnels dans le Sud de la France.',
  openGraph: {
    title: 'Service Traiteur - MG Événementiel',
    description: 'Découvrez nos services traiteur pour tous vos événements : mariages, événements privés et professionnels dans le Sud de la France.',
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
  "@type": "LocalBusiness",
  "name": "Service Traiteur - MG Événementiel",
  "description": "Découvrez nos services traiteur pour tous vos événements : mariages, événements privés et professionnels dans le Sud de la France.",
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
      
      {/* Traiteur Presentation Section */}
      <TraiteurPresentation />

      {/* Traiteur Stats Section */}
      <TraiteurStats />

      {/* Traiteur Services Section */}
      <TraiteurServices />

      <div className="w-full flex justify-center bg-white py-6 lg:py-16 px-2 sm:px-6 lg:px-8">
      <div className="w-full lg:w-[95%]">
      <CorporateMenus />
      </div></div>

      {/* Traiteur FAQ Section */}
      <TraiteurFaqSection />

      <BackToTop />
    </>
  );
};

export default TraiteurPage; 
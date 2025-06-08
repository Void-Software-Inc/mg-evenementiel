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

      <TraiteurWhiteNavbar />
      
      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden">
        <Image
          src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/heroHeaderImage.webp"
          alt="Background"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover'
          }}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="text-center px-4">
            <h1 className="text-white text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
              SERVICE TRAITEUR
            </h1>
            <p className="text-white text-center text-lg sm:text-xl xl:text-2xl font-extralight">
              Une cuisine raffinée pour tous vos événements dans le Sud de la France
            </p>
          </div>
        </div>
      </div>

      {/* Traiteur Presentation Section */}
      <TraiteurPresentation />

      {/* Traiteur Stats Section */}
      <TraiteurStats />

      {/* Traiteur Services Section */}
      <TraiteurServices />

      {/* Traiteur Promo Section */}
      <div className="hidden xl:block">
        <TraiteurPromo />
      </div>

      {/* Traiteur FAQ Section */}
      <TraiteurFaqSection />

      <BackToTop />
    </>
  );
};

export default TraiteurPage; 
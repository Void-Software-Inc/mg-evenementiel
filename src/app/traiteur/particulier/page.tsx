import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import PrivateHero from './components/PrivateHero';
import PrivateExpertise from './components/PrivateExpertise';
import PrivateService from './components/PrivateService';
import PrivateCallToAction from './components/PrivateCallToAction';
import WeddingMenus from '../mariage/components/WeddingMenus';

export const metadata: Metadata = {
  title: 'Traiteur Événements Privés - MG Événementiel',
  description: 'Service traiteur pour vos événements privés : anniversaires, fêtes de famille, célébrations intimes. Service personnalisé dans le Sud de la France.',
  openGraph: {
    title: 'Traiteur Événements Privés - MG Événementiel',
    description: 'Service traiteur pour vos événements privés : anniversaires, fêtes de famille, célébrations intimes. Service personnalisé dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/traiteur/particulier',
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
    canonical: 'https://www.mgevenements.fr/traiteur/particulier',
  },
};

const TraiteurParticulierPage = () => {
  return (
    <>
    <PrivateHero />
    <PrivateExpertise />
    <PrivateService />
    <div className="w-full h-fit flex justify-center pb-12 md:pb-24 bg-white">
        <div className="w-[80%] px-4">
          <WeddingMenus />
        </div>
      </div>
    <PrivateCallToAction />
    <BackToTop />
    </>
  );
};

export default TraiteurParticulierPage; 
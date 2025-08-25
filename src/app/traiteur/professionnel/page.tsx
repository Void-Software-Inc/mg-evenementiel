

import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import CorporateHero from '@/app/traiteur/professionnel/components/CorporateHero';
import Carousel from '../components/Carousel';
import CorporateService from './components/CorporateService';
import CorporateExpertise from '@/app/traiteur/professionnel/components/CorporateExpertise';
import CorporateMenus from '@/app/traiteur/professionnel/components/CorporateMenus';
import CorporateCallToAction from '@/app/traiteur/professionnel/components/CorporateCallToAction';

export const metadata: Metadata = {
  title: 'Traiteur Événements Professionnels - MG Événementiel',
  description: 'Service traiteur professionnel pour entreprises : séminaires, cocktails corporate, réceptions d\'affaires. Prestations de qualité dans le Sud de la France.',
  openGraph: {
    title: 'Traiteur Événements Professionnels - MG Événementiel',
    description: 'Service traiteur professionnel pour entreprises : séminaires, cocktails corporate, réceptions d\'affaires. Prestations de qualité dans le Sud de la France.',
    url: 'https://www.mgevenements.fr/traiteur/professionnel',
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
    canonical: 'https://www.mgevenements.fr/traiteur/professionnel',
  },
};

const TraiteurProfessionnelPage = () => {
  return (
    <>
      <CorporateHero />

      <CorporateExpertise />
      <CorporateService />
      
      <div className="max-w-[85%] mx-auto mb-44">
        <CorporateMenus />
      </div>

      <CorporateCallToAction />
        
      <BackToTop />
    </>
  );
};

export default TraiteurProfessionnelPage; 

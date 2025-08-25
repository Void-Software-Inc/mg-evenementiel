import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import WeddingImageGallery from './components/WeddingImageGallery';
import WeddingCateringService from './components/WeddingCateringService';
import WeddingHero from './components/WeddingHero';
import TraiteurMenu from '@/app/traiteur/mariage/components/TraiteurMenu';
import WeddingOptions from './components/WeddingOptions';
import CorporateMenus from '../professionnel/components/CorporateMenus';
import WeddingServices from './components/WeddingServices';
import WeddingCallToAction from './components/WeddingCallToAction';
import WeddingMenus from './components/WeddingMenus';

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
      <WeddingHero />
      
      <div className='w-full h-fit flex justify-center'>
        <WeddingCateringService />
      </div>

      <WeddingServices />
   
      <div className="w-full h-fit flex justify-center mt-20 pb-12 md:pb-24 bg-white">
        <div className="w-[80%] px-4">
          <WeddingMenus />
        </div>
      </div>

      <WeddingOptions />
      <WeddingCallToAction />
      <BackToTop />
    </>
  );
};

export default TraiteurMariagePage; 
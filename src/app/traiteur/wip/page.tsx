import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Navbar from "@/components/global/Navbar";
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page en Construction - Service Traiteur - MG Événementiel',
  description: 'Cette page est actuellement en construction. Revenez bientôt pour découvrir nos services traiteur spécialisés.',
  robots: 'noindex, nofollow',
};

const TraiteurWIPPage = () => {
  return (
    <>
      <Navbar />
      
      {/* WIP Content */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <Construction className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-light text-gray-800 mb-6">
            Page en construction
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 font-light mb-8 leading-relaxed">
            Nous travaillons actuellement sur cette section pour vous offrir 
            une expérience encore plus complète de nos services traiteur spécialisés.
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            {/* Back Button */}
            <Link 
              href="/traiteur"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux services traiteur
            </Link>

            {/* Contact Button */}
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Nous contacter
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              En attendant, n'hésitez pas à nous contacter
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Notre équipe reste à votre disposition pour discuter de vos projets 
              et vous proposer des solutions sur mesure pour vos événements.
            </p>
          </div>

        </div>
      </div>

      <BackToTop />
    </>
  );
};

export default TraiteurWIPPage; 
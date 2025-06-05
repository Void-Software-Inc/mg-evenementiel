import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Services Traiteur - MG Événementiel',
  description: 'Découvrez nos services traiteur pour tous vos événements : mariages, événements privés et professionnels dans le Sud de la France.',
  openGraph: {
    title: 'Services Traiteur - MG Événementiel',
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
  "name": "Services Traiteur - MG Événementiel",
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
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Services Traiteur
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Une cuisine raffinée pour tous vos événements exceptionnels dans le Sud de la France
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            
            {/* Mariages Card */}
            <Link href="/traiteur/mariage" className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                <div className="text-6xl">💒</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">Mariages</h3>
                <p className="text-gray-600">Des menus exceptionnels pour le plus beau jour de votre vie</p>
              </div>
            </Link>

            {/* Événements Privés Card */}
            <Link href="/traiteur/particulier" className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                <div className="text-6xl">🎉</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">Événements Privés</h3>
                <p className="text-gray-600">Anniversaires, fêtes de famille et célébrations intimes</p>
              </div>
            </Link>

            {/* Événements Professionnels Card */}
            <Link href="/traiteur/professionnel" className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <div className="text-6xl">🏢</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">Événements Professionnels</h3>
                <p className="text-gray-600">Séminaires, cocktails d'entreprise et réceptions corporate</p>
              </div>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="mt-16">
            <Link 
              href="/traiteur/catalogue" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Découvrir notre catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                L'art culinaire au service de vos événements
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Forte de nombreuses années d'expérience, notre équipe de professionnels met tout son savoir-faire à votre service pour faire de vos événements des moments inoubliables.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Que ce soit pour un mariage intime, une grande réception ou un événement corporate, nous adaptons nos services à vos besoins et à votre budget.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Nous contacter
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 opacity-20"></div>
              <div className="flex items-center justify-center h-full text-8xl">🍽️</div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default TraiteurPage; 
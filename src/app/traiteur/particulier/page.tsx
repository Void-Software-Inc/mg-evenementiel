import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';

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
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">🎉</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Événements Privés
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Célébrez vos moments précieux avec style et saveur
          </p>
        </div>
      </section>

      {/* Types d'événements */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Vos Célébrations Privées
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Anniversaires</h3>
              <p className="text-gray-600">Fêtez vos anniversaires avec des menus festifs et gourmands.</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Réunions de Famille</h3>
              <p className="text-gray-600">Rassemblez votre famille autour de plats traditionnels revisités.</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🍾</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Célébrations</h3>
              <p className="text-gray-600">Baptêmes, communions, fêtes diverses... nous nous adaptons.</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Réceptions à Domicile</h3>
              <p className="text-gray-600">Service traiteur directement chez vous pour plus d'intimité.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-lg flex items-center justify-center">
              <div className="text-9xl opacity-60">🎊</div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Une Expérience Sur-Mesure
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Chaque événement privé est unique et mérite une attention particulière. Nous créons des expériences culinaires personnalisées qui reflètent l'esprit de votre célébration.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Menus adaptés à tous les âges
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Service flexible (buffet, assis, cocktail)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Respect des préférences et allergies
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Service à domicile ou en extérieur
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formules Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Nos Formules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🥗</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Essentielle</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Buffet froid varié
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sélection de desserts
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Boissons non alcoolisées
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-4">À partir de 25€/pers</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500">
              <div className="text-center mb-6">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">POPULAIRE</div>
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Gourmande</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Entrée, plat, dessert
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Service à table
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Boissons incluses
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Personnel de service
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-4">À partir de 45€/pers</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">👑</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Prestige</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Menu gastronomique 4 services
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Service de maître d'hôtel
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sélection de vins
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Coordination complète
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 mb-4">À partir de 75€/pers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à Organiser Votre Événement ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé.
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Demander un Devis
            </Link>
            <Link 
              href="/traiteur/catalogue" 
              className="inline-block bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Voir le Catalogue
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default TraiteurParticulierPage; 
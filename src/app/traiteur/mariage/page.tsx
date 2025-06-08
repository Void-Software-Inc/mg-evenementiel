import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';

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
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">💒</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Traiteur pour Mariages
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Des saveurs inoubliables pour célébrer votre union
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Nos Services Mariage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-rose-50 rounded-lg">
              <div className="text-4xl mb-4">🥂</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cocktail de Bienvenue</h3>
              <p className="text-gray-600">Accueillez vos invités avec style grâce à notre sélection de cocktails et amuse-bouches raffinés.</p>
            </div>
            
            <div className="text-center p-6 bg-rose-50 rounded-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Repas de Réception</h3>
              <p className="text-gray-600">Menus gastronomiques personnalisés adaptés à vos goûts et à votre budget.</p>
            </div>
            
            <div className="text-center p-6 bg-rose-50 rounded-lg">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Desserts & Pièce Montée</h3>
              <p className="text-gray-600">Créations sucrées sur-mesure pour couronner votre repas de noces.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Un Mariage à Votre Image
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Votre mariage est unique, votre menu doit l'être aussi. Nous travaillons en étroite collaboration avec vous pour créer une expérience culinaire qui reflète votre personnalité et vos goûts.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-rose-500 mr-2">✓</span>
                    Consultation personnalisée et dégustation
                  </li>
                  <li className="flex items-center">
                    <span className="text-rose-500 mr-2">✓</span>
                    Adaptation aux régimes alimentaires spéciaux
                  </li>
                  <li className="flex items-center">
                    <span className="text-rose-500 mr-2">✓</span>
                    Service sur-mesure le jour J
                  </li>
                  <li className="flex items-center">
                    <span className="text-rose-500 mr-2">✓</span>
                    Coordination avec vos autres prestataires
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-lg flex items-center justify-center">
              <div className="text-9xl opacity-60">👰‍♀️🤵‍♂️</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à Planifier Votre Mariage de Rêve ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour une consultation personnalisée et créons ensemble le menu parfait pour votre grand jour.
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Demander un Devis
            </Link>
            <Link 
              href="/traiteur/catalogue" 
              className="inline-block bg-white border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
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

export default TraiteurMariagePage; 
import type { Metadata } from 'next';
import { BackToTop } from "@/components/global/BackToTop";
import Link from 'next/link';
import CorporateHero from '@/components/traiteur/professionnel/CorporateHero';

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
      {/* Services professionnels */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Nos Services Corporate
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Séminaires</h3>
              <p className="text-gray-600">Pauses café, déjeuners d'affaires et collations pour vos formations.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">🥂</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cocktails Corporate</h3>
              <p className="text-gray-600">Inaugurations, lancements de produits et événements networking.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Événements Client</h3>
              <p className="text-gray-600">Réceptions prestige pour impressionner vos clients et partenaires.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cérémonies d'Entreprise</h3>
              <p className="text-gray-600">Remises de prix, anniversaires d'entreprise et fêtes de fin d'année.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Excellence et Professionnalisme
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Votre image d'entreprise est précieuse. Nous comprenons les enjeux du monde corporate et adaptons nos prestations à vos exigences de qualité et de timing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Service discret et professionnel
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Respect des contraintes horaires
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Adaptation aux espaces d'entreprise
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Devis détaillés et facturation professionnelle
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center">
              <div className="text-9xl opacity-60">📈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Solutions Adaptées à Votre Budget
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">☕</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Pause</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Pauses café matinales
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Collations salées/sucrées
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Boissons chaudes et fraîches
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">À partir de 8€/pers</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-green-500">
              <div className="text-center mb-6">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">RECOMMANDÉE</div>
                <div className="text-4xl mb-4">🍱</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Business</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Déjeuner d'affaires complet
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Service rapide et efficace
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Options végétariennes
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Pauses incluses
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">À partir de 35€/pers</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-2xl font-semibold text-gray-800">Formule Prestige</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Cocktail dinatoire raffiné
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Service de maître d'hôtel
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Sélection de champagnes
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Animation culinaire live
                </li>
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-4">À partir de 65€/pers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Pourquoi Nous Choisir ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ponctualité Garantie</h3>
              <p className="text-gray-600">Nous respectons vos contraintes horaires et vos plannings serrés.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Partenaire de Confiance</h3>
              <p className="text-gray-600">Relation commerciale durable avec facturation professionnelle.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sur-Mesure</h3>
              <p className="text-gray-600">Chaque prestation est adaptée à votre image et vos besoins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à Organiser Votre Prochain Événement Corporate ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour discuter de vos besoins et recevoir une proposition commerciale adaptée.
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Demander un Devis
            </Link>
            <Link 
              href="/traiteur/catalogue" 
              className="inline-block bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
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

export default TraiteurProfessionnelPage; 
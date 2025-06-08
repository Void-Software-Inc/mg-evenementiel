import Link from 'next/link';

const TraiteurServices = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Text Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            Nos services traiteur spécialisés
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Découvrez notre expertise culinaire adaptée à chaque type d'événement
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Mariage Card */}
          <Link href="/traiteur/mariage" className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-8 text-center border border-gray-200 hover:border-gray-300 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Mariages
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Menus raffinés et service d'exception pour célébrer le plus beau jour de votre vie avec élégance.
                </p>
              </div>
              <div className="text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                <span className="text-sm font-medium">Découvrir nos menus →</span>
              </div>
            </div>
          </Link>

          {/* Professionnel Card */}
          <Link href="/traiteur/professionnel" className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-8 text-center border border-gray-200 hover:border-gray-300 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Professionnel
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cocktails d'entreprise, séminaires et événements corporate avec un service professionnel adapté.
                </p>
              </div>
              <div className="text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                <span className="text-sm font-medium">Voir nos prestations →</span>
              </div>
            </div>
          </Link>

          {/* Particulier Card */}
          <Link href="/traiteur/particulier" className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-8 text-center border border-gray-200 hover:border-gray-300 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Particulier
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Anniversaires, baptêmes et fêtes familiales dans une ambiance chaleureuse et conviviale.
                </p>
              </div>
              <div className="text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                <span className="text-sm font-medium">Explorer nos options →</span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default TraiteurServices; 
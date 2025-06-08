import Image from 'next/image';

const TraiteurPresentation = () => {
  return (
    <div className="w-full bg-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-800">
              Pour Mariages, Événements Particuliers & Professionnels
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez MG Événements, nous mettons tout notre savoir-faire culinaire au service de vos instants d'exception. Mariages, anniversaires, réunions de famille, cocktails d'entreprise ou séminaires : nous vous accompagnons avec une offre sur-mesure, adaptée à votre budget, vos goûts et votre style.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                Nos prestations traiteur :
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">
                    Mariages
                  </h4>
                  <p className="text-gray-700">
                    Menus raffinés, organisation complète, service soigné pour le plus beau jour de votre vie.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">
                    Événements particuliers
                  </h4>
                  <p className="text-gray-700">
                    Anniversaires, baptêmes, fêtes familiales… Une cuisine généreuse et conviviale.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">
                    Professionnels
                  </h4>
                  <p className="text-gray-700">
                    Cocktails, déjeuners d'affaires, brunchs et prestations sur site ou en livraison.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="relative h-96 lg:h-[600px] rounded-md overflow-hidden">
            <Image
              src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/ibrahim-boran-aoGA9N8QNrI-unsplash.webp?t=2025-06-08T15%3A04%3A28.834Z"
              alt="Cuisine traiteur raffinée"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraiteurPresentation; 
const TraiteurStats = () => {
  return (
    <div className="w-full bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl">
            
            {/* Circle 1 - Events */}
            <div className="flex items-center justify-center">
              <div className="relative w-80 h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl lg:text-7xl font-light text-gray-800 mb-4">
                    150+
                  </div>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    événements organisés avec succès dans le Sud de la France
                  </p>
                </div>
              </div>
            </div>

            {/* Circle 2 - Experience */}
            <div className="flex items-center justify-center">
              <div className="relative w-80 h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl lg:text-7xl font-light text-gray-800 mb-4">
                    25+
                  </div>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    années d'expérience culinaire et événementielle à votre service
                  </p>
                </div>
              </div>
            </div>

            {/* Circle 3 - Clients */}
            <div className="flex items-center justify-center">
              <div className="relative w-80 h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl lg:text-7xl font-light text-gray-800 mb-4">
                    500+
                  </div>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    clients satisfaits qui nous font confiance pour leurs événements
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TraiteurStats; 
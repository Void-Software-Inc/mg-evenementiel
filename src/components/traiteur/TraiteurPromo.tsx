import Image from 'next/image';

const TraiteurPromo = () => {
  return (
    <div className="w-full bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Large Promotional Card */}
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/pablo-lancaster-jones-aHoCYFzNuGM-unsplash-1.webp?t=2025-06-08T17%3A12%3A07.923Z"
              alt="Cuisine traiteur background"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 "></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[400px] lg:min-h-[500px] overflow-hidden max-h-[300px]">
            
            {/* Half Circle with All Content */}
            <div className="relative">
              <div 
                className="w-96 h-96 lg:w-[800px] lg:h-[800px] rounded-full flex items-center justify-center text-center -ml-48 lg:-ml-52"
                style={{ backgroundColor: '#2A2926' }}
              >
                <div className="ml-40 space-y-3 max-w-lg px-4 text-start">
                 
                  
               
                  {/* Main Content */}
                  <div className="space-y-3">
                    <h2 className="text-2xl font-light text-white leading-tight">
                      Excellence culinaire et innovation dans l'art du traiteur
                    </h2>
                    
                    <p className="text-lg text-gray-200 leading-relaxed">
                      MG Événements s'engage à offrir une expérience gastronomique unique, 
                      alliant tradition française et techniques modernes pour sublimer 
                      chacun de vos événements.
                    </p>
                    
                    <button className="inline-flex items-center px-4 py-2 border border-white border-opacity-50 text-white font-medium text-xs rounded-md hover:bg-white hover:text-gray-800 transition-colors duration-300">
                      En savoir plus
                    </button>
                  </div>

                 
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TraiteurPromo; 
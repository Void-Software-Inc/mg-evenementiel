import Image from 'next/image';

const PrivateExpertise = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-[85%] mx-auto px-4 sm:px-0 py-12 lg:py-20">
      {/* Image Section */}
      <div className="w-full h-[300px] lg:w-1/2 relative lg:h-[600px] lg:aspect-auto">
        <Image
          src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/particulier/andrea-mininni-VLlkOJdzLG0-unsplash.webp"
          alt="Événement privé"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <h3 className="text-zinc-700 font-medium tracking-wide uppercase">
            EXPERTISE ÉVÉNEMENTIELLE PRIVÉE
          </h3>
          <h2 className="text-4xl sm:text-5xl leading-loose font-extralight text-zinc-900">
            Des Moments Uniques et Mémorables
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light">
            MG Événements se spécialise dans une large gamme d'événements privés, garantissant une expérience culinaire exceptionnelle à chaque occasion. Que vous organisiez un anniversaire, une réception ou une célébration familiale, nous apportons notre savoir-faire gastronomique pour rendre votre événement inoubliable.
          </p>
        </div>

        <div>
          <h4 className="text-zinc-700 font-medium mb-4">
            NOTRE EXPERTISE COUVRE :
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {/* Column 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Anniversaires</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Baptêmes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Réceptions privées</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Dîners de famille</span>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Brunchs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Garden parties</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Cocktails privés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Fêtes de famille</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateExpertise;

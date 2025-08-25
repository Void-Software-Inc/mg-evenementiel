import Image from 'next/image';

const CorporateExpertise = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-[85%] mx-auto px-4 sm:px-0 py-12 lg:py-20">
      {/* Image Section */}
      <div className="w-full h-[300px] lg:w-1/2 relative lg:h-[600px] lg:aspect-auto">
        <Image
          src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/al-elmes-ULHxWq8reao-unsplash(1).webp?t=2025-08-22T15%3A37%3A17.217Z-"
          alt="Événement d'entreprise"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <h3 className="text-zinc-700 font-medium tracking-wide uppercase">
            EXPERTISE ÉVÉNEMENTIELLE CORPORATE
          </h3>
          <h2 className="text-4xl sm:text-5xl leading-loose font-extralight text-zinc-900">
            Une Expérience Événementielle Réussie
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light">
            MG Événements se spécialise dans une large gamme d'événements d'entreprise, garantissant professionnalisme et service d'exception à chaque occasion. Que vous organisiez un événement de networking, de team-building ou une fête d'entreprise, nous apportons l'expertise culinaire et le service nécessaires pour rendre votre événement mémorable.
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
                <span>Réunions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Team building</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Afterworks et apéritifs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Journées portes ouvertes</span>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Présentations aux investisseurs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Galas d'entreprise</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Fêtes de fin d'année</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Lancements de Produits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateExpertise;

import Image from 'next/image';

const WeddingCateringService = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-[85%] mx-auto px-4 sm:px-0 py-12 lg:py-20">
      {/* Image Section */}
      <div className="w-full h-[300px] lg:w-1/2 relative lg:h-[600px] lg:aspect-auto">
        <Image
          src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/bennie-bates--MZwBtdj9vE-unsplash.webp?t=2025-08-24T23%3A56%3A46.495Z"
          alt="Service traiteur mariage"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <h3 className="text-zinc-700 font-medium tracking-wide uppercase">
            EXPERTISE TRAITEUR MARIAGE
          </h3>
          <h2 className="text-4xl sm:text-5xl leading-loose font-extralight text-zinc-900">
            Une organisation fluide, un accompagnement sur-mesure
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light">
            Du premier échange à la dernière bouchée, nous vous accompagnons à chaque étape. Menu personnalisé, dégustation en amont, adaptation à vos envies et à votre budget : tout est pensé pour vous. Notre équipe, discrète et attentive, veille à ce que chaque détail soit parfaitement orchestré.
          </p>
        </div>

        <div>
          <h4 className="text-zinc-700 font-medium mb-4">
            NOS PRESTATIONS INCLUENT :
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {/* Column 1 */}
            <div className="space-y-3">
              
            <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Dégustation en amont</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Service à l'assiette</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Installation et logistique</span>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-3">
                
              
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Vaisselle et mobilier</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#AAA07E]">✓</span>
                <span>Service en salle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCateringService; 
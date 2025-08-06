import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CorporateHero = () => {
  return (
    <section className="bg-[#F8F5F0] overflow-hidden">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl md:justify-self-center">
            <h1 className="uppercase font-extralight text-5xl sm:text-6xl lg:text-8xl text-stone-900 mb-6">
              Corporate
            </h1>
            <div className="w-24 h-1 bg-stone-400 mb-8"></div>
            <p className="text-stone-600 leading-relaxed mb-10">
                Des petites réunions aux lancements de produits, nous accompagnons les entreprises dans tous leurs événements. Grâce à une planification claire et une prestation tout compris, nous nous chargeons des détails pour que vous restiez concentrés sur l’essentiel. Transformez votre prochain événement en un moment convivial, fluide et motivant pour vos équipes.
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center font-semibold text-stone-800 tracking-widest text-sm uppercase"
            >
              Démarrer la planification
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" size={16} />
            </Link>
          </div>
          <div className="relative h-[450px] md:h-[600px] -mr-32 md:-mr-64">
            <div
              className="absolute inset-0 rounded-l-full overflow-hidden"
            >
              <Image
                src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/ludovic-delot-24UL0XeeMAI-unsplash.webp?t=2025-08-06T18%3A04%3A33.830Z"
                alt="Service traiteur pour événement d'entreprise"
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero; 
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WeddingHero = () => {
  const imageUrl = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/sumatra-weddings-tyKLwDFdrCU-unsplash.webp?t=2025-08-24T23%3A30%3A34.447Z";

  return (
    <section className="bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl md:justify-self-center">
            <h1 className="uppercase font-extralight text-5xl sm:text-5xl lg:text-6xl xl:text-8xl text-stone-900 mb-6">
              MARIAGES
            </h1>
            <div className="w-24 h-1 bg-stone-400 mb-8"></div>
            <p className="text-zinc-600 leading-relaxed mb-10 font-light">
              Pour le plus beau jour de votre vie, offrez à vos invités une expérience culinaire unique. Repas assis, vin d'honneur ou brunch du lendemain : nous vous accompagnons avec goût et discrétion. Menus personnalisés, produits de saison, service complet… Profitez pleinement, on s'occupe de tout.
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex items-center font-semibold text-stone-800 tracking-widest text-sm uppercase border-b border-stone-800 w-fit"
            >
              Contactez-nous
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" size={16} />
            </Link>
          </div>
          <div className="relative h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] -mr-32 md:-mr-64">
            <div
              className="absolute inset-0 rounded-l-full overflow-hidden"
            >
              <Image
                src={imageUrl}
                alt="Elegant wedding couple"
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

export default WeddingHero;
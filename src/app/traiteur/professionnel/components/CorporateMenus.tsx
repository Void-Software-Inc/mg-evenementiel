import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CorporateMenus = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl mt-20">
      <div className="flex flex-col lg:flex-row lg:h-[450px]">
        {/* Image Section */}
        <div className="order-1 lg:order-2 w-full h-[300px] sm:h-[280px] lg:h-auto lg:w-1/2 relative">
          <Image
            src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/ludovic-delot-HW7cEIKdavE-unsplash.webp"
            alt="Plateau repas professionnel"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="order-2 lg:order-1 w-full h-[300px] sm:h-[280px] lg:h-auto lg:w-1/2 bg-zinc-800 p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white mb-4 sm:mb-6">
            Nos Menus
          </h2>
          <p className="text-zinc-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 font-light leading-relaxed">
            MG Événements simplifie l'organisation de vos réceptions. De la formule{' '}
            Plateaux Repas aux événements avec service à table, 
            nos menus personnalisables s'adaptent à tous vos besoins de restauration.
          </p>
          <Link 
            href="/traiteur/menus"
            className="group inline-flex items-center font-semibold text-white tracking-widest text-xs sm:text-sm uppercase border-b border-white w-fit"
          >
            VOIR LES MENUS
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CorporateMenus;
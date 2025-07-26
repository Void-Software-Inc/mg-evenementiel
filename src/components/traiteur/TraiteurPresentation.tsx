import Image from 'next/image';
import { HeartHandshake, Gift, Building, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const TraiteurPresentation = () => {
  return (
    <div className="w-full flex justify-center pt-16 lg:pt-24 pb-6 lg:px-8">
      <div className="w-full lg:w-[95%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text Content */}
          <div className='w-full flex justify-center order-2 lg:order-1'>
          <div className="space-y-6 order-2 lg:order-1 lg:px-8 w-[90%] lg:w-fit">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-800">
              Service traiteur pour Mariages, Événements Particuliers & Professionnels
            </h2>
            
            <p className="text-lg text-gray-600 font-light leading-relaxed hidden sm:block">
              Chez MG Événements, nous sublimons vos moments uniques avec une offre traiteur sur-mesure, adaptée à vos envies, votre style et votre budget.
            </p>
            <div className="flex flex-row gap-4">
            <Button asChild className="sm:-ml-1 border-2 bg-[#383838] max-w-[170px] border-[#383838] text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group hover:bg-white hover:text-[#383838]">
                                <Link href="/traiteur/catalogue">
                                    <span className="text-sm font-medium">CATALOGUE</span>
                                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                </Link>
                            </Button>   
            <Button asChild className="sm:-ml-1 border-2 bg-transparent max-w-[150px] border-[#383838] text-[#383838] hover:text-white hover:bg-[#383838] font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                                <Link href="/contact">
                                    <span className="text-sm font-medium">CONTACT</span>
                                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                </Link>
                            </Button>   
          </div>
          </div>
          </div>
          
          {/* Right side - Image */}
          <div className="relative h-96 lg:h-[600px] rounded-t-2xl lg:rounded-2xl overflow-hidden order-1 lg:order-2">
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
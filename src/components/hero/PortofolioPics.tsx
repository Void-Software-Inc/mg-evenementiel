'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { useInView } from 'react-intersection-observer';

const images = [
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/thomas-william-Q3PzwHKpEdc-unsplash.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/thomas-william-Q3PzwHKpEdc-unsplash.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/thomas-william-Q3PzwHKpEdc-unsplash.webp',
];

export default function PortfolioPics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center mb-32 sm:mb-40">
      <div className="w-[85%] flex justify-start mb-8 sm:mb-16">
        <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight">NOS RÉALISATIONS</p>
      </div>
      {inView && (
        <div className="w-full h-full flex items-center justify-center relative">
          <div 
            className="w-full overflow-x-auto"
            ref={scrollContainerRef}
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <div 
              className="flex space-x-4 px-4 py-2 min-w-max"
              style={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              } as React.CSSProperties}
            >
              {images.map((image, index) => (
                <div key={index} className="w-[250px] h-[400px] sm:w-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] flex-shrink-0 relative">
                  <Image
                    src={image}
                    alt={`Portfolio image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={() => scroll("left")}
            className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Button>
          <Button
            onClick={() => scroll("right")}
            className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </Button>
        </div>
      )}
      <div className="w-[80%] flex justify-end my-8">
        <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full flex items-center space-x-2 py-6 transition-all duration-300 group">
          <Link href="/realisations">
            <span className="text-sm font-medium">TOUT VOIR</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
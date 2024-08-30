'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { useInView } from 'react-intersection-observer';

const images = [
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp',
  'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/thomas-william-Q3PzwHKpEdc-unsplash.webp',
];

export default function PortfolioPics() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsTransitioning(false);
        }, 500);
      }, 3700);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center mb-32 sm:mb-40">
      <div className="w-[85%] h-full flex justify-start mb-8 sm:mb-16">
                <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight">NOS RÉALISATIONS</p>
            </div>
      {inView && (
        <div className="h-full w-full flex items-center justify-center relative">
          <div className="w-full max-w-[250px] h-[400px] sm:max-w-[450px]  sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
            <Image
            key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`Portfolio image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
            />
          </div>
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-zinc-700' : 'bg-zinc-400'
            }`}
          />
        ))}
      </div>
      <div className="w-[80%] h-full flex justify-end my-8">
        <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full px-6 py-3 flex items-center space-x-2 transition-all duration-300 group">
          <Link href="/catalogue">
            <span className="text-sm font-medium">TOUT VOIR</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
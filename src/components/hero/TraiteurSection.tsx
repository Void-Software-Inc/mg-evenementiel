'use client';

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';
import { Button } from "../ui/button";
import Link from "next/link";

type ProductMenu = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function Traiteur() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const xlScrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canXlScrollLeft, setCanXlScrollLeft] = useState(false);
  const [canXlScrollRight, setCanXlScrollRight] = useState(true);
  
  const cateringImages = [
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r10.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r17.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r8.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r31.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r7.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r32.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r30.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r84.webp"
  ];
  
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 to account for potential rounding errors
    }
  };

  const checkXlScroll = () => {
    if (xlScrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = xlScrollContainerRef.current;
      setCanXlScrollLeft(scrollLeft > 0);
      setCanXlScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const xlScrollContainer = xlScrollContainerRef.current;
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll(); // Check initial state
    }
    
    if (xlScrollContainer) {
      xlScrollContainer.addEventListener('scroll', checkXlScroll);
      checkXlScroll(); // Check initial state
    }
    
    return () => {
      scrollContainer?.removeEventListener('scroll', checkScroll);
      xlScrollContainer?.removeEventListener('scroll', checkXlScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right", containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
    
  return (   
    <div className="h-full w-full mb-40 flex flex-col items-center justify-center">
      <div className="w-full px-4 mb-2 mt-0 flex flex-col items-center justify-center">
        <h2 className="text-zinc-800 text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
          TRAITEUR
        </h2>
        <p className="text-zinc-800 text-center text-lg sm:text-xl xl:text-2xl font-extralight">
          Un service traiteur conçu pour répondre à vos attentes : repas assis, buffets dînatoires, vin d'honneur, cocktails, brunch...
        </p>  
      </div>
      
      {/* Small screens (grid layout) */}
      <div className="w-full px-4 mt-8 max-w-7xl mx-auto sm:hidden">
        <div className="grid grid-cols-2 gap-y-4 gap-x-3">
          {/* First image - 270px height */}
          <div className="col-span-1 row-span-1">
            <div className="relative w-full h-[270px] rounded-lg overflow-hidden">
              <Image 
                src={cateringImages[0]} 
                alt="Service traiteur 1" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Second image - 220px height */}
          <div className="col-span-1 row-span-1">
            <div className="relative w-full h-[220px] rounded-lg overflow-hidden">
              <Image 
                src={cateringImages[1]} 
                alt="Service traiteur 2" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Third image - 220px height */}
          <div className="col-span-1 row-span-1">
            <div className="relative w-full h-[220px] rounded-lg overflow-hidden">
              <Image 
                src={cateringImages[2]} 
                alt="Service traiteur 3" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Fourth image - 270px height */}
          <div className="col-span-1 row-span-1 -mt-[50px]">
            <div className="relative w-full h-[270px] rounded-lg overflow-hidden">
              <Image 
                src={cateringImages[3]} 
                alt="Service traiteur 4" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Medium screens (scrollable) */}
      <div className="hidden sm:block lg:hidden w-full h-full relative">
        <div 
          className="w-full bg-transparent p-8 overflow-x-auto scrollbar-hide" 
          ref={scrollContainerRef}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div 
            className="flex space-x-6 min-w-max pr-4"
            style={{
              '&::WebkitScrollbar': {
                display: 'none',
              },
            } as React.CSSProperties}
          >
            {cateringImages.map((image, index) => (
              <div key={index} className="w-[300px] flex-shrink-0">
                <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
                  <Image 
                    src={image} 
                    alt={`Service traiteur ${index + 1}`} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {canScrollLeft && (
          <Button
            onClick={() => scroll("left", scrollContainerRef)}
            className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            onClick={() => scroll("right", scrollContainerRef)}
            className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </Button>
        )}
      </div>
      
      {/* Large screens (lg to xl) */}
      <div className="hidden lg:block xl:hidden w-full px-4 mt-8 max-w-7xl mx-auto">
        <div className="flex space-x-4">
          {cateringImages.map((image, index) => (
            <div key={index} className="flex-1">
              <div className="relative w-full h-[472px] rounded-lg overflow-hidden">
                <Image 
                  src={image} 
                  alt={`Service traiteur ${index + 1}`} 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Extra large screens (xl and above) - landscape mode with scrollable row */}
      <div className="hidden xl:block w-full mt-8 relative">
        <div 
          className="w-full bg-transparent px-4 overflow-x-auto scrollbar-hide" 
          ref={xlScrollContainerRef}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div 
            className="flex space-x-4 min-w-max px-4"
            style={{
              '&::WebkitScrollbar': {
                display: 'none',
              },
            } as React.CSSProperties}
          >
            {cateringImages.map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="relative w-[342px] h-[472px] rounded-lg overflow-hidden">
                  <Image 
                    src={image} 
                    alt={`Service traiteur ${index + 1}`} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {canXlScrollLeft && (
          <Button
            onClick={() => scroll("left", xlScrollContainerRef)}
            className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Button>
        )}
        {canXlScrollRight && (
          <Button
            onClick={() => scroll("right", xlScrollContainerRef)}
            className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </Button>
        )}
      </div>
      
      {/* Buttons section */}
      <div className="w-full flex flex-col xs:flex-row items-center justify-center xs:justify-end sm:w-[95%] mt-8 space-y-2 xs:space-y-0 xs:space-x-3 px-4">
        <Button 
          asChild 
          className="w-[60%] xs:w-auto border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center justify-center space-x-2 transition-all duration-300 group"
        >
          <Link href="/infos#traiteur">
            <span className="text-sm font-medium">EN SAVOIR PLUS</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
        <Button 
          asChild 
          className="w-[60%] xs:w-auto border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center justify-center space-x-2 transition-all duration-300 group"
        >
          <Link href="/traiteur">
            <span className="text-sm font-medium">CATALOGUE</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
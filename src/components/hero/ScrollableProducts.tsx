'use client';

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollableProducts() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
          const scrollAmount = 200;
          scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
          });
        }
      };
      
    return (   
        <div className="h-full w-full mb-72 flex flex-col items-center justify-center">
            <div className="w-[80%] h-full mt-56 mb-16 sm:mb-10 flex lg:flex-row flex-col items-center justify-center">
                    <div className="h-fit w-full lg:w-1/2 flex flex-col space-y-1 sm:space-y-4 justify-start">
                        <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight  xl:-ml-0">LOCATION</p>
                        <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl text-left xl:text-center font-extralight xl:-ml-20 pb-4 lg:pb-0">DE MATÉRIEL</p>
                    </div>
                    <div className="h-fit w-full lg:w-1/2 flex items-center justify-start lg:justify-end xl:justify-center lg:mb-20">
                        <div className="w-full xl:w-[480px] h-[40px]">
                        <p className="text-zinc-800 xl:text-left text-lg sm:text-xl xl:text-2xl font-extralight">Une large gamme de produits pour décorer et personnaliser vos événements</p>
                        </div>
                    </div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center relative">
                        <div 
                            className="w-full bg-black p-8 overflow-x-auto" 
                            ref={scrollContainerRef}
                            style={{
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            <div 
                                className="w-[80%] flex space-x-4 min-w-max"
                                style={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                } as React.CSSProperties}
                            >
                                {[...Array(7)].map((_, index) => (
                                    <div key={index} className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] bg-gray-200 flex-shrink-0" />
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => scroll("left")}
                            className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full lg:hidden"
                        >
                            <ChevronLeft className="w-6 h-6 text-black" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full lg:hidden"
                        >
                            <ChevronRight className="w-6 h-6 text-black" />
                        </button>
            </div>
        </div>
    );
}
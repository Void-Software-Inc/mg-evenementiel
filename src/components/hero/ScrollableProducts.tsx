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

export default function ScrollableProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductMenu[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);  // Set to true by default

  useEffect(() => {
    const fetchMenuProducts = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching menu products:', error);
      }
    };
    fetchMenuProducts();
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 to account for potential rounding errors
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll(); // Check initial state
    }
    return () => scrollContainer?.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    // Check if we can scroll right after products are loaded
    if (products.length > 0) {
      checkScroll();
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
    
  return (   
    <div className="h-full w-full mb-40 flex flex-col items-center justify-center">
      <div className="w-full px-4 mb-2 mt-0 md:mt-40 flex flex-col items-center justify-center">
        <h2 className="text-zinc-800 text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
          LOCATION DE MATÉRIEL
        </h2>
        <p className="text-zinc-800 text-center text-lg sm:text-xl xl:text-2xl font-extralight">
          Une large gamme de produits pour décorer et personnaliser vos événements
        </p>
      </div>
      <div className="w-full h-full flex items-center justify-center relative">
        <div 
          className="w-full bg-transparent p-8 overflow-x-auto scrollbar-hide" 
          ref={scrollContainerRef}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div 
            className="w-[80%] flex space-x-4 min-w-max pr-4"
            style={{
              '&::WebkitScrollbar': {
                display: 'none',
              },
            } as React.CSSProperties}
          >
            {products.map((product) => (
              <Link href={`/catalogue/${product.id}`} key={product.id}>
                <div key={product.id} className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] flex-shrink-0 relative bg-gray-100">
                  <div className="absolute inset-0 p-1 flex items-center justify-center -mt-8 sm:mt-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 200px, 350px"
                        style={{ objectFit: "contain" }}
                        onError={() => console.error(`Failed to load image for product ${product.id}`)}
                      />
                    </div>
                  </div>
                  <div className="w-full absolute bottom-0 left-0 right-0 bg-transparent text-zinc-700 p-2">
                    <p className="pl-2 text-md font-light tracking-tighter w-[95%] truncate">
                      {product.name.toUpperCase()}
                    </p>
                    <p className="pl-2 text-2xl font-light">{product.price.toFixed(2)} €</p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] flex-shrink-0 flex-col relative bg-zinc-100 flex items-center justify-center">
              <p className="text-zinc-800 text-2xl font-extralight text-center px-4 pb-6">
                DÉCOUVREZ LE CATALOGUE COMPLET
              </p>
              <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                <Link href="/catalogue">
                  <span className="text-sm font-medium">VOIR PLUS</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {canScrollLeft && (
          <Button
            onClick={() => scroll("left")}
            className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            onClick={() => scroll("right")}
            className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/80 active:bg-white/50 shadow-md p-2 rounded-full transition-opacity duration-300 ease-in-out"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </Button>
        )}
      </div>
      <div className="w-[95%] h-fit flex justify-center lg:justify-end">
        <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
          <Link href="/catalogue">
            <span className="text-sm font-medium">CATALOGUE</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
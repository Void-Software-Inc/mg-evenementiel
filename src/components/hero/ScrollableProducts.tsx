'use client';

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from 'next/image';
import { useState } from 'react';
import { Button } from "../ui/button";
import Link from "next/link";

type ProductMenu = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};
/***************************************************************
 *                                                             *
 *                          USAGE                              *        
 *                                                             *
 *  1. Utiliser des images de produit sans background          *
 *  2. Mettre le nom du produit en majuscules                  *
 *  3. Ajouter un tiret à la fin du nom du produit             *
 *  4. Faire figurer les centimes dans le prix (format O.OO)   *
 *                                                             *
 *                                                             *
 ***************************************************************/
const products: ProductMenu[] = [
  { id: 1, name: "VERRE À VIN BLEU -", price: 1.50, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/verre-bleu-removebg-preview.png?t=2024-08-28T15%3A04%3A23.923Z" },
  { id: 2, name: "CHAISE EN VELOURS -", price: 3.50, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/chaise-removebg-preview.png?t=2024-08-28T15%3A07%3A47.274Z" },
  { id: 3, name: "LOT DE VASES BLEUS -", price: 7.50, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/vases-removebg-preview.png?t=2024-08-28T15%3A02%3A05.822Z" },
  { id: 4, name: "NAPPE BLANCHE -", price: 2.00, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/nappe-removebg-preview.png?t=2024-08-28T15%3A08%3A02.854Z" },
  { id: 5, name: "BOUQUET DE ROSES -", price: 5.00, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/roses-removebg-preview.png?t=2024-08-28T15%3A08%3A14.880Z" },
  { id: 6, name: "GUIRLANDE D'EXTÉRIEUR -", price: 4.00, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/guirlande-removebg-preview.png?t=2024-08-28T15%3A08%3A34.640Z" },
  { id: 7, name: "ASSIETTE EN ÉMAIL -", price: 1.00, imageUrl: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/menu/png/assiette-removebg-preview.png?t=2024-08-28T15%3A01%3A32.016Z" },
];

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
        <div className="h-full w-full mb-40 flex flex-col items-center justify-center">
            <div className="w-[80%] h-full sm:mb-10 flex lg:flex-row flex-col items-center justify-center">
                    <div className="h-fit w-full lg:w-1/2 flex flex-col space-y-1 sm:space-y-4 justify-start">
                        <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight  xl:-ml-0">LOCATION</p>
                        <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl text-left xl:text-center font-extralight xl:-ml-20 pb-4 lg:pb-0">DE MATÉRIEL</p>
                    </div>
                    <div className="h-fit w-full lg:w-1/2 flex items-end justify-start lg:justify-end xl:justify-center mb-10 sm:mb-0">
                        <div className="w-full xl:w-[480px] h-[40px]">
                        <p className="text-zinc-800 xl:text-left text-lg sm:text-xl xl:text-2xl font-extralight">Une large gamme de produits pour décorer et personnaliser vos événements</p>
                        </div>
                    </div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center relative">
                        <div 
                            className="w-full bg-transparent p-8 overflow-x-auto" 
                            ref={scrollContainerRef}
                            style={{
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            <div 
                                className="w-[80%] flex space-x-4 min-w-max pr-4"
                                style={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                } as React.CSSProperties}
                            >
                                {products.map((product) => (
                                    <div key={product.id} className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] flex-shrink-0 relative bg-gray-100">
                                        <div className="absolute inset-0 p-1 flex items-center justify-center -mt-8 sm:mt-0">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-transparent text-zinc-700 p-2">
                                            <p className="pl-2 text-md font-light tracking-tighter">{product.name}</p>
                                            <p className="pl-2 text-2xl font-light">{product.price.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                ))}
                                {/* Additional zinc-100 div with centered text */}
                                <div className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] flex-shrink-0 flex-col relative bg-zinc-100 flex items-center justify-center">
                                    <p className="text-zinc-800 text-2xl font-extralight text-center px-4 pb-6">
                                        DÉCOUVREZ LE CATALOGUE COMPLET
                                    </p>
                                    <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full px-6 py-3 flex items-center space-x-2 transition-all duration-300 group">
                                        <Link href="/catalogue">
                                        <span className="text-sm font-medium">VOIR PLUS</span>
                                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                        </Link>
                                    </Button>
                                </div>
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
            <div className="w-[93%] h-fit flex justify-end">
            <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full px-6 py-3 flex items-center space-x-2 transition-all duration-300 group">
                                        <Link href="/catalogue">
                                        <span className="text-sm font-medium">CATALOGUE</span>
                                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                        </Link>
                                    </Button>
            </div>
        </div>
    );
}
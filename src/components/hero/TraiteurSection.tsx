'use client';

import Image from 'next/image';
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const cateringImages = [
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r10.webp",
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r17.webp",
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r8.webp",
];

export default function Traiteur() {
  
  return (
    <div className="w-full mb-32 flex flex-col">

      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-16 mb-10">
        <h2 className="font-playfair text-zinc-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
          SERVICE TRAITEUR
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base lg:text-lg font-light leading-relaxed mt-4 max-w-[85%] lg:max-w-[65%] text-justify">
          Nous proposons également un service traiteur spécialisé dans les mariages et les événements — réunions familiales, séminaires professionnels — pour tous les moments de la journée : brunch, repas assis, pièces montées, gâteaux sur mesure, et collations en soirée.
        </p>
      </div>

      {/* Images */}
      <div className="px-6 sm:px-10 lg:px-16">
        {/* Mobile: single column */}
        <div className="flex flex-col gap-4 sm:hidden">
          {cateringImages.map((src, i) => (
            <div key={i} className="relative w-full h-[300px] bg-zinc-200 rounded-sm overflow-hidden">
              <Image src={src} alt={`Service traiteur ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Tablet: 2 columns */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
          {cateringImages.map((src, i) => (
            <div
              key={i}
              className={`relative w-full bg-zinc-200 rounded-sm overflow-hidden ${i === 2 ? 'col-span-2 h-[340px]' : 'h-[420px]'}`}
            >
              <Image src={src} alt={`Service traiteur ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Desktop lg+: 3 equal columns, fixed height, more gap on xl */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-10 2xl:gap-48 w-[85%] mx-auto">
          {cateringImages.map((src, i) => (
            <div key={i} className="relative w-full h-[340px] xl:h-[440px] bg-zinc-200 rounded-sm overflow-hidden">
              <Image src={src} alt={`Service traiteur ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 sm:px-10 lg:px-16 mt-8 flex flex-col sm:flex-row items-start sm:items-center sm:justify-end gap-3">
        <Button
          asChild
          className="border border-zinc-800 bg-transparent text-zinc-800 hover:bg-zinc-800 hover:text-white font-light rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 group"
        >
          <Link href="/traiteur">
            <span className="text-sm tracking-wide">EN SAVOIR PLUS</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button
          asChild
          className="border border-zinc-800 bg-transparent text-zinc-800 hover:bg-zinc-800 hover:text-white font-light rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 group"
        >
          <Link href="/traiteur/catalogue">
            <span className="text-sm tracking-wide">CATALOGUE</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

    </div>
  );
}
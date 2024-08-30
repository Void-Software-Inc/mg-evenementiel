"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

interface FilterControlsProps {
  initialFilters: { type: string; lieu: string };
}

interface ImageData {
  src: string;
  alt: string;
  isPortrait: boolean;
  type: string;
  lieu: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({ initialFilters }) => {
  const [selectedType, setSelectedType] = useState(initialFilters.type || "Tout");
  const [selectedLieu, setSelectedLieu] = useState(initialFilters.lieu || "Tout");
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLieuOpen, setIsLieuOpen] = useState(false);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const types = ["Tout", "Mariage", "Baptême", "Baby Shower", "Anniversaire", "Traiteur", "Professionnel", "Autre"];
  const places = ["Tout", "En intérieur", "En extérieur"];

  const staticImages: ImageData[] = [
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp", alt: "Portrait 1", isPortrait: true, type: "Mariage", lieu: "En intérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/engin-akyurt-i3rFV6ULk-o-unsplash_1_.webp", alt: "Landscape 1", isPortrait: false, type: "Mariage", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/mitchell-lawler-tbaoryUol_E-unsplash-1.webp", alt: "Landscape 2", isPortrait: false, type: "Professionnel", lieu: "En intérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/d-l-samuels-ZIRlju8VBXg-unsplash.webp", alt: "Portrait 2", isPortrait: true, type: "Baptême", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp", alt: "Portrait 3", isPortrait: true, type: "Mariage", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/wedding-dreamz-pqkn1uIS6jY-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Mariage", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/saile-ilyas-SiwrpBnxDww-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Traiteur", lieu: "En intérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/katrien-sterckx-fn0xXL9szcU-unsplash_1__1_.webp", alt: "Landscape 3", isPortrait: true, type: "Traiteur", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/kelly-neil-eZX1D12IS9w-unsplash.webp", alt: "Landscape 3", isPortrait: true, type: "Anniversaire", lieu: "En intérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/sirio-hm3efUMoReg-unsplash_2_.webp", alt: "Landscape 3", isPortrait: false, type: "Baby Shower", lieu: "En intérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/photos-by-lanty-dcb2pog89fQ-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Autre", lieu: "En extérieur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/silas-van-overeem-GNM6W-7gkGI-unsplash.webp", alt: "Landscape 3", isPortrait: true, type: "Anniversaire", lieu: "En extérieur" },
  ];

  useEffect(() => {
    console.log("Static Images:", staticImages);
  }, []);

  useEffect(() => {
    const filtered = staticImages.filter(image => 
      (selectedType === "Tout" || image.type === selectedType) &&
      (selectedLieu === "Tout" || image.lieu === selectedLieu)
    );
    console.log("Filtered Images:", filtered);
    setFilteredImages(filtered);
  }, [selectedType, selectedLieu]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setIsTypeOpen(false);
  };

  const handleLieuChange = (value: string) => {
    setSelectedLieu(value);
    setIsLieuOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedType("Tout");
    setSelectedLieu("Tout");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredImages]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center mt-28 mb-32">
      <div className="h-fit w-[85%]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-fit w-[85%]">
            <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
            <div className="relative pb-12">
              <p className="text-4xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap uppercase">
                {selectedType === "Tout" ? "Tout" : selectedType}
              </p>
              <div className='h-fit w-full absolute -mt-3 text-end'>
                <p className="text-md pt-1 sm:pt-0 sm:text-2xl font-thin uppercase">
                  {selectedLieu === "Tout" ? "" : selectedLieu}
                </p>
              </div>
            </div>
            <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">
              {filteredImages.length}
            </div>
            </div>
          </div>

          <div className="h-fit w-full flex flex-col lg:flex-row mt-0 md:mt-4">
            <div className="h-fit w-full flex justify-start space-x-1 lg:space-x-2 lg:ml-2">
              <DropdownMenu open={isTypeOpen} onOpenChange={setIsTypeOpen}>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                    Type
                    <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-300 ease-in-out ${isTypeOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  {types.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={selectedType === type}
                      onCheckedChange={() => handleTypeChange(type)}
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={isLieuOpen} onOpenChange={setIsLieuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                    Lieu
                    <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-300 ease-in-out ${isLieuOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-26">
                  {places.map((place) => (
                    <DropdownMenuCheckboxItem
                      key={place}
                      checked={selectedLieu === place}
                      onCheckedChange={() => handleLieuChange(place)}
                    >
                      {place}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-1 lg:mt-0 ml-0 lg:ml-2">
              <Button onClick={handleResetFilters} className="bg-transparent transition active:scale-95 space-x-1 overflow-hidden duration-200 ease-in-out hover:bg-zinc-100 border border-zinc-800 text-zinc-800 rounded-full">
                <span className="pr-2">Supprimer filtres</span>
                <UpdateIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
<div className='h-fit w-full flex justify-center'>
  <div className='h-fit w-[95%]'>
    <div className={`grid gap-2 mt-8 ${
      filteredImages.length === 1 
        ? 'grid-cols-1 place-items-center' 
        : 'grid-cols-6'
    }`}>
      {filteredImages.map((image, index) => (
        <div 
          key={index} 
          ref={(el) => { imageRefs.current[index] = el; }}
          className={`relative ${
            filteredImages.length === 1 
              ? 'w-1/2'
              : image.isPortrait ? 'col-span-2' : 'col-span-4'
          } opacity-0 translate-y-5 transition-all duration-700 ease-out`}
          style={{ paddingBottom: filteredImages.length === 1 ? '37.5%' : '75%' }}
        >
          <Image 
            src={image.src} 
            alt={image.alt} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
    </div>
  );
};

export default FilterControls;
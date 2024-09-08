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
import FullScreenImage from './FullScreenImage';

interface FilterControlsProps {
  initialFilters: { type: string };
}

interface ImageData {
  src: string;
  alt: string;
  isPortrait: boolean;
  type: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({ initialFilters }) => {
  const [selectedType, setSelectedType] = useState(initialFilters.type || "Tout");
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const types = ["Tout", "Mariage", "Baptême", "Anniversaire", "Traiteur", "Autre"];

  const staticImages: ImageData[] = [
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/felix-manuel-almonte-ulloa-idJeiwIdZTo-unsplash_1_.webp", alt: "Portrait 1", isPortrait: true, type: "Mariage" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/engin-akyurt-i3rFV6ULk-o-unsplash_1_.webp", alt: "Landscape 1", isPortrait: false, type: "Mariage" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/mitchell-lawler-tbaoryUol_E-unsplash-1.webp", alt: "Landscape 2", isPortrait: false, type: "Anniversaire" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/d-l-samuels-ZIRlju8VBXg-unsplash.webp", alt: "Portrait 2", isPortrait: true, type: "Baptême" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/jeremy-wong-weddings-K8KiCHh4WU4-unsplash(1).webp", alt: "Portrait 3", isPortrait: true, type: "Mariage" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/wedding-dreamz-pqkn1uIS6jY-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Mariage" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/saile-ilyas-SiwrpBnxDww-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Traiteur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/katrien-sterckx-fn0xXL9szcU-unsplash_1__1_.webp", alt: "Landscape 3", isPortrait: true, type: "Traiteur" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/kelly-neil-eZX1D12IS9w-unsplash.webp", alt: "Landscape 3", isPortrait: true, type: "Anniversaire" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/sirio-hm3efUMoReg-unsplash_2_.webp", alt: "Landscape 3", isPortrait: false, type: "Anniversaire" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/paysage/photos-by-lanty-dcb2pog89fQ-unsplash_1_.webp", alt: "Landscape 3", isPortrait: false, type: "Autre" },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/realisations/portrait/silas-van-overeem-GNM6W-7gkGI-unsplash.webp", alt: "Landscape 3", isPortrait: true, type: "Anniversaire" },
  ];

  useEffect(() => {
    console.log("Static Images:", staticImages);
  }, []);

  useEffect(() => {
    const filtered = staticImages.filter(image => 
      selectedType === "Tout" || image.type === selectedType
    );
    console.log("Filtered Images:", filtered);
    setFilteredImages(filtered);
  }, [selectedType]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setIsTypeOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedType("Tout");
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

  const handleImageClick = (index: number) => {
    setFullScreenIndex(index);
  };

  const handleCloseFullScreen = () => {
    setFullScreenIndex(null);
  };

  const handlePrevImage = () => {
    setFullScreenIndex((prev) => (prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setFullScreenIndex((prev) => (prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center mt-28 mb-32">
      <div className="h-fit w-[85%]">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-fit w-[85%]">
              <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
                <div className="relative pb-12">
                  <h1 className='text-xs sm:text-sm font-extralight sm:font-light text-zinc-700 ml-0 sm:ml-2'>RÉALISATIONS</h1>
                  <p className="text-4xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap uppercase">
                    {selectedType === "Tout" ? "Tout" : selectedType}
                  </p>
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
        </div>
        <div className='h-fit w-full flex justify-center'>
          <div className='h-fit w-[99%]'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
              {filteredImages.map((image, index) => (
                <div 
                  key={index} 
                  ref={(el) => { imageRefs.current[index] = el; }}
                  className="relative aspect-video xl:aspect-auto xl:min-h-[325px] 2xl:min-h-[400px] opacity-0 translate-y-5 transition-all duration-700 ease-out cursor-pointer"
                  onClick={() => handleImageClick(index)}
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
      
      {fullScreenIndex !== null && (
        <FullScreenImage
          images={filteredImages}
          currentIndex={fullScreenIndex}
          onClose={handleCloseFullScreen}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default FilterControls;
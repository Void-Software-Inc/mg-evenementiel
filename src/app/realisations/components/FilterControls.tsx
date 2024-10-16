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
  types: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({ initialFilters }) => {
  const [selectedType, setSelectedType] = useState(initialFilters.type || "Tout");
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const types = ["Tout", "Mariage", "Baptême", "Anniversaire", "Traiteur", "Autre"];

  const staticImages: ImageData[] = [
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r17.webp", alt: "Table Anniversaire Rose", types: ["Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r1.webp", alt: "Table Anniversaire Rose",  types: ["Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r42.webp", alt: "Table Anniversaire Rose", types: ["Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r13.webp", alt: "Table Mariage Vert",  types: ["Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r25.webp", alt: "Table Mariage Vert",  types: ["Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r14.webp", alt: "Table Mariage Vert",  types: ["Mariage"] },
    
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r54.webp", alt: "Table Mariage Vert",  types: ["Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r55.webp", alt: "Table Mariage Vert", types: ["Mariage"] },
  
    
    
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r19.webp", alt: "Buffet",  types: ["Anniversaire", "Traiteur"] },  
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r8.webp", alt: "Gâteau Anniversaire Framboises",  types: ["Anniversaire", "Traiteur"] },

    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r52.webp", alt: "Buffet",  types: ["Anniversaire", "Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r58.webp", alt: "Buffet", types: ["Anniversaire", "Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r53.webp", alt: "Gâteau Anniversaire 20", types: ["Anniversaire", "Traiteur"] },
    
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r23.webp", alt: "Gâteau Anniversaire 2",  types: ["Anniversaire", "Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r28.webp", alt: "Gâteau Anniversaire 0",  types: ["Anniversaire", "Traiteur"] },

    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r83.webp", alt: "Table Mariage Or",  types: ["Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r3.webp", alt: "Table Mariage Or",  types: ["Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r26.webp", alt: "Chapiteau 5m",  types: ["Mariage", "Autre", "Baptême", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r27.webp", alt: "Chapiteau 4m",  types: ["Mariage", "Autre", "Baptême", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r21.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r29.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Mariage"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r11.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Mariage", "Anniversaire" ] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r91.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Mariage", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r90.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r97.webp", alt: "Table blanche mariage",  types: ["Mariage"] },
     
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r84.webp", alt: "Table bleu et or",  types: ["Mariage", "Baptême", "Autre", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r87.webp", alt: "Table bleu et or",  types: ["Mariage", "Baptême", "Autre", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r18.webp", alt: "Table bleu et or",  types: ["Mariage", "Baptême", "Autre", "Anniversaire"] },

    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r4.webp", alt: "Table Noël",  types: ["Autre"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r20.webp", alt: "Table Mariage rouge", types: ["Mariage","Autre", "Anniversaire","Baptême"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r5.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r76.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r47.webp", alt: "Cocktail fraise",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r48.webp", alt: "Cocktail Maracuja",  types: ["Traiteur"] },
      

    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r81.webp", alt: "Cocktail Menthe", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r82.webp", alt: "Cocktail Ananas", types: ["Traiteur"] },



    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r6.webp", alt: "Amuse-bouche", types: ["Traiteur", "Mariage", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r7.webp", alt: "Amuse-bouche",  types: ["Traiteur", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r39.webp", alt: "Amuse-bouche", types: ["Traiteur", "Anniversaire"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r86.webp", alt: "Amuse-bouche",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r88.webp", alt: "Amuse-bouche",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r89.webp", alt: "Amuse-bouche",  types: ["Traiteur"] },



    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r2.webp", alt: "Table Mariage Automne",  types: ["Mariage"] },
     
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r15.webp", alt: "Plateau Charcuteries",types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r45.webp", alt: "Plateau Fromages", types: ["Traiteur"] },

    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r10.webp", alt: "Citrons",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r94.webp", alt: "Poulet",  types: ["Traiteur"] },
 
 
       { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r9.webp", alt: "Crevettes",  types: ["Traiteur"] },
       { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r92.webp", alt: "Poivrons",  types: ["Traiteur"] },
       { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r99.webp", alt: "Moules",  types: ["Traiteur"] },

    
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r12.webp", alt: "Paella",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r16.webp", alt: "Paella assiettes", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r46.webp", alt: "Paella assiettes",  types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r93.webp", alt: "Frites", types: ["Traiteur"] },
    
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r30.webp", alt: "Plateau fromage", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r37.webp", alt: "Plateau charcuterie", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r32.webp", alt: "Verrines avec fleur", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r33.webp", alt: "Verrines taboulé", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r34.webp", alt: "Bagels saumon", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r35.webp", alt: "Crevettes frites", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r36.webp", alt: "Bagels", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r38.webp", alt: "Boîte de verrines", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r40.webp", alt: "Verrines salade", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r41.webp", alt: "Wraps", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r31.webp", alt: "Boîte MG traiteur", types: ["Traiteur"] },
    { src: "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r51.webp", alt: "Mur à cocktails", types: ["Traiteur"] },


  ];

  useEffect(() => {
 //   console.log("Static Images:", staticImages);
  }, []);

  useEffect(() => {
    const filtered = staticImages.filter(image => 
      selectedType === "Tout" || image.types.includes(selectedType) // Check if selectedType is in image.types
    );
 //   console.log("Filtered Images:", filtered);
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
                    
                    loading="lazy"
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
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface FilterControlsProps {
  initialFilters: { type: string; lieu: string };
}

const FilterControls: React.FC<FilterControlsProps> = ({ initialFilters }) => {
  const [selectedType, setSelectedType] = useState(initialFilters.type);
  const [selectedLieu, setSelectedLieu] = useState(initialFilters.lieu);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLieuOpen, setIsLieuOpen] = useState(false);

  const types = ["Tout", "Mariage", "Baptême", "Baby Shower", "Anniversaire", "Traiteur"];
  const places = ["Tout", "En intérieur", "En extérieur"];

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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center mt-28 mb-32">
      <div className="h-fit w-[85%]">
        <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
          <div className="relative pb-12">
            <p className="text-5-1/2xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap">
              {selectedType === "Tout" ? "Tout" : selectedType}
            </p>
            <div className='h-fit w-full absolute -mt-3 sm:mt-2 text-end'>
              <p className="text-1xl sm:text-2xl font-thin">
                {selectedLieu === "Tout" ? "" : selectedLieu}
              </p>
            </div>
          </div>
          <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">
            103
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
              <span className="pr-2">Nettoyer filtres</span>
              <UpdateIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
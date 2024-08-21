"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
import { productTypes, productColors, ProductType, ProductColor } from "@/utils/types/products";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CatalogDisplay: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const handleTypeChange = (type: string) => {
    setSelectedType(prev => prev === type ? "" : type);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
        prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleResetFilters = () => {
    setSelectedType("");
    setSelectedColors([]);
  };

  const renderColorSwatch = (color: ProductColor) => {
    if (color.value === "blanc") {
        return (
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-300" style={{ backgroundColor: color.hex }}></div>
        );
    } else if (color.value === "multicolore") {
        return (
          <div className="w-4 h-4 mr-2 rounded-full overflow-hidden flex flex-wrap">
            <div className="w-2 h-2 bg-yellow-400"></div>
            <div className="w-2 h-2 bg-green-500"></div>
            <div className="w-2 h-2 bg-pink-400"></div>
            <div className="w-2 h-2 bg-blue-500"></div>
          </div>
        );
    } else {
        return (
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex }}></div>
        );
    }
  };

  const displayColors = () => {
    if (selectedColors.length === 0) return "";
    if (selectedColors.length === 1) return selectedColors[0];
    if (selectedColors.length === 2) return selectedColors.join(', ');
    return `${selectedColors[0]}, ${selectedColors[1]}...`;
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col items-center justify-center mt-28">
        <div className="h-fit w-[85%]">
          <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
            <div className="relative pb-12">
              <p className="text-5-1/2xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap">
                {selectedType || 'Tout'}
              </p>
              <div className='h-fit w-full absolute -mt-3 sm:mt-2 text-end'>
                <p className="text-1xl sm:text-2xl font-thin">
                    {displayColors()}
                </p>
              </div>
            </div>
            <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">103</div>
          </div>

          <div className="h-fit w-full flex flex-col sm:flex-row sm:justify-between mt-4">
            <div className="h-fit w-full flex justify-start space-x-1 lg:space-x-2 lg:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                      {selectedType || "Type"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 max-h-60 overflow-y-auto">
                  {productTypes.map((type: ProductType) => (
                    <DropdownMenuCheckboxItem
                      key={type.value}
                      checked={selectedType === type.name}
                      onCheckedChange={() => handleTypeChange(type.name)}
                    >
                      {type.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                    {selectedColors.length > 0 ? `${selectedColors.length} sélectionné(s)` : "Couleur"}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-26 max-h-60 overflow-y-auto">
                  {productColors.map((color: ProductColor) => (
                    <DropdownMenuCheckboxItem
                      key={color.value}
                      checked={selectedColors.includes(color.name)}
                      onCheckedChange={() => handleColorChange(color.name)}
                    >
                      <div className="flex items-center">
                        {renderColorSwatch(color)}
                        {color.name}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-1 sm:mt-0 ml-0 lg:ml-2">
              <Button onClick={handleResetFilters} className="bg-transparent transition active:scale-95 space-x-1 overflow-hidden duration-200 ease-in-out hover:bg-zinc-100 border border-zinc-800 text-zinc-800 rounded-full">
                <span className="pr-2">Nettoyer filtres</span>
                <UpdateIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogDisplay;
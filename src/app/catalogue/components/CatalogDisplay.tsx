"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";
import { productTypes, productColors, ProductType, ProductColor, Product } from "@/utils/types/products";
import { getProducts } from "@/services/products";
import ProductCard from "@/app/catalogue/components/ProductCard";
import SkeletonProductCard from "@/app/catalogue/components/SkeletonProductCard";
import { useProductContext } from '@/app/context/ProductContext';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CatalogDisplay: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { productsShouldRefetch, setProductsShouldRefetch } = useProductContext();
  const [isMounted, setIsMounted] = useState(false);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getProducts();
 //     console.log("Fetched products:", fetchedProducts);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cachedProducts', JSON.stringify(fetchedProducts));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setProductsShouldRefetch(false);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
    if (productsShouldRefetch) {
      fetchProducts();
    } else {
      if (typeof window !== 'undefined') {
        const cachedProducts = sessionStorage.getItem('cachedProducts');
        if (cachedProducts) {
          const parsedProducts = JSON.parse(cachedProducts);
          setProducts(parsedProducts);
          setFilteredProducts(parsedProducts);
          setIsLoading(false);
        } else {
          fetchProducts();
        }
      }
    }
  }, [productsShouldRefetch]);

  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    if (isMounted) {
      const newFilteredProducts = memoizedProducts.filter(product => {
        const typeMatch = selectedType === "" || product.type === selectedType;
        const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
        const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return typeMatch && colorMatch && searchMatch;
      });
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedType, selectedColors, searchQuery, memoizedProducts, isMounted]);

  const handleTypeChange = (type: string) => {
    setSelectedType(prev => prev === type ? "" : type);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedType("");
    setSelectedColors([]);
    setSearchQuery("");
  };

  const getMetallicBackground = (color: string) => {
    if (color === 'gold') {
      return `linear-gradient(45deg, #B8860B, #FFD700, #DAA520)`;
    } else if (color === 'silver') {
      return `linear-gradient(45deg, #C0C0C0, #E8E8E8, #A9A9A9)`;
    }
    return '';
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
    } else if (color.value === 'transparent') {
      return (
        <div className="w-4 h-4 mr-2 rounded-full overflow-hidden border border-gray-300 bg-white relative">
          <div className="absolute inset-0 bg-gray-200 bg-opacity-50" style={{
            backgroundImage: `
              linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%)
            `,
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px'
          }} />
        </div>
      );
    } else if (color.value === 'gold' || color.value === 'silver') {
      return (
        <div className="w-4 h-4 rounded-full mr-2" style={{ background: getMetallicBackground(color.value) }}></div>
      );
    } else {
      return (
        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex }}></div>
      );
    }
  };

  const displayColors = () => {
    if (selectedColors.length === 0) return "";
    const colorNames = selectedColors.map(value => productColors.find(c => c.value === value)?.name || value);
    if (colorNames.length === 1) return colorNames[0];
    if (colorNames.length === 2) return colorNames.join(', ');
    return `${colorNames[0]}, ${colorNames[1]}...`;
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col items-center justify-center mt-28">
        <div className="h-fit w-[85%]">
          <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
            <div className="relative pb-12">
              <h1 className='text-xs sm:text-sm font-extralight sm:font-light text-zinc-700 ml-0 sm:ml-2'>CATALOGUE</h1>
              <p className="text-4xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap uppercase">
                {productTypes.find(t => t.value === selectedType)?.name || 'Tout'}
              </p>
              <div className='h-fit w-full absolute -mt-3 sm:mt-2 text-end'>
                <p className="text-1xl sm:text-2xl font-thin">
                  {displayColors()}
                </p>
              </div>
            </div>
            <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">
              {filteredProducts.length}
            </div>
          </div>

          <div className="h-fit w-full flex flex-col lg:flex-row mt-0 md:mt-4">
            <div className="mb-1 lg:mb-0 w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>
            <div className="h-fit w-full flex justify-start space-x-1 lg:space-x-2 lg:ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                    {productTypes.find(t => t.value === selectedType)?.name || "Type"}
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 max-h-60 overflow-y-auto">
                  {productTypes.map((type: ProductType) => (
                    <DropdownMenuCheckboxItem
                      key={type.value}
                      checked={selectedType === type.value}
                      onCheckedChange={() => handleTypeChange(type.value)}
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
                      checked={selectedColors.includes(color.value)}
                      onCheckedChange={() => handleColorChange(color.value)}
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

            <div className="mt-1 lg:mt-0 ml-0 lg:ml-2">
              <Button onClick={handleResetFilters} className="bg-transparent transition active:scale-95 space-x-1 overflow-hidden duration-200 ease-in-out hover:bg-zinc-100 border border-zinc-800 text-zinc-800 rounded-full">
                <span className="pr-2">Nettoyer filtres</span>
                <UpdateIcon />
              </Button>
            </div>
          </div>
          </div>
          
          <div className="w-[90%] mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    priority={index < 8}
                  />
                ))
            }
          </div>

        
      </div>
    </div>
  );
};

export default CatalogDisplay;
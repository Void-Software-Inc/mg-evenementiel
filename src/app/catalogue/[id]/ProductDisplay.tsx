"use client"

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getProduct, getProductImages } from '@/services/products';
import { Product, ProductImage, productColors } from '@/utils/types/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/app/context/CartContext';
import { Minus, Plus, ChevronLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

interface ProductDisplayProps {
  id: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ id }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const changeImage = useCallback((newImageUrl: string) => {
    setCurrentImage(newImageUrl);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(parseInt(id));
        const fetchedProductImages = await getProductImages(parseInt(id));
        setProduct(fetchedProduct);
        setProductImages(fetchedProductImages);
        setCurrentImage(fetchedProduct.image_url);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    router.push('/catalogue');
  };

  if (loading) return (
    <div className="flex flex-col w-[80%] pt-40 mb-24">
      <div className="absolute top-16 left-0 right-0 w-full h-fit bg-transparent z-10">
        <div className="container mx-auto">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="bg-white/90 mt-4 w-fit"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            <span className="decoration-2 decoration-zinc-600">Retour</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Skeleton className="rounded-lg w-full aspect-square max-w-[500px] mb-5" />
          <div className="flex space-x-2 overflow-x-auto">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-md flex-shrink-0" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0 space-y-4 md:space-y-10">
          <Skeleton className="h-8 md:h-10 w-3/4" />
          <Skeleton className="h-6 md:h-8 w-1/4" />
          <div className="w-full md:w-fit flex flex-col">
            <Skeleton className="h-8 md:h-10 w-full md:w-[300px] mb-4" />
            <Skeleton className="h-10 md:h-12 w-full md:w-[300px]" />
          </div>
          <div className="space-y-2 min-h-[220px]">
            <Skeleton className="h-6 md:h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="absolute top-16 left-0 right-0 w-full h-fit bg-transparent z-10">
            <div className="container mx-auto">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="bg-white/90 mt-4 w-fit"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span className="decoration-2 decoration-zinc-600">Retour</span>
              </Button>
            </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            {error ? 'Erreur' : 'Produit non trouvé'}
          </h2>
          <p className="text-gray-600">
            {"Le produit demandé n'a pas été trouvé."}
          </p>
        </div>
      </div>
    );
  }

  const formatDescription = (description: string) => {
    return description
      .split('\r\n')
      .map(item => item.trim().replace(/^•/, '').trim())
      .filter(item => item !== '');
  };

  const descriptionItems = formatDescription(product.description);

  const cartQuantity = cart.find(item => item.id === product?.id)?.quantity || 0;
  const remainingStock = product ? product.stock - cartQuantity : 0;

  const handleLocalQuantityChange = (newQuantity: number | '') => {
    setLocalQuantity(newQuantity === '' ? 0 : newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      // @ts-ignore
      setLocalQuantity('');
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        handleLocalQuantityChange(parsedValue);
      }
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleInputBlur = () => {
    if (typeof localQuantity === 'string' || localQuantity === 0) {
      setLocalQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const quantityToAdd = localQuantity;
    if (quantityToAdd > 0 && product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        updateQuantity(product.id, existingItem.quantity + quantityToAdd);
      } else {
        addToCart(product, quantityToAdd);
      }
      setLocalQuantity(1);
      
      toast.success(`${quantityToAdd} ${product.name} ajouté au devis`, {
        description: `Total dans le devis: ${existingItem ? existingItem.quantity + quantityToAdd : quantityToAdd}`,
      });
    }
  };

  const getButtonText = () => {
    const quantity = localQuantity;
    if (quantity === 1) {
      return "Ajouter au devis";
    } else if (quantity > 1) {
      return `Ajouter ${quantity} articles au devis`;
    }
    return "Ajouter au devis";
  };

  const getColorName = (colorValue: string) => {
    const color = productColors.find(c => c.value === colorValue);
    return color ? color.name : colorValue;
  };

  return (
    <div className="flex flex-col md:flex-row w-[80%] pt-40 lg:mb-24">
      <div className="absolute top-16 left-0 right-0 w-full h-fit bg-transparent z-10">
        <div className="container mx-auto">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="bg-white/90 mt-4 w-fit"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            <span className="decoration-2 decoration-zinc-600">Retour</span>
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 w-fit">
        <Image
          src={currentImage}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover min-h-[342px] md:w-[370px] md:h-[370px] lg:w-[500px] lg:h-[500px] mb-5"
        />
        <div className="flex space-x-2 overflow-x-auto">
          <div
            className={`cursor-pointer transition-all duration-200 ${
              currentImage === product.image_url ? 'border-2 border-black' : 'border-2 border-transparent'
            }`}
            onMouseEnter={() => changeImage(product.image_url)}
          >
            <Image
              src={product.image_url}
              alt={`${product.name} main`}
              width={120}
              height={120}
              className="rounded-md object-cover flex-shrink-0"
            />
          </div>
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-200 ${
                currentImage === image.url ? 'border-2 border-black' : 'border-2 border-transparent'
              }`}
              onMouseEnter={() => changeImage(image.url)}
            >
              <Image
                src={image.url}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={120}
                height={120}
                className="rounded-md object-cover flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 space-y-4 md:space-y-10">
        
          <p className="text-2xl md:text-5xl font-light ">{product.name}</p>
          <div>
          <p className="text-xl md:text-4xl font-bold py-3 md:py-5">{product.price} €<span className='text-sm font-medium text-zinc-500 pl-1'>HT</span></p>
        
        <div className="w-fit flex flex-col">
          <div className="flex items-center justify-start space-x-6 pb-16">
            <p className="text-2xl font-bold text-zinc-800">Quantité</p>
            <div className="w-full h-fit flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="h-10 w-16 rounded-r-none rounded-l-lg"
                onClick={() => handleLocalQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={localQuantity}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                min={1}
                max={remainingStock}
                className="w-16 text-center text-base rounded-none"
                isModifiedCn
                ref={inputRef}
              />
              <Button 
                variant="outline" 
                size="icon"
                className="h-10 w-16 rounded-r-lg rounded-l-none"
                onClick={() => handleLocalQuantityChange(localQuantity + 1)}
                disabled={localQuantity >= remainingStock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart} 
            className="w-full rounded-full py-6"
            disabled={localQuantity < 1 || localQuantity > remainingStock}
          >
            {getButtonText()}
          </Button>
          <p className="text-sm text-zinc-600 pt-1 text-center">
            Quantité disponible: {remainingStock}/{product.stock}
          </p>
        </div>
        </div>

        <div className="space-y-2 min-h-[220px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold">Description</AccordionTrigger>
              <AccordionContent>
                <ul className="text-base list-disc pl-5 space-y-1">
                  {descriptionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                  <li><p className="">Couleur: {getColorName(product.color)}</p></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
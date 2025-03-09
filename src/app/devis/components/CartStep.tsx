import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from "lucide-react";

const CartStep = ({ onNext }: { onNext: (data: any) => void }) => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [localQuantities, setLocalQuantities] = useState<{ [key: number]: number | '' }>({});
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setLocalQuantities(initialQuantities);
  }, [cart]);

  // Separate cart items by category
  const decorationItems = cart.filter(item => item.category === "decoration");
  const traiteurItems = cart.filter(item => item.category === "traiteur");
  
  // Calculate totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const decorationTotal = decorationItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const traiteurTotal = traiteurItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const decorationCount = decorationItems.length;
  const traiteurCount = traiteurItems.length;

  const handleProductClick = (productId: number) => {
    router.push(`/catalogue/${productId}`);
  };

  const handleLocalQuantityChange = (productId: number, newQuantity: number | '') => {
    setLocalQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const handleInputChange = (productId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      handleLocalQuantityChange(productId, '');
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        handleLocalQuantityChange(productId, parsedValue);
      }
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleInputBlur = (productId: number) => {
    const quantity = localQuantities[productId];
    if (typeof quantity === 'string' || quantity === 0) {
      handleQuantityChange(productId, 1);
    } else {
      handleQuantityChange(productId, quantity);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
    setLocalQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  // Render a product item
  const renderProductItem = (item: any) => (
    <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-3 sm:pb-2 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
      <div className="relative w-16 sm:w-16 h-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
        <Image 
          src={item.image_url} 
          alt={item.name} 
          layout="fill" 
          objectFit="cover"
          className="rounded-md hover:scale-105 transition-transform duration-300"
          sizes="100vw"
          quality={50}
        />
      </div>
      <div className="flex-grow min-w-0 truncate">
        <Link 
          href={`/catalogue/${item.id}`}
          onClick={() => handleProductClick(item.id)}
          className="font-medium hover:underline text-gray-800 hover:text-black transition-colors text-sm sm:text-base"
        >
          {item.name}
        </Link>
        <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">{item.price.toFixed(2)}€ HT</p>
      </div>
      <div className="flex items-center space-x-1 flex-shrink-0 bg-white rounded-lg p-1">
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6 sm:h-6 sm:w-6 rounded-md border-gray-200 hover:bg-gray-100"
          onClick={() => handleQuantityChange(item.id, (localQuantities[item.id] as number) - 1)}
          disabled={(localQuantities[item.id] as number) <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={localQuantities[item.id]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(item.id, e)}
          onFocus={handleInputFocus}
          onBlur={() => handleInputBlur(item.id)}
          isModifiedCn
          min={1}
          max={item.stock}
          className="w-10 sm:w-10 text-center rounded-md h-6 sm:h-6 text-sm sm:text-sm max-w-16 border-gray-200"
          ref={(el: HTMLInputElement | null) => {
            if (el) {
              inputRefs.current[item.id] = el;
            }
          }}
        />
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6 sm:h-6 sm:w-6 rounded-md border-gray-200 hover:bg-gray-100"
          onClick={() => handleQuantityChange(item.id, (localQuantities[item.id] as number) + 1)}
          disabled={(localQuantities[item.id] as number) >= item.stock}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 sm:h-6 sm:w-6 rounded-md text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {cart.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center space-y-4 bg-gray-50 rounded-lg my-8">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-xl font-light text-gray-500">Votre devis est vide</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push('/catalogue')}
            >
              Parcourir le catalogue
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-8 sm:space-y-5 mt-6">
            {/* Matériel et Décoration Section */}
            <div className="bg-white rounded-lg p-3 sm:p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-2 pb-2 sm:pb-1 border-b">
                <h3 className="font-medium text-base sm:text-base text-gray-800 flex items-center">
                  <span className="inline-block w-1.5 sm:w-1.5 h-5 sm:h-5 bg-blue-500 rounded-full mr-1.5 sm:mr-1.5"></span>
                  <span className="text-sm sm:text-base">Matériel et Décoration</span>
                </h3>
                <span className="text-xs sm:text-xs bg-blue-50 text-blue-700 px-2 sm:px-2 py-0.5 sm:py-0.5 rounded-full font-medium">
                  {decorationCount} article{decorationCount !== 1 ? 's' : ''}
                </span>
              </div>
              
              {decorationItems.length === 0 ? (
                <p className="text-xs sm:text-xs text-gray-500 italic mb-4 py-3 sm:py-2 text-center bg-gray-50 rounded-md">
                  Aucun article de décoration
                </p>
              ) : (
                <div className="flex flex-col space-y-3 sm:space-y-2 mb-2 sm:mb-1">
                  {decorationItems.map(renderProductItem)}
                  <div className="flex justify-end text-xs sm:text-xs pt-2 sm:pt-1 pb-1 sm:pb-0">
                    <span className="font-medium text-gray-600 mr-2 sm:mr-2">Sous-total Matériel et Décoration:</span>
                    <span className="font-semibold text-gray-800">{decorationTotal.toFixed(2)}€ HT</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Traiteur Section */}
            <div className="bg-white rounded-lg p-3 sm:p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-2 pb-2 sm:pb-1 border-b">
                <h3 className="font-medium text-base sm:text-base text-gray-800 flex items-center">
                  <span className="inline-block w-1.5 sm:w-1.5 h-5 sm:h-5 bg-amber-500 rounded-full mr-1.5 sm:mr-1.5"></span>
                  <span className="text-sm sm:text-base">Traiteur</span>
                </h3>
                <span className="text-xs sm:text-xs bg-amber-50 text-amber-700 px-2 sm:px-2 py-0.5 sm:py-0.5 rounded-full font-medium">
                  {traiteurCount} article{traiteurCount !== 1 ? 's' : ''}
                </span>
              </div>
              
              {traiteurItems.length === 0 ? (
                <p className="text-xs sm:text-xs text-gray-500 italic mb-4 py-3 sm:py-2 text-center bg-gray-50 rounded-md">
                  Aucun article de traiteur
                </p>
              ) : (
                <div className="flex flex-col space-y-3 sm:space-y-2 mb-2 sm:mb-1">
                  {traiteurItems.map(renderProductItem)}
                  <div className="flex justify-end text-xs sm:text-xs pt-2 sm:pt-1 pb-1 sm:pb-0">
                    <span className="font-medium text-gray-600 mr-2 sm:mr-2">Sous-total Traiteur:</span>
                    <span className="font-semibold text-gray-800">{traiteurTotal.toFixed(2)}€ HT</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 sm:mt-5 pt-4 sm:pt-3 border-t border-gray-200">
        <div className="flex sm:justify-end justify-center mb-4 sm:mb-3 bg-gray-50 p-3 sm:p-2 rounded-lg">
          <span className="font-medium mr-3 sm:mr-3 text-base sm:text-base text-gray-700">Total produits:</span>
          <span className="font-bold text-lg sm:text-lg text-gray-900">{total.toFixed(2)}€ HT</span>
        </div>
      </div>
      <div onClick={() => {
        window.scrollTo(0, 0);
      }} className="mt-4 xl:mt-6 w-full flex justify-end">
        <Button 
          className="h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full p-6 flex items-center space-x-4 transition-all duration-300 group"
          onClick={onNext}
          disabled={cart.length === 0}
        >
          <span className='font-semibold text-xl'>Suivant</span>
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartStep;
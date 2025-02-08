import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-center py-6">Votre devis est vide</p>
        ) : (
          <div className="flex flex-col space-y-4 mt-4 pr-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src={item.image_url} 
                    alt={item.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="rounded-md"
                    sizes="100vw"
                    quality={30}
                  />
                </div>
                <div className="flex-grow min-w-0 truncate">
                  <Link 
                    href={`/catalogue/${item.id}`}
                    onClick={() => handleProductClick(item.id)}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 truncate">{item.price}€</p>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(item.id, (localQuantities[item.id] as number) - 1)}
                    disabled={(localQuantities[item.id] as number) <= 1}
                  >
                    <Minus className="h-4 w-4" />
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
                    className="w-16 text-center rounded-md h-8 text-base max-w-16"
                    ref={(el: HTMLInputElement | null) => {
                      if (el) {
                        inputRefs.current[item.id] = el;
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(item.id, (localQuantities[item.id] as number) + 1)}
                    disabled={(localQuantities[item.id] as number) >= item.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total produits:</span>
          <span className="font-bold">{total.toFixed(2)}€ HT</span>
        </div>
      </div>
      <div onClick={() => {
        window.scrollTo(0, 0);
      }} className="mt-4 xl:mt-10 w-full flex justify-end">
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
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartSheetProps {
    isWhite?: boolean;
}

export const CartSheet: React.FC<CartSheetProps> = ({ isWhite = false }) => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [localQuantities, setLocalQuantities] = useState<{ [key: number]: number | '' }>({});
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    setMounted(true);
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setLocalQuantities(initialQuantities);
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.length;

  const handleProductClick = (productId: number) => {
    closeRef.current?.click();
    router.push(`/catalogue/${productId}`);
  };

  const handleCloseSheet = () => {
    closeRef.current?.click();
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

  const handleValidateQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cart.length === 0) {
      e.preventDefault();
    } else {
      handleCloseSheet();
    }
  };

  return (
    <Sheet>
      <SheetClose ref={closeRef} className="hidden" />
      <SheetTrigger asChild>
        <Button className={`hover:bg-transparent h-10 w-10 ${isWhite ? 'text-white hover:text-white' : 'text-gray-800'}`} variant="ghost" size="icon">
          <ShoppingBag className="h-6 w-6 2xl:h-8 2xl:w-8" />
          {mounted && itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-0.5 md:-top-1 md:-right-1 px-2 py-1 text-xs rounded-full hover:bg-red-600 hover:text-white"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Ouvrir le panier</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        title="Votre devis" 
        description="Review the items in your cart and proceed to checkout."
        className="w-full sm:max-w-lg md:max-w-lg flex flex-col"
        isCloseVisible={true}
      >
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
                      min={1}
                      max={item.stock}
                      isModifiedCn
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
        <SheetFooter className="mt-6 border-t pt-4">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{total.toFixed(2)}€ HT</span>
            </div>
            <Link 
              href="/devis" 
              className={`w-full ${cart.length === 0 ? 'pointer-events-none' : ''}`}
              onClick={handleValidateQuote}
            >
              <Button className="w-full" disabled={cart.length === 0}>
                Valider le devis
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
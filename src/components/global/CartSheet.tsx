import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

interface CartSheetProps {
    isWhite?: boolean;
}

export const CartSheet: React.FC<CartSheetProps> = ({ isWhite = false }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={`hover:bg-transparent h-10 w-10 ${isWhite ? 'text-white hover:text-white' : 'text-black hover:text-black'}`} variant="ghost" size="icon">
          <ShoppingBag className="h-6 w-6 2xl:h-8 2xl:w-8" />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        title="Votre panier" 
        description="Review the items in your cart and proceed to checkout."
        className="w-full sm:max-w-lg md:max-w-lg"
        isCloseVisible={true}
      >
        {cart.length === 0 ? (
          <p className="text-center py-6">Votre panier est vide</p>
        ) : (
          <div className="flex flex-col space-y-4 mt-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src={item.image_url} 
                    alt={item.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{item.price}€</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <SheetFooter className="mt-6">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{total.toFixed(2)}€</span>
            </div>
            <Button className="w-full" disabled={cart.length === 0}>
              Proceed to Checkout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
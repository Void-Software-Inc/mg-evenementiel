import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export const CartSheet: React.FC = () => {
  const { cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:bg-transparent" variant="ghost" size="icon">
          <ShoppingBag className="h-[1.3rem] w-[1.3rem]" />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent title="Votre panier" description="Review the items in your cart and proceed to checkout." hideTitle={false}>
        {cart.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};
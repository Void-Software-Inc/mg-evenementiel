import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "@/utils/types/products";
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import AnimatedAddButton from './AnimatedAddButton';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [remainingStock, setRemainingStock] = useState(product.stock);
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const itemInCart = cart.find(item => item.id === product.id);
    const quantity = itemInCart ? itemInCart.quantity : 0;
    setQuantityInCart(quantity);
    setRemainingStock(product.stock - quantity);
  }, [cart, product.id, product.stock]);

  const handleQuickAdd = (e: React.MouseEvent, removeAll: boolean) => {
    e.preventDefault(); // Prevent the Link from being triggered
    e.stopPropagation(); // Stop the event from bubbling up
    if (quantityInCart === 0) {
      addToCart(product, 1);
      toast.success(`${product.name} ajouté au devis`, {
        description: `Quantité ajoutée: 1`,
      });
    } else if (removeAll) {
      removeFromCart(product.id);
      toast.info(`${product.name} retiré du devis`, {
        description: `Quantité retirée: ${quantityInCart}`,
      });
    } else {
      removeFromCart(product.id);
      toast.info(`${product.name} retiré du devis`, {
        description: `Quantité retirée: 1`,
      });
    }
  };

  return (
    <Link href={`/catalogue/${product.id}`} className="block">
      <div className="relative flex flex-col space-y-2 bg-zinc-100 p-4 cursor-pointer">
        <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
          <AnimatedAddButton
            onClick={(e, removeAll) => handleQuickAdd(e, removeAll)} // Pass removeAll correctly
            quantity={quantityInCart}
          />
        </div>
        <div className="relative w-full max-w-[500px] max-h-[500px] aspect-square overflow-hidden rounded-lg mx-auto">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-contain"
            quality={75}
            priority={priority}
          />
        </div>
        
        <div className="w-full h-fit flex flex-col justify-start items-start space-y-1">
          <h3 className="text-sm xl:text-lg font-light text-gray-900 truncate tracking-tight">{product.name.toUpperCase()}</h3>
          <p className="text-sm xl:text-3xl font-light text-gray-900">{typeof product.price === 'number' ? `${product.price.toFixed(2)} €` : `À partir de ${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
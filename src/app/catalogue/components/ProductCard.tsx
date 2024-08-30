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

  const handleQuickAdd = (removeAll: boolean) => {
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
    <div className="flex flex-col space-y-2">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 hover:scale-105"
          quality={75}
          priority={priority}
        />
        <div className="absolute top-2 right-2">
          <AnimatedAddButton
            onClick={handleQuickAdd}
            quantity={quantityInCart}
          />
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center space-y-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 font-semibold">{typeof product.price === 'number' ? `${product.price.toFixed(2)} €` : `À partir de ${product.price}`}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link href={`/catalogue/${product.id}`} className="w-full">
          <Button
            className="w-full text-xs font-medium text-center text-gray-700 rounded hover:bg-gray-50 transition duration-150"
            variant="outline"
            size="compact"
          >
            Voir le produit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
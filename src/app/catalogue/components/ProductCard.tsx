import React from 'react';
import Image from 'next/image';
import { Product } from "@/utils/types/products";
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';


interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart } = useCart();

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
      </div>
      
      <div className="flex flex-col justify-center items-center space-y-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 font-semibold">{typeof product.price === 'number' ? `${product.price.toFixed(2)} €` : `À partir de ${product.price}`}</p>
      </div>
      
      <Button
        onClick={() => addToCart(product)}
        className="w-full text-xs font-medium text-center text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition duration-150"
        variant="outline"
        size="compact"
      >
        Ajouter au devis
      </Button>
    </div>
  );
};

export default ProductCard;
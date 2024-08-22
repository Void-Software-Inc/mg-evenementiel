import React from 'react';
import Image from 'next/image';
import { Product } from "@/utils/types/products";
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  return (
    <div className="group relative block overflow-hidden border rounded-lg shadow-sm">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          quality={75}
          priority={priority}
        />
      </div>

      <div className="relative border-t border-gray-100 bg-white p-3">
        <div className="flex justify-start items-center mb-1">
          <h3 className="text-sm font-medium text-gray-900 truncate max-w-[90%]">{product.name}</h3>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-bold text-gray-900">{product.price}€</p>
          <Button
            variant="outline"
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
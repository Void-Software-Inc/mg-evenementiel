import React from 'react';
import Image from 'next/image';
import { Product } from "@/utils/types/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
          quality={75} // Adjust this value as needed (0-100)
          priority={priority}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-700 text-sm mb-2">{product.type}</p>
        <p className="text-gray-700 text-sm mb-2">{product.color}</p>
        <p className="text-gray-900 font-bold">{product.price}€</p>
      </div>
    </div>
  );
};

export default ProductCard;
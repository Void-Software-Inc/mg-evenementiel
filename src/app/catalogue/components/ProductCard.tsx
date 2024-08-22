import React from 'react';
import { Product } from "@/utils/types/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
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
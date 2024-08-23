import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from "@/utils/types/products";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
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
      </div>
      
      <div className="flex flex-col justify-center items-center space-y-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 font-semibold">{typeof product.price === 'number' ? `${product.price.toFixed(2)} €` : `À partir de ${product.price}`}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleAddToCart}
          className="flex-grow text-xs font-medium text-center text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-150"
          variant="outline"
          size="compact"
        >
          Ajouter au devis
        </Button>
        <Input
          isModifiedCn={true}
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={product.stock}
          className="w-20 text-center h-8 px-4 py-0 border border-gray-300 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProductCard;
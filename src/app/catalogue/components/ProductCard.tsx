import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from "@/utils/types/products";
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState("1");
  const [remainingStock, setRemainingStock] = useState(product.stock);

  useEffect(() => {
    const itemInCart = cart.find(item => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    setRemainingStock(product.stock - quantityInCart);
  }, [cart, product.id, product.stock]);

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    const quantityToAdd = parseInt(quantity, 10);
    addToCart(product, quantityToAdd);
    setQuantity("1");

    const itemInCart = cart.find(item => item.id === product.id);
    const currentQuantity = itemInCart ? itemInCart.quantity : 0;
    const newQuantity = currentQuantity + quantityToAdd;

    toast.success(`${product.name} ajouté au devis`, {
      description: `Quantité présente dans le panier: ${newQuantity}`,
    });
  };

  const isOutOfStock = remainingStock === 0;

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-grow">
                <Button
                  onClick={handleAddToCart}
                  className="w-full text-xs font-medium text-center text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  variant="outline"
                  size="compact"
                  disabled={isOutOfStock}
                >
                  Ajouter au devis
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {isOutOfStock ? 'Quantité maximale commandée' : `${remainingStock} disponible(s)`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Select
          value={quantity}
          onValueChange={handleQuantityChange}
          disabled={isOutOfStock}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Qté" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: remainingStock }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductCard;
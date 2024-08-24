"use client"

import React, { useEffect, useState } from 'react';
import { getProduct } from '@/services/products';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/app/context/CartContext';
import { Minus, Plus } from 'lucide-react';

interface ProductDisplayProps {
  id: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [inputQuantity, setInputQuantity] = useState('0');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(parseInt(id));
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const cartItem = cart.find(item => item.id === product.id);
      setInputQuantity(cartItem ? cartItem.quantity.toString() : '0');
    }
  }, [cart, product]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, Math.min(newQuantity, product.stock));
    setInputQuantity(validQuantity.toString());

    if (validQuantity === 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, validQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputQuantity(value);
    }
  };

  const handleInputBlur = () => {
    const newQuantity = parseInt(inputQuantity) || 0;
    handleQuantityChange(newQuantity);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 w-[80%]">
      <div className="md:w-1/2 ">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 space-y-4">
        <h1 className="text-5xl font-light mb-10">{product.name}</h1>
        <p className="text-4xl font-bold">{product.price} €<span className='text-sm font-medium text-zinc-500 pl-1'>TTC</span></p>

        <p className="mt-6 text-2xl font-bold text-zinc-800">Quantité</p>

        <div className="flex items-center flex-shrink-0">
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-r-none rounded-l-lg"
            onClick={() => handleQuantityChange(parseInt(inputQuantity) - 1)}
            disabled={parseInt(inputQuantity) <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={inputQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 text-center rounded-none"
            isModifiedCn
          />
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-r-lg rounded-l-none"
            onClick={() => handleQuantityChange(parseInt(inputQuantity) + 1)}
            disabled={parseInt(inputQuantity) >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="">{product.description}</p>
        <p className="">Type: {product.type}</p>
        <p className="">Color: {product.color}</p>
        <p className="">In Stock: {product.stock}</p>
        
        <Button 
          onClick={() => handleQuantityChange(parseInt(inputQuantity) + 1)} 
          className="w-full md:w-auto"
          disabled={parseInt(inputQuantity) >= product.stock}
        >
          {parseInt(inputQuantity) > 0 ? 'Mettre à jour le panier' : 'Ajouter au Panier'}
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplay;
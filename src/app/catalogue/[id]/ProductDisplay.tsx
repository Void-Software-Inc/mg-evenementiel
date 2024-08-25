"use client"

import React, { useEffect, useState } from 'react';
import { getProduct } from '@/services/products';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/app/context/CartContext';
import { Minus, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDisplayProps {
  id: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [inputQuantity, setInputQuantity] = useState('0');
  const [localQuantity, setLocalQuantity] = useState('1');

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const formatDescription = (description: string) => {
    return description
      .split('\r\n')
      .map(item => item.trim().replace(/^•/, '').trim())
      .filter(item => item !== '');
  };

  const descriptionItems = formatDescription(product.description);

  const handleLocalQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(newQuantity, product.stock));
    setLocalQuantity(validQuantity.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setLocalQuantity(value === '' ? '1' : value);
    }
  };

  const handleInputBlur = () => {
    const newQuantity = Math.max(1, parseInt(localQuantity) || 1);
    handleLocalQuantityChange(newQuantity);
  };

  const handleAddToCart = () => {
    const quantityToAdd = parseInt(localQuantity);
    if (quantityToAdd > 0 && product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        updateQuantity(product.id, existingItem.quantity + quantityToAdd);
      } else {
        addToCart(product, 1);
      }
      setLocalQuantity('1');
    }
  };

  const getButtonText = () => {
    const quantity = parseInt(localQuantity);
    if (quantity === 1) {
      return "Ajouter au devis";
    } else if (quantity > 1) {
      return `Ajouter ${quantity} articles au devis`;
    }
    return "Ajouter au devis";
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
            onClick={() => handleLocalQuantityChange(parseInt(localQuantity) - 1)}
            disabled={parseInt(localQuantity) <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={localQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 text-center rounded-none"
            isModifiedCn
          />
          <Button 
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-r-lg rounded-l-none"
            onClick={() => handleLocalQuantityChange(parseInt(localQuantity) + 1)}
            disabled={parseInt(localQuantity) >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Description</AccordionTrigger>
            <AccordionContent>
            <ul className="text-base list-none pl-0 space-y-1">
            {descriptionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li><p className="">Color: {product.color}</p></li>
          </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>

        
        <p className="">In Stock: {product.stock}</p>
        
        <Button 
          onClick={handleAddToCart} 
          className="w-full md:w-auto rounded-full py-10"
          disabled={parseInt(localQuantity) < 1 || parseInt(localQuantity) > product.stock}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplay;
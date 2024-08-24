"use client"

import React, { useEffect, useState } from 'react';
import { getProduct } from '@/services/products';
import { Product } from '@/utils/types/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';

interface ProductDisplayProps {
  id: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 max-w-6xl mt-28">
      <div className="md:w-1/2">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl mb-4">{product.price} €</p>
        <p className="mb-4">{product.description}</p>
        <p className="mb-4">Type: {product.type}</p>
        <p className="mb-4">Color: {product.color}</p>
        <p className="mb-4">In Stock: {product.stock}</p>
        <div className="flex items-center mb-4">
          <label htmlFor="quantity" className="mr-2">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value))))}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
        <Button 
          onClick={handleAddToCart} 
          className="w-full md:w-auto"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplay;
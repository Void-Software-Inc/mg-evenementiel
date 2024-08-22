import { Product } from "@/utils/types/products";

const API_URL = '/api';

/********************* PRODUCTS *********************/
  
export async function getProducts(): Promise<Product[]> {
  try {
    const url = `${API_URL}/products`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const { products } = await response.json();
    const cleanProducts = products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      type: product.type,
      color: product.color,
      stock: product.stock,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
    }))
    return cleanProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
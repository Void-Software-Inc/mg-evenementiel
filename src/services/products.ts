import { Product, ProductImage } from "@/utils/types/products";
import fakeProducts from "@/data/fakeProducts.json";

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
    /*return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeProducts);
      }, 500); // 500ms delay to simulate network request
    });*/
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const url = `${API_URL}/products/${id}`

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
  
}

export async function getProductImages(id: number): Promise<ProductImage[]> {
  try {
    const url = `${API_URL}/products/${id}/images`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch images for product with id ${id}`);
    }
    const data = await response.json();
    return data.productImages;
  } catch (error) {
    console.error(`Error fetching images for product with id ${id}:`, error);
    throw error;
  }
}
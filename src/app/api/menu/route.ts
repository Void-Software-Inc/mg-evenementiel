import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const productIds = [19, 32, 30, 29, 28, 31, 27];

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, image_url')
    .in('id', productIds);

  if (error) {
    console.error('Error fetching menu products:', error);
    return NextResponse.json({ error: 'Failed to fetch menu products' }, { status: 500 });
  }

  // Sort the products based on the order in productIds
  const sortedProducts = productIds.map(id => products.find(product => product.id === id)).filter(Boolean);

  return NextResponse.json({ products: sortedProducts });
}

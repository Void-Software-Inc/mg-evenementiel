import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const productIds = [19, 91, 67, 65, 13, 6, 62, 63];

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

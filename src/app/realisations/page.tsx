// src/app/realisations/page.tsx
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import FilterControls from './components/FilterControls';

interface ImageProps {
  url: string;
  alt: string;
}

interface RealisationsPageProps {
  images: ImageProps[];
}

async function fetchImages(): Promise<ImageProps[]> {
  const supabase = createClient();
  const { data: images, error } = await supabase
    .storage
    .from('mge-website-images') // Replace with your actual bucket name
    .list('realisations', { limit: 100, offset: 0 });

  if (error) {
    console.error('Error fetching images:', error);
    return [];
  }

  return images.map((image) => {
    const { data } = supabase.storage
      .from('mge-website-images')
      .getPublicUrl(`realisations/${image.name}`);

    return {
      url: data.publicUrl,
      alt: image.name,
    };
  }) || [];
}

export default async function RealisationsPage() {
  const images = await fetchImages();

  // Dummy initial filters, adjust as needed
  const initialFilters = { type: "Tout", lieu: "" };

  return (
    <div>
      <FilterControls initialFilters={initialFilters} />
    </div>
  );
}

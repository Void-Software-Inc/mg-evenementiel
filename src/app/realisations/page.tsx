// src/app/realisations/page.tsx
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import FilterControls from './components/FilterControls';
import Head from 'next/head';

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
    <>
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MG Événementiel",
          "url": "https://www.mgevenements.fr",
          "logo": "https://www.mgevenements.fr/favicon_io/favicon.ico",
          "description": "Découvrez nos réalisations : une galerie mettant en avant nos services de location de mobilier et de matériel pour des mariages et buffets réussis dans le Sud de la France.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Toulouse",
            "addressRegion": "Occitanie",
            "addressCountry": "France"
          },
          "sameAs": [
            "https://www.mariages.net/chapiteau-mariage/mg-evenementiel--e331790",
            "https://www.instagram.com/mg_evenementiel/"
          ]
        })}
      </script>
    </Head>
    <div>
      <FilterControls initialFilters={initialFilters} />
    </div>
    </>
  );
};

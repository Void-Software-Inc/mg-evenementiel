'use client';

import Image from 'next/image';

const WeddingImageGallery = () => {
  const imageUrl1 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/chris-kursikowski-QUrs6RIp6hE-unsplash.webp?t=2025-06-23T15%3A32%3A36.856Z";
  const imageUrl2 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/jonathan-borba-8U9tUnpKRYs-unsplash.jpg";
  const imageUrl3 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/gabriella-clare-marino-jidekhfidA4-unsplash.jpg";
  const imageUrl4 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z";
  const imageUrl5 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/soulseeker-creative-photography-SmaNINKn7Hs-unsplash_1_.webp?t=2025-06-23T15%3A35%3A36.104Z";
  const imageUrl6 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg";

  const images = [
    { url: imageUrl1, alt: "Wedding catering - Elegant couple" },
    { url: imageUrl2, alt: "Wedding catering - Reception setup" },
    { url: imageUrl2, alt: "Wedding catering - Bride portrait" },
    { url: imageUrl4, alt: "Wedding catering - Table setting" },
    { url: imageUrl5, alt: "Wedding catering - Ceremony" },
    { url: imageUrl6, alt: "Wedding catering - Celebration" }
  ];

  return (
    <section className="w-full py-24 bg-neutral-100">
      <div className="container mx-auto">
        
        {/* Horizontal Scrollable Image Gallery */}
        <div className="relative w-full">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide" 
               style={{ 
                 gap: '1px',
                 scrollbarWidth: 'none', 
                 msOverflowStyle: 'none'
               }}>
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 relative">
                <div className="relative w-[280px] h-[400px] md:w-[320px] md:h-[450px] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 280px, 320px"
                    quality={95}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll hint for mobile */}
          <div className="text-center mt-4 md:hidden">
            <p className="text-sm text-gray-500">← Faites défiler pour voir plus d'images →</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Découvrez notre expertise en matière de traiteur pour mariages
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeddingImageGallery; 
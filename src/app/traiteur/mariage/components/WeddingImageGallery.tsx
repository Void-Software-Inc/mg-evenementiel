import Image from 'next/image';

const WeddingImageGallery = () => {
  const imageUrl = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/ibrahim-boran-aoGA9N8QNrI-unsplash.webp";

  return (
    <section className="w-full py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
    

        {/* Horizontal Image Gallery */}
        <div className="relative w-full h-80 md:h-[800px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex justify-center w-full max-w-7xl h-full mx-auto px-4 items-center">
              
              {/* Image 1 - Left */}
              <div className="relative w-32 h-40 md:h-[400px] md:w-[250px] -mr-8 mb-10 z-10">
                <Image
                  src={imageUrl}
                  alt="Wedding catering"
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>

              {/* Image 2 - Second from left */}
              <div className="relative w-28 h-36  md:h-[230px] md:w-[170px] mb-4 -mr-10 z-40">
                <Image
                  src={imageUrl}
                  alt="Wedding catering"
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>

              {/* Image 3 - Small overlapping */}
              <div className="relative w-24 h-32 md:h-[180px] md:w-[130px] -mb-32 -mr-10 z-30">
                <Image
                  src={imageUrl}
                  alt="Wedding catering"
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>

              {/* Image 4 - Center large */}
              <div className="relative w-40 h-52 md:h-[500px] md:w-[350px] mb-6 -mr-3 z-0">
                <Image
                  src={imageUrl}
                  alt="Wedding catering centerpiece"
                  fill
                  className="object-cover shadow-xl"
                  sizes="(max-width: 768px) 160px, 192px"
                />
              </div>

              {/* Image 5 - Right of center */}
              <div className="relative w-36 h-44 md:h-[300px] md:w-[200px] -mb-4 -mr-2 z-50">
                <Image
                  src={imageUrl}
                  alt="Wedding catering"
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 144px, 176px"
                />
              </div>

              {/* Image 6 - Right side */}
              <div className="relative w-32 h-40 md:h-[215px] md:w-[150px] mb-40 -mr-6 z-0">
                <Image
                  src={imageUrl}
                  alt="Wedding catering"
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>

            </div>
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
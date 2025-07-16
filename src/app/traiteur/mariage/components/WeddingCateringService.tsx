import Image from "next/image";

const WeddingCateringService = () => {
  const imageUrl1 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg";
  const imageUrl2 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z";

  return (
    <section className="w-[80%] py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Une organisation fluide, un accompagnement sur-mesure
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Du premier échange à la dernière bouchée, nous vous accompagnons à chaque étape. Menu personnalisé, dégustation en amont, adaptation à vos envies et à votre budget : tout est pensé pour vous.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Nous assurons la logistique complète : installation, service en salle, vaisselle, mobilier… Vous n’avez rien à gérer, si ce n’est profiter pleinement de votre événement. Notre équipe, discrète et attentive, veille à ce que chaque détail soit parfaitement orchestré.
            </p>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative h-[550px] w-full">
              <div className="hidden lg:block absolute bottom-0 right-0 w-[60%] h-[80%] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={imageUrl1}
                  alt="Pièce montée et buffet de mariage"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="hidden lg:block absolute top-0 left-0 w-[55%] h-[70%] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={imageUrl2}
                  alt="Verrines et champagne pour mariage"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="lg:hidden relative h-full w-full">
                <div className="absolute bottom-0 right-0 w-[75%] h-[75%] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={imageUrl1}
                    alt="Pièce montée et buffet de mariage"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute top-0 left-0 w-[65%] h-[65%] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={imageUrl2}
                    alt="Verrines et champagne pour mariage"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCateringService; 
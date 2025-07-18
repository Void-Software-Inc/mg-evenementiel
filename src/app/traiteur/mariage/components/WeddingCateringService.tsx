import Image from "next/image";

const WeddingCateringService = () => {
  const imageUrl1 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg";
  const imageUrl2 = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z";

  return (
    <section className="w-[80%] py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="w-full lg:w-[90%] text-zinc-800 text-2xl sm:text-3xl font-extralight mb-4">
              Une organisation fluide, un accompagnement sur-mesure
            </h2>
            <p className="text-base xl:text-lg text-zinc-700 mb-2 font-light">
              Du premier échange à la dernière bouchée, nous vous accompagnons à chaque étape. Menu personnalisé, dégustation en amont, adaptation à vos envies et à votre budget : tout est pensé pour vous.
            </p>
            <p className="text-base xl:text-lg text-zinc-700 mb-2 font-light">
              Nous assurons la logistique complète : installation, service en salle, vaisselle, mobilier… Vous n’avez rien à gérer, si ce n’est profiter pleinement de votre événement. Notre équipe, discrète et attentive, veille à ce que chaque détail soit parfaitement orchestré.
            </p>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative h-[500px] w-full">
              <div className="absolute bottom-0 right-0 w-[65%] h-[60%] lg:w-[60%] lg:h-[80%] overflow-hidden rounded-md shadow-xl">
                <Image
                  src={imageUrl1}
                  alt="Pièce montée et buffet de mariage"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute top-0 left-0 w-[65%] h-[60%] lg:w-[55%] lg:h-[70%] rounded-md overflow-hidden shadow-xl">
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
    </section>
  );
};

export default WeddingCateringService; 
import Image from 'next/image';
import Link from 'next/link';

const WeddingCallToAction = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/heroHeaderImage.webp"
          alt="Réception de mariage élégante"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 65%' }}
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content */}
      <div className="relative h-full w-[85%] mx-auto px-4 py-16 lg:py-24 flex flex-col justify-center">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
            Créons ensemble votre réception de mariage
          </h2>
          <p className="text-lg md:text-xl text-zinc-200 mb-8 font-light leading-relaxed">
            Du vin d'honneur au brunch du lendemain, nous vous accompagnons pour faire 
            de votre mariage un moment d'exception. Laissez-nous vous guider dans la création 
            de votre menu sur-mesure.
          </p>
          <Link
            href="/traiteur/catalogue"
            className="inline-flex items-center px-8 py-4 bg-white text-zinc-900 rounded-full text-sm uppercase font-medium 
            transition-all duration-300 hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            Demandez un devis
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingCallToAction;

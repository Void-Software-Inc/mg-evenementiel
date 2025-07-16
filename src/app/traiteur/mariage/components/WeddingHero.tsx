import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const WeddingHero = () => {
  const imageUrl = "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/soulseeker-creative-photography-SmaNINKn7Hs-unsplash_1_.webp?t=2025-06-23T15%3A35%3A36.104Z";
  const bgImageUrl = "/static/anita-austvika-T7hH4c9wsmQ-unsplash.jpg";

  return (
    <section className="h-auto lg:h-screen flex w-full flex-col lg:flex-row mt-16">
      <div className="relative w-full lg:w-1/2 bg-[#F1ECE4] flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-10"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        ></div>
        <div className="relative max-w-2xl lg:max-w-xl xl:max-w-2xl text-left z-10">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          TRAITEUR MARIAGE SUR MESURE POUR VOTRE JOURNÉE D’EXCEPTION
          </p>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-800 mb-6 leading-tight">
          L’art de sublimer votre mariage avec une cuisine raffinée, un service soigné et une organisation pensée dans les moindres détails.          </h1>
          <p className="text-gray-600 mb-8">
            Vivez une expérience culinaire inoubliable pour le plus beau jour de votre vie. Qu’il s’agisse d’un repas servi à table, d’un vin d’honneur ou d’un brunch du lendemain, nous vous accompagnons à chaque étape avec élégance et simplicité. Nos menus sur mesure mêlent produits de saison, créativité et sens du détail, pour un moment de partage aussi beau que bon.
            Service professionnel, vaisselle, mobilier, dégustation : tout est prévu pour vous offrir une prestation clé en main, sans stress, centrée sur vos envies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalogue" passHref>
              <Button className="rounded-full h-[60px] w-full sm:w-[190px] py-6 px-8 flex items-center justify-center group ease-in-out transition duration-300 hover:bg-neutral-500">
                <span className="font-normal text-lg sm:text-xl">CATALOGUE</span>
                <span className="ml-2 transition-transform transform group-hover:translate-x-2 duration-300">
                  <svg width="28" height="28" className="text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </span>
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full h-[60px] w-full sm:w-[190px] p-6 flex items-center justify-center space-x-2 transition-all duration-300 group">
                  <span className="font-normal text-lg sm:text-xl">CONTACT</span>
                  <span className="ml-2 transition-transform transform group-hover:translate-x-2 duration-300">
                  <svg width="28" height="28" className="text-black group-hover:text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[300px] lg:w-1/2 lg:h-full relative order-1 lg:order-2">
        <Image
          src={imageUrl}
          alt="Elegant wedding couple"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default WeddingHero; 
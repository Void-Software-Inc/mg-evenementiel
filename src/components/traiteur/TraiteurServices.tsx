import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';

const TraiteurServices = () => {
  return (
    <div className="w-full flex justify-center bg-white py-6 lg:py-16 px-2 sm:px-6 lg:px-8">
      <div className="w-full lg:w-[95%]">
        
        {/* Centered Text Section */}
        <div className="text-center mb-12 w-[95%] lg:w-fit mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-800 mb-4">
            Nos services traiteur spécialisés
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Découvrez notre expertise culinaire adaptée à chaque type d'événement
          </p>
        </div>

        {/* Service Cards Carousel */}
        <div className="w-full mx-auto px-12 md:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              
              {/* Mariage Card */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href="/traiteur/mariage" className="group block h-full">
                  <div className="relative bg-gray-100/30 backdrop-blur-lg rounded-xl min-h-[200px] lg:min-h-[300px] transition-all duration-500 p-8 text-center border border-gray-200/50 lg:h-full overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-zinc-800 group-hover:bg-rose-400 transition-colors duration-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-light text-zinc-800 group-hover:text-rose-900 mb-3 transition-colors duration-500">
                          Mariages
                        </h3>
                        <p className="text-gray-600 group-hover:text-rose-800 text-sm leading-relaxed transition-colors duration-500 w-[90%] lg:w-[70%] mx-auto">
                          Menus raffinés et service d'exception pour célébrer le plus beau jour de votre vie avec élégance.
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 mt-auto">
                      <Button className="rounded-full bg-white font-medium text-zinc-800 transition-all duration-300 group-hover:bg-rose-400 group-hover:text-white group-hover:-translate-y-1">
                        Découvrir
                      </Button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>

              {/* Professionnel Card */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href="/traiteur/professionnel" className="group block h-full">
                    <div className="relative bg-gray-100/30 backdrop-blur-lg rounded-xl min-h-[300px] transition-all duration-500 p-8 text-center border border-gray-200/50 h-full overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-zinc-800 group-hover:bg-indigo-400 transition-colors duration-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-light text-zinc-800 group-hover:text-indigo-900 mb-3 transition-colors duration-500">
                                    Professionnel
                                </h3>
                                <p className="text-gray-600 group-hover:text-indigo-800 text-sm leading-relaxed transition-colors duration-500 w-[90%] sm:w-[70%] mx-auto">
                                    Cocktails d'entreprise, séminaires et événements corporate avec un service professionnel adapté.
                                </p>
                            </div>
                        </div>
                        <div className="relative z-10 mt-auto">
                            <Button className="rounded-full bg-white font-medium text-zinc-800 transition-all duration-300 group-hover:bg-indigo-400 group-hover:text-white group-hover:-translate-y-1">
                                Découvrir
                            </Button>
                        </div>
                    </div>
                </Link>
              </CarouselItem>

              {/* Particulier Card */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href="/traiteur/particulier" className="group block h-full">
                    <div className="relative bg-gray-100/30 backdrop-blur-lg rounded-xl min-h-[300px] transition-all duration-500 p-8 text-center border border-gray-200/50 h-full overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-200 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-zinc-800 group-hover:bg-orange-400 transition-colors duration-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-light text-zinc-800 group-hover:text-orange-900 mb-3 transition-colors duration-500">
                                    Particulier
                                </h3>
                                <p className="text-gray-600 group-hover:text-orange-800 text-sm leading-relaxed transition-colors duration-500 w-[90%] sm:w-[70%] mx-auto">
                                    Anniversaires, baptêmes et fêtes familiales dans une ambiance chaleureuse et conviviale.
                                </p>
                            </div>
                        </div>
                        <div className="relative z-10 mt-auto">
                            <Button className="rounded-full bg-white font-medium text-zinc-800 transition-all duration-300 group-hover:bg-orange-400 group-hover:text-white group-hover:-translate-y-1">
                                Découvrir
                            </Button>
                        </div>
                    </div>
                </Link>
              </CarouselItem>

            </CarouselContent>
            <CarouselPrevious className="lg:hidden -left-12" />
            <CarouselNext className="lg:hidden -right-12" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TraiteurServices; 
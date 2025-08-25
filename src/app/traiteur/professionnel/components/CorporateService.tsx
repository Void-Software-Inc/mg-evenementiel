'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface Service {
    title: string;
    description: string;
    image: string;
    imagePosition?: string;
}

const ServiceCard = ({ service }: { service: Service }) => (
    <div className="flex flex-col items-center text-center px-4 lg:px-8 lg:border-r last:border-r-0 border-zinc-400">
        <h3 className="text-xl lg:text-2xl font-light text-zinc-900 mb-3">
            {service.title}
        </h3>
        <p className="text-sm lg:text-base text-zinc-600 leading-relaxed pb-5">
            {service.description}
        </p>
    </div>
);

const CorporateService = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const services = [
        {
            title: "Options Variées",
            description: "Des menus pensés pour convenir à différents formats : repas assis, buffets, cocktails, brunchs ou pauses gourmandes.",
            image: ""
        },
        {
            title: "Organisation Simplifiée",
            description: "Un service clé en main qui s'adapte à vos contraintes, avec livraison, installation et reprise du matériel.",
            image: "",
        },
        {
            title: "Accompagnement Fiable",
            description: "Une équipe attentive à vos besoins pour garantir des événements réussis et sans imprévus.",
            image: ""
        },
        {
            title: "Flexibilité Totale",
            description: "Des prestations modulables selon la taille de votre groupe, vos préférences alimentaires et le style de votre événement.",
            image: ""
        }
    ];

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -280 : 280;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full h-fit flex flex-col items-center justify-center py-12 xl:py-24">
            <div className="px-4 sm:px-0 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] items-center text-center space-y-10 mb-7 sm:mb-10 xl:mb-14">
                <h1 className="text-4xl sm:text-5xl font-extralight text-zinc-900">Nos services pour événements professionnels</h1>
                <p className="text-zinc-600 leading-relaxed mb-10 text-left md:text-justify font-light">
                    Chez MG Événements, nous faisons du service traiteur un véritable atout pour vos rencontres professionnelles. 
                    Que ce soit pour une réunion d'équipe, un séminaire, un lancement de produit, une fête d'entreprise ou une conférence, 
                    nous proposons des solutions adaptées à votre format et à votre budget. Avec des menus équilibrés, une organisation simple 
                    et un accompagnement fiable, nous veillons à ce que chaque événement se déroule dans les meilleures conditions.
                </p>
            </div>

            {/* Services Container */}
            <div className="w-[85%]">
                {/* Mobile View: Scrollable with Buttons */}
                <div className="sm:hidden relative w-full">
                    {/* Navigation Buttons */}
                    {showLeftButton && (
                        <button 
                            onClick={() => scroll('left')}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
                            aria-label="Précédent"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {showRightButton && (
                        <button 
                            onClick={() => scroll('right')}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
                            aria-label="Suivant"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Scrollable Container */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {services.map((service, index) => (
                            <div 
                                key={index}
                                className="flex-none w-full snap-center py-8"
                            >
                                <ServiceCard service={service} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablet/Desktop View: Grid Layout */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 py-12">
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={index} 
                            service={service}
                        />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CorporateService;
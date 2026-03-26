'use client';

import { useState } from 'react';
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Prestation {
    id: number;
    title: string;
    description: string;
}

const prestations: Prestation[] = [
    {
        id: 1,
        title: "DECORATION",
        description: "Nous transformons vos espaces en lieux d'exception grâce à une décoration sur mesure, adaptée à l'ambiance et au thème de votre événement.",
    },
    {
        id: 2,
        title: "TRAITEUR",
        description: "Des menus raffinés préparés avec des produits frais et de saison, pour offrir à vos convives une expérience gastronomique inoubliable.",
    },
    {
        id: 3,
        title: "LIVRAISON",
        description: "Nous assurons la livraison et l'installation de l'ensemble du matériel nécessaire à votre événement, partout dans la région sud.",
    },
    {
        id: 4,
        title: "NETTOYAGE",
        description: "Rendez le matériel sale, notre équipe s'occupe du nettoyage.",
    },
];

export default function Prestations() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="w-full px-6 md:px-12 lg:px-16 py-16 lg:py-24 mb-20">
            <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
                {/* Left side - Title, description, image */}
                <div className="flex flex-col lg:w-[42%] lg:justify-start xl:justify-end">
                    <h2 className="text-4xl sm:text-5xl xl:text-6xl font-light text-zinc-900 tracking-wide leading-tight mb-6">
                        NOS PRESTATIONS
                    </h2>
                    <p className="text-sm md:text-base font-light text-zinc-600 leading-relaxed mb-8">
                        Spécialisés dans l&apos;organisation d&apos;événements sur mesure, nous
                        mettons notre savoir-faire à votre service pour créer des moments
                        uniques et mémorables. De la conception à la réalisation, chaque
                        détail est pensé pour sublimer vos réceptions.
                    </p>

                    {/* Image placeholder - hidden on phones and lg, shown xl+ */}
                    <div className="hidden xl:flex w-full max-w-[420px] 2xl:max-w-[500px] aspect-[4/3] bg-zinc-300 items-center justify-center transition-all duration-500 overflow-hidden mt-auto">
                        {hoveredId !== null && (
                            <span className="text-zinc-500 text-sm">
                                Image {prestations.find(p => p.id === hoveredId)?.title}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right side - Prestations grid */}
                <div className="mx-auto lg:mx-0 lg:w-[52%] max-w-[500px] xl:max-w-[600px] w-full lg:self-end">
                    <div className="border-t border-l border-zinc-300 grid grid-cols-2">
                        {prestations.map((prestation) => {
                            const isActive = hoveredId === prestation.id;
                            return (
                                <div
                                    key={prestation.id}
                                    className={`border-b border-r border-zinc-300 p-5 md:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 aspect-square ${
                                        isActive ? 'bg-[#8B847C] text-white' : 'bg-white text-zinc-800'
                                    }`}
                                    onMouseEnter={() => setHoveredId(prestation.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Phone layout: title top-left, number bottom-right */}
                                    <div className="flex sm:hidden flex-col justify-between h-full">
                                        <span className="text-[14px] font-medium tracking-[0.1em] leading-none">
                                            {prestation.title}
                                        </span>
                                        <span className="text-5xl font-extralight leading-none self-end">
                                            {String(prestation.id).padStart(2, '0')}
                                        </span>
                                    </div>
                                    {/* sm+ layout: title + number on same row, description on hover */}
                                    <div className="hidden sm:flex flex-col justify-between h-full">
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-xs sm:text-sm font-medium tracking-[0.15em]">
                                                {prestation.title}
                                            </span>
                                            <span className="text-3xl sm:text-4xl md:text-5xl font-extralight leading-none">
                                                {String(prestation.id).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${
                                                isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <p className="text-xs sm:text-sm font-light leading-relaxed pt-2">
                                                {prestation.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Learn more link - below the main layout, right-aligned */}
            <div className="w-[90%] mx-auto flex justify-end mt-4">
                <Link
                    href="/infos"
                    className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors duration-200"
                >
                    Learn more <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
            </div>
        </section>
    );
}
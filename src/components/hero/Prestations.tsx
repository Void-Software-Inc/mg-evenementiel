'use client';

import { ChevronRight, Sparkles, Truck, UtensilsCrossed, WandSparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    Icon: LucideIcon;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description }) => (
    <div className="h-[300px] w-full lg:w-[calc(50%-1rem)] xl:w-[calc(25%-1rem)] min-w-[250px] bg-zinc-100 flex flex-col justify-start rounded-xl shadow-md mb-4 lg:mb-0">
        <div className="ml-6 my-5 w-14 h-14 bg-transparent rounded-full flex items-center justify-center border border-zinc-700">
            <Icon className="h-6 w-6 text-zinc-700"/>
        </div>
        <p className="ml-8 text-3xl font-extralight text-zinc-700 pb-4 tracking-wide">{title}</p>
        <p className="px-8 text-md font-extralight text-zinc-700 text-left">{description}</p>
    </div>
);

export default function Prestations() {
    const services = [
        {
            Icon: Truck,
            title: "LIVRAISON",
            description: "Nous nous chargeons de vous livrer le matériel pour votre événement dans toute la région sud de la France."
        },
        {
            Icon: WandSparkles,
            title: "DÉCORATION",
            description: "Le jour J, nous nous chargeons de la mise en place des meubles et de la décoration."
        },
        {
            Icon: UtensilsCrossed,
            title: "TRAITEUR",
            description: "Nous proposons également une prestation de traiteur. Dégustez des menus sur mesure pour tous vos événements."
        },
        {
            Icon: Sparkles,
            title: "NETTOYAGE",
            description: "Rendez le matériel sale, notre équipe s'occupe du nettoyage."
        }
    ];

    return (   
        <div className="h-full w-full mb-40 flex items-center justify-center flex-col">
            <div className="w-full max-w-4xl px-4 mb-12 flex flex-col items-center justify-center">
                <h2 className="text-zinc-800 text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
                NOS PRESTATIONS
                </h2>
                <p className="text-zinc-800 text-center text-lg sm:text-xl xl:text-2xl font-extralight">
                Des services complets pour répondre à tous vos besoins événementiels
                </p>
            </div>
            <div className="w-[60%] lg:w-[85%] h-full flex flex-row flex-wrap items-center justify-center  gap-4">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
            <div className="w-[95%] h-full flex justify-end my-5 sm:my-16">
                <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                    <Link href="/infos">
                        <span className="text-sm font-medium">EN SAVOIR PLUS</span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
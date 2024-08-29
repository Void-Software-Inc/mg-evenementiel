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
    <div className="h-[300px] w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1rem)] min-w-[295px] bg-zinc-100 flex flex-col justify-start rounded-xl shadow-md mb-4 lg:mb-0">
        <div className="ml-6 my-5 w-20 h-20 bg-transparent rounded-full flex items-center justify-center border border-zinc-700">
            <Icon className="h-9 w-9 text-zinc-700"/>
        </div>
        <p className="ml-8 text-3xl font-extralight text-zinc-700 pb-4 tracking-wide">{title}</p>
        <p className="px-8 text-md font-extralight text-zinc-700 text-left">{description}</p>
    </div>
);

export default function ServicesPresentation() {
    const services = [
        {
            Icon: Truck,
            title: "LIVRAISON",
            description: "Nous nous chargeons de vous livrez le matériel pour votre événement dans toute la région sud de la France."
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
            <div className="w-[80%] h-full flex justify-start mb-8 sm:mb-16">
                <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight">NOS SERVICES</p>
            </div>
            <div className="w-[80%] h-full flex flex-row flex-wrap items-center justify-between gap-4">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
            <div className="w-[80%] h-full flex justify-end my-16">
                <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full px-6 py-3 flex items-center space-x-2 transition-all duration-300 group">
                    <Link href="/catalogue">
                        <span className="text-sm font-medium">EN SAVOIR PLUS</span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
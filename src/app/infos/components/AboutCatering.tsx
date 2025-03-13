'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Traiteur() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const cateringPics = [
        "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r10.webp",
        "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r17.webp",
        "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r8.webp"
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center mb-16 mt-10 sm:mt-16">
            <div className="w-[80%] h-full flex justify-start mb-8 sm:mb-10 space-y-2">
                <p className="text-zinc-800 text-2xl sm:text-3xl font-extralight">
                MG Traiteur : L'Art de Sublimer Vos Réceptions
                </p>
            </div>
            
            {/* Image Gallery */}
            <div className="w-[80%] grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {cateringPics.map((pic, index) => (
                    <div key={index} className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
                        <Image 
                            src={pic} 
                            alt={`Service traiteur ${index + 1}`} 
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
            
            {/* Introduction Text */}
            <div className="w-[80%] prose prose-zinc max-w-none mb-8">
                <p className="text-zinc-700 font-light">
                    Chez MG Événements, nous mettons notre passion et notre savoir-faire au service de vos événements 
                    en proposant une expérience culinaire raffinée et savoureuse. Notre service traiteur est conçu 
                    pour répondre à toutes vos attentes, qu'il s'agisse d'un repas assis élégant, d'un buffet 
                    convivial ou d'un brunch gourmand.
                </p>
            </div>
            
            {/* Menu Section */}
            <div className="w-[80%] prose prose-zinc max-w-none mb-8">
                <h3 className="text-xl text-zinc-800 font-normal">Des Menus Élaborés pour Tous les Goûts</h3>
                <p className="text-zinc-700 font-light">
                    Nos chefs travaillent avec des produits frais et locaux pour vous offrir des menus variés et équilibrés. 
                    Que vous soyez adepte de saveurs traditionnelles ou en quête d'une touche d'originalité, 
                    nos formules s'adaptent à votre événement :
                </p>
                <ul className="list-disc pl-6 text-zinc-700 font-light">
                    <li>
                        <span className="font-normal">Repas assis :</span> Des menus soigneusement composés, allant des entrées légères 
                        et raffinées aux plats gourmands, en passant par des desserts délicats.
                    </li>
                    <li>
                        <span className="font-normal">Buffets dînatoires :</span> Un assortiment de mets froids et chauds pour ravir 
                        les papilles de vos convives.
                    </li>
                    <li>
                        <span className="font-normal">Vin d'honneur et cocktails :</span> Des bouchées savoureuses et des ateliers 
                        culinaires animés par nos chefs.
                    </li>
                    <li>
                        <span className="font-normal">Brunch du lendemain :</span> Un moment de détente autour de viennoiseries, 
                        plats chauds et gourmandises sucrées.
                    </li>
                </ul>
            </div>
            
            {/* Service Section */}
            <div className="w-[80%] prose prose-zinc max-w-none mb-8">
                <h3 className="text-xl text-zinc-800 font-normal">Un Service Clé en Main</h3>
                <p className="text-zinc-700 font-light">
                    Nous prenons en charge tous les aspects de votre repas : dressage des tables, mise en place de la vaisselle, 
                    service à table ou en buffet, et bien plus encore. Notre équipe veille à ce que chaque détail soit parfait 
                    pour que vous puissiez profiter pleinement de votre événement.
                </p>
            </div>
            
            {/* Conclusion */}
            <div className="w-[80%] prose prose-zinc max-w-none">
                <p className="text-zinc-700 italic">
                    MG Traiteur, c'est l'assurance d'un moment culinaire inoubliable, où qualité, créativité et 
                    professionnalisme se rencontrent pour émerveiller vos invités.
                </p>
            </div>
        </div>
    );
}

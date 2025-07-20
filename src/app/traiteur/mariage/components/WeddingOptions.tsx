import Image from 'next/image';
import { SwipeCarousel } from '@/components/global/SwipeCarousel';

const optionsData = [
    {
        title: "Le Vin d’Honneur",
        intro: "Accueillez vos invités avec un moment convivial et gourmand",
        description: {
            sections: [
                {
                    title: "Formules au choix :",
                    items: [
                        "Cocktail 10 pièces : 15 €/pers.",
                        "Cocktail 15 pièces : 21 €/pers.",
                        "Assortiment de bouchées froides et chaudes (mini-burgers, quiches, verrines, croques…)."
                    ]
                },
                {
                    title: "Boissons :",
                    items: [
                        "Rafraîchissements maison : 2,80 €/pers.",
                        "Bar à cocktails : 4,00 €/verre",
                        "Mojito, Spritz, Gin Tonic ou version sans alcool."
                    ]
                },
                {
                    title: "Inclus dans la formule :",
                    items: [
                        "Mise en place, service, nappage, verrerie, vaisselle, serviettes, eaux plate et gazeuse."
                    ]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Buffet dînatoire",
        intro: "Un buffet riche et varié pour régaler tous vos convives",
        description: [
            "Composez un buffet équilibré entre plats froids et chauds, avec des produits savoureux, une belle présentation et un service soigné.",
            "À partir de 27 €/pers.",
            "Coin froid : salades variées, charcuteries, rôtis",
            "Coin chaud : 2 plats au choix, 2 accompagnements"
        ],
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Moment du gâteau",
        intro: "Un dessert inoubliable pour célébrer votre union",
        description: {
            sections: [
                {
                    title: "",
                    items: [
                        { main: "Wedding Cake — 6,50 €/part", sub: "Aux parfums au choix (fraise, framboise, chocolat, vanille, citron, mangue…), nombre d’étages sur mesure, découpe assurée par nos soins." },
                        { main: "Number Cake — 5,50 €/part", sub: "Décor floral avec fleurs fraîches assorties au thème, feuilles d’or ou d’argent en finition. Idéal pour faire apparaître votre date ou vos initiales." },
                        { main: "Fraisier personnalisé — 4,50 €/part", sub: "En forme de cœur, de pièce montée ou dans un design plus contemporain." },
                        { main:"Buffet sucré — 8,50 €/pers.", sub: "Une cascade de chocolat entourée de fruits frais et de petites douceurs en verrines."},
                    ]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z"
        ]
    },
    {
        title: "Fin de soirée – Petites fringales",
        intro: "Pour prolonger la fête et combler les petites fringales",
        description: {
            sections: [
                {
                    title: "",
                    items: ["Offrez à vos invités de quoi se régaler après quelques heures de danse ! Nos plateaux sont pensés pour être partagés simplement et rapidement, sans interrompre l’ambiance."]
                },
                {
                    title: "Nos suggestions gourmandes :",
                    items: [
                        "Plateau de fromages (5 variétés + salade verte) — 45 € / ~25 pers.",
                        "Plateau de charcuteries (5 variétés) — 50 € / ~25 pers.",
                        "Plateau de club-sandwichs (saumon, jambon, poulet) — 35 € / 30 pièces (~25 pers.)",
                        "Plateau de mini-burgers (viande, poulet, poisson, vegan) — 40 € / 25 pièces",
                        "Plateau de mini-pizzas (thon, fromage, jambon-fromage) — 40 € / 25 pièces",
                        "Mignardises sucrées — 1,60 € / pièce"
                    ]
                },
                {
                    title: "",
                    items: ["Service et vaisselle inclus sur demande.", "Idéal pour garder vos invités jusqu’au bout de la nuit !"]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z"
        ]
    },
    {
        title: "Ateliers culinaires interactifs",
        intro: "Une expérience conviviale et originale pour régaler petits et grands",
        description: {
            sections: [
                {
                    title: "",
                    items: ["Animez votre réception avec des stands gourmands, salés ou sucrés, préparés sous les yeux de vos invités."]
                },
                {
                    title: "Ateliers salés",
                    items: [
                        { main: "Jambon sec à la griffe — 5,00 €/pers.", sub: "Dégustation de jambon Serrano découpé à la main, servi avec pain & tomates fraîches." },
                        { main: "Duo de brochettes à la plancha (au choix) — 5,00 €/pers.", sub: "Gambas à la thaï, poulet à la mexicaine, bœuf mariné, ou magret de canard miellé." }
                    ]
                },
                {
                    title: "Ateliers sucrés",
                    items: [
                        { main: "Stand gourmand — 4,50 €/pers.", sub: "Crêpes, gaufres & mini-pancakes (4 pièces)" },
                        { main: "Stand fête foraine — 4,00 €/pers.", sub: "Barbe à papa & pop-corn" }
                    ]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z"
        ]
    },
    {
        title: "Brunch du lendemain",
        intro: "Prolongez les festivités avec un brunch convivial",
        description: {
            sections: [
                {
                    title: "",
                    items: [
                        { main: "Brunch servi sur place – 35 €/pers.", sub: "11h30, inclut service, vaisselle, café, déplacements jusqu’à 30 km" },
                        { main: "Brunch en livraison – 23 €/pers.", sub: "repas + boissons, vaisselle et mobilier en option" }
                    ]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/troy-t-kbiGSJpiTKE-unsplash%2017.30.05.jpg",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/photos-by-lanty-yMY1QE5wpyA-unsplash.webp?t=2025-06-23T15%3A35%3A22.466Z"
        ]
    }
];

const WeddingOptions = () => {
    return (
        <section className="bg-white py-12 md:py-24 px-4 md:px-6 lg:px-8 font-light">
            
            <div className="w-full h-full flex justify-center">
                
                
                <div className="w-[95%] sm:w-[80%] h-fit space-y-12">
                    {optionsData.map((option, index) => (
                        <div key={index} className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-8 lg:gap-16 items-start lg:items-center 2xl:items-start">
                                <div className="lg:col-span-1 2xl:col-span-3 lg:pt-4 w-full sm:w-[90%]">
                                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                                        {option.intro}
                                    </p>
                                    <h3 className=" text-3xl md:text-4xl text-gray-800 mb-6">{option.title}</h3>
                                    <div className="text-gray-600 space-y-2 text-base">
                                        {Array.isArray(option.description) ? (
                                            option.description.map((line, i) => {
                                                if (line.startsWith('Coin froid :') || line.startsWith('Coin chaud :')) {
                                                    const [title, ...rest] = line.split(':');
                                                    return (
                                                        <p key={i}>
                                                            <span>&bull; </span><strong className="font-semibold">{title}:</strong>{rest.join(':')}
                                                        </p>
                                                    );
                                                }
                                                return <p key={i}>{line}</p>;
                                            })
                                        ) : (
                                            <div>
                                                {option.description.sections.map((section, i) => (
                                                    <div key={i} className="mb-4">
                                                        {section.title && <p className="font-semibold">{section.title}</p>}
                                                        {section.title ? (
                                                            <ul className="list-disc list-inside ml-4">
                                                                {section.items.map((item, j) => {
                                                                    if (typeof item === 'string') {
                                                                        return <li key={j}>{item}</li>;
                                                                    }
                                                                    const parts = item.main.split(' — ');
                                                                    return (
                                                                        <li key={j}>
                                                                            {parts.length > 1 ? (
                                                                                <>
                                                                                    <span className="font-semibold">{parts[0]}</span>
                                                                                    <span> — {parts.slice(1).join(' — ')}</span>
                                                                                </>
                                                                            ) : (
                                                                                <span className="font-semibold">{item.main}</span>
                                                                            )}
                                                                            {item.sub && <p className="pl-4 text-sm">{item.sub}</p>}
                                                                        </li>
                                                                    );
                                                                })}
                                                             </ul>
                                                         ) : (
                                                            section.items.map((item, j) => {
                                                                if (typeof item === 'string') {
                                                                    return <p key={j}>{item}</p>;
                                                                }
                                                                const parts = item.main.split(' — ');
                                                                return (
                                                                    <div key={j} className="mb-2">
                                                                        <p>
                                                                            {parts.length > 1 ? (
                                                                                <>
                                                                                    <span className="font-semibold">{parts[0]}</span>
                                                                                    <span> — {parts.slice(1).join(' — ')}</span>
                                                                                </>
                                                                            ) : (
                                                                                <span className="font-semibold">{item.main}</span>
                                                                            )}
                                                                        </p>
                                                                        {item.sub && <p className="pl-4 text-sm">{item.sub}</p>}
                                                                    </div>
                                                                );
                                                            })
                                                         )}
                                                     </div>
                                                 ))}
                                             </div>
                                        )}
                                     </div>
                                 </div>
                                 <div className="lg:col-span-1 2xl:col-span-2">
                                    {option.images ? (
                                        <SwipeCarousel images={option.images} />
                                    ) : (
                                        <div className="relative overflow-hidden bg-white">
                                            <Image
                                                src={option.image}
                                                alt={option.title}
                                                width={800}
                                                height={450}
                                                className="w-full shrink-0 rounded-xl object-cover aspect-video scale-95"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeddingOptions; 
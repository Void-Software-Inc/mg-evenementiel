import Image from 'next/image';
import { SwipeCarousel } from '@/components/global/SwipeCarousel';

const optionsData = [
    {
        title: "Le Vin d’Honneur",
        intro: "Accueillez vos invités avec un moment convivial et gourmand",
        description: {
            sections: [
                {
                    title: "Un cocktail sur-mesure",
                    items: [
                        "Un assortiment de bouchées créatives, froides et chaudes, pour surprendre vos invités : mini-burgers, quiches, verrines, croques-monsieur revisitées..."
                    ]
                },
                {
                    title: "Des boissons pour tous les goûts",
                    items: [
                        "Des rafraîchissements maison aux saveurs subtiles, et un bar à cocktails (Mojito, Spritz, Gin Tonic...) pour une ambiance festive, avec ou sans alcool."
                    ]
                },
                {
                    title: "Un service clé en main",
                    items: [
                        "Nous assurons la mise en place, le service discret et efficace, le nappage, la verrerie, et la vaisselle pour une tranquillité d'esprit totale."
                    ]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Buffet dînatoire",
        intro: "Un buffet riche et varié pour régaler tous vos convives",
        description: {
            sections: [
                {
                    title: "",
                    items: ["Composez un buffet équilibré entre plats froids et chauds, avec des produits savoureux, une belle présentation et un service soigné. Une solution conviviale et gourmande qui s'adapte à toutes vos envies."]
                },
                {
                    title: "Coin Froid",
                    items: ["Un assortiment de salades fraîches et créatives, de plateaux de charcuteries fines, de rôtis tendres et de produits de la mer."]
                },
                {
                    title: "Coin Chaud",
                    items: ["Laissez-vous tenter par nos plats mijotés, nos viandes et poissons cuisinés avec soin, accompagnés de garnitures de saison."]
                }
            ]
        },
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
                        { main: "Wedding Cake", sub: "Majestueux et personnalisable à l'infini. Choisissez les parfums qui vous ressemblent (fraise, chocolat, vanille, mangue...) et le nombre d'étages pour un effet spectaculaire. Nous assurons la découpe pour un service parfait." },
                        { main: "Number Cake", sub: "Tendance et original, il met en scène vos initiales ou la date de votre mariage. Un gâteau léger, décoré de fleurs fraîches et de touches dorées ou argentées pour une finition élégante." },
                        { main: "Fraisier Personnalisé", sub: "Un grand classique revisité. En forme de cœur, de pièce montée ou dans un design contemporain, le fraisier reste une valeur sûre qui séduira tous vos invités par sa fraîcheur." },
                        { main:"Buffet de douceurs", sub: "Créez un véritable bar à desserts avec une cascade de chocolat, des fruits frais, et une variété de mignardises en verrines. Une option gourmande et visuellement spectaculaire."},
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
                    items: ["Après quelques heures de danse, offrez à vos invités de quoi reprendre des forces ! Nos plateaux sont conçus pour être partagés simplement, sans interrompre l'ambiance festive."]
                },
                {
                    title: "Nos suggestions gourmandes :",
                    items: [
                        "Plateau de fromages affinés, accompagné de sa salade verte.",
                        "Assortiment de charcuteries fines.",
                        "Plateau de club-sandwichs variés (saumon, jambon, poulet).",
                        "Assortiment de mini-burgers gourmands (viande, poulet, poisson, vegan).",
                        "Plateau de mini-pizzas pour une touche conviviale.",
                        "Farandole de mignardises sucrées pour les becs sucrés."
                    ]
                },
                {
                    title: "",
                    items: ["Une attention appréciée qui permettra à vos invités de faire la fête jusqu'au bout de la nuit !"]
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
                    items: ["Animez votre réception avec des stands gourmands où nos chefs préparent, sous les yeux de vos invités, des mets salés ou sucrés. Une animation culinaire qui crée une ambiance chaleureuse et des souvenirs mémorables."]
                },
                {
                    title: "Ateliers salés",
                    items: [
                        { main: "Découpe de Jambon Serrano", sub: "Un spectacle pour les yeux et un régal pour les papilles. Notre maître-coupeur tranche finement un jambon de qualité, servi avec du pain frais et des tomates." },
                        { main: "Plancha en direct", sub: "Choisissez parmi nos brochettes savoureuses : gambas à la thaï, poulet à la mexicaine, bœuf mariné, ou magret de canard miellé. Une cuisson minute pour des saveurs préservées." }
                    ]
                },
                {
                    title: "Ateliers sucrés",
                    items: [
                        { main: "Stand de Crêpes et Gaufres", sub: "Un classique indémodable qui ravit petits et grands. Des crêpes et gaufres préparées à la demande, avec un choix de garnitures gourmandes." },
                        { main: "Ambiance Fête Foraine", sub: "Retombez en enfance avec notre stand de barbe à papa et pop-corn. Une touche ludique et sucrée pour animer votre soirée." }
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
                    items: ["Et si la fête continuait le lendemain ? Prolongez la magie de votre mariage avec un brunch décontracté et savoureux. C'est l'occasion parfaite pour se retrouver en plus petit comité, partager les souvenirs de la veille et finir le week-end en douceur."]
                },
                {
                    title: "Une formule adaptée à vos envies",
                    items: ["Nous vous proposons une formule brunch complète avec un assortiment de viennoiseries, salades, quiches, charcuteries, fromages, et boissons chaudes et froides. Que vous souhaitiez un service sur place ou une livraison, nous nous adaptons pour rendre ce moment aussi simple et agréable que possible."]
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
                                                const parts = line.split(':');
                                                if (parts.length > 1 && (parts[0].includes('Coin froid') || parts[0].includes('Coin chaud'))) {
                                                    return (
                                                        <p key={i}>
                                                            <span>&bull; </span><strong className="font-semibold">{parts[0]}:</strong>{parts.slice(1).join(':')}
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
                                                                            <span className="font-semibold">{parts[0]}</span>
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
                                                                return (
                                                                    <div key={j} className="mb-2">
                                                                        <p>
                                                                            <span className="font-semibold">{item.main}</span>
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
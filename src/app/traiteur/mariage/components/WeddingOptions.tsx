import Image from 'next/image';

const optionsData = [
    {
        title: "Le Vin d’Honneur",
        intro: "Accueillez vos invités avec un moment convivial et gourmand.",
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
                        "Rafraîchissement maison (citronnade & orangeade) : 2,80 €/pers.",
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
        intro: "Un buffet riche et varié pour régaler tous vos convives.",
        description: [
            "À partir de 27 €/pers.",
            "Coin froid : salades variées, charcuteries, rôtis",
            "Coin chaud : 2 plats au choix, 2 accompagnements"
        ],
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Moment du gâteau",
        intro: "Un dessert inoubliable pour célébrer votre union.",
        description: [
            "Wedding cake – 6,50 €/part",
            "Number cake – 5,50 €/part",
            "Fraisier – 4,50 €/part",
            "Buffet sucré – 8,50 €/pers. (incluant fontaine de chocolat + verrines)"
        ],
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
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
                        "🧀 Plateau de fromages (5 variétés + salade verte) — 45 € / ~25 pers.",
                        "🥓 Plateau de charcuteries (5 variétés) — 50 € / ~25 pers.",
                        "🥪 Plateau de club-sandwichs (saumon, jambon, poulet) — 35 € / 30 pièces (~25 pers.)",
                        "🍔 Plateau de mini-burgers (viande, poulet, poisson, vegan) — 40 € / 25 pièces",
                        "🍕 Plateau de mini-pizzas (thon, fromage, jambon-fromage) — 40 € / 25 pièces",
                        "🍰 Mignardises sucrées — 1,60 € / pièce"
                    ]
                },
                {
                    title: "",
                    items: ["Service et vaisselle inclus sur demande.", "Idéal pour garder vos invités jusqu’au bout de la nuit !"]
                }
            ]
        },
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Ateliers culinaires interactifs",
        intro: "Une animation qui ravira petits et grands.",
        description: [
            "Salé : jambon sec (5 €/pers.), brochettes plancha (5 €/pers.)",
            "Sucré : crêpes, gaufres, pancakes (4,50 €/pers.); barbe à papa, pop‑corn (4 €/pers.)"
        ],
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    },
    {
        title: "Brunch du lendemain",
        intro: "Prolongez les festivités avec un brunch convivial.",
        description: [
            "Brunch servi sur place – 35 €/pers. (11h30, inclut service, vaisselle, café, déplacements jusqu’à 30 km)",
            "Brunch en livraison – 23 €/pers. (repas + boissons, vaisselle et mobilier en option)"
        ],
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg'
    }
];

const WeddingOptions = () => {
    return (
        <section className="bg-white py-12 md:py-24 px-4 md:px-6 lg:px-8 font-light">
            
            <div className="w-full h-full flex justify-center">
                
                
                <div className="w-[80%] h-fit space-y-12">
                <h2 className="w-full lg:w-[80%] text-zinc-800 text-2xl sm:text-3xl font-extralight mb-12">
                    Options supplémentaires
                </h2>
                    {optionsData.map((option, index) => (
                        <div key={index} className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
                                <div className="lg:col-span-3 lg:pt-4">
                                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                                        {option.intro}
                                    </p>
                                    <h3 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6">{option.title}</h3>
                                    <div className="text-gray-600 space-y-2 text-base">
                                        {Array.isArray(option.description) ? (
                                            option.description.map((line, i) => <p key={i}>{line}</p>)
                                        ) : (
                                            <div>
                                                {option.description.sections.map((section, i) => (
                                                    <div key={i} className="mb-4">
                                                        {section.title && <p className="font-semibold">{section.title}</p>}
                                                        {section.title ? (
                                                            <ul className="list-disc list-inside ml-4">
                                                                {section.items.map((item, j) => (
                                                                    <li key={j}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            section.items.map((item, j) => (
                                                                <p key={j}>{item}</p>
                                                            ))
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                     </div>
                                 </div>
                                 <div className="lg:col-span-2">
                                    <Image
                                        src={option.image}
                                        alt={option.title}
                                        width={800}
                                        height={500}
                                        className="object-cover w-full h-auto aspect-[4/3] lg:aspect-[16/10]"
                                    />
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
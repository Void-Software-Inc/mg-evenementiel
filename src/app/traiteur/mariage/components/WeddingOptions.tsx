import Image from 'next/image';
import { SwipeCarousel } from '@/components/global/SwipeCarousel';

const optionsData = [
    {
        title: "Le Vin d'Honneur",
        intro: "Accueillez vos invités avec un moment convivial et gourmand",
        text: "Accueillez vos invités autour d'un cocktail festif composé de bouchées salées et sucrées, accompagné de boissons variées avec ou sans alcool. Un service complet pour profiter pleinement de ce moment de convivialité.",
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/createasea-NpAeRIYsDqk-unsplash.webp?t=2025-08-24T23%3A34%3A30.783Z'
    },
   
    {
        title: "Moment du gâteau",
        intro: "Un dessert inoubliable pour célébrer votre union",
        text: "Célébrez votre union avec un dessert unique : wedding cake spectaculaire, number cake tendance, fraisier revisité ou buffet de douceurs gourmandes. Des créations personnalisables qui marquent les esprits et régalent vos convives.",
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/kadarius-seegars-49aSF1r7nno-unsplash.webp',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/zeno-aras-lOW7w5-DMHk-unsplash.webp?t=2025-08-24T23%3A38%3A56.184Z",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/md-mahdi-XeMb8hcCRrc-unsplash.webp?t=2025-08-25T00%3A08%3A24.781Z"
        ]
    },
  
    {
        title: "Brunch du lendemain",
        intro: "Prolongez les festivités avec un brunch convivial",
        text: "Prolongez la fête dans une ambiance détendue avec un brunch généreux. Viennoiseries, salades, plats chauds et boissons variées : une formule conviviale pour se retrouver et savourer encore un peu la magie du mariage.",
        image: 'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/enmanuel-betances-santos-Xxe37tN-Rcs-unsplash.jpg',
        images: [
            'https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/natalia-gusakova-7skcX5OOQB0-unsplash.webp?t=2025-08-24T23%3A52%3A52.316Z',
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/thriday-3fsfLwMEBg0-unsplash.webp",
            "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/mariage/colin-michel-7N8amvEYF-0-unsplash.webp?t=2025-08-24T23%3A50%3A17.247Z"
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
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {option.text}
                                    </p>
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
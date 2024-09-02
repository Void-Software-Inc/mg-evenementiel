'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "Quels types d'événements couvrez-vous ?",
            answer: "Nous sommes spécialisés dans la location de matiériel pour les mariages, anniversaires, baptêmes, événements professionnels et autres occasions dans le même esprit."
        },
        {
            question: "Offrez-vous des services de livraison et d'installation pour les meubles et décorations ?",
            answer: "Notre équipe vous livrera le matériel, directement sur le lieu de l'événement et installera meubles et décoration pour le J."
        },
        {
            question: "Comment fonctionne le processus de location ?",
            answer: "Tout d'abord, sélectionnez les articles qui vous plaisent et ajoutez les à votre devis. Renseignez vos coordonnées, la date de l'événement et envoyez-nous votre devis depuis le site. Nous vous contacterons dans un délai de 48h afin fixer un rendez-vous où nous pourrons prendre le temps de discuter de votre événement. Une fois les préparatifs validés, nous vous transmettrons une facture. À l'accompte reçu, le matériel que vous aviez sélectionné pour le jour de votre événement vous sera réservé.",
        },
        {
            question: "Quels types de menus proposez-vous ?",
            answer: "Nous proposons des menus de saison et sur mesure, selon vos préférences."
        },
        {
            question: "Gérez-vous également le service à table et le nettoyage après l'événement ?",
            answer: "Nous ne gérons pas le service à table. En revanche, nous prenons en charge le nettoyage du matériel appartenant à MG Événements."
        },
        {
            question: "Quels sont les frais supplémentaires éventuels ?",
            answer: "Au prix de la location du matériel devra être ajouté les frais de livraison et de collecte du matériel pour les zones en dehors du département d'Haute Garonne."
        },
        {
            question: "Quelles sont vos conditions de paiement et d'annulation ?",
            answer: "Afin de réserver effectivement le matériel pour votre événement, un accompte de 30% du prix total vous sera demandé. En cas d'annulation, nous vous remboursons le montant de la facture moins l'accompte. L'annulation ne donnera lieu à aucun remboursement si l'événement est annulé la semaine même."
        },
        {
            question: "Quelle est la durée de location des meubles et décorations ?",
            answer: "..."
        },
        {
            question: "Que se passe-t-il si un meuble ou une décoration est endommagé(e) pendant l'événement ?",
            answer: "..."
        },
        
    ];

    const getBackgroundColor = (index: number) => {
        const colors = ['bg-zinc-50', 'bg-zinc-100', 'bg-zinc150', 'bg-zinc150', 'bg-zinc-200', 'bg-zinc-200', 'bg-zinc-300', 'bg-zinc-300', 'bg-zinc-400'];
        return colors[index % colors.length];
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center mb-32 sm:mb-40 mt-10 sm:mt-16">
        <div className="w-[80%] h-full flex justify-start mb-8 sm:mb-10 space-y-2">
        <p className="text-zinc-800 text-2xl sm:text-3xl font-extralight">
          Questions Fréquentes
        </p>
              </div>
        <div className="h-full w-[80%] space-y-1">
            {faqItems.map((item, index) => (
                <div key={index} className={`rounded-lg ${getBackgroundColor(index)}`}>
                    <button
                        className="flex justify-between items-center w-full p-4 text-left"
                        onClick={() => toggleFaq(index)}
                    >
                        <h2 className="text-xl font-light text-gray-900">{item.question}</h2>
                        <span className="ml-6 flex-shrink-0 relative w-6 h-6 flex justify-center items-center">
                            <Plus 
                                className={`h-6 w-6 text-gray-500 absolute top-0 left-0 transition-all duration-500 ${
                                    openIndex === index ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                }`}
                            />
                            <Minus 
                                className={`h-6 w-6 text-gray-500 absolute top-0 left-0 transition-all duration-500 ${
                                    openIndex === index ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                                }`}
                            />
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openIndex === index ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        <p className="p-4 text-gray-600 text-base font-light">{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

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
            question: "Quels sont les types d'événements qui peuvent être organisés ?",
            answer: "Nous prenons en charge une grande variété d’événements, tels que les mariages, anniversaires, baptêmes, crémaillères, séminaires, cérémonies, soirées à thème, fêtes, congrès, salons, forums..."
        },
        {
            question: "Proposez-vous des services de livraison, d'installation et de décoration ?",
            answer: "Oui, nous offrons non seulement la location de notre matériel, mais nous pouvons également vous accompagner dans votre projet en fournissant des services tels que l'installation, la mise en place, le dressage des tables, la décoration intérieure, et la livraison."
        },
        {
            question: "Puis-je venir récupérer le matériel moi-même ?",
            answer: (
                <>
                    Si vous ne souhaitez pas faire appel à notre service de livraison, vous pouvez directement récupérer le matériel à notre entrepôt, situé&nbsp;
                    <a 
                        href="https://maps.google.com/?q=Chemin+des+droits+de+l'homme+et+du+citoyen,+31450+Ayguevives" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-normal underline hover:text-gray-600 transition-colors"
                    >
                        Labège, 31670
                    </a>
                    . De la même manière, vous pouvez nous le ramener à cette même adresse une fois votre événement terminé.
                </>
            )
        },
        {
            question: "Comment fonctionne le processus de location ?",
            answer: "Après avoir choisi vos prestations, nous vous enverrons un devis détaillé avec le montant total et les options de paiement disponibles pour le règlement de l’acompte. La réservation est confirmée une fois le devis signé et l’acompte versé. Ensuite, nous convenons ensemble de la date et du lieu de livraison du matériel. Un rappel sera fait 24 heures avant l’événement pour confirmer notre intervention."
        },
        {
            question: "Quels types de menus proposez-vous ?",
            answer: "Nous pouvons créer un menu entièrement personnalisé selon vos souhaits. Nous proposons également des menus élaborés par nos soins, ainsi que des formules spécifiques (par exemple, moules & frites, paella...), en fonction du nombre de convives. Par ailleurs, nous pouvons organiser des apéritifs dînatoires avec un assortiment de mignardises salées et/ou sucrées."
        },
        {
            question: "Prenez-vous en charge le service à table et le nettoyage après l’événement ?",
            answer: "Oui, nous proposons ces services à la demande du client."
        },
        {
            question: "Y a-t-il des frais supplémentaires éventuels ?",
            answer: "Des frais supplémentaires peuvent s'appliquer selon les options choisies ou recommandées. Ces frais concernent généralement des services supplémentaires que nous effectuons pour faciliter la réussite de votre événement."
        },
        {
            question: "Quelles sont les conditions de paiement et d'annulation ?",
            answer: "Le montant total de la commande doit être réglé selon les modalités convenues. Les paiements peuvent être effectués par carte bancaire, espèces, virement bancaire ou PayPal. En cas d’annulation, l’acompte versé ne sera pas remboursé, quel que soit le délai."
        },
        {
            question: "Quelle est la durée de location des meubles et décorations ?",
            answer: "Nos tarifs sont valables pour une période allant du jeudi au lundi. Le tarif comprend une location d'une durée de 4 jours."
        },
        {
            question: "Que se passe-t-il en cas de dommage sur un meuble ou une décoration pendant l’événement ?",
            answer: "Lors de la signature du contrat, une caution est demandée. Cette somme servira à couvrir les éventuels dommages causés à nos meubles ou décorations pendant l’événement."
        },
    ];

    const getBackgroundColor = (index: number) => {
        const colors = ['bg-zinc0','bg-zinc1', 'bg-zinc2', 'bg-zinc3', 'bg-zinc4', 'bg-zinc5', 'bg-zinc6', 'bg-zinc7', 'bg-zinc8', 'bg-zinc9'];
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
                        <h2 className="text-lg sm:text-xl font-light text-gray-900">{item.question}</h2>
                        <span className="ml-6 flex-shrink-0 relative w-6 h-6 flex justify-center items-center">
                            <Plus 
                                className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-500 absolute top-0 left-0 transition-all duration-500 ${
                                    openIndex === index ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                }`}
                            />
                            <Minus 
                                className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-500 absolute top-0 left-0 transition-all duration-500 ${
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
                        <p className={`text-base font-light px-8 pt-4 pb-10 ${
                            index >= 4 ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                            {item.answer}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

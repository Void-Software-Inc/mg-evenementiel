'use client';

import { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const TraiteurFaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "Jusqu'à combien de personnes pouvez-vous servir ?",
            answer: "Nous avons la capacité de servir des événements allant jusqu'à 300 convives, avec une équipe de service expérimentée et du matériel adapté."
        },
        {
            question: "Peut-on adapter les menus à des allergies ou régimes spécifiques ?",
            answer: "Oui. Nous prenons en compte les allergies alimentaires, régimes végétariens, halal, sans gluten, etc. Il suffit de le mentionner lors de la demande de devis."
        },
        {
            question: "Comment se passe la dégustation pour un mariage ?",
            answer: "Une dégustation est organisée une fois le devis validé. Le coût est de 65€ par personne, déduit de votre devis si vous confirmez la prestation."
        },
        {
            question: "Proposez-vous un menu enfant ?",
            answer: "Oui, nous avons un menu enfant à 17 €, adapté aux goûts des plus jeunes, avec boissons incluses."
        },
        {
            question: "Comment demander un devis ?",
            answer: <>Vous pouvez remplir notre <Link href="/contact" className="underline hover:text-gray-900">formulaire de contact</Link> en ligne ou nous écrire directement par mail. Une réponse vous sera apportée sous 48h ouvrées.</>
        },
        {
            question: "Quelles sont vos conditions de réservation ?",
            answer: "Un acompte de 30 % est demandé à la signature du devis. Le solde est à régler 7 jours avant l'événement."
        },
        {
            question: "Que se passe-t-il en cas d'annulation ?",
            answer: "L'annulation doit être notifiée par écrit. Des frais s'appliquent selon la date d'annulation (voir nos CGV)."
        }
    ];

    return (
        <div className="w-full flex justify-center bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-[95%]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Column - 50% width */}
                    <div className="flex items-start justify-start">
                        <div className="text-left space-y-4 pt-4">
                            <p className="text-2xl sm:text-3xl font-extralight text-zinc-800">
                                Une question ? Nous sommes là pour vous accompagner dans la réalisation de votre événement.
                            </p>
                            <Button asChild className="sm:-ml-1 border-2 bg-transparent max-w-[150px] border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                                <Link href="/contact">
                                    <span className="text-sm font-medium">CONTACT</span>
                                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                                </Link>
                            </Button>   
                        </div>
                    </div>

                    {/* Right Column - 50% width - FAQ */}
                    <div className="space-y-6">

                        
                        <div className="space-y-1">
                            {faqItems.map((item, index) => (
                                <div key={index} className="rounded-none border-b border-gray-200">
                                    <button
                                        className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <h4 className="text-lg sm:text-xl font-light text-zinc-900 pr-4">{item.question}</h4>
                                        <span className="ml-6 flex-shrink-0 relative w-6 h-6 flex justify-center items-center">
                                            <Plus 
                                                className={`h-5 w-5 sm:h-6 sm:w-6 text-zinc-500 absolute top-0 left-0 transition-all duration-500 ${
                                                    openIndex === index ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                                }`}
                                            />
                                            <Minus 
                                                className={`h-5 w-5 sm:h-6 sm:w-6 text-zinc-500 absolute top-0 left-0 transition-all duration-500 ${
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
                                        <p className="text-base font-light px-4 pt-2 pb-4 text-zinc-700">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TraiteurFaqSection; 
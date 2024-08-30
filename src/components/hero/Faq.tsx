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
            question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
            answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!"
        },
        {
            question: "Another frequently asked question?",
            answer: "Here's another detailed answer to the question. It can be multiple sentences long and provide comprehensive information to the user."
        },
        {
            question: "Third question for demonstration?",
            answer: "This is the answer to the third question. It demonstrates the gradient effect with different background colors."
        },
        {
            question: "Fourth question to show more gradient?",
            answer: "Here's the answer to the fourth question, further showcasing the gradient effect across multiple FAQ items."
        },
        // Add more questions as needed
    ];

    const getBackgroundColor = (index: number) => {
        const colors = ['bg-zinc-50', 'bg-zinc-100', 'bg-zinc-200', 'bg-zinc-300', 'bg-zinc-400'];
        return colors[index % colors.length];
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center mb-32 sm:mb-40">
        <div className="w-full h-full flex flex-col justify-center items-center mb-8 sm:mb-10 space-y-2">
                  <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight w-[90%] ">POURQUOI</p>
                  <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight w-[90%] sm:w-[80%] ">NOUS CHOISIR ?</p>
              </div>
        <div className="h-full w-[90%] space-y-1">
            {faqItems.map((item, index) => (
                <div key={index} className={`rounded-lg ${getBackgroundColor(index)}`}>
                    <button
                        className="flex justify-between items-center w-full p-4 text-left"
                        onClick={() => toggleFaq(index)}
                    >
                        <h2 className="text-xl font-light text-gray-900">{item.question}</h2>
                        <span className="ml-6 flex-shrink-0 relative w-6 h-6 flex justify-center items-center">
                            <Plus 
                                className={`h-6 w-6 text-gray-500 absolute top-0 left-0 transition-all duration-300 ${
                                    openIndex === index ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                }`}
                            />
                            <Minus 
                                className={`h-6 w-6 text-gray-500 absolute top-0 left-0 transition-all duration-300 ${
                                    openIndex === index ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                                }`}
                            />
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
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

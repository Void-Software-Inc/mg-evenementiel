'use client';
import React from 'react';
import { PackagePlus, Send, Handshake, PartyPopper, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StepsSection = () => {
  return (
    <div className='w-full h-fit flex flex-col justify-center items-center mb-20'>
      <div className="w-full max-w-4xl px-4 mb-12 flex flex-col items-center justify-center">
        <h2 className="text-zinc-800 text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
          LES ÉTAPES
        </h2>
        <h3 className="text-zinc-800 text-center text-lg sm:text-xl xl:text-2xl font-extralight">
          Organisez votre événement en quelques clics, tout simplement !
        </h3>
      </div>
  
    <div className="h-full w-full mb-12 flex flex-col lg:flex-row items-center justify-center gap-6 p-0">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="w-full lg:w-32 2xl:w-52 flex-shrink-0 flex flex-col items-center">
            <div className="h-20 flex items-center justify-center lg:mb-4">
              {step.icon}
            </div>
            <p className="text-center text-xl font-light mb-2">{step.text}</p>
            <p className="text-center text-base font-light max-w-[70%] lg:max-w-full mx-auto">{step.paragraph}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden lg:block relative w-24 h-[2px] bg-zinc-700 flex-shrink-0">
              <div className="absolute top-[-3px] right-[-10px] border-y-[4px] border-y-transparent border-l-[10px] border-l-zinc-700"></div>
            </div>
          )}
        </React.Fragment>
      ))}
      
    </div>
    <div className="w-[95%] h-full flex justify-center lg:justify-end mb-20">
                <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                    <Link href="/infos">
                        <span className="text-sm font-medium">EN SAVOIR PLUS</span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                </Button>
            </div>
    </div>
  );
};

const steps = [
  { icon: <PackagePlus size={40} className='text-zinc-700'/>, text: "CHOISISSEZ", paragraph:"Sélectionnez des articles parmi notre catalogue et ajoutez les à votre devis." },
  { icon: <Send size={40} className='text-zinc-700'/>, text: "ENVOYEZ", paragraph:"Une fois satisfait, transmettez-nous vos coordonnées ainsi que votre devis !" },
  { icon: <Handshake size={40} className='text-zinc-700'/>, text: "VALIDEZ", paragraph:"Nous prenons contact avec vous afin de valider les préparatifs de votre événement." },
  { icon: <PartyPopper size={40} className='text-zinc-700'/>, text: "PROFITEZ !", paragraph:"Récupérez votre matériel ou notre équipe vous le livre ! Nous pouvons aussi vous l’installer et le récupérer à la fin de votre événement." },
];

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    padding: '2rem',
  },
  step: {
    textAlign: 'center' as const,
  },
};

export default StepsSection;

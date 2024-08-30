'use client';
import React from 'react';
import { PackagePlus, Send, Handshake, PartyPopper, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StepsSection = () => {
  return (
    <div className='w-full h-fit flex flex-col justify-center items-center'>
    
      <div className="w-[85%] h-full flex flex-col justify-start mb-3 sm:mb-12">
                <p className="text-zinc-800 text-4xl sm:text-6xl xl:text-7xl font-extralight">EN QUELQUES CLICKS</p>
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
    <div className="w-[85%] h-full flex justify-end mb-20">
                <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full px-6 py-6 flex items-center space-x-2 transition-all duration-300 group">
                    <Link href="/catalogue">
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
  { icon: <PartyPopper size={40} className='text-zinc-700'/>, text: "PROFITEZ !", paragraph:"Notre équipe s’occupe de vous livrer le matériel, de l’installer et de le récupérer à la fin de votre événement." },
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

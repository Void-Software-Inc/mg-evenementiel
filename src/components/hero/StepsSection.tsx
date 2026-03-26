'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const steps = [
  {
    number: "01",
    text: "CHOISISSEZ",
    paragraph: "Sélectionnez des articles parmi notre catalogue et ajoutez-les à votre devis.",
  },
  {
    number: "02",
    text: "ENVOYEZ",
    paragraph: "Une fois satisfait, transmettez-nous vos coordonnées ainsi que votre devis !",
  },
  {
    number: "03",
    text: "VALIDEZ",
    paragraph: "Nous prenons contact avec vous afin de valider les préparatifs de votre événement.",
  },
  {
    number: "04",
    text: "PROFITEZ !",
    paragraph: "Récupérez votre matériel ou notre équipe vous le livre ! Nous pouvons aussi vous l'installer et le récupérer à la fin de votre événement.",
  },
];

const StepsSection = () => {
  return (
    <div className="w-full flex flex-col items-center py-20 px-6 sm:px-12">

      {/* ── MOBILE / TABLET: vertical timeline (< lg) ── */}
      <div className="lg:hidden w-full flex flex-col items-center">
        {/* Title */}
        <div className="mb-16 w-fit">
          <h2 className="text-zinc-800 font-extralight leading-[0.88] tracking-tight text-[clamp(3.5rem,12vw,7rem)]">
            LE
            <br />
            PROCESSUS
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="w-fit">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 sm:gap-10">
              {/* dot + line */}
              <div className="flex flex-col items-center pt-3 flex-shrink-0">
                <div className="w-[5px] h-[5px] rounded-full bg-zinc-700" />
                {index < steps.length - 1 && (
                  <div className="w-px bg-zinc-300 flex-1 mt-2" />
                )}
              </div>
              {/* content */}
              <div className={index < steps.length - 1 ? "pb-12 sm:pb-16" : "pb-0"}>
                <span className="block text-zinc-400 font-extralight leading-none select-none text-[clamp(4rem,18vw,7rem)]">
                  {step.number}
                </span>
                <h3 className="text-zinc-800 text-md tracking-[0.2em] mt-1 mb-3">
                  {step.text}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                  {step.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-end mt-12 w-full max-w-sm sm:max-w-md">
          <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
            <Link href="/infos">
              <span className="text-sm font-medium">EN SAVOIR PLUS</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── DESKTOP: horizontal layout (>= lg) ── */}
      <div className="hidden lg:flex flex-col items-center w-full max-w-5xl xl:max-w-6xl px-8">
        {/* Title */}
        <div className="mb-16 w-full flex justify-center">
          <h2 className="text-zinc-800 font-extralight tracking-wide text-5xl xl:text-6xl text-center">
            LE PROCESSUS
          </h2>
        </div>

        {/* 4 equal columns — each owns its circle + half-connectors + text */}
        <div className="flex w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col min-w-0">
              {/* Circle row with half-connectors */}
              <div className="flex items-center">
                <div className={`flex-1 h-px ${index === 0 ? 'invisible' : 'bg-zinc-300'}`} />
                <div className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 rounded-full border border-zinc-400 flex items-center justify-center">
                  <span className="text-zinc-700 font-extralight text-xl xl:text-2xl">
                    {index + 1}
                  </span>
                </div>
                <div className={`flex-1 h-px ${index === steps.length - 1 ? 'invisible' : 'bg-zinc-300'}`} />
              </div>

              {/* Text below circle */}
              <div className="mt-6 px-3 xl:px-4">
                <h3 className="text-zinc-900 text-sm font-medium tracking-[0.18em] mb-2">
                  {step.text}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {step.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full flex justify-end mt-12">
          <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
            <Link href="/infos">
              <span className="text-sm font-medium">EN SAVOIR PLUS</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
};


export default StepsSection;

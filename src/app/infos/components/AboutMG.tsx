import React, { MutableRefObject, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const AboutMG = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col justify-start mb-12">
        <h1 className="text-zinc-800 mb-6 sm:mb-20 text-5xl sm:text-7xl md:text-8xl font-thin tracking-tight block">
          <span className="hidden max-[410px]:inline">INFORMA<br />TIONS</span>
          <span className="max-[410px]:hidden">INFORMATIONS</span>
        </h1>
        <p className="text-zinc-800 text-2xl sm:text-3xl font-extralight">
          Connaître MG Événements
        </p>
      </div>

      <div className="w-[85%] sm:w-[80%] flex flex-col items-center justify-center lg:flex-row mb-12">
        <div className="w-full lg:w-2/3 2xl:min-w-1/2 h-full flex flex-col justify-between space-y-5 sm:pr-6">
            <div className="w-full h-fit flex justify-center sm:justify-start flex-col sm:flex-row sm:space-x-10">
                <div className="flex h-fit w-full sm:w-fit flex-row justify-center space-x-3 mb-7">
                <div className="h-36 w-36 sm:h-40 sm:w-40 lg:h-52 lg:w-52 rounded-full bg-zinc-800 flex flex-col items-center justify-center">
                    <p className="text-3xl text-white font-extralight leading-tight">+100</p>
                    <p className="text-base w-[50%] md:w-fit text-white font-extralight leading-tight">invités en moyenne</p>
                </div>
                <div className="sm:hidden flex 2xl:h-72 2xl:w-72 lg:h-64 lg:w-64 sm:h-52 sm:w-52 h-40 w-40 rounded-full bg-white border border-zinc-800 flex-col items-center justify-center">
                    <p className="text-3xl text-zinc-700 font-extralight">+80</p>
                    <p className="text-base text-zinc-700 w-[50%] sm:w-fit font-extralight text-center">événements organisés</p>
                </div>
                </div>
                <div className="w-full lg:w-[50%] flex flex-col justify-center items-center">
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight mb-2 ">L’histoire de MG Événements se résume en trois mots: Famille, Réussite et Conception. 
                    Nous sommes une entreprise familiale créée en 2022 dans le but d’organiser et de décorer vos festivités de tout type. Nous réalisons des prestations de service mais également de la location de matériels et de mobiliers,vaisselles.. cela favorise une prise en charge efficace et complète de votre événement. </p>
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight">Le développement de notre service traiteur connaît son ampleur pour son produit 100% frais et local. 
                    </p>
                </div>
            </div>

            <div className="w-full h-fit flex justify-center lg:justify-start flex-col sm:flex-row sm:space-x-10">
                <div className="h-fit w-full sm:w-[50%] flex flex-col">
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight mb-2">Le professionnalisme, l’écoute minutieuse et l’expertise font parties de nos valeurs de prédilection.
                    MG évènements est le détail qui fait la différence pour que vos idées se transforment en réalité, nous nous investissons pleinement en veillant à ce que vos moments spéciaux se déroulent en toute sérénité. </p>
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight">Passion rime avec création, c’est pour cela que MG événements conçoit vos événements sur mesure et de haute qualité.</p>
                </div>
                <div className="hidden sm:flex 2xl:h-72 2xl:w-72 lg:h-64 lg:w-64 h-52 w-52 rounded-full bg-white border border-zinc-800 flex-col items-center justify-center">
                    <p className="text-5xl text-zinc-700 font-extralight leading-tight">+80</p>
                    <p className="text-lg text-zinc-700 font-extralight text-center w-[50%] leading-tight">événements organisés</p>
                </div>
            </div>
        </div>
        <div className="w-full lg:w-1/3 h-full flex justify-end mt-12 lg:mt-0">
          <div className="relative w-full h-[400px] sm:h-[300px] md:h-[450px] lg:h-[680px]">
            <Image
              src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r22.webp?t=2024-09-11T13%3A11%3A05.273Z"
              alt="Man working"
              layout="fill"
              sizes=""
              style={{ objectFit: "cover" }}
              className=""
            />
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

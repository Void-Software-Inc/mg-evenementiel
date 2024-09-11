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
        <h1 className="text-zinc-800 text-4xl mb-8 sm:mb-20 sm:text-6xl xl:text-7xl font-extralight">
          INFORMATIONS
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
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight mb-2 ">Créée en 2019, MG Événements est une entreprise familiale basée à Toulouse. 
                    Nous avons pour passion l'organisation d'évéments. Nous proposons à la location plus de 200 articles comprenant matériel, meubles et décoration.</p>
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight">Depuis 2022, nous proposons également un service de traiteur.</p>
                </div>
            </div>

            <div className="w-full h-fit flex justify-center lg:justify-start flex-col sm:flex-row sm:space-x-10">
                <div className="h-fit w-full sm:w-[50%] flex flex-col">
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight mb-2">Nos valeurs reposent sur le professionnalisme, la ponctualité et l'attention minutieuse aux détails. Nous nous engageons à faire de vos événements une réussite. </p>
                    <p className="text-base xl:text-lg text-zinc-700 font-extralight">Présents à chaque étape, nous nous investissons pleinement pour transformer vos idées en réalité, en veillant à ce que vos moments spéciaux se déroulent en toute sérénité.</p>
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

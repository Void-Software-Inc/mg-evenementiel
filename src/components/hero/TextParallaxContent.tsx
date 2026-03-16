"use client";

import React from "react";
import Image from "next/image";

const TextParallaxContent = () => {
  return (
    <section className="w-full lg:h-screen flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Left side — white background with text + B&W image */}
      <div className="relative w-full lg:w-[55%] h-fit lg:h-full flex flex-col bg-white px-6 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-24 pb-8 md:pb-10">
        {/* Heading + image group */}
        <div className="flex-1 flex flex-col">
          {/* Heading — centered with per-line stagger */}
          <h1 className="font-playfair z-10 text-[2rem] xs:text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.08] tracking-tight text-black flex flex-col items-center">
            <span className="block -translate-x-[8%]">ORGANISEZ</span>
            <span className="block translate-x-[6%]">LE PARFAIT</span>
            <span className="block translate-x-[18%]">ÉVÉNEMENT</span>
          </h1>

          {/* People image — B&W, overlaps heading slightly */}
          <div className="flex justify-center lg:flex-1 lg:items-center -mt-3 md:-mt-5 pb-2">
            <div className="relative w-[60%] min-w-[300px] xs:w-[65%] max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] 2xl:max-w-[400px] aspect-[2/3] lg:aspect-[3/4] grayscale">
              <Image
                src="/poeple.jpg"
                alt="Couple célébrant leur événement"
                fill
                sizes="(max-width: 768px) 60vw, 25vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Subtitle — pinned to bottom, wider line */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-[100%] mt-6 sm:mt-10 md:mt-14 text-center pb-8">
          Traiteur et location de décoration et de mobilier pour vos événements dans le Sud de la France.
        </p>
      </div>

      {/* Right side — full bleed table image */}
      <div className="relative w-full lg:w-[45%] lg:h-full hidden lg:block">
        <Image
          src="/table.jpg"
          alt="Table décorée pour un événement"
          fill
          sizes="45vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default TextParallaxContent;

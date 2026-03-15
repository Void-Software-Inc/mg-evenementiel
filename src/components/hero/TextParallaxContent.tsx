"use client";

import React from "react";
import Image from "next/image";

const TextParallaxContent = () => {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side — white background with text + B&W image */}
      <div className="relative w-full md:w-[55%] h-[50vh] md:h-full flex flex-col bg-white px-8 md:px-12 lg:px-16 pt-20 md:pt-24 pb-6 md:pb-8">
        {/* Heading + image group */}
        <div className="flex-1 flex flex-col">
          {/* Heading — centered with per-line stagger */}
          <h1 className="font-playfair z-10 text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl leading-[1.08] tracking-tight text-black flex flex-col items-center">
            <span className="block -translate-x-[8%]">ORGANISEZ</span>
            <span className="block translate-x-[6%]">LE PARFAIT</span>
            <span className="block translate-x-[18%]">ÉVÉNEMENT</span>
          </h1>

          {/* People image — B&W, overlaps heading slightly */}
          <div className="flex-1 flex items-center justify-center -mt-3 md:-mt-5">
            <div className="relative w-[55%] max-w-[300px] lg:max-w-[340px] 2xl:max-w-[400px] h-full max-h-[55vh] md:max-h-none grayscale">
              <Image
                src="/poeple.jpg"
                alt="Couple célébrant leur événement"
                fill
                sizes="(max-width: 768px) 55vw, 25vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Subtitle — pinned to bottom, wider line */}
        <p className="text-base lg:text-lg text-gray-600 max-w-[100%] mt-14 text-center">
          Traiteur et location de décoration et de mobilier pour vos événements dans le Sud de la France.
        </p>
      </div>

      {/* Right side — full bleed table image */}
      <div className="relative w-full md:w-[45%] h-[50vh] md:h-full">
        <Image
          src="/table.jpg"
          alt="Table décorée pour un événement"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default TextParallaxContent;

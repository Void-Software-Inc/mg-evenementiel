import React, { MutableRefObject, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const PortofolioPics = () => {
  return (
    <div className="relative">
      <div className="w-full px-4 flex flex-col items-center justify-center mb-12">
        <h2 className="text-zinc-800 text-center text-4xl sm:text-6xl xl:text-7xl font-extralight">
          NOS RÉALISATIONS
        </h2>
        <h3 className="text-zinc-800 text-center text-lg sm:text-xl xl:text-2xl font-extralight">
          Découvrez nos créations uniques et personnalisées pour vos événements
        </h3>
      </div>
      
      <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-gray-50">
        <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
          <Image src="/static/svg/rea-logo.svg" alt="Example image" width={1000} height={1000} />
        </h2>
        <Cards />
      </section>

      <div className="flex justify-center lg:justify-end w-full sm:w-[95%] mt-4 mb-20">
        <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
          <Link href="/realisations">
            <span className="text-sm font-medium">VOIR PLUS</span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r84.webp"
        alt="Présentation de la réalisation"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r8.webp"
        alt="Présentation de la réalisation"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r25.webp"
        alt="Présentation de la réalisation"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r6.webp"
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r7.webp"
        alt="Présentation de la réalisation"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r42.webp"
        alt="Présentation de la réalisation"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-44 md:w-56 xl:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/display/r17.webp"
        alt="Présentation de la réalisation"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-64 md:w-72"
      />
    </div>
  );
};

interface Props {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className?: string;
}

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
}: Props) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute object-cover bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
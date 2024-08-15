"use client"

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";

const TextParallaxContent = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMdScreen = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const imageX = useTransform(scrollYProgress, [0, 1], [
    "0%",
    isLargeScreen ? "0%" : "0%"
  ]);
  const imageY = useTransform(scrollYProgress, [0, 1], [
    "0%",
    isSmallScreen ? "-50%" : "0%"
  ]);
  const imageWidth = useTransform(scrollYProgress, [0, 1], [
    "100%",
    isLargeScreen ? "100%" : "100%"
  ]);
  const imageHeight = useTransform(scrollYProgress, [0, 1], [
    "100%",
    isSmallScreen ? "50%" : "100%"
  ]);
  const contentX = useTransform(scrollYProgress, [0, 1], [
    isSmallScreen ? "0%" : "-100%",
    isLargeScreen ? "100%" : isMdScreen ? "100%" : "0%"
  ]);
  const contentY = useTransform(scrollYProgress, [0, 1], [
    isSmallScreen ? "100%" : "0%",
    isSmallScreen ? "-100%" : "0%" 
  ]);
  const contentWidth = useTransform(scrollYProgress, [0, 1], [
    "100%",
    isLargeScreen ? "-10%" : isMdScreen ? "0%" : "100%"
  ]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1]);

  return (
    <div ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ x: imageX, y: imageY, width: imageWidth, height: imageHeight }}
        >
          <div
            style={{
              backgroundImage: `url(https://iccixrimzohdzfbgdegt.supabase.co/storage/v1/object/public/mge-website-images/photo-1525441273400-056e9c7517b3.avif)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-full"
          >
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
            >
              <p className="text-sm uppercase tracking-wider mb-4">CHAQUE DÉTAIL COMPTE</p>
              <h1 className="text-4xl font-bold mb-6 text-center px-2 md:px-10">FAITES BRILLER VOS MOMENTS AVEC UNE TOUCHE DE MAGIE</h1>
            </motion.div>
          </div>
        </motion.div>
        {isSmallScreen ? (
          <motion.div 
            className="absolute inset-0 bg-white"
            style={{ x: contentX, y: contentY, width: contentWidth, opacity: contentOpacity }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="max-w-md px-8">
                <p className="text-sm uppercase tracking-wider mb-4">Dans le sud de la france</p>
                <h1 className="text-4xl font-bold mb-6">ORGANISEZ LE PARFAIT ÉVÉNEMENT</h1>
                <p className="text-lg mb-8">Location de décoration et de mobilier pour vos événements</p>
                <Button variant="default" size="lg">
                  DÉCOUVRIR
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="absolute inset-0 bg-white"
            style={{ x: contentX, y: contentY, width: contentWidth, opacity: contentOpacity }}
          >
            <div className="relative h-full w-full">
              <p className="absolute top-40 left-16 text-sm uppercase tracking-wider">Dans le sud de la france</p>
              <h1 className="absolute top-48 left-16 text-7xl font-extralight tracking-wider leading-tight">
                <span className="md:ml-24 lg:ml-48 text-right">ORGANISEZ</span><br />
                <span className="md:ml-2 lg:ml-16 text-center">LE PARFAIT</span><br />
                <span className="md:ml-20 lg:ml-40 text-right">ÉVÉNEMENT</span>
              </h1>
              <p className="absolute bottom-32 left-16 text-lg max-w-md">
                Location de décoration et de mobilier pour vos événements
              </p>
              <Button className="absolute bottom-16 left-16" variant="default" size="lg">
                DÉCOUVRIR
                <span className="ml-2">→</span>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TextParallaxContent;
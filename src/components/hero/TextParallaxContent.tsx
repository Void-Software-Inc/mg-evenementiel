"use client"

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://iccixrimzohdzfbgdegt.supabase.co/storage/v1/object/public/mge-website-images/photo-1525441273400-056e9c7517b3.avif"
        headerTitle="FAITES BRILLER VOS MOMENTS AVEC UNE TOUCHE DE MAGIE"
        headerMini="CHAQUE DÉTAIL COMPTE"
        subheading="DANS LE SUD DE LA FRANCE"
        heading="ORGANISEZ LE PARFAIT ÉVÉNEMENT"
        description="Location de décoration et de mobilier pour vos événements"
      />
    </div>
  );
};

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  description,
  headerTitle,
  headerMini,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  description: string;
  headerTitle: string;
  headerMini: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMdScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

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
    isLargeScreen ? "0%" : isMdScreen ? "0%" : "100%"
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
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-full"
          >
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
            >
              <p className="text-sm uppercase tracking-wider mb-4">{headerMini}</p>
              <h1 className="text-4xl font-bold mb-6 text-center px-2 md:px-10">{headerTitle}</h1>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-white"
          style={{ x: contentX, y: contentY, width: contentWidth, opacity: contentOpacity }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md px-8">
              <p className="text-sm uppercase tracking-wider mb-4">{subheading}</p>
              <h1 className="text-4xl font-bold mb-6">{heading}</h1>
              <p className="text-lg mb-8">{description}</p>
              <Button variant="default" size="lg">
                DÉCOUVRIR
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextParallaxContent;
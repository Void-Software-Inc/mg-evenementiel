"use client"

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { CartSheet } from "@/components/global/CartSheet";
import { usePathname } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyIcon, CheckCircledIcon } from "@radix-ui/react-icons";

const TextParallaxContent = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });
  
  const is2xlScreen = useMediaQuery({ minWidth: 1698 });
  const isXLargeScreen = useMediaQuery({ minWidth: 1280, maxWidth: 1698 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });
  const isMdScreen = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const isPortrait = useMediaQuery({ minHeight: 500, maxHeight: 650 });
  const isPortraitSmall = useMediaQuery({ maxHeight: 500 });
  const [copied, setCopied] = useState<{ phone: boolean; email: boolean }>({
    phone: false,
    email: false,
  });

  const pathname = usePathname(); // Add this line to get the current path
  const isActive = (path: string) => pathname === path; // Add this function to check active path

  const imageX = useTransform(scrollYProgress, [0, 1], [
    "0%",
    isLargeScreen ? "0%" : "0%"
  ]);
  const imageY = useTransform(scrollYProgress, [0, 1], [
    "0%",
    isSmallScreen ? "0%" : "0%"
  ]);
  const imageWidth = useTransform(scrollYProgress, [0, 1], [
    "100%",
    isLargeScreen ? "100%" : "100%"
  ]);
  const imageHeight = useTransform(scrollYProgress, [0, 1], [
    "100%",
    isSmallScreen ? "100%" : "100%"
  ]);
  const contentX = useTransform(scrollYProgress, [0, 1], [
    isSmallScreen ? "0%" : "-240%",
    isLargeScreen ? "0%" : isMdScreen ? "0%" : "0%"
  ]);
  const contentY = useTransform(scrollYProgress, [0, 1], [
    isSmallScreen ? "200%" : "0%",
    isSmallScreen ? "0%" : "0%" 
  ]);
  const contentWidth = useTransform(scrollYProgress, [0, 1], [
    "100%",
    is2xlScreen ? "31%" : isXLargeScreen ? "32%" : isLargeScreen ? "45%" : isMdScreen ? "50%" : "100%"
  ]);
  const buttonLeftPosition = useTransform(scrollYProgress, [0, 0.9, 1], ["0%", "0%", "88%"]);
  
  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
  };
  
  const PhoneCard = () => {
    const phoneNumber = "07 68 10 96 17";
    const email = "mgevenementiel31@gmail.com";

    return (
      <div className="w-full space-y-1">
        <div className="flex justify-start items-center space-x-3">
          <h4 className="text-base lg:text-xl font-semibold">{phoneNumber}</h4>
          {/* Copy button for phone number */}
          <button
            className="focus:outline-none text-gray-800 transition-all duration-300"
            onClick={() => handleCopy(phoneNumber, "phone")}
            title="Copier le numéro de téléphone"
          >
            {/* Toggle between copy icon and check circled icon with transition */}
            {copied.phone ? (
              <CheckCircledIcon className="h-5 w-5 text-green-500" />
            ) : (
              <CopyIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-base lg:text-lg font-semibold">{email}</p>
          {/* Copy button for email address */}
          <button
            className="focus:outline-none text-gray-800 transition-all duration-300"
            onClick={() => handleCopy(email, "email")}
            title="Copier l'addresse email"
          >
            {/* Toggle between copy icon and check circled icon with transition */}
            {copied.email ? (
              <CheckCircledIcon className="h-5 w-5 text-green-500" />
            ) : (
              <CopyIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="text-sm italic lg:pt-4">Du lundi au samedi de 8h à 20h</p>
      </div>
    );
  };

  return (
    <>
      <div ref={targetRef} className="relative h-[200vh]">
        <div className="hidden md:block absolute h-[10vh] w-full bg-transparent">
          <div className="sticky h-16 top-0 overflow-hidden z-50 bg-transparent flex items-center">
            <div className="p-4 bg-transparent flex items-center w-full">
              <Link href="/" className="absolute left-2 gap-2 text-lg font-semibold">
                <Image className="cursor-pointer" src="/static/svg/mgelogowhite.svg" alt="logo" width={is2xlScreen ? 175 : 150} height={is2xlScreen ? 175 : 150} />
              </Link>
              <nav className="flex w-full justify-center items-center space-x-10 text-sm 2xl:text-lg font-medium">
                {[
                  { href: '/catalogue', label: 'CATALOGUE' },
                  { href: '/traiteur', label: 'TRAITEUR' },
                  { href: '/realisations', label: 'RÉALISATIONS' },
                  { href: '/infos', label: 'INFOS' },
                  { href: '/contact', label: 'CONTACT' },
                ].map(({ href, label }) => (
                  <div key={href} className="relative group">
                    <Link href={href} className="text-white font-light tracking-wider relative group transition-colors duration-500">
                      <span className="relative inline-block">
                        {label}
                      </span>
                    </Link>
                    <div className="absolute -top-[21px] left-1/2 transform -translate-x-1/2 w-20 h-1">
                      <div 
                        className={`w-full h-2 bg-white rounded-full transition-all duration-300 ease-out origin-center
                          ${isActive(href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                        `}
                      />
                    </div>
                  </div>
                ))}
              </nav>
              <div className="absolute right-8 flex items-center space-x-4 text-white font-light tracking-wider transition-colors duration-500">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-white focus:outline-none">
                      <Phone className="h-6 w-6 2xl:h-8 2xl:w-8" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" side="bottom" align="end">
                    <PhoneCard />
                  </PopoverContent>
                </Popover>
                <CartSheet isWhite={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ x: imageX, y: imageY, width: imageWidth, height: imageHeight }}
          >
            <div className="relative w-full h-full">
              <Image
                src="https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/hero2.webp"
                alt="Background"
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover'
                }}
                priority
              />
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30"
                style={{ opacity: useTransform(scrollYProgress, [0.5, 1], [1, 0]) }}
              >
                <p className="text-base w-[90%] hidden md:block sm:w-full sm:text-xl font-light sm:font-extralight 2xl:text-2xl uppercase tracking-wider mb-4 text-center">TRANSFORMEZ VOS MOMENTS SPÉCIAUX EN CÉLÉBRATIONS UNIQUES</p>
                <p className="text-base w-[90%] md:hidden sm:w-full sm:text-xl font-light sm:font-extralight 2xl:text-2xl uppercase tracking-wider mb-4 text-center">Chaque détail est important</p>
                <p className="text-3xl sm:text-5xl font-normal mb-6 text-center px-2 md:px-10 leading-snug sm:font-light">LOCATION DE MOBILIER ET DE DÉCORATION POUR ÉVÉNEMENTS</p>
              </motion.div>
            </div>
          </motion.div>
          {isSmallScreen ? (
            <motion.div 
              className="absolute inset-0 bg-white"
              style={{ x: contentX, y: contentY, width: contentWidth }}
            >
              <div className="h-[100vh] flex items-center justify-center">
                <div className="max-w-md px-8 text-center">
                  <p className="text-sm uppercase tracking-wider mb-4">Dans le sud de la france</p>
                  <p className="text-4xl font-bold mb-6">ORGANISEZ LE PARFAIT ÉVÉNEMENT</p>
                  <p className="text-lg mb-8">Location de décoration et de mobilier pour vos événements</p>
                  <Button asChild className="border-2 bg-transparent border-zinc-800 text-zinc-800 hover:text-white font-light rounded-full p-6 flex items-center space-x-2 transition-all duration-300 group">
                    <Link href="/catalogue">
                      <span className="text-sm font-medium">DÉCOUVRIR</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="absolute inset-0 bg-white"
              style={{ x: contentX, y: contentY, width: contentWidth }}
            >
              {isPortraitSmall ? (
                <div className="relative h-full w-full">
                  <p className="absolute top-10 left-16 text-sm uppercase tracking-wider">Dans le sud de la france</p>
                  <h1 className="absolute top-16 left-16 text-5xl font-extralight tracking-wider leading-tight">
                    <span className="md:ml-36 lg:ml-48 text-right">ORGANISEZ</span><br />
                    <span className="md:ml-10 lg:ml-16 text-center">LE PARFAIT</span><br />
                    <span className="md:ml-32 lg:ml-40 text-right">ÉVÉNEMENT</span>
                  </h1>
                  <p className="absolute bottom-16 left-16 text-md max-w-xs">
                    Location de décoration et de mobilier pour vos événements
                  </p>
                  <motion.div 
                    className="absolute bottom-1"
                    style={{ left: buttonLeftPosition }}
                  >
                    <Button 
                      className="hover:bg-black rounded-full w-24 h-24 p-0 flex items-center justify-center text-sm font-medium group"
                      variant="default" 
                      size="default"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <span>DÉCOUVRIR</span>
                        <span className="text-xl transform transition-transform duration-700 group-hover:rotate-[360deg]">→</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              ) : isPortrait ? (
                <div className="relative h-full w-full">
                  <p className="absolute top-10 left-16 text-sm uppercase tracking-wider">Dans le sud de la france</p>
                  <h1 className="absolute top-16 left-16 text-6xl font-extralight tracking-wider leading-tight">
                    <span className="md:ml-36 lg:ml-48 text-right">ORGANISEZ</span><br />
                    <span className="md:ml-10 lg:ml-16 text-center">LE PARFAIT</span><br />
                    <span className="md:ml-32 lg:ml-40 text-right">ÉVÉNEMENT</span>
                  </h1>
                  <p className="absolute bottom-32 left-16 text-lg w-72">
                    Location de décoration et de mobilier pour vos événements
                  </p>
                  <motion.div 
                    className="absolute bottom-16"
                    style={{ left: buttonLeftPosition }}
                  >
                    <Button 
                      className="hover:bg-black rounded-full w-28 h-28 p-0 flex items-center justify-center text-sm font-medium group"
                      variant="default" 
                      size="default"
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <span>DÉCOUVRIR</span>
                        <span className="text-xl transform transition-transform duration-700 group-hover:rotate-[360deg]">→</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <p className="absolute top-48 2xl:top-40 4xl:top-48 left-16 text-sm uppercase tracking-wider 2xl:text-lg">Dans le sud de la france</p>
                  <h1 className="absolute top-56 2xl:top-48 4xl:top-56 left-16 text-7xl 4xl:text-8xl font-extralight tracking-wider leading-tight 2xl:leading-snug">
                    <span className="md:ml-24 lg:ml-48 2xl:ml-56 text-right">ORGANISEZ</span><br />
                    <span className="md:ml-2 lg:ml-16 2xl:ml-20 text-center">LE PARFAIT</span><br />
                    <span className="md:ml-20 lg:ml-40 2xl:ml-52 text-right">ÉVÉNEMENT</span>
                  </h1>
                  <p className="absolute bottom-32 2xl:bottom-32 3xl:bottom-32 4xl:bottom-52 left-16 text-lg 2xl:text-xl max-w-xs 2xl:max-w-md">
                    Location de décoration et de mobilier pour vos événements
                  </p>
                  <motion.div 
                    className="absolute bottom-8 2xl:bottom-22"
                    style={{ left: buttonLeftPosition }}
                  >
                    <Link href="/catalogue" passHref>
                      <Button 
                        className="hover:bg-black rounded-full w-28 h-28 2xl:w-32 2xl:h-32 4xl:w-44 4xl:h-44 p-0 flex items-center justify-center text-sm 2xl:text-lg font-medium group"
                        variant="default" 
                        size="default"
                      >
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <span>DÉCOUVRIR</span>
                          <span className="text-xl transform transition-transform duration-700 group-hover:rotate-[360deg]">→</span>
                        </div>
                      </Button>
                    </Link>
</motion.div>

                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default TextParallaxContent;
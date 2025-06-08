"use client"

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { useMediaQuery } from "react-responsive";
import { CartSheet } from "@/components/global/CartSheet";
import { useEffect, useState } from 'react';

const TraiteurWhiteNavbar = () => {
  const is2xlScreen = useMediaQuery({ minWidth: 1698 });
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start fading out at 80vh, completely fade out by 100vh
      const fadeStart = windowHeight * 0.8;
      const fadeEnd = windowHeight;
      
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        // Calculate opacity between fadeStart and fadeEnd
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - fadeProgress);
      }
    };

    handleScroll(); // Set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="hidden md:block absolute h-[10vh] w-full bg-transparent z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="sticky h-16 top-0 overflow-hidden bg-transparent flex items-center">
        <div className="p-4 bg-transparent flex items-center w-full">
          <Link href="/" className="absolute left-2 gap-2 text-lg font-semibold">
            <Image className="cursor-pointer w-[150px] h-[150px] 2xl:w-[175px] 2xl:h-[175px]" src="/static/svg/mgelogowhite.svg" alt="logo" width={175} height={175} />
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
            <button className="text-white focus:outline-none">
              <Phone className="h-6 w-6 2xl:h-8 2xl:w-8" />
            </button>
            <CartSheet isWhite={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraiteurWhiteNavbar; 
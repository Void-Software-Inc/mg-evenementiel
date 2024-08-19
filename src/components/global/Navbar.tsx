"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 1; // 100vh
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = () => {
    setIsOpen(false);
  }

  return (
    <>
      <header className="md:hidden fixed w-full top-0 flex h-16 items-center justify-between px-4 z-50 bg-white/30 backdrop-blur-md">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full h-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center pb-4">
                <Link href="/" className="flex items-center gap-2" onClick={handleItemClick}>
                  <Image src="/static/svg/mgelogo.svg" alt="logo" width={150} height={150} />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/catalogue" className="text-xl font-medium" onClick={handleItemClick}>
                  CATALOGUE
                </Link>
                <Link href="/realisations" className="text-xl font-medium" onClick={handleItemClick}>
                  RÉALISATIONS
                </Link>
                <Link href="/infos" className="text-xl font-medium" onClick={handleItemClick}>
                  INFOS
                </Link>
                <Link href="/contact" className="text-xl font-medium" onClick={handleItemClick}>
                  CONTACT
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Image className="cursor-pointer" src="/static/svg/mgelogo.svg" alt="logo" width={150} height={150} />
        </Link>

        <Link href="/cart" className="text-black">
          <ShoppingBag className="h-6 w-6" />
        </Link>
      </header>

      <header 
        className={`hidden md:flex fixed w-full top-0 h-16 items-center justify-between px-6 z-50 bg-white/1 backdrop-blur-md transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <Image className="cursor-pointer" src="/static/svg/mgelogo.svg" alt="logo" width={150} height={150} />
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/catalogue" className="text-gray-800 hover:text-black">
            CATALOGUE
          </Link>
          <Link href="/realisations" className="text-gray-800 hover:text-black">
            RÉALISATIONS
          </Link>
          <Link href="/infos" className="text-gray-800 hover:text-black">
            INFOS
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-black">
            CONTACT
          </Link>
        </nav>

        <Link href="/cart" className="text-black">
          <ShoppingBag className="h-6 w-6" />
        </Link>
      </header>
    </>
  )
}
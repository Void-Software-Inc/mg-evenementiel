"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { CartSheet } from "@/components/global/CartSheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [traiteurMenuOpen, setTraiteurMenuOpen] = useState(false);

  const is2xlScreen = useMediaQuery({ minWidth: 1698 });
  const pathname = usePathname();
  const [copied, setCopied] = useState<{ phone: boolean; email: boolean }>({
    phone: false,
    email: false,
  });
  
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        const scrollThreshold = window.innerHeight * 1; // 100vh
        setIsVisible(window.scrollY > scrollThreshold);
      } else {
        setIsVisible(true); // Always visible on other routes
      }
    };

    handleScroll(); // Call once to set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleItemClick = () => {
    setIsOpen(false);
  }

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
  };

  const isActive = (path: string) => pathname === path;
  const isTraiteurActive = () => pathname.startsWith('/traiteur');

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

  const NavLink = ({ href, label, hasSubmenu = false }: { href: string; label: string; hasSubmenu?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    if (hasSubmenu) {
      return (
        <div className="relative flex flex-col">
          <div className="relative flex items-center">
            <div 
              className={`absolute left-0 w-5 h-[3px] -ml-3 rounded-full bg-zinc-700 transition-all duration-200 ease-in-out ${
                isTraiteurActive() || isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <button
              className="text-xl font-light tracking-wide text-gray-800 pl-4 flex items-center"
              onClick={() => setSubmenuOpen(!submenuOpen)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {label}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {submenuOpen && (
            <div className="ml-4 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
              <Link
                href="/traiteur"
                className="block text-lg font-light text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Présentation
              </Link>
              <Link
                href="/traiteur/menus"
                className="block text-lg font-light text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Menus
              </Link>
              <Link
                href="/traiteur/catalogue"
                className="block text-lg font-light text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Catalogue
              </Link>
                <Link
                  href="/traiteur/mariage"
                  className="block text-lg font-light text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Mariage
                </Link>
                <Link
                  href="/traiteur/particulier"
                  className="block text-lg font-light text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Particulier
                </Link>
                <Link
                  href="/traiteur/professionnel"
                  className="block text-lg font-light text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Professionnel
                </Link>
           
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative flex items-center">
        <div 
          className={`absolute left-0 w-5 h-[3px] -ml-3 rounded-full bg-zinc-700 transition-all duration-200 ease-in-out ${
            isActive(href) || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Link 
          href={href} 
          className="text-xl font-light tracking-wide text-gray-800 pl-4"
          onClick={() => setIsOpen(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {label}
        </Link>
      </div>
    );
  };

  return (
    <>
      <header className="md:hidden fixed w-full top-0 flex h-16 items-center justify-between px-4 z-50 bg-white/30 backdrop-blur-md">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 hover:bg-transparent z-50"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full h-full" title="Menu" hideTitle={true} description="Menu de navigation mobile">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center pb-4">
                <Link href="/" className="flex items-center gap-2" onClick={handleItemClick}>
                  <Image src="/static/svg/mgelogo.svg" alt="logo" width={150} height={150} />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-6 mt-8">
                <NavLink href="/catalogue" label="CATALOGUE" />
                <NavLink href="/traiteur" label="TRAITEUR" hasSubmenu={true} />
                <NavLink href="/realisations" label="RÉALISATIONS" />
                <NavLink href="/infos" label="INFOS" />
                <NavLink href="/contact" label="CONTACT" />
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="absolute left-0 right-2 flex items-center justify-center gap-2 text-lg font-semibold">
          <Image className="cursor-pointer" src="/static/svg/mgelogo.svg" alt="logo" width={150} height={150} />
        </Link>

        

        <div className={`absolute right-2 flex items-center space-x-1 ${pathname !== '/devis' ? 'right-2' : 'right-4'}`}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-800 focus:outline-none">
                <Phone className="h-6 w-6 2xl:h-8 2xl:w-8" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="bottom" align="end">
              <PhoneCard />
            </PopoverContent>
          </Popover>
          {pathname !== '/devis' && <CartSheet />}
        </div>
      </header>

      <header 
        className={`hidden md:flex fixed w-full top-0 h-16 items-center justify-between px-6 z-50 bg-white/50 backdrop-blur-md transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/" className="absolute left-2 gap-2 text-base font-semibold">
          <Image className="cursor-pointer w-[150px] h-[150px] 2xl:w-[175px] 2xl:h-[175px]" src="/static/svg/mgelogo.svg" alt="logo" width={175} height={175} />
        </Link>

        <nav className="flex w-full justify-center items-center space-x-10 text-sm 2xl:text-lg font-medium">
          <div className="relative group">
            <Link href="/catalogue" className="text-gray-800 font-normal tracking-wider hover:text-black 2xl:text-lg">
              CATALOGUE
            </Link>
            <div className="absolute -top-[21px] left-1/2 transform -translate-x-1/2 w-20 h-1">
              <div 
                className={`w-full h-2 bg-zinc-800 rounded-full transition-all duration-300 ease-out origin-center
                  ${isActive('/catalogue') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                `}
              />
            </div>
          </div>

          {/* TRAITEUR with Popover */}
          <div className="relative group">
            <Popover open={traiteurMenuOpen} onOpenChange={setTraiteurMenuOpen}>
              <PopoverTrigger asChild>
                <button 
                  className="text-gray-800 font-normal tracking-wider hover:text-black 2xl:text-lg"
                  onClick={() => setTraiteurMenuOpen(!traiteurMenuOpen)}
                >
                  TRAITEUR
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[600px]" side="bottom" align="center">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <li>
                      <Link
                        href="/traiteur"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Présentation</div>
                        <div className="text-sm text-gray-500">Découvrez nos services traiteur</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/traiteur/catalogue"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Catalogue</div>
                        <div className="text-sm text-gray-500">Commencez votre devis</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/traiteur/menus"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Menus</div>
                        <div className="text-sm text-gray-500">Découvrez nos suggestions</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/traiteur/mariage"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Mariage</div>
                        <div className="text-sm text-gray-500">Cérémonies et réceptions de mariage</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/traiteur/particulier"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Particulier</div>
                        <div className="text-sm text-gray-500">Événements privés et familiaux</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/traiteur/professionnel"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setTraiteurMenuOpen(false)}
                      >
                        <div className="font-medium">Professionnel</div>
                        <div className="text-sm text-gray-500">Événements d'entreprise et séminaires</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
            <div className="absolute -top-[21px] left-1/2 transform -translate-x-1/2 w-20 h-1">
              <div 
                className={`w-full h-2 bg-zinc-800 rounded-full transition-all duration-300 ease-out origin-center
                  ${isTraiteurActive() ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                `}
              />
            </div>
          </div>
          
          {[
            { href: '/realisations', label: 'RÉALISATIONS' },
            { href: '/infos', label: 'INFOS' },
            { href: '/contact', label: 'CONTACT' },
          ].map(({ href, label }) => (
            <div key={href} className="relative group">
              <Link href={href} className="text-gray-800 font-normal tracking-wider hover:text-black 2xl:text-lg">
                {label}
              </Link>
              <div className="absolute -top-[21px] left-1/2 transform -translate-x-1/2 w-20 h-1">
                <div 
                  className={`w-full h-2 bg-zinc-800 rounded-full transition-all duration-300 ease-out origin-center
                    ${isActive(href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                  `}
                />
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute right-8 flex items-center space-x-4 ">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-800 focus:outline-none">
                <Phone className="h-6 w-6 2xl:h-8 2xl:w-8" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="bottom" align="end">
              <PhoneCard />
            </PopoverContent>
          </Popover>
          {pathname !== '/devis' && <CartSheet />}
        </div>
      </header>
    </>
  )
}
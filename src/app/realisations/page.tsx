"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  

const RealisationsPage: React.FC = () => {
    const [position, setPosition] = React.useState("bottom");

  return (
    <div>
    <div className="h-full w-full flex flex-col items-center justify-center mt-28">
        <div className="h-fit w-[85%]">
            <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
            <p className="text-6xl sm:text-7xl md:text-9xl font-thin tracking-tighter block mb-6">TOUT</p>
            <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">103</div>
            </div>
            <div className="h-fit w-full flex lg:justify-between">
               <div className="h-fit w-full flex justify-start space-x-1 lg:space-x-2 lg:ml-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                                Type
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44">
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                <DropdownMenuRadioItem value="Mariage">Mariage</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Anniversaire">Anniversaire</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Bapteme">Baptême</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="BabyShower">Baby Shower</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Professionnel">Professionnel</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Autre">Autre</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                                Lieu
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-26">
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                <DropdownMenuRadioItem value="Interieur">Intérieur</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Exterieur">Extérieur</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                
                <div className='ml-1 lg:ml-0'>
                  <Button className='bg-transparent transition active:scale-95 space-x-1 overflow-hidden duration-200 ease-in-out hover:bg-zinc-100 border border-zinc-800 text-zinc-800 rounded-full'><span className='pr-2'>Nettoyer filtres</span><UpdateIcon/></Button> 
                </div>
                </div>
            </div>
    </div> 
    </div>
  );
};

export default RealisationsPage;

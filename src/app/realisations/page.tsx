"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, UpdateIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RealisationsPage: React.FC = () => {
    const [position, setPosition] = useState("bottom");
    const [selectedType, setSelectedType] = useState("Tout");
    const [selectedLieu, setSelectedLieu] = useState("");
    
    const handleTypeChange = (value: string) => {
        setSelectedType(value); 
    };

    const handleLieuChange = (value: string) => {
        setSelectedLieu(value); 
    };

    const handleResetFilters = () => {
        setSelectedType("Tout"); 
        setSelectedLieu("");       
    };

    return (
        <div>
            <div className="h-full w-full flex flex-col items-center justify-center mt-28">
                <div className="h-fit w-[85%]">
                    <div className="w-full h-fit flex justify-start space-x-2 lg:space-x-6">
                        <div className="relative pb-12">
                            <p className="text-5-1/2xl sm:text-7xl md:text-9xl font-thin tracking-tighter text-nowrap">{selectedType}</p>
                            <div className='h-fit w-full absolute -mt-3 sm:mt-2 text-end'>
                                <p className="text-1xl sm:text-2xl font-thin">{selectedLieu}</p>
                            </div>
                        </div>
                        <div className="h-8 w-12 lg:h-12 lg:w-20 p-5 lg:p-8 flex items-center justify-center rounded-full border border-zinc-800 bg-transparent text-xl lg:text-3xl font-extralight">103</div>
                    </div>

                    <div className="h-fit w-full flex flex-col sm:flex-row sm:justify-between mt-4">
                        <div className="h-fit w-full flex justify-start space-x-1 lg:space-x-2 lg:ml-6">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center justify-between bg-transparent transition duration-200 ease-in-out hover:bg-zinc-100 text-zinc-800 border border-zinc-800 rounded-full px-4 py-2">
                                        {selectedType}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44">
                                    <DropdownMenuRadioGroup value={selectedType} onValueChange={handleTypeChange}>
                                        <DropdownMenuRadioItem value="Mariage">Mariage</DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="Anniversaire">Anniversaire</DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="Baptême">Baptême</DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="Baby Shower">Baby Shower</DropdownMenuRadioItem>
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
                                    <DropdownMenuRadioGroup value={position} onValueChange={handleLieuChange}>
                                        <DropdownMenuRadioItem value="EN INTÉRIEUR">Intérieur</DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="EN EXTÉRIEUR">Extérieur</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-1 sm:mt-0 ml-0 lg:ml-2">
                            <Button onClick={handleResetFilters} className="bg-transparent transition active:scale-95 space-x-1 overflow-hidden duration-200 ease-in-out hover:bg-zinc-100 border border-zinc-800 text-zinc-800 rounded-full">
                                <span className="pr-2">Nettoyer filtres</span>
                                <UpdateIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealisationsPage;

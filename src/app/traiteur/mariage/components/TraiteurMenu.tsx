"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { menus } from '@/data/menus'; 
import { Button } from '@/components/ui/button';

type Tab = "Entrées" | "Plats" | "Desserts" | "Fromages" | "Boissons" | "Inclus";

const tabKeys: { [key: string]: Tab } = {
  "Entrées (1 au choix)": "Entrées",
  "Entrées": "Entrées",
  "Plats (1 au choix)": "Plats",
  "Plats": "Plats",
  "Desserts": "Desserts",
  "Fromages": "Fromages",
  "Boissons": "Boissons",
  "Inclus": "Inclus"
};

const getDisplayKey = (key: string): Tab => {
    return tabKeys[key] || key as Tab;
  };

const TraiteurMenu = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const currentMenu = menus[currentMenuIndex];
  const [activeTab, setActiveTab] = useState<Tab>(getDisplayKey(Object.keys(currentMenu.details)[0]));

  useEffect(() => {
    setActiveTab(getDisplayKey(Object.keys(menus[currentMenuIndex].details)[0]));
  }, [currentMenuIndex]);

  const handleNextMenu = () => {
    setCurrentMenuIndex((prevIndex) => (prevIndex + 1) % menus.length);
  };

  const handlePrevMenu = () => {
    setCurrentMenuIndex((prevIndex) => (prevIndex - 1 + menus.length) % menus.length);
  };
  
  const renderContent = () => {
    const key = Object.keys(currentMenu.details).find(k => getDisplayKey(k) === activeTab);
    if (key) {
      const items = currentMenu.details[key];
      return (
        <div className="pr-4">
          {items.map((item, index) => {
            if (item === "OU") {
              return (
                <div key={index} className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-200" />
                  <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-gray-400">
                    ou
                  </span>
                  <div className="flex-grow border-t border-gray-200" />
                </div>
              );
            }
            
            return (
              <div key={index} className={`flex justify-between items-center py-4 ${items[index + 1] !== "OU" && index !== items.length - 1 ? "border-b" : ""}`}>
                <div>
                  <h4 className="font-semibold whitespace-pre-line">{item.split('(')[0].trim()}</h4>
                  {item.includes('(') && <p className="text-sm text-gray-500">{item.split('(')[1].replace(')', '')}</p>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[90%] mx-auto my-12 px-5 sm:px-12 md:px-16 lg:px-20 xl:px-24">
      <div className="relative">
        {/* Navigation arrows */}
        <Button onClick={handlePrevMenu} className="absolute top-1/2 -translate-y-1/2 -left-8 sm:-left-10 md:-left-14 lg:-left-16 bg-black/20 hover:bg-black/50 rounded-full p-2 z-10 shrink-0">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
        
        <div className="w-full flex flex-col lg:flex-row gap-x-4 h-auto lg:h-[500px]">
          {/* Left section */}
          <div className="w-full lg:w-2/3 relative h-[300px] lg:h-auto shadow-lg overflow-hidden">
            <Image src={currentMenu.image} alt={currentMenu.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white">
              <h2 className="text-4xl font-bold">{currentMenu.title}</h2>
              <p className="text-2xl mt-2">{currentMenu.price}</p>
            </div>
          </div>

          {/* Right section */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col min-h-[420px] lg:min-h-0 bg-white shadow-lg">
            <div className="flex border-b mb-4 overflow-x-auto">
              {Object.keys(currentMenu.details).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(getDisplayKey(key))}
                  className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                    activeTab === getDisplayKey(key) ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {getDisplayKey(key)}
                </button>
              ))}
            </div>
            <div className="flex-grow overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>

        <Button onClick={handleNextMenu} className="absolute top-1/2 -translate-y-1/2 -right-8 sm:-right-10 md:-right-14 lg:-right-16 bg-black/20 hover:bg-black/50 rounded-full p-2 z-10 shrink-0">
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default TraiteurMenu; 
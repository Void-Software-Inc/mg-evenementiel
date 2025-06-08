"use client";

import React, { useState } from 'react';

const TraiteurStats = () => {
  const [currentCircleIndex, setCurrentCircleIndex] = useState(0);

  const circleData = [
    {
      number: "200+",
      text: "événements organisés avec succès chaque année"
    },
    {
      number: "98%",
      text: "de clients satisfaits selon nos enquêtes post-événement"
    },
    {
      number: "500+",
      text: "clients particuliers & professionnels nous ont déjà fait confiance"
    }
  ];

  const handleCircleClick = () => {
    setCurrentCircleIndex((prev) => (prev + 1) % circleData.length);
  };

  return (
    <div className="w-full bg-transparent py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          
          {/* Mobile: Single Circle with Tap Functionality */}
          <div className="md:hidden flex items-center justify-center w-full">
            <div 
              className="relative w-64 h-64 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center cursor-pointer select-none active:scale-95 transition-transform duration-200"
              onClick={handleCircleClick}
            >
              <div className="text-center px-6">
                <div 
                  className="text-6xl font-light text-gray-800 mb-4 transition-all duration-500 ease-in-out"
                  key={`number-${currentCircleIndex}`}
                >
                  {circleData[currentCircleIndex].number}
                </div>
                <p 
                  className="text-sm text-gray-700 leading-relaxed transition-all duration-500 ease-in-out"
                  key={`text-${currentCircleIndex}`}
                >
                  {circleData[currentCircleIndex].text}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: All Three Circles */}
          <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl">
            
            {/* Circle 1 - Events */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-56 md:h-56 lg:w-80 lg:h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-4 md:px-5 lg:px-6">
                  <div className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-2 md:mb-3 lg:mb-4">
                    200+
                  </div>
                  <p className="text-xs md:text-xs lg:text-base text-gray-700 leading-relaxed">
                    événements organisés avec succès chaque année
                  </p>
                </div>
              </div>
            </div>

            {/* Circle 2 - Experience */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-56 md:h-56 lg:w-80 lg:h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-4 md:px-5 lg:px-6">
                  <div className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-2 md:mb-3 lg:mb-4">
                  98%
                  </div>
                  <p className="text-xs md:text-xs lg:text-base text-gray-700 leading-relaxed">
                  de clients satisfaits selon nos enquêtes post-événement
                  </p>
                </div>
              </div>
            </div>

            {/* Circle 3 - Clients */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-56 md:h-56 lg:w-80 lg:h-80 rounded-full border-2 border-dotted border-gray-600 flex items-center justify-center">
                <div className="text-center px-4 md:px-5 lg:px-6">
                  <div className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-2 md:mb-3 lg:mb-4">
                    500+
                  </div>
                  <p className="text-xs md:text-xs lg:text-base text-gray-700 leading-relaxed">
                  clients particuliers & professionnels nous ont déjà fait confiance
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TraiteurStats; 
"use client";

import React from 'react';

const statsData = [
  {
    value: "200+",
    label: "événements organisés par an en moyenne"
  },
  {
    value: "98%",
    label: "de clients satisfaits selon nos enquêtes"
  },
  {
    value: "500+",
    label: "clients nous ont déjà fait confiance"
  }
];

const FlowerPattern = () => {
    const petalPath = "M0,0 C15,-20 45,-20 60,0 C45,20 15,20 0,0";
    return (
        <svg
            className="absolute -right-10 -bottom-10 h-48 w-48 text-white opacity-[0.03]"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
        >
            <g transform="translate(50, 50)">
                <g transform="rotate(45)">
                    <path d={petalPath} />
                    <path d={petalPath} transform="rotate(90)" />
                    <path d={petalPath} transform="rotate(180)" />
                    <path d={petalPath} transform="rotate(270)" />
                </g>
            </g>
        </svg>
    )
}

const TraiteurStats = () => {
  return (
    <div className="w-full flex justify-center bg-white py-16 lg:pt-0 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[95%]">
        <div className="relative bg-[#383838] rounded-2xl overflow-hidden">
          <FlowerPattern />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 py-12">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center px-6">
                <p className="text-5xl lg:text-6xl font-light text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-light text-gray-300 max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraiteurStats; 
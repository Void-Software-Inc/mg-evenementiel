'use client';

import React from 'react';
import Image from 'next/image';

interface MenuCardProps {
  title: string;
  type: string;
  imageUrl: string;
  pdfUrl?: string;
}

const MenuCard = ({ title, type, imageUrl, pdfUrl }: MenuCardProps) => {
  const handleClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col items-center text-center sm:max-w-[400px] md:max-w-full cursor-pointer"
    >
      <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden mb-6 flex items-center justify-center bg-white">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="250px"
            priority
            quality={100}
          />
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-light mb-2">{title}</h2>
      <p className="uppercase tracking-widest text-xs sm:text-sm">{type}</p>
    </div>
  );
};

export default MenuCard;
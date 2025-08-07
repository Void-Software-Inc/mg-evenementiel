"use client";

import React from "react";

const imgs = [
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/pia-kamp-iacrF-fHr08-unsplash.webp?t=2025-08-06T18%3A51%3A21.010Z",
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/hamza-nouasria-CCq8-xks7vE-unsplash.webp",
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/ludovic-delot-HW7cEIKdavE-unsplash.webp?t=2025-08-06T18%3A50%3A12.015Z",
  "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/andra-c-taylor-jr-wp6C_iil9kA-unsplash.webp",
];

export const CorporateCarousel = () => {
  // Duplicate images to create seamless loop
  const duplicatedImages = [...imgs, ...imgs];
  
  return (
    <div className="relative overflow-hidden bg-white py-8">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-container {
          animation: scroll 10s linear infinite;
        }
      `}</style>
      <div 
        className="flex gap-4 scroll-container"
        style={{
          width: "200%", // Double width to accommodate duplicated images
        }}
      >
        {duplicatedImages.map((imgSrc, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[400px] h-[215px] md:w-[800px] md:h-[415px] rounded-xl overflow-hidden"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}; 
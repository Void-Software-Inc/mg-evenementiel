import React from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from '@radix-ui/react-icons';

interface FullScreenImageProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) => {
  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button
        onClick={onClose}
        className="absolute top-2 sm:top-10 right-0 transform -translate-x-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
      >
        <Cross2Icon className="w-6 h-6" />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default FullScreenImage;
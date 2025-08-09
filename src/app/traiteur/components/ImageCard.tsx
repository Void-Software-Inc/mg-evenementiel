"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageCardProps {
    image: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    return (
        <motion.div className="relative overflow-hidden h-[200px] sm:h-[250px] w-[280px] sm:w-[350px] lg:w-[415px] bg-slate-400 rounded-xl flex justify-center items-center flex-shrink-0"
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            <AnimatePresence>
                {showOverlay && (
                    <motion.div 
                        className="absolute inset-0 z-10 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                    </motion.div>
                )}
            </AnimatePresence>
            <Image 
                src={image} 
                alt={image} 
                fill style={{objectFit: "cover"}} 
            />
        </motion.div>
    )
};

export default ImageCard;
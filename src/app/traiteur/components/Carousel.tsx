"use client";

import React, { useEffect } from "react";
import Card from "./ImageCard";
import useMeasure from "react-use-measure";
import { animate, motion, useMotionValue } from "framer-motion";

const imgs = [
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/pia-kamp-iacrF-fHr08-unsplash.webp?t=2025-08-06T18%3A51%3A21.010Z",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/hamza-nouasria-CCq8-xks7vE-unsplash.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/ludovic-delot-HW7cEIKdavE-unsplash.webp?t=2025-08-06T18%3A50%3A12.015Z",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/andra-c-taylor-jr-wp6C_iil9kA-unsplash.webp",
    "https://supabase.mge-dashboard.pro/storage/v1/object/public/mge-website-images/traiteur/professionnel/being-organic-in-eu-sW3JLg3j1FM-unsplash.webp",
  ];

const Carousel = () => {

    let [ref, {width}] = useMeasure();

    const xTranslation = useMotionValue(0);

    useEffect(() => {
        let controls;
        let finalPosition = -width / 2 - 8;

        controls = animate(xTranslation, [0, finalPosition], {
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        });

        return controls.stop;
    }, [xTranslation, width]);

    return (
        <div className="pt-8 pb-16 overflow-hidden">
            <motion.div 
                className="flex gap-4" 
                ref={ref}
                style={{ x: xTranslation }}
            >
                {[...imgs, ...imgs].map((item, index) => (
                    <Card image={item} key={index} />
                ))}
            </motion.div>
        </div>
    );
}
    export default Carousel;
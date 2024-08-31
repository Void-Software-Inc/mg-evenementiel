"use client";
import dynamic from "next/dynamic";
import ScrollableProducts from "@/components/hero/ScrollableProducts";
import Prestations from "@/components/hero/Prestations";
import { PortofolioPics } from "@/components/hero/PortofolioPics";
import StepsSection from "@/components/hero/StepsSection";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicComponent />
      <ScrollableProducts />
      <PortofolioPics/>
      <Prestations/>
      <StepsSection/>
    </>
  );
}
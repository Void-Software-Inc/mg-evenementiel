import dynamic from "next/dynamic";
import ScrollableProducts from "@/components/hero/ScrollableProducts";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicComponent />
      <div className="h-full w-full bg-white mb-40 flex flex-col items-center justify-center">
      </div>
      <ScrollableProducts />
    </>
  );
}
import TextParallaxContentExample from "@/components/hero/TextParallaxContent";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-[100vh]">
      <DynamicComponent />
    </main>
  );
}

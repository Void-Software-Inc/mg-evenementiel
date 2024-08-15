import TextParallaxContentExample from "@/components/hero/TextParallaxContent";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-[100vh]">
      <DynamicComponent />
      <div className="w-full h-[100vh] bg-white">
        <h1 className="text-white">Hello</h1>
      </div>
    </main>
  );
}

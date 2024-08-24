import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicComponent />
      <div className="w-full bg-white h-[100vh] mt-20">
        <h1 className="text-black text-center text-3xl">MG Événementiel</h1>
        <p className="text-black text-center mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </>
  );
}
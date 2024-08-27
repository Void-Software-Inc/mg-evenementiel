import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/hero/TextParallaxContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicComponent />
      <div className="h-full w-full bg-white mb-72 flex flex-col items-center justify-center">
        <div className="w-[80%] h-full mt-56 mb-16 sm:mb-10 flex lg:flex-row flex-col items-center justify-center">
          <div className="h-fit w-full lg:w-1/2 flex flex-col space-y-4 justify-start">
            <p className="text-zinc-800 text-5xl sm:text-6xl xl:text-7xl font-extralight  xl:-ml-0">LOCATION</p>
            <p className="text-zinc-800 text-5xl sm:text-6xl xl:text-7xl text-left xl:text-center font-extralight xl:-ml-20 pb-4 lg:pb-0">DE MATÉRIEL</p>
          </div>
          <div className="h-fit w-full lg:w-1/2 flex items-center justify-start lg:justify-end xl:justify-center lg:mb-20">
            <div className="w-full xl:w-[480px] h-[40px]">
              <p className="text-zinc-800 xl:text-left text-xl xl:text-2xl font-extralight">Une large gamme de produits pour décorer et personnaliser vos événements</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
        <div className=" bg-black p-8 overflow-x-auto">
        <div className="w-[80%] flex space-x-4 min-w-max">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="w-[200px] h-[280px] lg:w-[350px] lg:h-[480px] bg-gray-500 flex-shrink-0" />
          ))}
        </div>
      </div>
        </div>
        
      </div>
     
    </>
  );
}
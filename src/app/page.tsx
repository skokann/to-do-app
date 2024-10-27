import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#201F1F] justify-items-center p-20 ">
      <Hero />
    </div>
  );
}

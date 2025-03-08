import { Header } from "@/components/home/header";
import Hero from "@/components/home/Hero";
import SheepSection from "../components/home/SheepSection";
import { Footer } from "../components/home/Footer";

export function HomePage() {
  return (
    <div className=" w-full ">
      <Header />
      <Hero />
      <SheepSection />
      <Footer />
    </div>
  );
}

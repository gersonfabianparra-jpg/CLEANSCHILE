import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { About } from "@/components/sections/About";
import { CTABanner } from "@/components/sections/CTABanner";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Reviews />
      <About />
      <CTABanner />
      <Contact />
    </>
  );
}

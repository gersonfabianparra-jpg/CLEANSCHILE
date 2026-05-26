import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { About } from "@/components/sections/About";
import { CTABanner } from "@/components/sections/CTABanner";
import { Contact } from "@/components/sections/Contact";
import { prisma } from "@/lib/db";

async function getReviews() {
  try {
    return await prisma.review.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const reviews = await getReviews();

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Reviews dbReviews={reviews} />
      <About />
      <CTABanner />
      <Contact />
    </>
  );
}

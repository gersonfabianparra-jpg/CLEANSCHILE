export const dynamic = "force-dynamic";

import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Gallery } from "@/components/sections/Gallery";
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

async function getSiteSettings() {
  try {
    const rows = await prisma.setting.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return map;
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSiteSettings()]);

  let services: { title: string; desc: string; price: string }[] | undefined;
  try {
    if (settings.services) {
      const parsed = JSON.parse(settings.services);
      // Solo usar DB si tiene los 6 servicios actuales
      if (parsed.length === 6) services = parsed;
    }
  } catch {}

  const contactInfo = {
    phone:    settings.site_phone,
    whatsapp: settings.site_whatsapp,
    address:  settings.site_address,
    email:    settings.site_email_public,
  };

  return (
    <>
      <Hero tagline={settings.hero_tagline} />
      <Services content={services} />
      <Process />
      <BeforeAfter />
      <Gallery />
      <Reviews dbReviews={reviews} />
      <About />
      <CTABanner />
      <Contact info={contactInfo} />
    </>
  );
}

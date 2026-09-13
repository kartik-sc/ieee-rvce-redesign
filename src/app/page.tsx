import { LogoIntro } from "@/components/motion/logo-intro";
import { HeroSection } from "@/components/sections/hero-section";
import { SocietiesCarousel } from "@/components/sections/societies-carousel";
import { ImpactSection } from "@/components/sections/impact-section";

export default function Home() {
  return (
    <main>
      <LogoIntro />
      <HeroSection />
      <SocietiesCarousel />
      <ImpactSection />
    </main>
  );
}

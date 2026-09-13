import { LogoIntro } from "@/components/motion/logo-intro";
import { HeroSection } from "@/components/sections/hero-section";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { SocietiesEcosystem } from "@/components/sections/societies-ecosystem";
import { FeaturedEvents } from "@/components/sections/featured-events";
import { AffinitiesPreview } from "@/components/sections/affinities-preview";
import { ImpactSection } from "@/components/sections/impact-section";
import { ArticlesPreview } from "@/components/sections/articles-preview";
import { MembershipCta } from "@/components/sections/membership-cta";

export default function Home() {
  return (
    <main>
      <LogoIntro />
      <HeroSection />
      <WhatWeDo />
      <SocietiesEcosystem />
      <FeaturedEvents />
      <AffinitiesPreview />
      <ImpactSection />
      <ArticlesPreview />
      <MembershipCta />
    </main>
  );
}

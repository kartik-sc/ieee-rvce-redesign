import { HeroSection } from "@/components/sections/hero-section";
import { SocietyExplorer } from "@/components/sections/society-explorer";
import { ConferenceFeature } from "@/components/sections/conference-feature";
import { AboutSection } from "@/components/sections/about-section";
import { EventsSection } from "@/components/sections/events-section";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SocietyExplorer />
      <ConferenceFeature />
      <AboutSection />
      <EventsSection />
      <ContactCTA />
    </main>
  );
}

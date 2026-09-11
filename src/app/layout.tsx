import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ieee-rvce.org"),
  title: {
    default: "IEEE RV College of Engineering | Student Branch",
    template: "%s · IEEE RVCE",
  },
  description:
    "IEEE RVCE at RV College of Engineering — 200+ members across ten technical societies and two affinity groups, advancing technology for humanity since 2017.",
  keywords: [
    "IEEE RVCE",
    "RV College of Engineering",
    "IEEE societies",
    "CSITSS",
    "STB11651",
  ],
  openGraph: {
    title: "IEEE RV College of Engineering | Student Branch",
    description:
      "200+ members, ten technical societies and two affinity groups at RV College of Engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col bg-bg text-text">
        <SmoothScroll>
          <TooltipProvider delayDuration={200}>
            <SiteHeader />
            {children}
            <SiteFooter />
          </TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

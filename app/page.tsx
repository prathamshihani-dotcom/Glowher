import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroGlowher from "@/components/sections/HeroGlowher";
import GlowWeeklyRhythm from "@/components/sections/GlowWeeklyRhythm";
import GlowSession from "@/components/sections/GlowSession";
import GlowClassPhotos from "@/components/sections/GlowClassPhotos";
import GlowTransformations from "@/components/sections/GlowTransformations";
import GlowDownloads from "@/components/sections/GlowDownloads";
import GlowCoaches from "@/components/sections/GlowCoaches";
import VideoReelsSection from "@/components/sections/VideoReelsSection";
import GlowPricing from "@/components/sections/GlowPricing";
import GlowFAQ from "@/components/sections/GlowFAQ";
import GlowFinalCTA from "@/components/sections/GlowFinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export const metadata: Metadata = {
  title: "GlowHer by YogHer — Live online face yoga classes",
  description:
    "Live face yoga with certified women coaches. Lift and tone your facial muscles, release everyday tension, and build a glow routine that needs no products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GlowHer by YogHer — Live online face yoga classes",
    description:
      "Lift and tone your facial muscles in 30 minutes a day with live women coaches. Zero tools or expensive serums needed.",
    url: "https://yogher.in/glowher",
    siteName: "GlowHer by YogHer",
    images: [
      {
        url: "/brand/glowher-logo.png",
        width: 256,
        height: 256,
        alt: "GlowHer by YogHer",
      },
    ],
  },
};

export default function GlowherPage() {
  return (
    <>
      {/* 1. Shared Header with active GlowHer brand */}
      <Header brand="glowher" />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero in large cotton card with batch timing form + coach faces */}
        <HeroGlowher />

        {/* 3. Inside Our Classes (Live Face Yoga & Abhyanga Google Meet sessions) */}
        <VideoReelsSection mode="classes" id="classes" />

        {/* 4. Monday to Friday Weekly Practice Rhythm (3 Face Yoga + 2 Abhyanga) */}
        <GlowWeeklyRhythm />

        {/* 5. Your 30-minute session (Face-zone illustration + Bordeaux breakdown) */}
        <GlowSession />

        {/* 6. Real client transformations & before/after gallery */}
        <GlowTransformations />

        {/* 7. Downloadable Client Guides (PDFs) */}
        <GlowDownloads />

        {/* 8. Real face yoga class photos slot (renders when populated) */}
        <GlowClassPhotos />

        {/* 9. Coaches (Manisha & Lipakshi + practice gallery rows) */}
        <GlowCoaches />

        {/* 10. Real Face Yoga Client Reviews (renders when populated) */}
        <VideoReelsSection mode="feedback" id="reviews" />

        {/* 11. Pricing */}
        <GlowPricing />

        {/* 12. FAQ ("Good to know.") */}
        <GlowFAQ />

        {/* 13. Final CTA band with background photo */}
        <GlowFinalCTA />
      </main>

      {/* 14. Bordeaux Footer */}
      <Footer brand="glowher" />

      {/* 15. Sticky Mobile CTA */}
      <StickyMobileCTA brand="glowher" />
    </>
  );
}

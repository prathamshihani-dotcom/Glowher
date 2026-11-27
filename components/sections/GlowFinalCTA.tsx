import Link from "next/link";
import SafeImage from "../SafeImage";
import { glowherContent, siteConfig, IMAGES } from "@/lib/content";

export default function GlowFinalCTA() {
  const { hero } = glowherContent;

  return (
    <section
      style={{ position: "relative", overflow: "hidden" }}
      className="relative w-full py-16 sm:py-24 overflow-hidden bg-bordeaux text-white"
    >
      {/* Background Photo with Guaranteed High-Contrast Dark Bordeaux Overlay */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <SafeImage
          src={IMAGES.glowherFinalCTA}
          alt="Live Google Meet face yoga session"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dual dark overlay: gradient + blur for 100% text legibility */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(30, 0, 7, 0.90) 0%, rgba(70, 0, 17, 0.93) 50%, rgba(90, 0, 22, 0.95) 100%)",
          }}
          className="absolute inset-0 backdrop-blur-[2px]"
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-cotton text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Start Your Daily Face Yoga Practice</span>
        </div>

        {/* High-visibility Headline */}
        <h2 className="text-[28px] sm:text-[38px] md:text-[48px] font-extrabold tracking-tightest leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] mb-4">
          Give your face 30 minutes. Feel the natural lift every day.
        </h2>

        {/* Supporting subline */}
        <p className="text-cotton text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
          Join certified women coaches live on Google Meet Monday to Friday. Zero tools or expensive serums needed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#trial"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-cotton text-bordeaux font-extrabold text-sm tracking-wide shadow-xl hover:bg-white transition-all flex items-center justify-center hover:scale-105"
          >
            Join from ₹999
          </Link>
          <a
            href={siteConfig.glowherWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full border-2 border-cotton text-cotton font-extrabold text-sm tracking-wide hover:bg-white/15 transition-all flex items-center justify-center backdrop-blur-sm"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

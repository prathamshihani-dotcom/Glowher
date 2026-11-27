import Link from "next/link";
import SafeImage from "../SafeImage";
import { glowherContent, siteConfig, IMAGES } from "@/lib/content";

export default function GlowFinalCTA() {
  const { hero } = glowherContent;

  return (
    <section
      id="cta"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#4A0012] via-bordeaux to-[#3B000E] text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-[850px] mx-auto px-4 sm:px-6">
        {/* 1. Dedicated Image Container (Alag se container) */}
        <div className="relative w-full max-w-[720px] mx-auto aspect-[1063/555] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40 mb-8 sm:mb-10 group">
          <SafeImage
            src={IMAGES.glowherFinalCTA}
            alt="Live Google Meet face yoga session with certified coach"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
          />
          {/* Live class badge */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Live Face Yoga Batch on Google Meet</span>
          </div>
        </div>

        {/* 2. Text Content (Neeche dedicated area for 100% clarity) */}
        <div className="text-center max-w-[720px] mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cotton text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Start Your Daily Face Yoga Practice</span>
          </div>

          {/* High-visibility Headline */}
          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] font-extrabold tracking-tightest leading-tight text-white mb-3 sm:mb-4">
            Give your face 30 minutes. Feel the natural lift every day.
          </h2>

          {/* Supporting Subline */}
          <p className="text-cotton text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            Join certified women coaches live on Google Meet Monday to Friday. Zero tools or expensive serums needed.
          </p>

          {/* CTA Buttons */}
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
      </div>
    </section>
  );
}

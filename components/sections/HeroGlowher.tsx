import Link from "next/link";
import LeadForm from "../LeadForm";
import SafeImage from "../SafeImage";
import { glowherContent, siteConfig, IMAGES } from "@/lib/content";

export default function HeroGlowher() {
  const { hero, heroPhoto } = glowherContent;

  return (
    <section className="w-full pt-2 sm:pt-6 lg:pt-8 pb-8 sm:pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 min-w-0">
        {/* Large Cotton Card with 40px radius */}
        <div className="bg-cotton p-3.5 sm:p-8 md:p-12 lg:p-14 rounded-card-xl border border-pink/40 shadow-sm w-full min-w-0 overflow-hidden">
          {heroPhoto && (
            <div
              style={{ position: "relative", overflow: "hidden", height: "180px", width: "100%" }}
              className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden bg-white mb-4 shadow-sm"
            >
              <SafeImage
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 780px"
                className="object-cover object-center"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-8 lg:gap-10 items-center min-w-0">
            {/* Left Column / Heading & Info - order-1 on mobile so it sits compactly above the form */}
            <div className="order-1 lg:order-1 lg:col-span-7 flex flex-col items-start min-w-0 w-full">
              {/* Pill Chip with Equal Size Dots and Flexible Timings */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-bordeaux text-[10px] sm:text-xs md:text-sm font-bold tracking-tight mb-2 sm:mb-5 shadow-xs border border-pink/20 whitespace-nowrap overflow-hidden max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-bordeaux shrink-0" />
                <span>Live face yoga</span>
                <span className="w-1.5 h-1.5 rounded-full bg-bordeaux shrink-0" aria-hidden="true" />
                <span>Flexible timings</span>
                <span className="w-1.5 h-1.5 rounded-full bg-bordeaux shrink-0" aria-hidden="true" />
                <span>30 minutes</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bordeaux shrink-0" aria-hidden="true" />
                  <span>Monday to Friday</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[22px] xs:text-[24px] sm:text-[38px] md:text-[50px] lg:text-[64px] font-extrabold tracking-tight text-bordeaux leading-[1.12] sm:leading-[1.06] mb-1.5 sm:mb-5">
                {hero.h1}
              </h1>

              {/* Sub-headline */}
              <p className="text-xs sm:text-base lg:text-[18px] text-bordeaux/90 sm:text-bordeaux font-medium leading-relaxed max-w-xl mb-3 sm:mb-6">
                {hero.sub}
              </p>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex flex-col gap-4 w-full">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={hero.ctaPrimaryHref}
                    className="min-h-[48px] px-8 py-3 rounded-full bg-bordeaux text-white font-bold text-sm tracking-wide shadow-md hover:opacity-95 transition-all text-center flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-bordeaux focus:ring-offset-2"
                  >
                    {hero.ctaPrimary}
                  </Link>
                  <a
                    href={siteConfig.glowherWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-6 py-3 rounded-full border-2 border-bordeaux text-bordeaux font-bold text-sm tracking-wide hover:bg-white/40 transition-all text-center flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-bordeaux"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column - order-2 on mobile right below compact text */}
            <div className="order-2 lg:order-2 lg:col-span-5 w-full min-w-0">
              <LeadForm variant="batch" id="trial" />

              {/* Mobile Buttons directly below the form */}
              <div className="lg:hidden flex flex-col gap-3 mt-4 sm:mt-6 w-full">
                <Link
                  href={hero.ctaPrimaryHref}
                  className="w-full min-h-[44px] flex items-center justify-center rounded-full bg-bordeaux text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  {hero.ctaPrimary}
                </Link>
                <a
                  href={siteConfig.glowherWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center rounded-full border-2 border-bordeaux text-bordeaux font-bold text-xs sm:text-sm hover:bg-white/40"
                >
                  {hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  brand: "yogher" | "glowher";
}

export default function Header({ brand }: HeaderProps) {
  const isYogher = brand === "yogher";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger shrink as soon as user scrolls down > 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isYogher) {
    return (
      <header
        className={`sticky top-0 z-40 w-full bg-softpink/95 backdrop-blur-md border-b border-cotton/60 transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div
          className={`max-w-[1200px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ${
            isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
          }`}
        >
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux rounded-lg shrink-0"
            >
              <Image
                src="/brand/yogher-logo.png"
                alt="YogHer Logo"
                width={44}
                height={44}
                priority
                unoptimized
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 shadow-sm"
              />
              <span className="text-2xl sm:text-[26px] font-extrabold tracking-tightest text-bordeaux leading-none">
                YogHer
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-bordeaux">
            <Link href="#programs" className="hover:text-muted transition-colors py-2">
              Programs
            </Link>
            <Link href="#how" className="hover:text-muted transition-colors py-2">
              How it works
            </Link>
            <Link href="#coaches" className="hover:text-muted transition-colors py-2">
              Coaches
            </Link>
            <Link href="#reviews" className="hover:text-muted transition-colors py-2">
              Reviews
            </Link>
            <Link href="#plans" className="hover:text-muted transition-colors py-2">
              Plans
            </Link>
          </nav>

          {/* Right: CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="#plans"
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-bordeaux text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-bordeaux focus:ring-offset-2"
            >
              See plans from ₹1,199
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // GlowHer Header: Prominent centered logo at top, shrinks smoothly to compact bar on scroll
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-softpink/95 backdrop-blur-md border-b border-cotton/60 transition-all duration-300 ease-out ${
        isScrolled ? "shadow-sm bg-softpink/98" : ""
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-300 ease-out ${
          isScrolled
            ? "h-13 sm:h-15 py-1"
            : "h-20 sm:h-24 md:h-26 py-2"
        }`}
      >
        {/* Left Desktop Nav (Symmetric) */}
        <nav aria-label="Main navigation left" className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-bordeaux flex-1 justify-start">
          <Link href="#rhythm" className="hover:text-muted transition-colors py-2">
            Weekly Rhythm
          </Link>
          <Link href="#classes" className="hover:text-muted transition-colors py-2">
            Inside Classes
          </Link>
        </nav>

        {/* Center: GlowHer Logo - Shrinks on scroll so sticky header stays slim & compact */}
        <div className="flex-1 md:flex-initial flex items-center justify-center shrink-0">
          <Link
            href="/"
            aria-label="GlowHer Face Yoga by YogHer"
            className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux rounded-xl shrink-0 transition-transform hover:scale-105"
          >
            <Image
              src="/brand/glowher-logo.png"
              alt="GlowHer Face Yoga Classes by YogHer"
              width={220}
              height={180}
              priority
              unoptimized
              className={`w-auto object-contain drop-shadow-sm transition-all duration-300 ease-out ${
                isScrolled
                  ? "h-9 sm:h-10 md:h-11"
                  : "h-18 sm:h-22 md:h-24"
              }`}
            />
          </Link>
        </div>

        {/* Right Desktop Nav & CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-bordeaux flex-1 justify-end shrink-0">
          <Link href="#results" className="hover:text-muted transition-colors py-2">
            Results
          </Link>
          <Link href="#pricing" className="hover:text-muted transition-colors py-2">
            Pricing
          </Link>
          <Link
            href="#pricing"
            className={`inline-flex items-center justify-center rounded-full bg-bordeaux text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bordeaux focus:ring-offset-2 shrink-0 shadow-sm ${
              isScrolled
                ? "min-h-[38px] px-5 py-2 text-[11px]"
                : "min-h-[44px] px-6 py-2.5"
            }`}
          >
            Start at ₹999
          </Link>
        </div>
      </div>
    </header>
  );
}

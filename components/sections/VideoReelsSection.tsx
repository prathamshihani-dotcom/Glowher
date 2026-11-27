"use client";

import { useState, useRef, useEffect } from "react";
import SafeImage from "../SafeImage";
import { glowherContent, siteConfig } from "@/lib/content";
import type { VideoReel } from "@/lib/types";

interface VideoReelsSectionProps {
  mode?: "classes" | "feedback" | "all";
  id?: string;
  initialTab?: "classes" | "feedback";
}

function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  // Direct 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // YouTube Shorts: youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // youtu.be/<id>
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return youtuBeMatch[1];
  }

  // youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // youtube.com/embed/<id>
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  return null;
}

function getYouTubeEmbedUrl(urlOrId?: string): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
  }

  if (urlOrId && (urlOrId.startsWith("http://") || urlOrId.startsWith("https://"))) {
    return urlOrId;
  }

  return null;
}

function getReelThumbnail(reel: VideoReel): string {
  if (reel.thumbnail && reel.thumbnail.trim()) {
    return reel.thumbnail;
  }
  const videoId = extractYouTubeId(reel.youtubeUrl || reel.youtubeId);
  if (videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  return "";
}

export default function VideoReelsSection({
  mode = "classes",
  id,
  initialTab,
}: VideoReelsSectionProps) {
  const { classReels = [], videoReels = [] } = glowherContent;

  const resolvedInitialTab =
    mode === "classes" ? "classes" : mode === "feedback" ? "feedback" : initialTab || "classes";

  const [activeTab, setActiveTab] = useState<"classes" | "feedback">(resolvedInitialTab);
  const [selectedReel, setSelectedReel] = useState<VideoReel | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentReels =
    mode === "classes"
      ? classReels
      : mode === "feedback"
      ? videoReels
      : activeTab === "classes"
      ? classReels
      : videoReels;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedReel]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedReel(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (!currentReels || currentReels.length === 0) {
    return null;
  }

  const isClasses = mode === "classes" || activeTab === "classes";

  const eyebrowText = isClasses
    ? "Live Google Meet Batches"
    : "Client Feedback";
  const headingText = isClasses
    ? "See what happens inside our live face yoga classes."
    : "Real feedback from women who practice with GlowHer.";
  const descText = isClasses
    ? "Real technique guidance, live coach corrections, and guided lymphatic Abhyanga massage in every 30-minute session."
    : "Authentic transformation stories, facial tone improvements, and daily habit breakthroughs.";

  const sectionId = id || (isClasses ? "classes" : "reviews");

  return (
    <section
      id={sectionId}
      aria-label={headingText}
      className={`w-full py-16 sm:py-24 border-y border-cotton/50 overflow-hidden scroll-mt-20 sm:scroll-mt-24 ${
        isClasses
          ? "bg-gradient-to-b from-white via-softpink/30 to-white"
          : "bg-gradient-to-b from-softpink via-white to-softpink/40"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cotton text-bordeaux text-xs font-bold uppercase tracking-eyebrow mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>{eyebrowText}</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-extrabold tracking-tightest text-bordeaux leading-tight">
              {headingText}
            </h2>
            <p className="text-muted text-sm sm:text-base mt-1.5 max-w-xl">
              {descText}
            </p>
          </div>

          {/* Navigation Arrows for Left-to-Right Scrolling */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-cotton bg-white text-bordeaux hover:bg-cotton shadow-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-bordeaux"
              aria-label="Scroll videos left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-cotton bg-white text-bordeaux hover:bg-cotton shadow-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-bordeaux"
              aria-label="Scroll videos right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video Cards Horizontal Scroll */}
        <div
          ref={scrollRef}
          style={{ touchAction: "pan-x pan-y" }}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-proximity px-1 sm:px-0 pb-4 pt-2 no-scrollbar scroll-smooth justify-start overscroll-x-contain overscroll-y-auto"
        >
          {currentReels.map((reel) => {
            const isLandscapeCard = isClasses || !reel.youtubeUrl?.includes("/shorts/");

            return (
              <article
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                style={{ touchAction: "pan-x pan-y" }}
                className={`group relative ${
                  isLandscapeCard
                    ? "w-[280px] sm:w-[320px] md:w-[350px] aspect-[16/10]"
                    : "w-[230px] sm:w-[260px] md:w-[280px] aspect-[9/16]"
                } shrink-0 snap-center rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer bg-cotton border border-cotton/80 select-none flex items-center justify-center`}
                aria-label="Play video"
              >
                {/* Background Thumbnail Image */}
                <div className="absolute inset-0 pointer-events-none">
                  <SafeImage
                    src={getReelThumbnail(reel)}
                    alt={reel.title || "GlowHer video"}
                    fill
                    sizes="(max-width: 640px) 280px, 350px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />
                </div>

                {/* Top Tag & Duration Pill */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                    {reel.tag || "Live Session"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-cotton/90 bg-bordeaux/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                    {reel.duration || "Live"}
                  </span>
                </div>

                {/* Centered YouTube Play Button Icon */}
                <div className="relative z-10 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300 border-2 border-white/70">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Bottom Card Title & Subtitle */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 pointer-events-none">
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug drop-shadow-md line-clamp-2 mb-1">
                    {reel.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-medium text-cotton/90 line-clamp-1 drop-shadow-sm">
                    {reel.clientOrCoach}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player (Responsive for 16:9 Landscape & 9:16 Shorts) */}
      {selectedReel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedReel(null)}
        >
          {(() => {
            const isLandscape =
              selectedReel.tag === "Inside Our Classes" ||
              (selectedReel.youtubeUrl && !selectedReel.youtubeUrl.includes("/shorts/"));

            return (
              <div
                className={`relative w-full ${
                  isLandscape ? "max-w-3xl" : "max-w-[420px]"
                } bg-bordeaux/95 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[92vh]`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-white/10 shrink-0">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cotton bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                      {selectedReel.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">
                      {selectedReel.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedReel(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Close video player"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Video Player Container */}
                <div
                  className={`relative ${
                    isLandscape ? "aspect-video" : "aspect-[9/16] max-h-[68vh]"
                  } w-full bg-black overflow-hidden flex items-center justify-center`}
                >
                  {(() => {
                    const embedUrl = getYouTubeEmbedUrl(selectedReel.youtubeUrl || selectedReel.youtubeId);

                    if (embedUrl) {
                      return (
                        <iframe
                          src={embedUrl}
                          title={selectedReel.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      );
                    }

                    return (
                      <div className="p-6 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                          <svg className="w-8 h-8 fill-current translate-x-0.5 text-white" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h4 className="text-base font-extrabold text-white">
                          {selectedReel.title}
                        </h4>
                        <p className="text-xs text-cotton/90 leading-relaxed">
                          {selectedReel.clientOrCoach}
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Modal Footer CTA -> Direct WhatsApp with context */}
                <div className="p-3.5 sm:p-4 bg-bordeaux border-t border-white/10 shrink-0 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-cotton truncate">
                      {isLandscape
                        ? "Want to join this live face yoga batch?"
                        : "Ready to start your GlowHer journey?"}
                    </p>
                    <p className="text-[11px] text-white/70">
                      Batches run Monday to Friday from 5:30 AM to 8:30 PM IST
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/917302970977?text=${encodeURIComponent(
                      `Hi GlowHer! I watched the video "${selectedReel.title}" and would like to join your live Google Meet classes. Please share joining details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs tracking-wide transition-all shadow-sm"
                  >
                    Join on WhatsApp
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
}


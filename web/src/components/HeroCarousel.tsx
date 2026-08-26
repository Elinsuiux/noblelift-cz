"use client";

import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type HeroSlide = {
  src: string;
  alt: string;
  objectPosition: string;
  overlayClassName: string;
  bottomOverlayClassName: string;
  lightOverlayClassName?: string;
  imageClassName?: string;
};

const HERO_SLIDES: Omit<HeroSlide, "alt">[] = [
  {
    src: "/images/hero-warehouse.png",
    objectPosition: "center",
    overlayClassName: "from-black/92 via-black/65 to-transparent",
    bottomOverlayClassName: "from-black/25 via-transparent to-transparent",
    lightOverlayClassName: "from-white/12 via-white/5 to-transparent",
    imageClassName: "contrast-[1.05] saturate-[1.1] brightness-[1.04]",
  },
  {
    src: "/images/hero-forklift-hero.png",
    objectPosition: "72% center",
    overlayClassName: "from-black/80 via-black/45 to-transparent",
    bottomOverlayClassName: "from-black/50 via-transparent to-black/20",
  },
];

const HERO_ALT_KEYS = ["altWarehouse", "altForklift"] as const;

const AUTO_PLAY_MS = 6000;

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroCarousel({ children }: { children: ReactNode }) {
  const t = useTranslations("hero.carousel");
  const slides: HeroSlide[] = HERO_SLIDES.map((slide, index) => ({
    ...slide,
    alt: t(HERO_ALT_KEYS[index]),
  }));
  const slideCount = HERO_SLIDES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slideCount) % slideCount);
  }, [slideCount]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-black pt-24 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            unoptimized
            className={`object-cover ${slide.imageClassName ?? ""}`}
            style={{ objectPosition: slide.objectPosition }}
            sizes="100vw"
          />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${slide.overlayClassName}`}
            aria-hidden
          />
          {slide.lightOverlayClassName ? (
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-l ${slide.lightOverlayClassName}`}
              aria-hidden
            />
          ) : null}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${slide.bottomOverlayClassName}`}
            aria-hidden
          />
        </div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">{children}</div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
          aria-label={t("prev")}
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label={t("slides")}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={t("goTo", { index: index + 1 })}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
          aria-label={t("next")}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

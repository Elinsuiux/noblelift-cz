"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { ProductImageLightbox } from "@/components/products/ProductImageLightbox";

export function ProductModelGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const t = useTranslations("productsCatalog.lightbox");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbListRef = useRef<HTMLDivElement>(null);

  const scrollThumbs = (direction: "left" | "right") => {
    const container = thumbListRef.current;
    if (!container) {
      return;
    }

    const amount = direction === "left" ? -120 : 120;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex] ?? images[0]!;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-[4/3] w-full cursor-zoom-in bg-white transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-offset-2"
          aria-label={t("open")}
        >
          <Image
            key={activeImage}
            src={activeImage}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain object-center p-3 md:p-4"
            unoptimized
            priority
          />
        </button>

        {images.length > 1 ? (
          <div className="flex items-center gap-2 border-t border-zinc-100 bg-white px-3 py-3">
            <button
              type="button"
              onClick={() => scrollThumbs("left")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-noble-orange"
              aria-label="Previous photos"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div ref={thumbListRef} className="flex flex-1 gap-2 overflow-x-auto scroll-smooth">
              {images.map((image, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${
                      isActive ? "border-noble-orange" : "border-transparent hover:border-zinc-200"
                    }`}
                    aria-label={`Photo ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    <Image
                      src={image}
                      alt={`${alt} (${index + 1})`}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollThumbs("right")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-noble-orange"
              aria-label="Next photos"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      <ProductImageLightbox
        images={images}
        alt={alt}
        initialIndex={activeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}

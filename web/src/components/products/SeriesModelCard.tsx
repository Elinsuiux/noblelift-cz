"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductImageLightbox } from "@/components/products/ProductImageLightbox";
import { SeriesActionBar } from "@/components/products/SeriesActionBar";
import { getProductBuyUrl, type ProductModel } from "@/lib/products-catalog";

export function SeriesModelCard({
  product,
  productLineKey,
  specsPdfUrl,
  specsPdfFilename,
}: {
  product: ProductModel;
  productLineKey?: string;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
}) {
  const t = useTranslations();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative h-56 w-full cursor-zoom-in bg-white transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-inset sm:h-64"
        aria-label={t("productsCatalog.lightbox.open")}
      >
        <Image
          src={product.image}
          alt={product.model}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
          unoptimized
        />
      </button>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-4">
        <p className="text-3xl font-bold tracking-tight text-noble-orange md:text-4xl">
          {product.model}
        </p>
        {product.highlightKey ? (
          <p className="mt-2 text-sm font-medium leading-snug text-zinc-500 md:text-base">
            {t(product.highlightKey)}
          </p>
        ) : null}
        <p className="mt-2 text-xl font-medium text-zinc-600 md:text-2xl">{product.capacity}</p>
        <div className="mt-6 h-1 w-14 rounded-full bg-noble-orange" />
        {productLineKey ? (
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {t(productLineKey)}
          </p>
        ) : (
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {t(product.descriptionKey)}
          </p>
        )}

        <div className="mt-auto border-t border-zinc-100 pt-8">
          <SeriesActionBar
            buyUrl={getProductBuyUrl(product)}
            specsPdfUrl={specsPdfUrl}
            specsPdfFilename={specsPdfFilename}
            embedded
          />
        </div>
      </div>

      <ProductImageLightbox
        images={[product.image]}
        alt={product.model}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  );
}

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
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

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-56 w-full bg-white sm:h-64">
        <Image
          src={product.image}
          alt={product.model}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-4">
        <p className="text-3xl font-bold tracking-tight text-noble-orange md:text-4xl">
          {product.model}
        </p>
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
    </article>
  );
}

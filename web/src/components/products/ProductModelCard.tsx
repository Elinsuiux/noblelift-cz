"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getProductBuyUrl, type ProductModel } from "@/lib/products-catalog";

type LinkHref = ComponentProps<typeof Link>["href"];

export function ProductModelCard({
  product,
  href,
}: {
  product: ProductModel;
  href?: LinkHref;
}) {
  const t = useTranslations();
  const buyUrl = getProductBuyUrl(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {href ? (
        <Link
          href={href}
          className="absolute inset-0 z-10 rounded-2xl"
          aria-label={`${product.model} — ${t("productsCatalog.modelDetails.viewDetails")}`}
        />
      ) : null}

      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.model}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-contain p-3 transition group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-zinc-900">{product.model}</h3>
        <p className="mt-1 text-sm font-semibold text-noble-orange">{product.capacity}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
          {t(product.descriptionKey)}
        </p>

        <div className="relative z-20 mt-4 flex flex-col gap-2">
          <span className="inline-flex text-sm font-semibold text-noble-orange">
            {t("productsCatalog.modelDetails.viewDetails")} &gt;
          </span>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-noble-orange px-4 py-2 text-center text-sm font-bold text-noble-orange transition hover:bg-noble-orange hover:text-white"
          >
            {t("productsCatalog.modelDetails.buyShopCta")}
          </a>
        </div>
      </div>
    </article>
  );
}

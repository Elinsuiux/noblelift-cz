"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ProductImageLightbox } from "@/components/products/ProductImageLightbox";
import { SeriesActionBar } from "@/components/products/SeriesActionBar";
import { getProductBuyUrl, type ProductModel } from "@/lib/products-catalog";

type LinkHref = ComponentProps<typeof Link>["href"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414l2.543 2.543 6.543-6.543a1 1 0 0 1 1.412-.01z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HubSeriesModelCard({
  product,
  subtitleKey,
  useKeys,
  detailsHref,
  specsPdfUrl,
  specsPdfFilename = "technicke-parametry.pdf",
  specsPdfUrlEn,
  specsPdfFilenameEn,
}: {
  product: ProductModel;
  subtitleKey?: string;
  useKeys?: readonly string[];
  detailsHref?: LinkHref;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const opensDetail = Boolean(detailsHref && product.seriesDetail);
  const buyUrl = getProductBuyUrl(product, locale);
  const subtitle = product.highlightKey ?? subtitleKey ?? undefined;

  const effectiveSpecsUrl =
    locale === "en" && specsPdfUrlEn ? specsPdfUrlEn : specsPdfUrl;
  const effectiveSpecsFilename =
    locale === "en" && specsPdfFilenameEn
      ? specsPdfFilenameEn
      : specsPdfFilename;

  const specsDownloadUrl = !effectiveSpecsUrl
    ? undefined
    : effectiveSpecsUrl.startsWith("/api/")
      ? `${effectiveSpecsUrl}?locale=${locale}`
      : effectiveSpecsUrl;

  const useDownloadAttr = Boolean(
    specsDownloadUrl && !effectiveSpecsUrl?.startsWith("/api/"),
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-noble-orange/20 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {opensDetail && detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={`${product.model} — ${t("productsCatalog.modelDetails.viewDetailsCta")}`}
          className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-offset-2"
        />
      ) : null}

      <div className="relative w-full overflow-hidden bg-white">
        <div className="relative mx-auto h-44 w-full overflow-hidden bg-white sm:h-48">
          <Image
            src={product.image}
            alt={product.model}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-bottom p-3 pb-0"
            unoptimized
          />
        </div>
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-noble-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            {product.model}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-4">
        <h3 className="text-2xl font-bold text-zinc-900">{product.model}</h3>
        {subtitle ? (
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-noble-orange">
            {t(subtitle)}
          </p>
        ) : null}

        <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          <span className="font-semibold text-zinc-900">
            {t("productsCatalog.series.capacityLabel")}:{" "}
          </span>
          {product.capacity}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-zinc-600">{t(product.descriptionKey)}</p>

        {useKeys && useKeys.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {useKeys.map((useKey) => (
              <li key={useKey} className="flex items-start gap-2 text-sm text-zinc-600">
                <span className="mt-0.5 text-noble-orange">
                  <CheckIcon />
                </span>
                {t(useKey)}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative z-20 mt-8 flex flex-col gap-3">
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-noble-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-noble-orange/90"
          >
            {t("productsCatalog.modelDetails.buyShopCta")}
          </a>
          {opensDetail && detailsHref ? (
            <Link
              href={detailsHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
            >
              {t("productsCatalog.modelDetails.viewDetailsCta")}
              <span aria-hidden>↗</span>
            </Link>
          ) : null}
          {specsDownloadUrl ? (
            <a
              href={specsDownloadUrl}
              {...(useDownloadAttr ? { download: effectiveSpecsFilename } : {})}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-bold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50"
            >
              {t("productsCatalog.series.downloadSpecsCta")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ClassicSeriesModelCard({
  product,
  productLineKey,
  specsPdfUrl,
  specsPdfFilename,
  specsPdfUrlEn,
  specsPdfFilenameEn,
  detailsHref,
}: {
  product: ProductModel;
  productLineKey?: string;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
  detailsHref?: LinkHref;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const opensDetail = Boolean(detailsHref && product.seriesDetail);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition ${
        opensDetail ? "hover:-translate-y-0.5 hover:shadow-md" : ""
      }`}
    >
      {opensDetail && detailsHref ? (
        <Link
          href={detailsHref}
          aria-label={`${product.model} — ${t("productsCatalog.modelDetails.viewDetailsCta")}`}
          className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-offset-2"
        />
      ) : null}

      {opensDetail ? (
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
      ) : (
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
      )}

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

        {opensDetail ? (
          <p className="mt-4 text-sm font-semibold text-noble-orange">
            {t("productsCatalog.modelDetails.viewDetailsCta")} &gt;
          </p>
        ) : null}

        <div className="relative z-20 mt-auto border-t border-zinc-100 pt-8">
          <SeriesActionBar
            buyUrl={getProductBuyUrl(product, locale)}
            specsPdfUrl={specsPdfUrl}
            specsPdfFilename={specsPdfFilename}
            specsPdfUrlEn={specsPdfUrlEn}
            specsPdfFilenameEn={specsPdfFilenameEn}
            embedded
          />
        </div>
      </div>

      {!opensDetail ? (
        <ProductImageLightbox
          images={[product.image]}
          alt={product.model}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </article>
  );
}

export function SeriesModelCard({
  product,
  productLineKey,
  subtitleKey,
  useKeys,
  specsPdfUrl,
  specsPdfFilename,
  specsPdfUrlEn,
  specsPdfFilenameEn,
  detailsHref,
  variant = "classic",
}: {
  product: ProductModel;
  productLineKey?: string;
  subtitleKey?: string;
  useKeys?: readonly string[];
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
  detailsHref?: LinkHref;
  variant?: "classic" | "hub";
}) {
  if (variant === "hub") {
    return (
      <HubSeriesModelCard
        product={product}
        subtitleKey={subtitleKey}
        useKeys={useKeys}
        detailsHref={detailsHref}
        specsPdfUrl={specsPdfUrl}
        specsPdfFilename={specsPdfFilename}
        specsPdfUrlEn={specsPdfUrlEn}
        specsPdfFilenameEn={specsPdfFilenameEn}
      />
    );
  }

  return (
    <ClassicSeriesModelCard
      product={product}
      productLineKey={productLineKey}
      specsPdfUrl={specsPdfUrl}
      specsPdfFilename={specsPdfFilename}
      specsPdfUrlEn={specsPdfUrlEn}
      specsPdfFilenameEn={specsPdfFilenameEn}
      detailsHref={detailsHref}
    />
  );
}

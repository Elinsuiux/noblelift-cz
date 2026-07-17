"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  getCategorySlug,
  getSeriesBuyUrl,
  getSeriesSlug,
  getSubcategorySlug,
  type CatalogCategory,
  type ProductSeries,
  type Subcategory,
} from "@/lib/products-catalog";

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

export function SeriesCard({
  category,
  subcategory,
  series,
  stackedActions = false,
}: {
  category: CatalogCategory;
  subcategory: Subcategory;
  series: ProductSeries;
  stackedActions?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const categorySlug = getCategorySlug(category, locale);
  const subcategorySlug = getSubcategorySlug(subcategory, locale);
  const seriesSlug = getSeriesSlug(series, locale);
  const seriesHref = {
    pathname: "/products/[category]/[subcategory]/[series]" as const,
    params: { category: categorySlug, subcategory: subcategorySlug, series: seriesSlug },
  };
  const cardLabel = `${t(series.titleKey)} — ${t("productsCatalog.series.viewModels")}`;
  const buttonTextClass = stackedActions
    ? "text-sm font-bold text-white"
    : "text-sm font-bold uppercase tracking-wide text-white";
  const actionsClass = stackedActions
    ? "relative z-20 mt-8 flex flex-col gap-3"
    : "relative z-20 mt-8 flex flex-col gap-3 sm:flex-row";
  const buttonLayoutClass = stackedActions
    ? "inline-flex w-full items-center justify-center"
    : "inline-flex flex-1 items-center justify-center";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-noble-orange/20 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative w-full overflow-hidden bg-white">
        <div className="relative mx-auto h-44 w-full overflow-hidden bg-white sm:h-48">
          <Image
            src={series.image}
            alt={t(series.titleKey)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-bottom p-3 pb-0"
            unoptimized
          />
        </div>
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-noble-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            {t(series.badgeKey)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-4">
        <h3 className="text-2xl font-bold text-zinc-900">{t(series.titleKey)}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-noble-orange">
          {t(series.subtitleKey)}
        </p>

        <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          <span className="font-semibold text-zinc-900">{t("productsCatalog.series.capacityLabel")}: </span>
          {t(series.capacityKey)}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-zinc-600">{t(series.descKey)}</p>

        <ul className="mt-4 space-y-2">
          {series.useKeys.map((useKey) => (
            <li key={useKey} className="flex items-start gap-2 text-sm text-zinc-600">
              <span className="mt-0.5 text-noble-orange">
                <CheckIcon />
              </span>
              {t(useKey)}
            </li>
          ))}
        </ul>

        <div className={actionsClass}>
          <a
            href={getSeriesBuyUrl(series)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonLayoutClass} rounded-xl bg-noble-orange px-4 py-3 ${buttonTextClass} transition hover:bg-noble-orange/90`}
          >
            {t("productsCatalog.modelDetails.buyShopCta")}
          </a>
          <Link
            href={seriesHref}
            className={`relative z-20 ${buttonLayoutClass} gap-2 rounded-xl bg-zinc-900 px-4 py-3 ${buttonTextClass} transition hover:bg-zinc-800`}
          >
            {t("productsCatalog.series.viewModels")}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      <Link
        href={seriesHref}
        aria-label={cardLabel}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-offset-2"
      />
    </article>
  );
}

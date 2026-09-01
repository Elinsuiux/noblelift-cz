"use client";

import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import {
  getCategorySlug,
  getSubcategorySlug,
  getSubcategoryItemCount,
  type CatalogCategory,
  type Subcategory,
  usesSubcategorySeriesCount,
} from "@/lib/products-catalog";

function SubcategoryIcon({ icon }: { icon: Subcategory["icon"] }) {
  const className = "h-7 w-7";

  switch (icon) {
    case "electric":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
        </svg>
      );
    case "fuel":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
          <path d="M3 22h12M5 22V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14M14 10h2l3 4v8h-5v-12z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        </svg>
      );
  }
}

export function SubcategoryCard({
  category,
  subcategory,
}: {
  category: CatalogCategory;
  subcategory: Subcategory;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const categorySlug = getCategorySlug(category, locale);
  const subcategorySlug = getSubcategorySlug(subcategory, locale);
  const isOrange = subcategory.ctaVariant === "orange";
  const subcategoryHref = {
    pathname: "/products/[category]/[subcategory]" as const,
    params: { category: categorySlug, subcategory: subcategorySlug },
  };
  const cardLabel = `${t(subcategory.titleKey)} — ${t("productsCatalog.subcategory.cta")}`;
  const subcategoryUrl = getPathname({
    locale,
    href: subcategoryHref,
  });

  const badge = (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        subcategory.image
          ? isOrange
            ? "bg-noble-orange text-white shadow-sm"
            : "bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200"
          : isOrange
            ? "bg-noble-orange text-white shadow-sm"
            : "bg-zinc-200 text-zinc-700"
      }`}
    >
      {t(subcategory.badgeKey)}
    </span>
  );

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        subcategory.image || isOrange ? "bg-white" : "bg-zinc-50"
      } ${
        subcategory.image ? "border-zinc-200" : isOrange ? "border-noble-orange/20" : "border-zinc-200"
      }`}
    >
      {subcategory.image ? (
        <div className="relative w-full overflow-hidden bg-white">
          <div className="relative mx-auto h-48 w-full bg-white sm:h-52">
            <Image
              src={subcategory.image}
              alt={t(subcategory.titleKey)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center p-3"
              unoptimized
            />
          </div>
          <div className="absolute right-4 top-4">{badge}</div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4 px-8 pt-8">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isOrange ? "bg-noble-orange/10 text-noble-orange" : "bg-zinc-200 text-zinc-700"
            }`}
          >
            <SubcategoryIcon icon={subcategory.icon} />
          </div>
          {badge}
        </div>
      )}

      <div className={`flex flex-1 flex-col bg-white px-8 pb-8 ${subcategory.image ? "pt-4" : ""}`}>
        <h3 className={`text-xl font-bold text-zinc-900 ${subcategory.image ? "" : "mt-6"}`}>
          {t(subcategory.titleKey)}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{t(subcategory.descKey)}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {subcategory.tagKeys.map((tagKey) => (
            <li key={tagKey} className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
              {t(tagKey)}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-zinc-500">
          {usesSubcategorySeriesCount(subcategory)
            ? t("productsCatalog.subcategory.seriesCount", {
                count: getSubcategoryItemCount(subcategory),
              })
            : t("productsCatalog.subcategory.modelsCount", {
                count: getSubcategoryItemCount(subcategory),
              })}
        </p>

        <span className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white">
          {t("productsCatalog.subcategory.cta")} &gt;
        </span>
      </div>

      <a
        href={subcategoryUrl}
        aria-label={cardLabel}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-orange focus-visible:ring-offset-2"
      />
    </article>
  );
}

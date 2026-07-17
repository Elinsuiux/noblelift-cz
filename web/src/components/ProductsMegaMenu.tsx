"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  PRODUCT_CATEGORIES,
  filterProductsByCategory,
  type ProductCategoryId,
} from "@/lib/products-menu";
import { getCategoryById, getCategorySlug } from "@/lib/products-catalog";

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={`h-4 w-4 shrink-0 text-zinc-400 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type ProductsMegaMenuProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function ProductsMegaMenu({ variant, onNavigate }: ProductsMegaMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>("all");

  const visibleProducts = useMemo(
    () => filterProductsByCategory(activeCategory),
    [activeCategory],
  );

  const categoryList = (
    <ul className={variant === "desktop" ? "space-y-0" : "space-y-1"}>
      {PRODUCT_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;
        const catalogCategory = category.id !== "all" ? getCategoryById(category.id) : null;
        const categoryHref =
          category.id === "all"
            ? "/products"
            : catalogCategory
              ? {
                  pathname: "/products/[category]" as const,
                  params: { category: getCategorySlug(catalogCategory, locale) },
                }
              : "/products";
        const itemClassName =
          variant === "desktop"
            ? `flex w-full items-center justify-between gap-3 text-left transition border-b border-zinc-100 px-5 py-3.5 text-[15px] ${
                isActive
                  ? "bg-zinc-50 font-semibold text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`
            : "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-[15px] text-white/90 transition hover:bg-white/10";

        if (variant === "mobile" || category.id === "all") {
          return (
            <li key={category.id}>
              <Link
                href={categoryHref}
                onClick={onNavigate}
                onMouseEnter={
                  variant === "desktop" ? () => setActiveCategory(category.id) : undefined
                }
                className={itemClassName}
              >
                <span>{t(category.labelKey)}</span>
                <ChevronRight className={variant === "mobile" ? "text-white" : undefined} />
              </Link>
            </li>
          );
        }

        return (
          <li key={category.id}>
            <button
              type="button"
              onMouseEnter={() => setActiveCategory(category.id)}
              onClick={() => setActiveCategory(category.id)}
              className={itemClassName}
            >
              <span>{t(category.labelKey)}</span>
              <ChevronRight />
            </button>
          </li>
        );
      })}
    </ul>
  );

  const productGrid = (
    <div
      className={
        variant === "desktop"
          ? "grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
          : "mt-4 grid grid-cols-2 gap-4"
      }
    >
      {visibleProducts.map((product) => {
        const catalogCategory = getCategoryById(product.id);
        const href = catalogCategory
          ? {
              pathname: "/products/[category]" as const,
              params: { category: getCategorySlug(catalogCategory, locale) },
            }
          : "/products";

        return (
          <Link
            key={product.id}
            href={href}
            onClick={onNavigate}
            className={`group text-center transition ${
              variant === "desktop" ? "text-zinc-800 hover:text-noble-orange" : "text-white"
            }`}
          >
            <div
              className={`relative mx-auto overflow-hidden bg-white ${
                variant === "desktop"
                  ? "mb-3 aspect-[4/3] max-w-[200px]"
                  : "mb-2 aspect-square rounded-md bg-white/95"
              }`}
            >
              <Image
                src={product.image}
                alt={t(product.titleKey)}
                fill
                sizes={variant === "desktop" ? "200px" : "45vw"}
                className="object-cover transition group-hover:scale-105"
                unoptimized
              />
            </div>
            <span
              className={`block leading-snug ${
                variant === "desktop" ? "text-sm font-medium" : "text-xs font-medium text-white/90"
              }`}
            >
              {t(product.titleKey)}
            </span>
          </Link>
        );
      })}
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="border-b border-white/15 pb-4">
        <p className="mb-2 mt-3 px-3 text-xs font-bold uppercase tracking-wider text-white/60">
          {t("productsMenu.categoryTitle")}
        </p>
        {categoryList}
      </div>
    );
  }

  return (
    <div className="border-t border-zinc-200 bg-white text-zinc-900 shadow-lg">
      <div className="mx-auto flex w-full max-w-[1280px]">
        <aside className="w-[280px] shrink-0 border-r border-zinc-100 py-6">
          <h2 className="mb-3 px-5 text-base font-bold text-zinc-900">
            {t("productsMenu.categoryTitle")}
          </h2>
          {categoryList}
        </aside>
        <div className="min-w-0 flex-1 px-8 py-8">{productGrid}</div>
      </div>
    </div>
  );
}

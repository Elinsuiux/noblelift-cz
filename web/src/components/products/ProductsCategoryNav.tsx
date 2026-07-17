"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  PRODUCT_CATALOG,
  getCategorySlug,
  type CatalogCategory,
} from "@/lib/products-catalog";

export function ProductsCategoryNav({ activeCategory }: { activeCategory: CatalogCategory }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <nav
      aria-label={t("productsCatalog.categoryNav.label")}
      className="sticky top-[var(--header-height)] z-40 border-b border-zinc-200 bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1140px] gap-1 overflow-x-auto px-6 py-3 lg:px-0">
        {PRODUCT_CATALOG.map((category) => {
          const slug = getCategorySlug(category, locale);
          const href = { pathname: "/products/[category]" as const, params: { category: slug } };
          const isActive = category.id === activeCategory.id;

          return (
            <Link
              key={category.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-noble-orange bg-white text-zinc-900"
                  : "border-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {t(`categories.items.${category.id}.title`)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

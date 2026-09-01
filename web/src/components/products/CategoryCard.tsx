"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HomeImageSlot } from "@/components/HomeImageSlot";
import { getCategorySlug, type CatalogCategory } from "@/lib/products-catalog";

export function CategoryCard({ category }: { category: CatalogCategory }) {
  const t = useTranslations();
  const locale = useLocale();
  const slug = getCategorySlug(category, locale);

  return (
    <Link
      href={{ pathname: "/products/[category]", params: { category: slug } }}
      className="group flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <HomeImageSlot
        src={category.image}
        alt={t(`media.categoryAlt.${category.id}`)}
        hint={t("media.categoryHint")}
        className="mb-4 aspect-[4/3] w-full rounded-xl"
        sizes="(max-width: 640px) 50vw, 33vw"
      />
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
        {t(`categories.items.${category.id}.tags`)}
      </p>
      <h3 className="mt-1 text-lg font-bold text-zinc-900">
        {t(`categories.items.${category.id}.title`)}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
        {t(`categories.items.${category.id}.desc`)}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-noble-orange transition-all group-hover:gap-2">
        {t("categories.viewModels")} &gt;
      </span>
    </Link>
  );
}

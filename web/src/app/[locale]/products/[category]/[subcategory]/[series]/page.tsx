import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProductSeriesPage } from "@/components/ProductSeriesPage";
import { routing } from "@/i18n/routing";
import {
  PRODUCT_CATALOG,
  getCategoryBySlug,
  getCategorySlug,
  getSeriesBySlug,
  getSeriesSlug,
  getSubcategoryBySlug,
  getSubcategorySlug,
} from "@/lib/products-catalog";
import { formatStaticMessage, getStaticMessage } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; category: string; subcategory: string; series: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_CATALOG.flatMap((category) =>
      category.subcategories.flatMap((subcategory) =>
        (subcategory.series ?? []).map((series) => ({
          locale,
          category: getCategorySlug(category, locale),
          subcategory: getSubcategorySlug(subcategory, locale),
          series: getSeriesSlug(series, locale),
        })),
      ),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug, subcategory: subcategorySlug, series: seriesSlug } =
    await params;
  const category = getCategoryBySlug(categorySlug, locale);

  if (!category) {
    return {};
  }

  const subcategory = getSubcategoryBySlug(category, subcategorySlug, locale);
  if (!subcategory) {
    return {};
  }

  const series = getSeriesBySlug(subcategory, seriesSlug, locale);
  if (!series) {
    return {};
  }

  return {
    title: formatStaticMessage(locale, "productsCatalog.meta.series.title", {
      series: getStaticMessage(locale, series.titleKey),
      subcategory: getStaticMessage(locale, subcategory.titleKey),
    }),
    description: seoDescription(getStaticMessage(locale, series.descKey)),
  };
}

export default async function Page({ params }: Props) {
  const { locale, category: categorySlug, subcategory: subcategorySlug, series: seriesSlug } =
    await params;
  setRequestLocale(locale);
  const category = getCategoryBySlug(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const subcategory = getSubcategoryBySlug(category, subcategorySlug, locale);
  if (!subcategory) {
    notFound();
  }

  const series = getSeriesBySlug(subcategory, seriesSlug, locale);
  if (!series) {
    notFound();
  }

  return <ProductSeriesPage category={category} subcategory={subcategory} series={series} />;
}

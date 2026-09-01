import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProductModelDetailPage } from "@/components/ProductModelDetailPage";
import { routing } from "@/i18n/routing";
import {
  PRODUCT_CATALOG,
  getCategoryBySlug,
  getCategorySlug,
  getModelSlug,
  getProductBySlugInSeries,
  getSeriesBySlug,
  getSeriesSlug,
  getSubcategoryBySlug,
  getSubcategorySlug,
} from "@/lib/products-catalog";
import { formatStaticMessage, getStaticMessage } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{
    locale: string;
    category: string;
    subcategory: string;
    series: string;
    model: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_CATALOG.flatMap((category) =>
      category.subcategories.flatMap((subcategory) =>
        (subcategory.series ?? []).flatMap((series) =>
          series.products.map((product) => ({
            locale,
            category: getCategorySlug(category, locale),
            subcategory: getSubcategorySlug(subcategory, locale),
            series: getSeriesSlug(series, locale),
            model: getModelSlug(product, locale),
          })),
        ),
      ),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    locale,
    category: categorySlug,
    subcategory: subcategorySlug,
    series: seriesSlug,
    model: modelSlug,
  } = await params;
  setRequestLocale(locale);
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

  const product = getProductBySlugInSeries(series, modelSlug, locale);
  if (!product) {
    return {};
  }

  const rawDescription = product.seriesDetail
    ? getStaticMessage(locale, product.seriesDetail.introKey)
    : product.detail
      ? getStaticMessage(locale, product.detail.longDescKey)
      : getStaticMessage(locale, product.descriptionKey);

  return {
    title: formatStaticMessage(locale, "productsCatalog.meta.model.title", {
      model: product.model,
      series: getStaticMessage(locale, series.titleKey),
    }),
    description: seoDescription(rawDescription),
  };
}

export default async function Page({ params }: Props) {
  const {
    locale,
    category: categorySlug,
    subcategory: subcategorySlug,
    series: seriesSlug,
    model: modelSlug,
  } = await params;
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

  const product = getProductBySlugInSeries(series, modelSlug, locale);
  if (!product) {
    notFound();
  }

  return (
    <ProductModelDetailPage
      category={category}
      subcategory={subcategory}
      series={series}
      product={product}
    />
  );
}

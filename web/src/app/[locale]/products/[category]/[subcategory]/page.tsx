import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductSubcategoryPage } from "@/components/ProductSubcategoryPage";
import { routing } from "@/i18n/routing";
import {
  PRODUCT_CATALOG,
  getCategoryBySlug,
  getCategorySlug,
  getSubcategoryBySlug,
  getSubcategorySlug,
} from "@/lib/products-catalog";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; category: string; subcategory: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_CATALOG.flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        locale,
        category: getCategorySlug(category, locale),
        subcategory: getSubcategorySlug(subcategory, locale),
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getCategoryBySlug(categorySlug, locale);

  if (!category) {
    return {};
  }

  const subcategory = getSubcategoryBySlug(category, subcategorySlug, locale);
  if (!subcategory) {
    return {};
  }

  const t = await getTranslations({ locale });
  const meta = await getTranslations({ locale, namespace: "productsCatalog.meta.subcategory" });

  return {
    title: meta("title", {
      subcategory: t(subcategory.titleKey),
      category: t(`categories.items.${category.id}.title`),
    }),
    description: seoDescription(t(subcategory.descKey)),
  };
}

export default async function Page({ params }: Props) {
  const { locale, category: categorySlug, subcategory: subcategorySlug } = await params;
  setRequestLocale(locale);

  const category = getCategoryBySlug(categorySlug, locale);
  if (!category) {
    notFound();
  }

  const subcategory = getSubcategoryBySlug(category, subcategorySlug, locale);
  if (!subcategory) {
    notFound();
  }

  return <ProductSubcategoryPage category={category} subcategory={subcategory} />;
}

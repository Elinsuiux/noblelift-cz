import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCategoryPage } from "@/components/ProductCategoryPage";
import { routing } from "@/i18n/routing";
import { PRODUCT_CATALOG, getCategoryBySlug, getCategorySlug } from "@/lib/products-catalog";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_CATALOG.map((category) => ({
      locale,
      category: getCategorySlug(category, locale),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug, locale);

  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "categories.items" });
  const meta = await getTranslations({ locale, namespace: "productsCatalog.meta.category" });

  return {
    title: meta("title", { category: t(`${category.id}.title`) }),
    description: seoDescription(t(`${category.id}.desc`)),
  };
}

export default async function Page({ params }: Props) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);

  const category = getCategoryBySlug(categorySlug, locale);
  if (!category) {
    notFound();
  }

  return <ProductCategoryPage category={category} />;
}

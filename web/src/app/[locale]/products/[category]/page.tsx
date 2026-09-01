import { use } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProductCategoryPage } from "@/components/ProductCategoryPage";
import { routing } from "@/i18n/routing";
import { PRODUCT_CATALOG, getCategoryBySlug, getCategorySlug } from "@/lib/products-catalog";
import { formatStaticMessage, getStaticMessage } from "@/lib/static-messages";
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

  const categoryTitle = getStaticMessage(locale, `categories.items.${category.id}.title`);

  return {
    title: formatStaticMessage(locale, "productsCatalog.meta.category.title", {
      category: categoryTitle,
    }),
    description: seoDescription(getStaticMessage(locale, `categories.items.${category.id}.desc`)),
  };
}

export default function Page({ params }: Props) {
  const { locale, category: categorySlug } = use(params);
  setRequestLocale(locale);
  const category = getCategoryBySlug(categorySlug, locale);

  if (!category) {
    notFound();
  }

  return <ProductCategoryPage category={category} />;
}

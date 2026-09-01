import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductsHubPage } from "@/components/ProductsHubPage";
import { getStaticMessage } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: getStaticMessage(locale, "productsCatalog.meta.hub.title"),
    description: seoDescription(getStaticMessage(locale, "productsCatalog.meta.hub.description")),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsHubPage />;
}

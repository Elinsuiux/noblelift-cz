import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/ServicePage";
import { getStaticMessage } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: getStaticMessage(locale, "servicePage.meta.title"),
    description: seoDescription(getStaticMessage(locale, "servicePage.meta.description")),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePage />;
}

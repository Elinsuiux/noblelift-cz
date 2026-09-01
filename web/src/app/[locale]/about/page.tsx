import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/AboutPage";
import { getStaticMessage } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: getStaticMessage(locale, "aboutPage.meta.title"),
    description: seoDescription(getStaticMessage(locale, "aboutPage.meta.description")),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}

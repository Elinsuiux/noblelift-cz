import { use } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/CookieConsent";
import { routing } from "@/i18n/routing";
import { getStaticMessage, getStaticMessages } from "@/lib/static-messages";
import { seoDescription } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: getStaticMessage(locale, "meta.title"),
    description: seoDescription(getStaticMessage(locale, "meta.description")),
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = use(params);

  if (!routing.locales.includes(locale as "cz" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = getStaticMessages(locale);

  return (
    <html lang={locale === "cz" ? "cs" : locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

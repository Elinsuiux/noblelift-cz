"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalPageProps = {
  namespace: "legalPrivacy" | "legalCookies" | "legalTerms" | "legalCompany";
};

export function LegalPage({ namespace }: LegalPageProps) {
  const t = useTranslations(namespace);
  const sections = t.raw("sections") as LegalSection[];

  return (
    <>
      <Header />
      <main className="bg-white pt-24">
        <article className="px-6 py-16">
          <div className="mx-auto w-full max-w-3xl">
            <header className="text-center">
              <h1 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
                {t("title")}
              </h1>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
              {t.has("updated") && (
                <p className="mt-6 text-sm text-zinc-500">{t("updated")}</p>
              )}
              {t.has("intro") && (
                <p className="mx-auto mt-6 text-base leading-relaxed text-zinc-600">{t("intro")}</p>
              )}
            </header>

            <div className="mt-12 space-y-10 text-sm leading-relaxed text-zinc-700 md:text-base">
              {sections.map((section, index) => (
                <section key={section.title}>
                  <h2 className="text-lg font-bold text-zinc-900">
                    {index + 1}. {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && section.list.length > 0 && (
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

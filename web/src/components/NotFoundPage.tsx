"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Wordmark";

export function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5]">
        <section className="relative overflow-hidden bg-[#1a1a1a] px-6 pb-16 pt-24 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-8 select-none text-[9rem] font-black leading-none text-white/[0.06] sm:text-[12rem] md:right-8 md:text-[14rem]"
          >
            404
          </div>
          <div className="relative mx-auto w-full max-w-[1140px]">
            <Wordmark variant="header" className="h-5 w-auto sm:h-6" />
            <p className="mt-8 text-6xl font-black tracking-tight text-noble-orange sm:text-7xl md:text-8xl">
              {t("badge")}
            </p>
            <div className="mt-3 h-1 w-16 rounded-full bg-noble-orange" />
            <h1 className="mt-6 max-w-3xl text-3xl font-extrabold uppercase tracking-wide md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {t("description")}
            </p>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
                {t("hint")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-noble-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-noble-orange/90"
                >
                  {t("homeCta")}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  {t("productsCta")}
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center justify-center rounded-full border-2 border-zinc-300 px-6 py-3 text-sm font-bold text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
                >
                  {t("serviceCta")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-noble-orange px-6 py-3 text-sm font-bold text-noble-orange transition hover:bg-noble-orange hover:text-white"
                >
                  {t("contactCta")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

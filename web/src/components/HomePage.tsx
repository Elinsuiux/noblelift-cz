import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Wordmark";
import { HomeImageSlot } from "@/components/HomeImageSlot";
import { VideoPlayButton } from "@/components/VideoPlayButton";
import { ContactForm } from "@/components/ContactForm";
import { ClockIcon } from "@/components/ClockIcon";

const STEP_KEYS = ["1", "2", "3", "4", "5", "6"] as const;
import { HOME_CATEGORY_KEYS } from "@/lib/products-menu";
import { getCategoryById, getCategorySlug } from "@/lib/products-catalog";

const CATEGORY_KEYS = HOME_CATEGORY_KEYS;
const LOGISTICS_KEYS = ["1", "2", "3"] as const;
const DEALER_KEYS = ["1", "2", "3", "4", "5"] as const;

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="m12 2 9 5-9 5-9-5 9-5z" strokeLinejoin="round" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 11a9 9 0 1 1 18 0v5a3 3 0 0 1-3 3h-1v-6h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16v-2a3 3 0 0 1 3-3h1v6H6a3 3 0 0 1-3-3z" strokeLinejoin="round" />
      <path d="M21 16v-2a3 3 0 0 0-3-3h-1v6h1a3 3 0 0 0 3-3z" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-1.4-1.4 2.1-2.1z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M1 3h15v13H1z" strokeLinejoin="round" />
      <path d="M16 8h4l3 5v3h-7V8z" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WHY_STEP_ICONS = {
  "1": GlobeIcon,
  "2": LayersIcon,
  "3": HeadsetIcon,
  "4": WrenchIcon,
  "5": TruckIcon,
  "6": BadgeCheckIcon,
} as const;

function BtnPrimary({
  href,
  children,
  className = "",
}: {
  href: ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
}) {
  const classNames = `inline-flex items-center justify-center rounded-full bg-noble-orange px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-noble-orange-dark ${className}`;

  if (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:"))
  ) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <Header />
      <main id="top">
        <HeroCarousel>
          <div className="-translate-y-6 max-w-xl md:-translate-y-10 lg:-translate-y-14">
            <h1 className="sr-only">{t("hero.title")}</h1>
            <div className="flex flex-col items-start">
              <Wordmark variant="hero" priority />
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white md:mt-6 md:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="mt-7 md:mt-8">
                <BtnPrimary href="/products" className="!rounded-lg px-8 py-3.5 text-base">
                  {t("hero.ctaPrimary")}
                </BtnPrimary>
              </div>
            </div>
          </div>
        </HeroCarousel>

        {/* Why — white */}
        <section className="bg-white px-6 py-20" id="about">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
                {t("why.title")}
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
            </div>

            <div className="relative mt-10 h-72 overflow-hidden rounded-2xl shadow-lg md:h-80">
              <Image
                src="/images/home/why-intro.jpg"
                alt={t("media.whyBannerAlt")}
                width={1024}
                height={288}
                priority
                sizes="(max-width: 1140px) 100vw, 1140px"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black/25">
                <VideoPlayButton
                  ariaLabel={t("video.play")}
                  closeLabel={t("video.close")}
                />
              </div>
              <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-white drop-shadow-md">
                {t("video.note")}
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-zinc-600 md:text-lg">
              {t("why.lead")}
            </p>

            <div className="mt-10 text-center">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border-2 border-noble-orange px-6 py-2.5 text-sm font-semibold text-noble-orange transition hover:bg-noble-orange hover:text-white"
              >
                {t("why.learnMore")}
              </Link>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STEP_KEYS.map((key) => {
                const Icon = WHY_STEP_ICONS[key];
                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
                      <Icon />
                    </div>
                    <div className="mt-4 font-bold text-zinc-900">{t(`why.steps.${key}.title`)}</div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {t(`why.steps.${key}.desc`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Categories — white */}
        <section className="bg-[#f5f5f5] px-6 py-20" id="products">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
                {t("categories.titlePrefix") && (
                  <>{t("categories.titlePrefix")}{" "}</>
                )}
                <span className="text-noble-orange">{t("categories.titleBrand")}</span>
                {t("categories.titleSuffix") && (
                  <> {t("categories.titleSuffix")}</>
                )}
              </h2>
              <BtnPrimary href="/products" className="!py-2.5 !text-xs">
                {t("categories.cta")}
              </BtnPrimary>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_KEYS.map((key) => {
                const category = getCategoryById(key);
                const categoryHref = category
                  ? {
                      pathname: "/products/[category]" as const,
                      params: { category: getCategorySlug(category, locale) },
                    }
                  : "/products";

                return (
                <Link
                  key={key}
                  href={categoryHref}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <HomeImageSlot
                    src={`/images/home/categories/${key}.jpg`}
                    alt={t(`media.categoryAlt.${key}`)}
                    hint={t("media.categoryHint")}
                    className="mb-4 aspect-[4/3] w-full rounded-xl"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    {t(`categories.items.${key}.tags`)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-zinc-900">
                    {t(`categories.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                    {t(`categories.items.${key}.desc`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-noble-orange group-hover:gap-2 transition-all">
                    {t("categories.viewModels")} &gt;
                  </span>
                </Link>
                );
              })}
            </div>
            <div className="mt-12 text-center">
              <BtnPrimary href="/products">{t("categories.catalogCta")}</BtnPrimary>
            </div>
          </div>
        </section>

        {/* Logistics — dark */}
        <section className="bg-[#1a1a1a] px-6 py-20 text-white" id="service">
          <div className="mx-auto grid w-full max-w-[1140px] items-center gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide md:text-3xl">
                {t("logistics.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                {t("logistics.intro")}
              </p>
              <ul className="mt-8 space-y-6">
                {LOGISTICS_KEYS.map((key) => (
                  <li key={key} className="border-l-4 border-noble-orange pl-4">
                    <div className="font-bold text-white">
                      {t(`logistics.items.${key}.title`)}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {t(`logistics.items.${key}.desc`)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-start gap-3 text-sm text-zinc-300 md:text-base">
                <span className="mt-0.5 shrink-0 text-noble-orange">
                  <ClockIcon />
                </span>
                <p>{t("logistics.deliveryNote")}</p>
              </div>
            </div>
            <HomeImageSlot
              src="/images/home/logistics-noblelift-v4.jpg"
              alt={t("media.logisticsAlt")}
              hint={t("media.logisticsHint")}
              className="aspect-[1056/866] w-full rounded-2xl"
              imageClassName="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Dealer + form — white */}
        <section className="bg-white px-6 py-20" id="contact">
          <div className="mx-auto grid w-full max-w-[1140px] gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-zinc-900 md:text-3xl">
                <span className="block">{t("dealer.titleLine1")}</span>
                <span className="block">
                  {t("dealer.titleDealer")}{" "}
                  <span className="text-noble-orange">{t("dealer.titleBrand")}</span>
                </span>
              </h2>
              <p className="mt-5 leading-relaxed text-zinc-600">{t("dealer.lead")}</p>
              <ul className="mt-8 space-y-4">
                {DEALER_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-bold leading-none text-noble-orange">
                      ✓
                    </span>
                    <span className="min-w-0 text-zinc-700">{t(`dealer.benefits.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <HomeImageSlot
                src="/images/home/dealer-fleet-avant.jpg"
                alt={t("media.dealerAlt")}
                hint={t("media.dealerHint")}
                className="mt-8 aspect-[16/10] w-full rounded-2xl"
                imageClassName="object-cover object-center contrast-[1.04] brightness-[0.96]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>

            <div
              id="form"
              className="min-w-0 rounded-2xl border border-zinc-100 bg-white p-5 shadow-xl sm:p-8"
            >
              <h3 className="mb-6 text-center text-lg font-extrabold uppercase tracking-wide text-zinc-900">
                {t("form.heading")}
              </h3>
              <ContactForm variant="plain" source="dealer" showCountry={false} showOrCall />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

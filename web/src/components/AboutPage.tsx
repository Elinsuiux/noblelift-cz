"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeImageSlot } from "@/components/HomeImageSlot";
import {
  ABOUT_GALLERY,
  BRAND_FACT_KEYS,
  BRAND_MILESTONE_KEYS,
  BRAND_TRUST_KEYS,
  PILLAR_KEYS,
  STAT_KEYS,
  STRENGTH_KEYS,
  type BrandTrustKey,
  type StrengthKey,
} from "@/lib/about";
import { SALES_REPS } from "@/lib/contact";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
    </div>
  );
}

function BtnPrimary({
  href,
  children,
  className = "",
}: {
  href: ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg bg-noble-orange px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-noble-orange-dark ${className}`}
    >
      {children}
    </Link>
  );
}

function WarehouseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" />
      <path d="M9 21V12h6v9" />
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
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 11a9 9 0 1 1 18 0v5a3 3 0 0 1-3 3h-1v-6h4" />
      <path d="M3 16v-2a3 3 0 0 1 3-3h1v6H6a3 3 0 0 1-3-3z" />
      <path d="M21 16v-2a3 3 0 0 0-3-3h-1v6h1a3 3 0 0 0 3-3z" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M7 10v12" strokeLinecap="round" />
      <path d="M11 22h7.2c1.5 0 2.8-1 3.2-2.4l1.5-6c.4-1.5-.6-3-2.2-3H15l.8-4.2c.2-1-.6-2-1.7-2-1 0-1.8.6-2 1.5L11 10" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 21h18" strokeLinecap="round" />
      <path d="M5 21V7l7-4 7 4v14" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" strokeLinecap="round" />
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

function CogIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14l4-4 4 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STRENGTH_ICONS: Record<StrengthKey, () => React.JSX.Element> = {
  warehouse: WarehouseIcon,
  trust: WarrantyIcon,
  serviceParts: WrenchIcon,
  rental: ThumbsUpIcon,
  delivery: TruckIcon,
  consulting: HeadsetIcon,
};

const BRAND_TRUST_ICONS: Record<BrandTrustKey, () => React.JSX.Element> = {
  experience: ClockIcon,
  scale: BuildingIcon,
  portfolio: LayersIcon,
  ownRd: CogIcon,
  quality: WarrantyIcon,
  global: GlobeIcon,
  listed: ChartIcon,
};

function StrengthCard({ cardKey }: { cardKey: StrengthKey }) {
  const t = useTranslations("aboutPage.strengths");
  const Icon = STRENGTH_ICONS[cardKey];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
        <Icon />
      </div>
      <h3 className="mt-5 text-sm font-extrabold uppercase leading-snug tracking-wide text-zinc-900">
        {t(`items.${cardKey}.title`)}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
        {t(`items.${cardKey}.desc`)}
      </p>
    </article>
  );
}

export function AboutPage() {
  const t = useTranslations("aboutPage");

  return (
    <>
      <Header />
      <main className="bg-white pt-24">
        {/* Page header */}
        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px] text-center">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
              {t("title")}
            </h1>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
          </div>
        </section>

        {/* Intro */}
        <section className="px-6 pb-20">
          <div className="mx-auto grid w-full max-w-[1140px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <HomeImageSlot
              src="/images/about/intro-warehouse-v2.jpg"
              alt={t("media.introMainAlt")}
              hint={t("media.introMainHint")}
              className="aspect-[16/10] w-full rounded-2xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
            />

            <div>
              <p className="text-lg font-bold leading-snug text-zinc-900 md:text-xl">
                {t("intro.lead")}
              </p>
              <p className="mt-5 text-base leading-relaxed text-zinc-600">
                {t("intro.p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                {t("intro.p2")}
              </p>
              <div className="mt-8">
                <BtnPrimary href="/products">
                  {t("intro.cta")}
                </BtnPrimary>
              </div>
            </div>
          </div>
        </section>

        {/* Brand story from handbook */}
        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <SectionTitle>{t("brand.title")}</SectionTitle>
            <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-zinc-600 md:text-lg">
              {t("brand.lead")}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-zinc-600">
              {t("brand.p1")}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-zinc-600">
              {t("brand.p2")}
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
              <HomeImageSlot
                src="/images/about/changxing-hq.jpg"
                alt={t("media.brandHqAlt")}
                hint={t("media.brandHqHint")}
                className="aspect-[2/1] w-full"
                imageClassName="object-cover object-center"
                sizes="(max-width: 1140px) 100vw, 1140px"
                unoptimized
              />
              <p className="bg-white px-4 py-3 text-center text-sm font-medium text-zinc-600">
                {t("media.brandHqCaption")}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BRAND_FACT_KEYS.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-zinc-100 bg-white px-5 py-6 text-center shadow-sm"
                >
                  <div className="text-3xl font-extrabold text-noble-orange">
                    {t(`brand.facts.${key}.value`)}
                  </div>
                  <div className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
                    {t(`brand.facts.${key}.label`)}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-16 text-center text-xl font-extrabold uppercase tracking-wide text-zinc-900">
              {t("brand.milestones.title")}
            </h3>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-noble-orange" />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BRAND_MILESTONE_KEYS.map((key) => (
                <li
                  key={key}
                  className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
                >
                  <div className="text-sm font-extrabold text-noble-orange">
                    {t(`brand.milestones.items.${key}.year`)}
                  </div>
                  <h4 className="mt-2 text-sm font-bold uppercase tracking-wide text-zinc-900">
                    {t(`brand.milestones.items.${key}.title`)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {t(`brand.milestones.items.${key}.desc`)}
                  </p>
                </li>
              ))}
            </ol>

            <h3 className="mt-16 text-center text-xl font-extrabold uppercase tracking-wide text-zinc-900">
              {t("brand.trust.title")}
            </h3>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-noble-orange" />
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
              {t("brand.trust.lead")}
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {BRAND_TRUST_KEYS.map((key) => {
                const Icon = BRAND_TRUST_ICONS[key];
                return (
                  <article
                    key={key}
                    className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
                      <Icon />
                    </div>
                    <h4 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-zinc-900">
                      {t(`brand.trust.items.${key}.title`)}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {t(`brand.trust.items.${key}.desc`)}
                    </p>
                  </article>
                );
              })}
              <Link
                href="/products"
                className="flex h-full flex-col justify-between rounded-2xl border-2 border-noble-orange/30 bg-noble-orange p-5 text-white shadow-sm transition hover:bg-noble-orange-dark"
              >
                <div>
                  <h4 className="text-sm font-extrabold uppercase tracking-wide">
                    {t("brand.trust.ctaTitle")}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">
                    {t("brand.trust.ctaDesc")}
                  </p>
                </div>
                <span className="mt-4 text-sm font-bold">
                  {t("brand.trust.ctaLabel")} →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Commitment & mission */}
        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto grid w-full max-w-[1140px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:pr-4">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-zinc-900">
                {t("commitment.heading")}
              </h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-zinc-500">
                {t("commitment.pillarsLabel")}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {PILLAR_KEYS.map((key) => (
                  <li
                    key={key}
                    className="rounded-full border-2 border-noble-orange/30 bg-white px-4 py-2 text-sm font-semibold text-zinc-800"
                  >
                    {t(`commitment.pillars.${key}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                {t("commitment.body")}
              </p>

              <h3 className="mt-10 text-xl font-extrabold uppercase tracking-wide text-zinc-900">
                {t("mission.heading")}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                {t("mission.p1")}
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-800">
                {t("mission.tagline")}
              </p>
            </div>

            <div>
              <HomeImageSlot
                src="/images/about/commitment-warehouse-v1.jpg"
                alt={t("media.commitmentAlt")}
                hint={t("media.commitmentHint")}
                className="aspect-[16/10] w-full rounded-2xl shadow-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <p className="mt-4 text-center text-sm font-semibold text-zinc-700 sm:text-left">
                {t("mission.caption")}
              </p>
            </div>
          </div>
        </section>

        {/* Photo gallery — bento grid */}
        <section className="px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <SectionTitle>{t("gallery.title")}</SectionTitle>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
              {t("gallery.lead")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {ABOUT_GALLERY.map((item) => (
                <figure
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <HomeImageSlot
                    src={item.src}
                    alt={t(`gallery.items.${item.id}.alt`)}
                    hint={t(`gallery.items.${item.id}.hint`)}
                    className="aspect-[16/10] w-full"
                    imageClassName="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">
                    {t(`gallery.items.${item.id}.caption`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-[#1a1a1a] px-6 py-14 text-white">
          <div className="mx-auto grid w-full max-w-[1140px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_KEYS.map((key) => (
              <div key={key} className="text-center">
                <div className="text-3xl font-extrabold text-noble-orange md:text-4xl">
                  {t(`stats.${key}.value`)}
                </div>
                <div className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-400">
                  {t(`stats.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths */}
        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <SectionTitle>{t("strengths.title")}</SectionTitle>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STRENGTH_KEYS.map((key) => (
                <StrengthCard key={key} cardKey={key} />
              ))}
            </div>
          </div>
        </section>

        {/* Team spotlight */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-2xl">
                {t("team.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                {t("team.lead")}
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:mx-auto sm:max-w-[42rem] sm:gap-4 xl:max-w-none xl:grid-cols-2 xl:gap-8">
              {SALES_REPS.map((rep) => (
                <article
                  key={rep.id}
                  className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[clamp(148px,34%,220px)_1fr] sm:items-stretch xl:grid-cols-[200px_1fr]">
                    <div className="relative w-full max-sm:aspect-[512/491] sm:min-h-[148px] sm:h-full xl:min-h-[160px]">
                      <Image
                        src={rep.photo}
                        alt={t("team.photoAlt", { name: rep.name })}
                        fill
                        className={`object-cover ${rep.photoPosition}`}
                        sizes="(min-width: 1280px) 200px, (min-width: 640px) 34vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center p-5 text-center sm:items-stretch sm:px-5 sm:py-4 sm:text-left xl:px-6 xl:py-5">
                      <h3 className="text-lg font-bold text-zinc-900 xl:text-lg">{rep.name}</h3>
                      <p className="mt-0.5 text-sm text-zinc-500">{t("team.role")}</p>
                      <a
                        href={`tel:${rep.phone}`}
                        className="mt-2.5 text-sm font-semibold text-noble-orange hover:text-noble-orange-dark xl:mt-4"
                      >
                        {rep.phoneDisplay}
                      </a>
                      <a
                        href={`mailto:${rep.email}`}
                        className="mt-1 text-sm text-zinc-600 hover:text-noble-orange"
                      >
                        {rep.email}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="text-sm font-semibold text-noble-orange transition hover:text-noble-orange-dark"
              >
                {t("team.contactCta")} →
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pt-12 pb-20">
          <div className="mx-auto w-full max-w-[1140px] text-center">
            <BtnPrimary
              href="/products"
              className="w-full max-w-xl px-10 py-4 text-base sm:w-auto"
            >
              {t("catalogCta")}
            </BtnPrimary>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

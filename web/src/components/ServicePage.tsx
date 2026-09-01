"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { HomeImageSlot } from "@/components/HomeImageSlot";
import { PhoneIcon } from "@/components/PhoneIcon";
import { CONTACT } from "@/lib/contact";
import {
  SERVICE_BENEFIT_KEYS,
  SERVICE_PILLAR_KEYS,
  SERVICE_STEP_KEYS,
} from "@/lib/service";

const PILLAR_IMAGES = {
  service: "/images/service/authorized-service-v2.jpg",
  parts: "/images/service/spare-parts-stock.jpg",
} as const;

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

function GearsIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const PILLAR_ICONS = {
  service: WrenchIcon,
  parts: GearsIcon,
} as const;

function ShieldCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinejoin="round" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
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

function HeadsetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 11a9 9 0 1 1 18 0v5a3 3 0 0 1-3 3h-1v-6h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16v-2a3 3 0 0 1 3-3h1v6H6a3 3 0 0 1-3-3z" strokeLinejoin="round" />
      <path d="M21 16v-2a3 3 0 0 0-3-3h-1v6h1a3 3 0 0 0 3-3z" strokeLinejoin="round" />
    </svg>
  );
}

const BENEFIT_ICONS = {
  warranty: ShieldCheckIcon,
  genuine: PackageIcon,
  dispatch: TruckIcon,
  factory: HeadsetIcon,
} as const;

export function ServicePage() {
  const t = useTranslations("servicePage");
  const tForm = useTranslations();

  return (
    <>
      <Header />
      <main className="bg-white pt-24">
        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px] text-center">
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-3xl">
              {t("title")}
            </h1>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
              {t("intro")}
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto grid w-full max-w-[1140px] gap-8 lg:grid-cols-2">
            {SERVICE_PILLAR_KEYS.map((key) => {
              const Icon = PILLAR_ICONS[key];
              return (
                <article
                  key={key}
                  className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
                >
                  <HomeImageSlot
                    src={PILLAR_IMAGES[key]}
                    alt={t(`pillars.${key}.imageAlt`)}
                    hint={t(`pillars.${key}.imageHint`)}
                    className="aspect-[16/10] w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="p-6 md:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
                      <Icon />
                    </div>
                    <h2 className="mt-5 text-lg font-extrabold uppercase tracking-wide text-zinc-900">
                      {t(`pillars.${key}.title`)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
                      {t(`pillars.${key}.desc`)}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {(["1", "2", "3"] as const).map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-700">
                          <span className="mt-0.5 shrink-0 font-bold text-noble-orange">✓</span>
                          {t(`pillars.${key}.points.${point}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid w-full max-w-[1140px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_BENEFIT_KEYS.map((key) => {
              const Icon = BENEFIT_ICONS[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-zinc-900">
                    {t(`benefits.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {t(`benefits.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-14 text-white">
          <div className="mx-auto flex w-full max-w-[1140px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-wide md:text-2xl">
                {t("urgent.title")}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
                {t("urgent.desc")}
              </p>
            </div>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-noble-orange px-8 py-4 text-base font-bold text-white transition hover:bg-noble-orange-dark"
            >
              <PhoneIcon />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-6 py-20">
          <div className="mx-auto w-full max-w-[1140px]">
            <div className="text-center">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-2xl">
                {t("process.title")}
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-noble-orange" />
            </div>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_STEP_KEYS.map((key) => (
                <li
                  key={key}
                  className="relative rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
                >
                  <div className="text-3xl font-light text-noble-orange">
                    {key.padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-bold text-zinc-900">{t(`process.steps.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {t(`process.steps.${key}.desc`)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-6 py-20" id="form">
          <div className="mx-auto w-full max-w-[640px]">
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-center text-lg font-extrabold uppercase tracking-wide text-zinc-900">
                {tForm("form.heading")}
              </h2>
              <ContactForm variant="plain" source="service" showCountry={false} showOrCall />
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white px-6 py-12">
          <div className="mx-auto flex w-full max-w-[1140px] flex-wrap items-center justify-center gap-4 text-center">
            <span className="text-sm text-zinc-600">{t("aboutLinkLead")}</span>
            <Link
              href="/about"
              className="text-sm font-semibold text-noble-orange hover:text-noble-orange-dark"
            >
              {t("aboutLink")} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

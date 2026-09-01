"use client";

import { useTranslations } from "next-intl";
import { HomeImageSlot } from "@/components/HomeImageSlot";
import { Wordmark } from "@/components/Wordmark";
import { WAREHOUSE_KEYS, WAREHOUSES } from "@/lib/contact";

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function WarehouseLocations() {
  const t = useTranslations();

  return (
    <div className="space-y-20 md:space-y-24">
      {WAREHOUSE_KEYS.map((key, index) => {
        const reverse = index % 2 === 1;
        const warehouse = WAREHOUSES[key];

        return (
          <section key={key}>
            <h2 className="text-center text-xl font-extrabold uppercase tracking-wide text-zinc-900 md:text-2xl">
              {t(`contactPage.warehouses.${key}.title`)}
            </h2>
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className={reverse ? "lg:order-2" : ""}>
                <Wordmark
                  variant="footer"
                  className="!h-8 sm:!h-9"
                />
                <address className="mt-6 not-italic text-base leading-relaxed text-zinc-800 md:text-lg">
                  <div>{t(`contactPage.warehouses.${key}.line1`)}</div>
                  <div className="mt-1">{t(`contactPage.warehouses.${key}.line2`)}</div>
                </address>
                <a
                  href={warehouse.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-noble-orange transition hover:text-noble-orange-dark"
                >
                  <MapPinIcon />
                  {t("contactPage.showOnMap")}
                </a>
              </div>
              <HomeImageSlot
                src={warehouse.image}
                alt={t(`contactPage.warehouses.${key}.imageAlt`)}
                hint={t(`contactPage.warehouses.${key}.imageHint`)}
                className={`aspect-[4/3] w-full rounded-2xl ${reverse ? "lg:order-1" : ""}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VZV_SHOP_URL } from "@/lib/products-catalog";

export function SeriesActionBar({
  buyUrl,
  fixedShopHref,
  specsPdfUrl,
  specsPdfFilename = "technicke-parametry.pdf",
  embedded = false,
}: {
  buyUrl?: string;
  fixedShopHref?: string;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  embedded?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const shopUrl = fixedShopHref ?? buyUrl ?? VZV_SHOP_URL;
  const specsDownloadUrl = specsPdfUrl
    ? `${specsPdfUrl}?locale=${locale}`
    : undefined;

  const content = (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-noble-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-noble-orange/90"
          >
            {t("productsCatalog.modelDetails.buyShopCta")}
          </a>
          <Link
            href="/contact"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            {t("productsCatalog.subcategory.contactCta")}
          </Link>
        </div>
        {specsDownloadUrl ? (
          <a
            href={specsDownloadUrl}
            download={specsPdfFilename}
            className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50"
          >
            {t("productsCatalog.series.downloadSpecsCta")}
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        {t("productsCatalog.modelDetails.buyNote")}
      </p>
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      {content}
    </div>
  );
}

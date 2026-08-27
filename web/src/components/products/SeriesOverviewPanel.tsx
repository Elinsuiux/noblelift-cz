import { useTranslations } from "next-intl";
import { SeriesActionBar } from "@/components/products/SeriesActionBar";

export type ProductOverviewContent = {
  modelRangeKey?: string;
  capacityKey: string;
  productLineKey?: string;
  descKey: string;
};

export function ProductOverviewPanel({
  overview,
  buyUrl,
  fixedShopHref,
  specsPdfUrl,
  specsPdfFilename,
  specsPdfUrlEn,
  specsPdfFilenameEn,
}: {
  overview: ProductOverviewContent;
  buyUrl?: string;
  fixedShopHref?: string;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
}) {
  const t = useTranslations();

  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
      {overview.modelRangeKey ? (
        <p className="text-3xl font-bold tracking-tight text-noble-orange md:text-4xl">
          {t(overview.modelRangeKey)}
        </p>
      ) : null}
      <p className="mt-2 text-xl font-medium text-zinc-600 md:text-2xl">{t(overview.capacityKey)}</p>
      <div className="mt-6 h-1 w-14 rounded-full bg-noble-orange" />
      {overview.productLineKey ? (
        <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
          {t(overview.productLineKey)}
        </p>
      ) : (
        <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">{t(overview.descKey)}</p>
      )}

      <div className="mt-8 border-t border-zinc-100 pt-8">
        <SeriesActionBar
          buyUrl={buyUrl}
          fixedShopHref={fixedShopHref}
          specsPdfUrl={specsPdfUrl}
          specsPdfFilename={specsPdfFilename}
          specsPdfUrlEn={specsPdfUrlEn}
          specsPdfFilenameEn={specsPdfFilenameEn}
          embedded
        />
      </div>
    </div>
  );
}

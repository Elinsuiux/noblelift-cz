import { useTranslations } from "next-intl";
import type { ProductSeriesDetail, SeriesFeatureIcon } from "@/lib/products-catalog";

function FeatureIcon({ icon }: { icon: SeriesFeatureIcon }) {
  const className = "h-5 w-5";

  switch (icon) {
    case "ac-drive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "battery":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <rect x="2" y="7" width="18" height="10" rx="2" />
          <path d="M22 11v2" strokeLinecap="round" />
          <path d="M6 11v2M10 11v2" strokeLinecap="round" />
        </svg>
      );
    case "safety":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "display":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8" strokeLinecap="round" />
          <path d="M12 16v4" strokeLinecap="round" />
        </svg>
      );
    case "cabin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M4 10V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" strokeLinecap="round" />
          <path d="M3 10h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z" strokeLinejoin="round" />
          <path d="M8 14h8" strokeLinecap="round" />
        </svg>
      );
    case "hydraulics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M6 6h12M6 12h12M6 18h12" strokeLinecap="round" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "compact":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" strokeLinecap="round" />
        </svg>
      );
    case "rear-steer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M12 2 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-5z" strokeLinejoin="round" />
        </svg>
      );
    case "tires":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "stability":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
          <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function SeriesDetailSection({
  detail,
  embedded = false,
}: {
  detail: ProductSeriesDetail;
  embedded?: boolean;
}) {
  const t = useTranslations();

  return (
    <section
      className={
        embedded
          ? "border-t border-zinc-200 pt-6"
          : "rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10"
      }
    >
      <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">{t(detail.titleKey)}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base">{t(detail.introKey)}</p>

      <div className={`grid gap-8 sm:grid-cols-2 ${embedded ? "mt-6" : "mt-10"}`}>
        {detail.featureKeys.map((feature) => (
          <div key={feature.titleKey} className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-noble-orange/10 text-noble-orange">
              <FeatureIcon icon={feature.icon} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900">{t(feature.titleKey)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{t(feature.descKey)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`overflow-hidden rounded-xl border border-zinc-200 ${embedded ? "mt-6" : "mt-10"}`}>
        <div className="grid grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {detail.specKeys.slice(0, 3).map((spec) => (
            <div key={spec.labelKey} className="px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t(spec.labelKey)}</p>
              <p className="mt-1 text-sm font-bold text-zinc-900">{t(spec.valueKey)}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 divide-y divide-zinc-200 border-t border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {detail.specKeys.slice(3, 6).map((spec) => (
            <div key={spec.labelKey} className="px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t(spec.labelKey)}</p>
              <p className="mt-1 text-sm font-bold text-zinc-900">{t(spec.valueKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

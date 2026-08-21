import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { ProductsCategoryNav } from "@/components/products/ProductsCategoryNav";
import { SeriesCard } from "@/components/products/SeriesCard";
import { ProductModelCard } from "@/components/products/ProductModelCard";
import { ProductModelGallery } from "@/components/products/ProductModelGallery";
import { ProductOverviewPanel } from "@/components/products/SeriesOverviewPanel";
import { SeriesDetailSection } from "@/components/products/SeriesDetailSection";
import {
  getCategorySlug,
  getSubcategoryBuyUrl,
  getSubcategoryGallery,
  getSubcategorySlug,
  type CatalogCategory,
  type Subcategory,
} from "@/lib/products-catalog";

export function ProductSubcategoryPage({
  category,
  subcategory,
}: {
  category: CatalogCategory;
  subcategory: Subcategory;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const categorySlug = getCategorySlug(category, locale);
  const hasSeries = Boolean(subcategory.series?.length);
  const isHubPage = Boolean(subcategory.hubPageKey);
  const hasDetail = Boolean(subcategory.detail);
  const galleryImages = getSubcategoryGallery(subcategory);
  const seriesGridClass = "grid gap-6 lg:grid-cols-2";

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5]">
        <section className="bg-[#1a1a1a] px-6 pb-14 pt-24 text-white">
          <div className="mx-auto w-full max-w-[1140px]">
            <ProductsBreadcrumb
              items={[
                {
                  label: t(`categories.items.${category.id}.title`),
                  href: { pathname: "/products/[category]", params: { category: categorySlug } },
                },
                { label: t(subcategory.titleKey) },
              ]}
            />
            {isHubPage ? (
              <>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-noble-orange">
                  {t(`${subcategory.hubPageKey}.badge`)}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
                  {t(`${subcategory.hubPageKey}.title`)}
                </h1>
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-zinc-300 md:text-lg">
                  {t(`${subcategory.hubPageKey}.intro`)}
                </p>
              </>
            ) : (
              <>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-noble-orange">
                  {t(subcategory.badgeKey)}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
                  {hasSeries ? t("productsCatalog.subcategory.seriesPageTitle") : t(subcategory.titleKey)}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
                  {hasSeries ? t("productsCatalog.subcategory.seriesPageLead") : t(subcategory.descKey)}
                </p>
              </>
            )}
          </div>
        </section>

        <ProductsCategoryNav activeCategory={category} />

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px]">
            {isHubPage ? (
              <div className={seriesGridClass}>
                {subcategory.series!.map((series) => (
                  <SeriesCard
                    key={series.id}
                    category={category}
                    subcategory={subcategory}
                    series={series}
                  />
                ))}
              </div>
            ) : hasDetail ? (
              <div className="space-y-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
                  <ProductModelGallery images={galleryImages} alt={t(subcategory.titleKey)} />
                  <ProductOverviewPanel
                    overview={{
                      modelRangeKey: subcategory.modelRangeKey,
                      capacityKey: subcategory.capacityKey!,
                      productLineKey: subcategory.productLineKey,
                      descKey: subcategory.descKey,
                    }}
                    buyUrl={getSubcategoryBuyUrl(subcategory)}
                    specsPdfUrl={subcategory.detail!.specsPdfUrl}
                    specsPdfFilename={subcategory.detail!.specsPdfFilename}
                  />
                </div>

                <SeriesDetailSection detail={subcategory.detail!} />
              </div>
            ) : hasSeries ? (
              <div className={seriesGridClass}>
                {subcategory.series!.map((series) => (
                  <SeriesCard
                    key={series.id}
                    category={category}
                    subcategory={subcategory}
                    series={series}
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
                      {t("productsCatalog.subcategory.modelsTitle")}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {t("productsCatalog.subcategory.modelsCount", {
                        count: subcategory.products.length,
                      })}
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {subcategory.products.map((product) => (
                    <ProductModelCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

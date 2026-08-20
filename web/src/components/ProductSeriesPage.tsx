import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { ProductsCategoryNav } from "@/components/products/ProductsCategoryNav";
import { ProductModelGallery } from "@/components/products/ProductModelGallery";
import { ProductModelCard } from "@/components/products/ProductModelCard";
import { SeriesDetailSection } from "@/components/products/SeriesDetailSection";
import { SeriesModelCard } from "@/components/products/SeriesModelCard";
import { ProductOverviewPanel } from "@/components/products/SeriesOverviewPanel";
import {
  getCategorySlug,
  getSeriesBuyUrl,
  getSeriesGallery,
  getSubcategorySlug,
  type CatalogCategory,
  type ProductSeries,
  type Subcategory,
} from "@/lib/products-catalog";

export function ProductSeriesPage({
  category,
  subcategory,
  series,
}: {
  category: CatalogCategory;
  subcategory: Subcategory;
  series: ProductSeries;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const categorySlug = getCategorySlug(category, locale);
  const subcategorySlug = getSubcategorySlug(subcategory, locale);
  const galleryImages = getSeriesGallery(series);
  const showOverviewLayout =
    Boolean(series.detail) &&
    (series.products.length <= 1 || Boolean(series.preferOverviewLayout));

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
                {
                  label: t(subcategory.titleKey),
                  href: {
                    pathname: "/products/[category]/[subcategory]",
                    params: { category: categorySlug, subcategory: subcategorySlug },
                  },
                },
                { label: t(series.titleKey) },
              ]}
            />
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-noble-orange">
              {t(series.badgeKey)}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
              {t(series.titleKey)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {t(series.descKey)}
            </p>
          </div>
        </section>

        <ProductsCategoryNav activeCategory={category} />

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px] space-y-10">
            {series.detail ? (
              <>
                {showOverviewLayout ? (
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
                    <ProductModelGallery images={galleryImages} alt={t(series.titleKey)} />
                    <ProductOverviewPanel
                      overview={{
                        modelRangeKey: series.modelRangeKey,
                        capacityKey: series.capacityKey,
                        productLineKey: series.productLineKey,
                        descKey: series.descKey,
                      }}
                      buyUrl={getSeriesBuyUrl(series)}
                      specsPdfUrl={series.detail.specsPdfUrl}
                      specsPdfFilename={series.detail.specsPdfFilename}
                    />
                  </div>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {series.products.map((product) => (
                      <SeriesModelCard
                        key={product.id}
                        product={product}
                        productLineKey={series.productLineKey}
                        specsPdfUrl={series.detail!.specsPdfUrl}
                        specsPdfFilename={series.detail!.specsPdfFilename}
                      />
                    ))}
                  </div>
                )}

                <SeriesDetailSection detail={series.detail} />
              </>
            ) : (
              <>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
                      {t("productsCatalog.subcategory.modelsTitle")}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {t("productsCatalog.subcategory.modelsCount", {
                        count: series.products.length,
                      })}
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {series.products.map((product) => (
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

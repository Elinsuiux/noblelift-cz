"use client";

import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { ProductsCategoryNav } from "@/components/products/ProductsCategoryNav";
import { ProductModelGallery } from "@/components/products/ProductModelGallery";
import { ProductModelCard } from "@/components/products/ProductModelCard";
import { SeriesActionBar } from "@/components/products/SeriesActionBar";
import { SeriesDetailSection } from "@/components/products/SeriesDetailSection";
import { SeriesModelCard } from "@/components/products/SeriesModelCard";
import { ProductOverviewPanel } from "@/components/products/SeriesOverviewPanel";
import {
  getCategorySlug,
  getModelSlug,
  getProductBuyUrl,
  getProductGallery,
  getSeriesBuyUrl,
  getSeriesGallery,
  getSeriesSlug,
  getSubcategorySlug,
  type CatalogCategory,
  type ProductModel,
  type ProductSeries,
  type Subcategory,
} from "@/lib/products-catalog";

function ProductSeriesOverview({
  product,
  productLineKey,
  specsPdfUrl,
  specsPdfFilename,
  specsPdfUrlEn,
  specsPdfFilenameEn,
  locale,
}: {
  product: ProductModel;
  productLineKey?: string;
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
  locale: string;
}) {
  const t = useTranslations();

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
      <ProductModelGallery images={getProductGallery(product)} alt={product.model} />
      <div className="flex h-full flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-3xl font-bold tracking-tight text-noble-orange md:text-4xl">
          {product.model}
        </p>
        <p className="mt-2 text-xl font-medium text-zinc-600 md:text-2xl">{product.capacity}</p>
        <div className="mt-6 h-1 w-14 rounded-full bg-noble-orange" />
        <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
          {productLineKey ? t(productLineKey) : t(product.descriptionKey)}
        </p>
        <div className="mt-8 border-t border-zinc-100 pt-8">
          <SeriesActionBar
            buyUrl={getProductBuyUrl(product, locale)}
            specsPdfUrl={specsPdfUrl}
            specsPdfFilename={specsPdfFilename}
            specsPdfUrlEn={specsPdfUrlEn}
            specsPdfFilenameEn={specsPdfFilenameEn}
            embedded
          />
        </div>
      </div>
    </div>
  );
}

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
  const seriesSlug = getSeriesSlug(series, locale);
  const galleryImages = getSeriesGallery(series);
  const soleProduct = series.products.length === 1 ? series.products[0] : undefined;
  const showSoleProductDetailLayout = Boolean(soleProduct?.seriesDetail);
  const showOverviewLayout =
    Boolean(series.detail) &&
    !showSoleProductDetailLayout &&
    (series.products.length <= 1 || Boolean(series.preferOverviewLayout));
  const useHubModelCards =
    series.id === "walkie-bez-prizdvihem" || series.id === "walkie-s-prizdvihem";

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
            {showSoleProductDetailLayout && soleProduct?.seriesDetail ? (
              <>
                <ProductSeriesOverview
                  product={soleProduct}
                  productLineKey={series.productLineKey}
                  specsPdfUrl={
                    soleProduct.seriesDetail.specsPdfUrl ??
                    soleProduct.specsPdfUrl ??
                    series.detail?.specsPdfUrl
                  }
                  specsPdfFilename={
                    soleProduct.seriesDetail.specsPdfFilename ??
                    soleProduct.specsPdfFilename ??
                    series.detail?.specsPdfFilename
                  }
                  specsPdfUrlEn={
                    soleProduct.seriesDetail.specsPdfUrlEn ??
                    soleProduct.specsPdfUrlEn ??
                    series.detail?.specsPdfUrlEn
                  }
                  specsPdfFilenameEn={
                    soleProduct.seriesDetail.specsPdfFilenameEn ??
                    soleProduct.specsPdfFilenameEn ??
                    series.detail?.specsPdfFilenameEn
                  }
                  locale={locale}
                />
                <SeriesDetailSection detail={soleProduct.seriesDetail} />
              </>
            ) : series.detail ? (
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
                      buyUrl={getSeriesBuyUrl(series, locale)}
                      specsPdfUrl={series.detail.specsPdfUrl}
                      specsPdfFilename={series.detail.specsPdfFilename}
                      specsPdfUrlEn={series.detail.specsPdfUrlEn}
                      specsPdfFilenameEn={series.detail.specsPdfFilenameEn}
                    />
                  </div>
                ) : (
                  <div
                    className={
                      useHubModelCards
                        ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid gap-6 lg:grid-cols-2"
                    }
                  >
                    {series.products.map((product) => (
                      <SeriesModelCard
                        key={product.id}
                        product={product}
                        variant={useHubModelCards ? "hub" : "classic"}
                        productLineKey={series.productLineKey}
                        subtitleKey={series.subtitleKey}
                        useKeys={series.useKeys}
                        specsPdfUrl={
                          product.seriesDetail?.specsPdfUrl ||
                          product.specsPdfUrl ||
                          series.detail!.specsPdfUrl
                        }
                        specsPdfFilename={
                          product.seriesDetail?.specsPdfFilename ||
                          product.specsPdfFilename ||
                          series.detail!.specsPdfFilename
                        }
                        specsPdfUrlEn={
                          product.seriesDetail?.specsPdfUrlEn ||
                          product.specsPdfUrlEn ||
                          series.detail!.specsPdfUrlEn
                        }
                        specsPdfFilenameEn={
                          product.seriesDetail?.specsPdfFilenameEn ||
                          product.specsPdfFilenameEn ||
                          series.detail!.specsPdfFilenameEn
                        }
                        detailsHref={
                          product.seriesDetail
                            ? {
                                pathname:
                                  "/products/[category]/[subcategory]/[series]/[model]",
                                params: {
                                  category: categorySlug,
                                  subcategory: subcategorySlug,
                                  series: seriesSlug,
                                  model: getModelSlug(product, locale),
                                },
                              }
                            : undefined
                        }
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

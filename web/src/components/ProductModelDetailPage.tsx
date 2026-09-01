"use client";

import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductsBreadcrumb } from "@/components/products/ProductsBreadcrumb";
import { ProductsCategoryNav } from "@/components/products/ProductsCategoryNav";
import { ProductModelGallery } from "@/components/products/ProductModelGallery";
import { ProductModelSpecTable } from "@/components/products/ProductModelSpecTable";
import { SeriesActionBar } from "@/components/products/SeriesActionBar";
import { SeriesDetailSection } from "@/components/products/SeriesDetailSection";
import { Link } from "@/i18n/navigation";
import {
  getCategorySlug,
  getProductBuyUrl,
  getProductGallery,
  getSeriesSlug,
  getSubcategorySlug,
  type CatalogCategory,
  type ProductModel,
  type ProductSeries,
  type Subcategory,
} from "@/lib/products-catalog";

type BreadcrumbItem = {
  label: string;
  href?:
    | { pathname: "/products/[category]"; params: { category: string } }
    | {
        pathname: "/products/[category]/[subcategory]";
        params: { category: string; subcategory: string };
      }
    | {
        pathname: "/products/[category]/[subcategory]/[series]";
        params: { category: string; subcategory: string; series: string };
      };
};

export function ProductModelDetailPage({
  category,
  subcategory,
  series,
  product,
}: {
  category: CatalogCategory;
  subcategory: Subcategory;
  series?: ProductSeries;
  product: ProductModel;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const categorySlug = getCategorySlug(category, locale);
  const subcategorySlug = getSubcategorySlug(subcategory, locale);
  const seriesSlug = series ? getSeriesSlug(series, locale) : undefined;

  const breadcrumbItems: BreadcrumbItem[] = [
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
  ];

  if (series && seriesSlug) {
    breadcrumbItems.push({
      label: t(series.titleKey),
      href: {
        pathname: "/products/[category]/[subcategory]/[series]",
        params: { category: categorySlug, subcategory: subcategorySlug, series: seriesSlug },
      },
    });
  }

  breadcrumbItems.push({ label: product.model });

  const subtitle = product.detail ? t(product.detail.subtitleKey) : product.capacity;
  const longDesc = product.detail
    ? t(product.detail.longDescKey)
    : t(product.descriptionKey);
  const galleryImages = getProductGallery(product);
  const buyUrl = getProductBuyUrl(product, locale);
  const seriesDetail = product.seriesDetail;

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f5]">
        <section className="bg-[#1a1a1a] px-6 pb-14 pt-24 text-white">
          <div className="mx-auto w-full max-w-[1140px]">
            <ProductsBreadcrumb items={breadcrumbItems} />
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-noble-orange">
              {series ? t(series.badgeKey) : t(subcategory.badgeKey)}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-wide md:text-4xl">
              {product.model}
            </h1>
            <p className="mt-3 text-lg font-semibold text-zinc-300">{subtitle}</p>
          </div>
        </section>

        <ProductsCategoryNav activeCategory={category} />

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-[1140px] space-y-10">
            {seriesDetail ? (
              <>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
                  <ProductModelGallery images={galleryImages} alt={product.model} />
                  <div className="flex h-full flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
                    <p className="text-3xl font-bold tracking-tight text-noble-orange md:text-4xl">
                      {product.model}
                    </p>
                    <p className="mt-2 text-xl font-medium text-zinc-600 md:text-2xl">
                      {product.capacity}
                    </p>
                    <div className="mt-6 h-1 w-14 rounded-full bg-noble-orange" />
                    <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
                      {series?.productLineKey
                        ? t(series.productLineKey)
                        : t(product.descriptionKey)}
                    </p>
                    <div className="mt-8 border-t border-zinc-100 pt-8">
                      <SeriesActionBar
                        buyUrl={buyUrl}
                        specsPdfUrl={
                          seriesDetail.specsPdfUrl ??
                          product.specsPdfUrl ??
                          series?.detail?.specsPdfUrl
                        }
                        specsPdfFilename={
                          seriesDetail.specsPdfFilename ??
                          product.specsPdfFilename ??
                          series?.detail?.specsPdfFilename
                        }
                        specsPdfUrlEn={
                          seriesDetail.specsPdfUrlEn ??
                          product.specsPdfUrlEn ??
                          series?.detail?.specsPdfUrlEn
                        }
                        specsPdfFilenameEn={
                          seriesDetail.specsPdfFilenameEn ??
                          product.specsPdfFilenameEn ??
                          series?.detail?.specsPdfFilenameEn
                        }
                        embedded
                      />
                    </div>
                  </div>
                </div>
                <SeriesDetailSection detail={seriesDetail} />
              </>
            ) : (
              <>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-stretch">
                  <ProductModelGallery images={galleryImages} alt={product.model} />

                  <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
                    <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">
                      {t("productsCatalog.modelDetails.descriptionTitle")}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
                      {longDesc}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a
                        href={buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-noble-orange px-6 py-3 text-sm font-bold text-noble-orange transition hover:bg-noble-orange hover:text-white"
                      >
                        {t("productsCatalog.modelDetails.buyCta")}
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                      >
                        {t("productsCatalog.subcategory.contactCta")}
                      </Link>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                      {t("productsCatalog.modelDetails.buyNote")}
                    </p>
                  </div>
                </div>
                {product.detail ? (
                  <div>
                    <h2 className="mb-6 text-xl font-bold text-zinc-900 md:text-2xl">
                      {t("productsCatalog.modelDetails.parametersTitle")}
                    </h2>
                    <ProductModelSpecTable specRows={product.detail.specRows} />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import czMessages from "../../messages/cz.json";
import enMessages from "../../messages/en.json";
import {
  PRODUCT_CATALOG,
  type ProductModel,
  type ProductSeriesDetail,
} from "@/lib/products-catalog";
import type { SeriesDetailPdfContent } from "@/lib/series-pnqs-specs-data";
import { generatePdfFromDetailContent } from "@/lib/generate-series-detail-specs-pdf";

type MessagesTree = Record<string, unknown>;

type CatalogDetailSource = {
  id: string;
  detail: ProductSeriesDetail;
  modelRangeKey?: string;
  productLineKey?: string;
  products: readonly ProductModel[];
};

function resolveMessage(messages: MessagesTree, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as MessagesTree)[part];
    }
    return undefined;
  }, messages);

  return typeof value === "string" ? value : key;
}

export function catalogSpecsPdfUrl(id: string) {
  return `/api/documents/catalog-specs/${id}`;
}

export function catalogSpecsPdfFilename(id: string) {
  return `${id}-technicke-parametry.pdf`;
}

export function findCatalogDetailSource(id: string): CatalogDetailSource | null {
  for (const category of PRODUCT_CATALOG) {
    for (const subcategory of category.subcategories) {
      if (subcategory.id === id && subcategory.detail) {
        return {
          id: subcategory.id,
          detail: subcategory.detail,
          modelRangeKey: subcategory.modelRangeKey,
          productLineKey: subcategory.productLineKey,
          products: subcategory.products,
        };
      }

      for (const series of subcategory.series ?? []) {
        if (series.id === id && series.detail) {
          return {
            id: series.id,
            detail: series.detail,
            modelRangeKey: series.modelRangeKey,
            productLineKey: series.productLineKey,
            products: series.products,
          };
        }
      }
    }
  }

  return null;
}

export function buildCatalogDetailPdfContent(
  source: CatalogDetailSource,
  locale: "cz" | "en",
): SeriesDetailPdfContent {
  const messages = (locale === "en" ? enMessages : czMessages) as MessagesTree;
  const t = (key: string) => resolveMessage(messages, key);

  const titleBase = t(source.detail.titleKey).replace(/\s*[—–-]\s*detailní popis$/i, "").replace(
    /\s*[—–-]\s*detailed description$/i,
    "",
  );
  const specsTitle =
    locale === "en" ? "Technical parameters" : "Technické parametry";
  const featuresTitle = locale === "en" ? "Key features" : "Klíčové vlastnosti";
  const modelsTitle = locale === "en" ? "Available models" : "Modely v nabídce";
  const titleSuffix = locale === "en" ? "technical parameters" : "technické parametry";

  const modelsFromRange = source.modelRangeKey
    ? t(source.modelRangeKey)
        .split(",")
        .map((model) => model.trim())
        .filter(Boolean)
    : [];
  const modelsFromProducts = source.products.map((product) => product.model);
  const models = modelsFromRange.length > 0 ? modelsFromRange : modelsFromProducts;

  return {
    title: `${titleBase} — ${titleSuffix}`,
    subtitle: source.productLineKey ? t(source.productLineKey) : "",
    intro: t(source.detail.introKey),
    featuresTitle,
    features: source.detail.featureKeys.map((feature) => ({
      title: t(feature.titleKey),
      desc: t(feature.descKey),
    })),
    specsTitle,
    specs: source.detail.specKeys.map((spec) => ({
      label: t(spec.labelKey),
      value: t(spec.valueKey),
    })),
    modelsTitle,
    models: models.length > 0 ? models : [titleBase],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  };
}

export async function generateCatalogSpecsPdf(id: string, locale: "cz" | "en" = "cz") {
  const source = findCatalogDetailSource(id);
  if (!source) {
    return null;
  }

  return generatePdfFromDetailContent(buildCatalogDetailPdfContent(source, locale));
}

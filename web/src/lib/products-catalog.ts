import { HOME_CATEGORY_KEYS, type HomeCategoryKey } from "@/lib/products-menu";

export type CategoryId = HomeCategoryKey;

export type SubcategoryId =
  | "electric"
  | "diesel-lpg"
  | "walkie"
  | "rider"
  | "straddle"
  | "manual"
  | "powered"
  | "terrain-forklifts"
  | "telehandlers"
  | "reach-trucks"
  | "order-pickers"
  | "scissor";

export type ProductModelSpecRow = {
  labelKey: string;
  valueKey: string;
};

export type ProductModelDetail = {
  subtitleKey: string;
  longDescKey: string;
  specRows: readonly ProductModelSpecRow[];
};

export type ProductSeriesId =
  | "serie-a"
  | "serie-p"
  | "serie-n"
  | "serie-q"
  | "walkie-bez-prizdvihem"
  | "walkie-s-prizdvihem"
  | "rider-bez-prizdvihem"
  | "rider-s-prizdvihem"
  | "straddle-pse12nsl"
  | "straddle-ps16-18tsl";

export type SeriesFeatureIcon =
  | "ac-drive"
  | "battery"
  | "safety"
  | "maintenance"
  | "display"
  | "cabin"
  | "hydraulics"
  | "compact"
  | "rear-steer"
  | "tires"
  | "stability";

export type ProductSeriesDetail = {
  titleKey: string;
  introKey: string;
  featureKeys: readonly {
    icon: SeriesFeatureIcon;
    titleKey: string;
    descKey: string;
  }[];
  specKeys: readonly {
    labelKey: string;
    valueKey: string;
  }[];
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  /** Optional English brochure; used when locale is `en`. */
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
  /** Optional compact handbook extras (audience, recommend, equipment). */
  audienceTitleKey?: string;
  audienceKeys?: readonly string[];
  recommendTitleKey?: string;
  recommendWhenKeys?: readonly string[];
  recommendOtherTitleKey?: string;
  recommendOtherKeys?: readonly string[];
  equipmentTitleKey?: string;
  equipmentStandardKey?: string;
  equipmentOptionalKey?: string;
  /** When set, equipment is shown as bullet lists instead of paragraphs. */
  equipmentStandardKeys?: readonly string[];
  equipmentOptionalKeys?: readonly string[];
  argumentKey?: string;
  /** Optional side-by-side “main advantages” lists (e.g. PWB vs PTE). */
  advantagesLeftTitleKey?: string;
  advantagesLeftKeys?: readonly string[];
  advantagesRightTitleKey?: string;
  advantagesRightKeys?: readonly string[];
  /** Optional two-column capacity/model comparison (e.g. Series Q). */
  capacityCompareTitleKey?: string;
  capacityCompareLeftTitleKey?: string;
  capacityCompareRightTitleKey?: string;
  capacityCompareLeftImage?: string;
  capacityCompareRightImage?: string;
  capacityCompareRows?: readonly {
    labelKey: string;
    leftKey: string;
    rightKey: string;
  }[];
};

export type ProductModel = {
  id: string;
  slug?: { cz: string; en: string };
  model: string;
  capacity: string;
  descriptionKey: string;
  /** Optional short highlights shown under the model name. */
  highlightKey?: string;
  image: string;
  gallery?: readonly string[];
  buyUrl?: string;
  /** Optional per-model specs PDF (overrides series detail PDF on cards). */
  specsPdfUrl?: string;
  specsPdfFilename?: string;
  /** Optional English brochure; used when locale is `en`. */
  specsPdfUrlEn?: string;
  specsPdfFilenameEn?: string;
  detail?: ProductModelDetail;
  /**
   * When set, model detail page uses Serie A–style layout
   * (gallery + overview + SeriesDetailSection) and cards show “Zobrazit detaily”.
   */
  seriesDetail?: ProductSeriesDetail;
};

export type ProductSeries = {
  id: ProductSeriesId;
  slug: { cz: string; en: string };
  badgeKey: string;
  titleKey: string;
  subtitleKey: string;
  capacityKey: string;
  modelRangeKey?: string;
  productLineKey?: string;
  descKey: string;
  useKeys: readonly string[];
  letter: string;
  image: string;
  gallery?: readonly string[];
  ctaVariant: "orange" | "dark";
  products: readonly ProductModel[];
  detail?: ProductSeriesDetail;
  /** When set with detail, show gallery + overview panel instead of a multi-model card grid. */
  preferOverviewLayout?: boolean;
  buyUrl?: string;
};

export type Subcategory = {
  id: SubcategoryId;
  slug: { cz: string; en: string };
  titleKey: string;
  descKey: string;
  badgeKey: string;
  icon: "electric" | "fuel" | "walkie" | "rider" | "straddle" | "manual" | "powered" | "terrain" | "telescope" | "reach" | "picker" | "scissor" | "mast";
  ctaVariant: "orange" | "dark";
  tagKeys: readonly string[];
  products: readonly ProductModel[];
  series?: readonly ProductSeries[];
  image?: string;
  hubPageKey?: string;
  modelRangeKey?: string;
  capacityKey?: string;
  productLineKey?: string;
  gallery?: readonly string[];
  detail?: ProductSeriesDetail;
  buyUrl?: string;
};

export type CatalogCategory = {
  id: CategoryId;
  slug: { cz: string; en: string };
  image: string;
  subcategories: readonly Subcategory[];
  /** When set, category page shows an extra handbook section (e.g. stackers PSE/SWB/PS). */
  showStackersHandbook?: boolean;
};

export const VZV_SHOP_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_SERIE_A_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=CPD&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_SERIE_P_FEP38P_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/aku/?search-text=fep&type[]=1&power[]=5&sort-by=1&id-category=100&id-category=100";

export const VZV_SHOP_SERIE_N_FE3D16N1_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=FE3D&type[]=3&sort-by=1&id-category=31";

export const VZV_SHOP_SERIE_N_FE3R12E_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-fe3r-12-e-801286";

export const VZV_SHOP_SERIE_Q_FE4P50Q_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=FE4P&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_DIESEL_LPG_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/diesel/?search-text=CPCD&type[]=1&power[]=1&sort-by=1&id-category=101&id-category=101";

export const VZV_SHOP_BEZ_PRIZDVIHU_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/bez-prizdvihu/?sort-by=1&type[]=2&other[]=10&mast[]=997&id-category=10001&id-category=10001";

export const VZV_SHOP_BEZ_PRIZDVIHU_SWB130_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=SWB%20130&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_BEZ_PRIZDVIHU_PSE15LC_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=PSE%2015%20L-C&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_BEZ_PRIZDVIHU_PS16L_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=PS%2016%20L&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_BEZ_PRIZDVIHU_PS20L_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=PS%2020%20L&sort-by=1&id-category=1&id-category=1";

export const VZV_SHOP_RIDER_BEZ_PRIZDVIHU_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/bez-prizdvihu/?search-text=PS%2016%20N&type[]=2&mast[]=997&sort-by=1&id-category=10003";

export const VZV_SHOP_S_PRIZDVIHEM_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/prizdvih/?sort-by=1&type[]=2&other[]=10&mast[]=999&id-category=10002&id-category=10002";

export const VZV_SHOP_RIDER_S_PRIZDVIHEM_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/prizdvih/?sort-by=1&type[]=2&other[]=11&mast[]=999&id-category=10004&id-category=10004";

export const VZV_SHOP_RIDER_S_PRIZDVIHEM_PS16DN_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-ps-16-dn-301156";

export const VZV_SHOP_RIDER_BEZ_PRIZDVIHU_PS16N_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/bez-prizdvihu/?search-text=PS%2016%20N&type[]=2&mast[]=997&sort-by=1&id-category=10003";

export const VZV_SHOP_RIDER_BEZ_PRIZDVIHU_PS20N_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-ps-20-n-301221";

export const VZV_SHOP_OBKROCNE_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=2&other[]=12&id-category=52&id-category=52";

export const VZV_SHOP_OBKROCNE_PSE12NSL_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-pse-12-nsl-301232";

export const VZV_SHOP_OBKROCNE_PT16TSL_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-pt-16-tsl-299";

export const VZV_SHOP_OBKROCNE_PS18TSL_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-ps-18-tsl-355";

export const VZV_SHOP_PALLET_POWERED_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=4&id-category=4&id-category=4";

export const VZV_SHOP_PALLET_MANUAL_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?search-text=HPT&type[]=4&sort-by=1&id-category=4";

export const VZV_SHOP_TERRAIN_FORKLIFTS_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=6&id-category=70&id-category=70";

export const VZV_SHOP_TELEHANDLERS_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=10&id-category=5&id-category=5";

export const VZV_SHOP_REACH_TRUCKS_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=7&id-category=90&id-category=90";

export const VZV_SHOP_SCISSOR_LIFTS_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/?sort-by=1&type[]=11&id-category=7&id-category=7";

export const VZV_SHOP_ORDER_PICKERS_URL =
  "https://www.vzv.cz/cz/aktualne-skladem/voziky-skladem/nove-voziky/noblelift-oph-01e-720009";

const SERIE_A_MODEL_GALLERY = [
  "/images/products/menu/elektro-4rad.jpg",
  "/images/products/series/serie-a.jpg",
  "/images/products/subcategories/electric-forklift.png",
] as const;

const DIESEL_LPG_GALLERY = [
  "/images/products/series/cpc-d-20-38-white.png",
  "/documents/diesel-lpg/brochure-description-1.png",
  "/documents/diesel-lpg/brochure-description-2.png",
] as const;

export function getProductGallery(product: ProductModel) {
  if (product.gallery?.length) {
    return [...product.gallery];
  }

  return [product.image];
}

/** Pass VZV shop URLs through unchanged (raw type[] / other[] / mast[]). */
export function encodeVzvShopUrl(url: string) {
  return url;
}

export function getProductBuyUrl(product: ProductModel) {
  return product.buyUrl ?? VZV_SHOP_URL;
}

export function getSeriesBuyUrl(series: ProductSeries) {
  return series.buyUrl ?? VZV_SHOP_URL;
}

export function getSubcategoryBuyUrl(subcategory: Subcategory) {
  return subcategory.buyUrl ?? VZV_SHOP_URL;
}

export function getSeriesGallery(series: ProductSeries) {
  if (series.gallery?.length) {
    return [...series.gallery];
  }

  return [series.image];
}

export function getSubcategoryGallery(subcategory: Subcategory) {
  if (subcategory.gallery?.length) {
    return [...subcategory.gallery];
  }

  if (subcategory.image) {
    return [subcategory.image];
  }

  return [];
}

const FE3D_N1_SERIES_DETAIL: ProductSeriesDetail = {
  titleKey: "productsCatalog.series.fe3d.detail.title",
  introKey: "productsCatalog.series.fe3d.detail.intro",
  featureKeys: [
    {
      icon: "compact",
      titleKey: "productsCatalog.series.fe3d.detail.features.1.title",
      descKey: "productsCatalog.series.fe3d.detail.features.1.desc",
    },
    {
      icon: "ac-drive",
      titleKey: "productsCatalog.series.fe3d.detail.features.2.title",
      descKey: "productsCatalog.series.fe3d.detail.features.2.desc",
    },
    {
      icon: "battery",
      titleKey: "productsCatalog.series.fe3d.detail.features.3.title",
      descKey: "productsCatalog.series.fe3d.detail.features.3.desc",
    },
    {
      icon: "cabin",
      titleKey: "productsCatalog.series.fe3d.detail.features.4.title",
      descKey: "productsCatalog.series.fe3d.detail.features.4.desc",
    },
  ],
  specKeys: [
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.capacity.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.capacity.value",
    },
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.models.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.models.value",
    },
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.lift.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.lift.value",
    },
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.battery.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.battery.value",
    },
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.drive.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.drive.value",
    },
    {
      labelKey: "productsCatalog.series.fe3d.detail.specs.operation.label",
      valueKey: "productsCatalog.series.fe3d.detail.specs.operation.value",
    },
  ],
  specsPdfUrl: "/documents/fe3d16-20n1-technicke-parametry-cz.pdf",
  specsPdfFilename: "FE3D16-20N1-technicke-parametry.pdf",
  specsPdfUrlEn: "/documents/fe3d16-20n1-en.pdf",
  specsPdfFilenameEn: "FE3D16-20N1.pdf",
  audienceTitleKey: "productsCatalog.series.fe3d.detail.audience.title",
  audienceKeys: [
    "productsCatalog.series.fe3d.detail.audience.items.1",
    "productsCatalog.series.fe3d.detail.audience.items.2",
    "productsCatalog.series.fe3d.detail.audience.items.3",
    "productsCatalog.series.fe3d.detail.audience.items.4",
    "productsCatalog.series.fe3d.detail.audience.items.5",
    "productsCatalog.series.fe3d.detail.audience.items.6",
  ],
  advantagesLeftTitleKey: "productsCatalog.series.fe3d.detail.advantages.title",
  advantagesLeftKeys: [
    "productsCatalog.series.fe3d.detail.advantages.items.1",
    "productsCatalog.series.fe3d.detail.advantages.items.2",
    "productsCatalog.series.fe3d.detail.advantages.items.3",
    "productsCatalog.series.fe3d.detail.advantages.items.4",
    "productsCatalog.series.fe3d.detail.advantages.items.5",
    "productsCatalog.series.fe3d.detail.advantages.items.6",
    "productsCatalog.series.fe3d.detail.advantages.items.7",
  ],
  advantagesRightTitleKey: "productsCatalog.series.fe3d.detail.benefits.title",
  advantagesRightKeys: [
    "productsCatalog.series.fe3d.detail.benefits.items.1",
    "productsCatalog.series.fe3d.detail.benefits.items.2",
    "productsCatalog.series.fe3d.detail.benefits.items.3",
  ],
  recommendTitleKey: "productsCatalog.series.fe3d.detail.recommend.whenTitle",
  recommendWhenKeys: [
    "productsCatalog.series.fe3d.detail.recommend.when.1",
    "productsCatalog.series.fe3d.detail.recommend.when.2",
    "productsCatalog.series.fe3d.detail.recommend.when.3",
    "productsCatalog.series.fe3d.detail.recommend.when.4",
    "productsCatalog.series.fe3d.detail.recommend.when.5",
  ],
  recommendOtherTitleKey: "productsCatalog.series.fe3d.detail.recommend.otherTitle",
  recommendOtherKeys: [
    "productsCatalog.series.fe3d.detail.recommend.other.1",
    "productsCatalog.series.fe3d.detail.recommend.other.2",
    "productsCatalog.series.fe3d.detail.recommend.other.3",
  ],
  equipmentTitleKey: "productsCatalog.series.fe3d.detail.equipment.title",
  equipmentStandardKey: "productsCatalog.series.fe3d.detail.equipment.standard",
  equipmentOptionalKey: "productsCatalog.series.fe3d.detail.equipment.optional",
  argumentKey: "productsCatalog.series.fe3d.detail.argument",
};

const FE3R12E_SERIES_DETAIL: ProductSeriesDetail = {
  titleKey: "productsCatalog.series.fe3r12e.detail.title",
  introKey: "productsCatalog.series.fe3r12e.detail.intro",
  featureKeys: [
    {
      icon: "compact",
      titleKey: "productsCatalog.series.fe3r12e.detail.features.1.title",
      descKey: "productsCatalog.series.fe3r12e.detail.features.1.desc",
    },
    {
      icon: "battery",
      titleKey: "productsCatalog.series.fe3r12e.detail.features.2.title",
      descKey: "productsCatalog.series.fe3r12e.detail.features.2.desc",
    },
    {
      icon: "rear-steer",
      titleKey: "productsCatalog.series.fe3r12e.detail.features.3.title",
      descKey: "productsCatalog.series.fe3r12e.detail.features.3.desc",
    },
    {
      icon: "ac-drive",
      titleKey: "productsCatalog.series.fe3r12e.detail.features.4.title",
      descKey: "productsCatalog.series.fe3r12e.detail.features.4.desc",
    },
  ],
  specKeys: [
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.capacity.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.capacity.value",
    },
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.lift.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.lift.value",
    },
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.battery.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.battery.value",
    },
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.width.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.width.value",
    },
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.turning.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.turning.value",
    },
    {
      labelKey: "productsCatalog.series.fe3r12e.detail.specs.operation.label",
      valueKey: "productsCatalog.series.fe3r12e.detail.specs.operation.value",
    },
  ],
  specsPdfUrl: "/documents/fe3r12e-en.pdf",
  specsPdfFilename: "FE3R12E.pdf",
  specsPdfUrlEn: "/documents/fe3r12e-en.pdf",
  specsPdfFilenameEn: "FE3R12E.pdf",
  audienceTitleKey: "productsCatalog.series.fe3r12e.detail.audience.title",
  audienceKeys: [
    "productsCatalog.series.fe3r12e.detail.audience.items.1",
    "productsCatalog.series.fe3r12e.detail.audience.items.2",
    "productsCatalog.series.fe3r12e.detail.audience.items.3",
    "productsCatalog.series.fe3r12e.detail.audience.items.4",
    "productsCatalog.series.fe3r12e.detail.audience.items.5",
    "productsCatalog.series.fe3r12e.detail.audience.items.6",
    "productsCatalog.series.fe3r12e.detail.audience.items.7",
  ],
  advantagesLeftTitleKey: "productsCatalog.series.fe3r12e.detail.advantages.title",
  advantagesLeftKeys: [
    "productsCatalog.series.fe3r12e.detail.advantages.items.1",
    "productsCatalog.series.fe3r12e.detail.advantages.items.2",
    "productsCatalog.series.fe3r12e.detail.advantages.items.3",
    "productsCatalog.series.fe3r12e.detail.advantages.items.4",
    "productsCatalog.series.fe3r12e.detail.advantages.items.5",
    "productsCatalog.series.fe3r12e.detail.advantages.items.6",
    "productsCatalog.series.fe3r12e.detail.advantages.items.7",
    "productsCatalog.series.fe3r12e.detail.advantages.items.8",
  ],
  advantagesRightTitleKey: "productsCatalog.series.fe3r12e.detail.benefits.title",
  advantagesRightKeys: [
    "productsCatalog.series.fe3r12e.detail.benefits.items.1",
    "productsCatalog.series.fe3r12e.detail.benefits.items.2",
    "productsCatalog.series.fe3r12e.detail.benefits.items.3",
  ],
  recommendTitleKey: "productsCatalog.series.fe3r12e.detail.recommend.whenTitle",
  recommendWhenKeys: [
    "productsCatalog.series.fe3r12e.detail.recommend.when.1",
    "productsCatalog.series.fe3r12e.detail.recommend.when.2",
    "productsCatalog.series.fe3r12e.detail.recommend.when.3",
    "productsCatalog.series.fe3r12e.detail.recommend.when.4",
    "productsCatalog.series.fe3r12e.detail.recommend.when.5",
  ],
  recommendOtherTitleKey: "productsCatalog.series.fe3r12e.detail.recommend.otherTitle",
  recommendOtherKeys: [
    "productsCatalog.series.fe3r12e.detail.recommend.other.1",
    "productsCatalog.series.fe3r12e.detail.recommend.other.2",
    "productsCatalog.series.fe3r12e.detail.recommend.other.3",
  ],
  equipmentTitleKey: "productsCatalog.series.fe3r12e.detail.equipment.title",
  equipmentStandardKey: "productsCatalog.series.fe3r12e.detail.equipment.standard",
  equipmentOptionalKey: "productsCatalog.series.fe3r12e.detail.equipment.optional",
  argumentKey: "productsCatalog.series.fe3r12e.detail.argument",
};

const ELECTRIC_FORKLIFT_PRODUCTS: ProductModel[] = [
  {
    id: "fe3d",
    slug: { cz: "fe3d16n1-fe3d20n1", en: "fe3d16n1-fe3d20n1" },
    model: "FE3D16N1 – FE3D20N1",
    capacity: "1600–2000 kg",
    descriptionKey: "productsCatalog.models.fe3d",
    highlightKey: "productsCatalog.models.fe3d16Highlight",
    image: "/images/products/series/fe3d16n1.png",
    buyUrl: VZV_SHOP_SERIE_N_FE3D16N1_URL,
    specsPdfUrl: "/documents/fe3d16-20n1-technicke-parametry-cz.pdf",
    specsPdfFilename: "FE3D16-20N1-technicke-parametry.pdf",
    specsPdfUrlEn: "/documents/fe3d16-20n1-en.pdf",
    specsPdfFilenameEn: "FE3D16-20N1.pdf",
    seriesDetail: FE3D_N1_SERIES_DETAIL,
  },
  {
    id: "fe3r12e",
    slug: { cz: "fe3r-12-e", en: "fe3r-12-e" },
    model: "FE3R 12 E",
    capacity: "1200 kg",
    descriptionKey: "productsCatalog.models.fe3r12e",
    highlightKey: "productsCatalog.models.fe3r12eHighlight",
    image: "/images/products/series/fe3r12e.png",
    buyUrl: VZV_SHOP_SERIE_N_FE3R12E_URL,
    specsPdfUrl: "/documents/fe3r12e-en.pdf",
    specsPdfFilename: "FE3R12E.pdf",
    specsPdfUrlEn: "/documents/fe3r12e-en.pdf",
    specsPdfFilenameEn: "FE3R12E.pdf",
    seriesDetail: FE3R12E_SERIES_DETAIL,
  },
  {
    id: "fe3d16",
    model: "FE3D16N1",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.fe3d16",
    highlightKey: "productsCatalog.models.fe3d16Highlight",
    image: "/images/products/series/fe3d16n1.png",
    buyUrl: VZV_SHOP_SERIE_N_FE3D16N1_URL,
  },
  {
    id: "fe3d18",
    model: "FE3D18N1",
    capacity: "1800 kg",
    descriptionKey: "productsCatalog.models.fe3d18",
    image: "/images/products/menu/elektro-3rad.jpg",
    buyUrl: VZV_SHOP_SERIE_N_FE3D16N1_URL,
  },
  {
    id: "fe3d20",
    model: "FE3D20N1",
    capacity: "2000 kg",
    descriptionKey: "productsCatalog.models.fe3d20",
    highlightKey: "productsCatalog.models.fe3d20Highlight",
    image: "/images/products/series/fe3d20n1.png",
    buyUrl: VZV_SHOP_SERIE_N_FE3D16N1_URL,
  },
  {
    id: "fe4p",
    model: "FE4P16/18/20N-V2",
    capacity: "1600/1800/2000 kg",
    descriptionKey: "productsCatalog.models.fe4p",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4p16",
    model: "FE4P16N-V2",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.fe4p16",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4p18",
    model: "FE4P18N-V2",
    capacity: "1800 kg",
    descriptionKey: "productsCatalog.models.fe4p18",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4p20",
    model: "FE4P20N-V2",
    capacity: "2000 kg",
    descriptionKey: "productsCatalog.models.fe4p20",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4p30",
    model: "FE4P30N-V2",
    capacity: "3000 kg",
    descriptionKey: "productsCatalog.models.fe4p30",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4a",
    model: "FE4D16/18/20N",
    capacity: "1600/1800/2000 kg",
    descriptionKey: "productsCatalog.models.fe4a",
    image: "/images/products/menu/elektro-4rad.jpg",
  },
  {
    id: "fe4d16",
    model: "FE4D16N",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.fe4d16",
    image: "/images/products/menu/elektro-4rad.jpg",
    gallery: SERIE_A_MODEL_GALLERY,
    detail: {
      subtitleKey: "productsCatalog.modelDetails.fe4d16.subtitle",
      longDescKey: "productsCatalog.modelDetails.fe4d16.longDesc",
      specRows: [
        { labelKey: "productsCatalog.modelDetails.common.specs.capacity.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.capacity.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.weight.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.weight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftHeight.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.liftHeight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.length.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.length.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.width.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.width.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSize.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.forkSize.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSpread.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.forkSpread.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.turningRadius.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.turningRadius.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.travelSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.travelSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.liftSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.motor.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.motor.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.battery.label", valueKey: "productsCatalog.modelDetails.fe4d16.specs.battery.value" },
      ],
    },
  },
  {
    id: "fe4d18",
    model: "FE4D18N",
    capacity: "1800 kg",
    descriptionKey: "productsCatalog.models.fe4d18",
    image: "/images/products/menu/elektro-4rad.jpg",
    gallery: SERIE_A_MODEL_GALLERY,
    detail: {
      subtitleKey: "productsCatalog.modelDetails.fe4d18.subtitle",
      longDescKey: "productsCatalog.modelDetails.fe4d18.longDesc",
      specRows: [
        { labelKey: "productsCatalog.modelDetails.common.specs.capacity.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.capacity.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.weight.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.weight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftHeight.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.liftHeight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.length.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.length.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.width.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.width.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSize.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.forkSize.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSpread.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.forkSpread.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.turningRadius.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.turningRadius.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.travelSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.travelSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.liftSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.motor.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.motor.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.battery.label", valueKey: "productsCatalog.modelDetails.fe4d18.specs.battery.value" },
      ],
    },
  },
  {
    id: "fe4d20",
    model: "FE4D20N",
    capacity: "2000 kg",
    descriptionKey: "productsCatalog.models.fe4d20",
    image: "/images/products/menu/elektro-4rad.jpg",
    gallery: SERIE_A_MODEL_GALLERY,
    detail: {
      subtitleKey: "productsCatalog.modelDetails.fe4d20.subtitle",
      longDescKey: "productsCatalog.modelDetails.fe4d20.longDesc",
      specRows: [
        { labelKey: "productsCatalog.modelDetails.common.specs.capacity.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.capacity.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.weight.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.weight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftHeight.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.liftHeight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.length.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.length.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.width.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.width.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSize.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.forkSize.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSpread.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.forkSpread.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.turningRadius.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.turningRadius.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.travelSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.travelSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.liftSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.motor.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.motor.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.battery.label", valueKey: "productsCatalog.modelDetails.fe4d20.specs.battery.value" },
      ],
    },
  },
  {
    id: "fe4d25",
    model: "FE4D25N",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.fe4d25",
    image: "/images/products/menu/elektro-4rad.jpg",
    gallery: SERIE_A_MODEL_GALLERY,
    detail: {
      subtitleKey: "productsCatalog.modelDetails.fe4d25.subtitle",
      longDescKey: "productsCatalog.modelDetails.fe4d25.longDesc",
      specRows: [
        { labelKey: "productsCatalog.modelDetails.common.specs.capacity.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.capacity.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.weight.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.weight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftHeight.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.liftHeight.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.length.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.length.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.width.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.width.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSize.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.forkSize.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.forkSpread.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.forkSpread.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.turningRadius.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.turningRadius.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.travelSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.travelSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.liftSpeed.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.liftSpeed.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.motor.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.motor.value" },
        { labelKey: "productsCatalog.modelDetails.common.specs.battery.label", valueKey: "productsCatalog.modelDetails.fe4d25.specs.battery.value" },
      ],
    },
  },
  {
    id: "fe4q",
    model: "FE4D50T",
    capacity: "5000 kg",
    descriptionKey: "productsCatalog.models.fe4q",
    image: "/images/home/categories/1.jpg",
  },
  {
    id: "fe4q60",
    model: "FE4D60T",
    capacity: "6000 kg",
    descriptionKey: "productsCatalog.models.fe4q60",
    image: "/images/home/categories/1.jpg",
  },
  {
    id: "fe4q80",
    model: "FE4D80T",
    capacity: "8000 kg",
    descriptionKey: "productsCatalog.models.fe4q80",
    image: "/images/home/categories/1.jpg",
  },
];

const ELECTRIC_FORKLIFT_SERIES: ProductSeries[] = [
  {
    id: "serie-a",
    slug: { cz: "serie-a", en: "series-a" },
    badgeKey: "productsCatalog.series.serieA.badge",
    titleKey: "productsCatalog.series.serieA.title",
    subtitleKey: "productsCatalog.series.serieA.subtitle",
    capacityKey: "productsCatalog.series.serieA.capacity",
    modelRangeKey: "productsCatalog.series.serieA.modelRange",
    productLineKey: "productsCatalog.series.serieA.productLine",
    descKey: "productsCatalog.series.serieA.desc",
    useKeys: [
      "productsCatalog.series.serieA.uses.1",
      "productsCatalog.series.serieA.uses.2",
      "productsCatalog.series.serieA.uses.3",
    ],
    letter: "A",
    image: "/images/products/series/serie-a.jpg",
    gallery: SERIE_A_MODEL_GALLERY,
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_SERIE_A_URL,
    preferOverviewLayout: true,
    products: [
      ELECTRIC_FORKLIFT_PRODUCTS[10]!,
      ELECTRIC_FORKLIFT_PRODUCTS[11]!,
      ELECTRIC_FORKLIFT_PRODUCTS[12]!,
      ELECTRIC_FORKLIFT_PRODUCTS[13]!,
    ],
    detail: {
      titleKey: "productsCatalog.series.serieA.detail.title",
      introKey: "productsCatalog.series.serieA.detail.intro",
      featureKeys: [
        {
          icon: "stability",
          titleKey: "productsCatalog.series.serieA.detail.features.1.title",
          descKey: "productsCatalog.series.serieA.detail.features.1.desc",
        },
        {
          icon: "battery",
          titleKey: "productsCatalog.series.serieA.detail.features.2.title",
          descKey: "productsCatalog.series.serieA.detail.features.2.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.series.serieA.detail.features.3.title",
          descKey: "productsCatalog.series.serieA.detail.features.3.desc",
        },
        {
          icon: "cabin",
          titleKey: "productsCatalog.series.serieA.detail.features.4.title",
          descKey: "productsCatalog.series.serieA.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.capacity.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.models.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.models.value",
        },
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.battery.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.lift.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.drive.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.drive.value",
        },
        {
          labelKey: "productsCatalog.series.serieA.detail.specs.operation.label",
          valueKey: "productsCatalog.series.serieA.detail.specs.operation.value",
        },
      ],
      specsPdfUrl: "/api/documents/serie-a-technicke-parametry",
      specsPdfFilename: "CPD-18-38-A2-technicke-parametry.pdf",
      audienceTitleKey: "productsCatalog.series.serieA.detail.audience.title",
      audienceKeys: [
        "productsCatalog.series.serieA.detail.audience.items.1",
        "productsCatalog.series.serieA.detail.audience.items.2",
        "productsCatalog.series.serieA.detail.audience.items.3",
        "productsCatalog.series.serieA.detail.audience.items.4",
        "productsCatalog.series.serieA.detail.audience.items.5",
        "productsCatalog.series.serieA.detail.audience.items.6",
      ],
      recommendTitleKey: "productsCatalog.series.serieA.detail.recommend.whenTitle",
      recommendWhenKeys: [
        "productsCatalog.series.serieA.detail.recommend.when.1",
        "productsCatalog.series.serieA.detail.recommend.when.2",
        "productsCatalog.series.serieA.detail.recommend.when.3",
        "productsCatalog.series.serieA.detail.recommend.when.4",
        "productsCatalog.series.serieA.detail.recommend.when.5",
      ],
      recommendOtherTitleKey: "productsCatalog.series.serieA.detail.recommend.otherTitle",
      recommendOtherKeys: [
        "productsCatalog.series.serieA.detail.recommend.other.1",
        "productsCatalog.series.serieA.detail.recommend.other.2",
      ],
      equipmentTitleKey: "productsCatalog.series.serieA.detail.equipment.title",
      equipmentStandardKey: "productsCatalog.series.serieA.detail.equipment.standard",
      equipmentOptionalKey: "productsCatalog.series.serieA.detail.equipment.optional",
      argumentKey: "productsCatalog.series.serieA.detail.argument",
    },
  },
  {
    id: "serie-p",
    slug: { cz: "serie-p", en: "series-p" },
    badgeKey: "productsCatalog.series.serieP.badge",
    titleKey: "productsCatalog.series.serieP.title",
    subtitleKey: "productsCatalog.series.serieP.subtitle",
    capacityKey: "productsCatalog.series.serieP.capacity",
    modelRangeKey: "productsCatalog.series.serieP.modelRange",
    productLineKey: "productsCatalog.series.serieP.productLine",
    descKey: "productsCatalog.series.serieP.desc",
    useKeys: [
      "productsCatalog.series.serieP.uses.1",
      "productsCatalog.series.serieP.uses.2",
      "productsCatalog.series.serieP.uses.3",
    ],
    letter: "P",
    image: "/images/products/series/serie-p.png",
    ctaVariant: "dark",
    buyUrl: VZV_SHOP_SERIE_P_FEP38P_URL,
    preferOverviewLayout: true,
    products: [
      ELECTRIC_FORKLIFT_PRODUCTS[5]!,
      ELECTRIC_FORKLIFT_PRODUCTS[6]!,
      ELECTRIC_FORKLIFT_PRODUCTS[7]!,
      ELECTRIC_FORKLIFT_PRODUCTS[8]!,
    ],
    detail: {
      titleKey: "productsCatalog.series.serieP.detail.title",
      introKey: "productsCatalog.series.serieP.detail.intro",
      featureKeys: [
        {
          icon: "hydraulics",
          titleKey: "productsCatalog.series.serieP.detail.features.1.title",
          descKey: "productsCatalog.series.serieP.detail.features.1.desc",
        },
        {
          icon: "battery",
          titleKey: "productsCatalog.series.serieP.detail.features.2.title",
          descKey: "productsCatalog.series.serieP.detail.features.2.desc",
        },
        {
          icon: "cabin",
          titleKey: "productsCatalog.series.serieP.detail.features.3.title",
          descKey: "productsCatalog.series.serieP.detail.features.3.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.series.serieP.detail.features.4.title",
          descKey: "productsCatalog.series.serieP.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.capacity.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.models.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.models.value",
        },
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.battery.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.lift.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.control.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.control.value",
        },
        {
          labelKey: "productsCatalog.series.serieP.detail.specs.operation.label",
          valueKey: "productsCatalog.series.serieP.detail.specs.operation.value",
        },
      ],
      specsPdfUrl: "/api/documents/serie-p-technicke-parametry",
      specsPdfFilename: "FEP-30-38P-technicke-parametry.pdf",
      audienceTitleKey: "productsCatalog.series.serieP.detail.audience.title",
      audienceKeys: [
        "productsCatalog.series.serieP.detail.audience.items.1",
        "productsCatalog.series.serieP.detail.audience.items.2",
        "productsCatalog.series.serieP.detail.audience.items.3",
        "productsCatalog.series.serieP.detail.audience.items.4",
        "productsCatalog.series.serieP.detail.audience.items.5",
        "productsCatalog.series.serieP.detail.audience.items.6",
      ],
      recommendTitleKey: "productsCatalog.series.serieP.detail.recommend.whenTitle",
      recommendWhenKeys: [
        "productsCatalog.series.serieP.detail.recommend.when.1",
        "productsCatalog.series.serieP.detail.recommend.when.2",
        "productsCatalog.series.serieP.detail.recommend.when.3",
        "productsCatalog.series.serieP.detail.recommend.when.4",
        "productsCatalog.series.serieP.detail.recommend.when.5",
      ],
      recommendOtherTitleKey: "productsCatalog.series.serieP.detail.recommend.otherTitle",
      recommendOtherKeys: [
        "productsCatalog.series.serieP.detail.recommend.other.1",
        "productsCatalog.series.serieP.detail.recommend.other.2",
      ],
      equipmentTitleKey: "productsCatalog.series.serieP.detail.equipment.title",
      equipmentStandardKey: "productsCatalog.series.serieP.detail.equipment.standard",
      equipmentOptionalKey: "productsCatalog.series.serieP.detail.equipment.optional",
      argumentKey: "productsCatalog.series.serieP.detail.argument",
    },
  },
  {
    id: "serie-n",
    slug: { cz: "serie-n", en: "series-n" },
    badgeKey: "productsCatalog.series.serieN.badge",
    titleKey: "productsCatalog.series.serieN.title",
    subtitleKey: "productsCatalog.series.serieN.subtitle",
    capacityKey: "productsCatalog.series.serieN.capacity",
    modelRangeKey: "productsCatalog.series.serieN.modelRange",
    productLineKey: "productsCatalog.series.serieN.productLine",
    descKey: "productsCatalog.series.serieN.desc",
    useKeys: [
      "productsCatalog.series.serieN.uses.1",
      "productsCatalog.series.serieN.uses.2",
      "productsCatalog.series.serieN.uses.3",
    ],
    letter: "N",
    image: "/images/products/series/serie-n.png",
    gallery: ["/images/products/series/serie-n.png"],
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_SERIE_N_FE3D16N1_URL,
    products: [
      ELECTRIC_FORKLIFT_PRODUCTS.find((p) => p.id === "fe3d")!,
      ELECTRIC_FORKLIFT_PRODUCTS.find((p) => p.id === "fe3r12e")!,
    ],
    detail: {
      titleKey: "productsCatalog.series.serieN.detail.title",
      introKey: "productsCatalog.series.serieN.detail.intro",
      featureKeys: [
        {
          icon: "compact",
          titleKey: "productsCatalog.series.serieN.detail.features.1.title",
          descKey: "productsCatalog.series.serieN.detail.features.1.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.series.serieN.detail.features.2.title",
          descKey: "productsCatalog.series.serieN.detail.features.2.desc",
        },
        {
          icon: "battery",
          titleKey: "productsCatalog.series.serieN.detail.features.3.title",
          descKey: "productsCatalog.series.serieN.detail.features.3.desc",
        },
        {
          icon: "cabin",
          titleKey: "productsCatalog.series.serieN.detail.features.4.title",
          descKey: "productsCatalog.series.serieN.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.capacity.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.wheels.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.wheels.value",
        },
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.battery.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.models.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.models.value",
        },
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.lift.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.series.serieN.detail.specs.operation.label",
          valueKey: "productsCatalog.series.serieN.detail.specs.operation.value",
        },
      ],
      specsPdfUrl: "/api/documents/serie-n-technicke-parametry",
      specsPdfFilename: "serie-n-technicke-parametry.pdf",
      specsPdfUrlEn: "/documents/fe3d16-20n1-en.pdf",
      specsPdfFilenameEn: "FE3D16-20N1.pdf",
      audienceTitleKey: "productsCatalog.series.serieN.detail.audience.title",
      audienceKeys: [
        "productsCatalog.series.serieN.detail.audience.items.1",
        "productsCatalog.series.serieN.detail.audience.items.2",
        "productsCatalog.series.serieN.detail.audience.items.3",
        "productsCatalog.series.serieN.detail.audience.items.4",
        "productsCatalog.series.serieN.detail.audience.items.5",
      ],
      recommendTitleKey: "productsCatalog.series.serieN.detail.recommend.whenTitle",
      recommendWhenKeys: [
        "productsCatalog.series.serieN.detail.recommend.when.1",
        "productsCatalog.series.serieN.detail.recommend.when.2",
        "productsCatalog.series.serieN.detail.recommend.when.3",
        "productsCatalog.series.serieN.detail.recommend.when.4",
        "productsCatalog.series.serieN.detail.recommend.when.5",
      ],
      recommendOtherTitleKey: "productsCatalog.series.serieN.detail.recommend.otherTitle",
      recommendOtherKeys: [
        "productsCatalog.series.serieN.detail.recommend.other.1",
        "productsCatalog.series.serieN.detail.recommend.other.2",
        "productsCatalog.series.serieN.detail.recommend.other.3",
      ],
      equipmentTitleKey: "productsCatalog.series.serieN.detail.equipment.title",
      equipmentStandardKey: "productsCatalog.series.serieN.detail.equipment.standard",
      equipmentOptionalKey: "productsCatalog.series.serieN.detail.equipment.optional",
      argumentKey: "productsCatalog.series.serieN.detail.argument",
    },
  },
  {
    id: "serie-q",
    slug: { cz: "serie-q", en: "series-q" },
    badgeKey: "productsCatalog.series.serieQ.badge",
    titleKey: "productsCatalog.series.serieQ.title",
    subtitleKey: "productsCatalog.series.serieQ.subtitle",
    capacityKey: "productsCatalog.series.serieQ.capacity",
    modelRangeKey: "productsCatalog.series.serieQ.modelRange",
    productLineKey: "productsCatalog.series.serieQ.productLine",
    descKey: "productsCatalog.series.serieQ.desc",
    useKeys: [
      "productsCatalog.series.serieQ.uses.1",
      "productsCatalog.series.serieQ.uses.2",
      "productsCatalog.series.serieQ.uses.3",
    ],
    letter: "Q",
    image: "/images/products/series/serie-q-fe4p-50.png",
    gallery: ["/images/products/series/serie-q-fe4p-50.png"],
    ctaVariant: "dark",
    buyUrl: VZV_SHOP_SERIE_Q_FE4P50Q_URL,
    preferOverviewLayout: true,
    products: [
      ELECTRIC_FORKLIFT_PRODUCTS[14]!,
      ELECTRIC_FORKLIFT_PRODUCTS[15]!,
      ELECTRIC_FORKLIFT_PRODUCTS[16]!,
    ],
    detail: {
      titleKey: "productsCatalog.series.serieQ.detail.title",
      introKey: "productsCatalog.series.serieQ.detail.intro",
      featureKeys: [
        {
          icon: "stability",
          titleKey: "productsCatalog.series.serieQ.detail.features.1.title",
          descKey: "productsCatalog.series.serieQ.detail.features.1.desc",
        },
        {
          icon: "compact",
          titleKey: "productsCatalog.series.serieQ.detail.features.2.title",
          descKey: "productsCatalog.series.serieQ.detail.features.2.desc",
        },
        {
          icon: "battery",
          titleKey: "productsCatalog.series.serieQ.detail.features.3.title",
          descKey: "productsCatalog.series.serieQ.detail.features.3.desc",
        },
        {
          icon: "hydraulics",
          titleKey: "productsCatalog.series.serieQ.detail.features.4.title",
          descKey: "productsCatalog.series.serieQ.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.capacity.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.models.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.models.value",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.battery.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.lift.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.control.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.control.value",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.specs.operation.label",
          valueKey: "productsCatalog.series.serieQ.detail.specs.operation.value",
        },
      ],
      specsPdfUrl: "/documents/fe4p16-20q-q2-en.pdf",
      specsPdfFilename: "FE4P16-20Q-Q2.pdf",
      specsPdfUrlEn: "/documents/fe4p16-20q-q2-en.pdf",
      specsPdfFilenameEn: "FE4P16-20Q-Q2.pdf",
      capacityCompareTitleKey: "productsCatalog.series.serieQ.detail.capacityCompare.title",
      capacityCompareLeftTitleKey: "productsCatalog.series.serieQ.detail.capacityCompare.leftTitle",
      capacityCompareRightTitleKey: "productsCatalog.series.serieQ.detail.capacityCompare.rightTitle",
      capacityCompareRows: [
        {
          labelKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.1.label",
          leftKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.1.left",
          rightKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.1.right",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.2.label",
          leftKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.2.left",
          rightKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.2.right",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.3.label",
          leftKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.3.left",
          rightKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.3.right",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.4.label",
          leftKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.4.left",
          rightKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.4.right",
        },
        {
          labelKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.5.label",
          leftKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.5.left",
          rightKey: "productsCatalog.series.serieQ.detail.capacityCompare.rows.5.right",
        },
      ],
      audienceTitleKey: "productsCatalog.series.serieQ.detail.audience.title",
      audienceKeys: [
        "productsCatalog.series.serieQ.detail.audience.items.1",
        "productsCatalog.series.serieQ.detail.audience.items.2",
        "productsCatalog.series.serieQ.detail.audience.items.3",
        "productsCatalog.series.serieQ.detail.audience.items.4",
        "productsCatalog.series.serieQ.detail.audience.items.5",
      ],
      recommendTitleKey: "productsCatalog.series.serieQ.detail.recommend.whenTitle",
      recommendWhenKeys: [
        "productsCatalog.series.serieQ.detail.recommend.when.1",
        "productsCatalog.series.serieQ.detail.recommend.when.2",
        "productsCatalog.series.serieQ.detail.recommend.when.3",
        "productsCatalog.series.serieQ.detail.recommend.when.4",
        "productsCatalog.series.serieQ.detail.recommend.when.5",
      ],
      recommendOtherTitleKey: "productsCatalog.series.serieQ.detail.recommend.otherTitle",
      recommendOtherKeys: [
        "productsCatalog.series.serieQ.detail.recommend.other.1",
        "productsCatalog.series.serieQ.detail.recommend.other.2",
      ],
      equipmentTitleKey: "productsCatalog.series.serieQ.detail.equipment.title",
      equipmentStandardKey: "productsCatalog.series.serieQ.detail.equipment.standard",
      equipmentOptionalKey: "productsCatalog.series.serieQ.detail.equipment.optional",
      argumentKey: "productsCatalog.series.serieQ.detail.argument",
    },
  },
];

const DIESEL_FORKLIFT_PRODUCTS: ProductModel[] = [
  {
    id: "fd30",
    model: "FD30T",
    capacity: "3000 kg",
    descriptionKey: "productsCatalog.models.fd30",
    image: "/images/home/categories/1.jpg",
  },
  {
    id: "fd50",
    model: "FD50T",
    capacity: "5000 kg",
    descriptionKey: "productsCatalog.models.fd50",
    image: "/images/home/categories/1.jpg",
  },
];

const SWB_SERIES_DETAIL: ProductSeriesDetail = {
  titleKey: "productsCatalog.series.swb.detail.title",
  introKey: "productsCatalog.series.swb.detail.intro",
  featureKeys: [
    {
      icon: "battery",
      titleKey: "productsCatalog.series.swb.detail.features.1.title",
      descKey: "productsCatalog.series.swb.detail.features.1.desc",
    },
    {
      icon: "stability",
      titleKey: "productsCatalog.series.swb.detail.features.2.title",
      descKey: "productsCatalog.series.swb.detail.features.2.desc",
    },
    {
      icon: "compact",
      titleKey: "productsCatalog.series.swb.detail.features.3.title",
      descKey: "productsCatalog.series.swb.detail.features.3.desc",
    },
    {
      icon: "safety",
      titleKey: "productsCatalog.series.swb.detail.features.4.title",
      descKey: "productsCatalog.series.swb.detail.features.4.desc",
    },
  ],
  specKeys: [
    {
      labelKey: "productsCatalog.series.swb.detail.specs.capacity.label",
      valueKey: "productsCatalog.series.swb.detail.specs.capacity.value",
    },
    {
      labelKey: "productsCatalog.series.swb.detail.specs.models.label",
      valueKey: "productsCatalog.series.swb.detail.specs.models.value",
    },
    {
      labelKey: "productsCatalog.series.swb.detail.specs.battery.label",
      valueKey: "productsCatalog.series.swb.detail.specs.battery.value",
    },
    {
      labelKey: "productsCatalog.series.swb.detail.specs.lift.label",
      valueKey: "productsCatalog.series.swb.detail.specs.lift.value",
    },
    {
      labelKey: "productsCatalog.series.swb.detail.specs.drive.label",
      valueKey: "productsCatalog.series.swb.detail.specs.drive.value",
    },
    {
      labelKey: "productsCatalog.series.swb.detail.specs.operation.label",
      valueKey: "productsCatalog.series.swb.detail.specs.operation.value",
    },
  ],
  audienceTitleKey: "productsCatalog.series.swb.detail.audience.title",
  audienceKeys: [
    "productsCatalog.series.swb.detail.audience.items.1",
    "productsCatalog.series.swb.detail.audience.items.2",
    "productsCatalog.series.swb.detail.audience.items.3",
    "productsCatalog.series.swb.detail.audience.items.4",
  ],
  advantagesLeftTitleKey: "productsCatalog.series.swb.detail.advantages.title",
  advantagesLeftKeys: [
    "productsCatalog.series.swb.detail.advantages.items.1",
    "productsCatalog.series.swb.detail.advantages.items.2",
    "productsCatalog.series.swb.detail.advantages.items.3",
    "productsCatalog.series.swb.detail.advantages.items.4",
    "productsCatalog.series.swb.detail.advantages.items.5",
    "productsCatalog.series.swb.detail.advantages.items.6",
    "productsCatalog.series.swb.detail.advantages.items.7",
  ],
  advantagesRightTitleKey: "productsCatalog.series.swb.detail.initialLift.title",
  advantagesRightKeys: [
    "productsCatalog.series.swb.detail.initialLift.items.1",
    "productsCatalog.series.swb.detail.initialLift.items.2",
    "productsCatalog.series.swb.detail.initialLift.items.3",
    "productsCatalog.series.swb.detail.initialLift.items.4",
  ],
  capacityCompareTitleKey: "productsCatalog.series.swb.detail.compare.title",
  capacityCompareLeftTitleKey: "productsCatalog.series.swb.detail.compare.leftTitle",
  capacityCompareRightTitleKey: "productsCatalog.series.swb.detail.compare.rightTitle",
  capacityCompareLeftImage: "/images/products/stackers/bez-prizdvihem.png",
  capacityCompareRightImage: "/images/products/stackers/s-prizdvihem.png",
  capacityCompareRows: [
    {
      labelKey: "productsCatalog.series.swb.detail.compare.rows.1.label",
      leftKey: "productsCatalog.series.swb.detail.compare.rows.1.left",
      rightKey: "productsCatalog.series.swb.detail.compare.rows.1.right",
    },
  ],
  argumentKey: "productsCatalog.series.swb.detail.argument",
  specsPdfUrl: "/api/documents/swb-130-technicke-parametry",
  specsPdfFilename: "SWB-130-130D-technicke-parametry.pdf",
  specsPdfUrlEn: "/documents/swb-130-130d-en.pdf",
  specsPdfFilenameEn: "SWB-130-130S-130D.pdf",
};

const PSE_SERIES_DETAIL: ProductSeriesDetail = {
  titleKey: "productsCatalog.series.pse.detail.title",
  introKey: "productsCatalog.series.pse.detail.intro",
  featureKeys: [
    {
      icon: "maintenance",
      titleKey: "productsCatalog.series.pse.detail.features.1.title",
      descKey: "productsCatalog.series.pse.detail.features.1.desc",
    },
    {
      icon: "compact",
      titleKey: "productsCatalog.series.pse.detail.features.2.title",
      descKey: "productsCatalog.series.pse.detail.features.2.desc",
    },
    {
      icon: "ac-drive",
      titleKey: "productsCatalog.series.pse.detail.features.3.title",
      descKey: "productsCatalog.series.pse.detail.features.3.desc",
    },
    {
      icon: "cabin",
      titleKey: "productsCatalog.series.pse.detail.features.4.title",
      descKey: "productsCatalog.series.pse.detail.features.4.desc",
    },
  ],
  specKeys: [
    {
      labelKey: "productsCatalog.series.pse.detail.specs.capacity.label",
      valueKey: "productsCatalog.series.pse.detail.specs.capacity.value",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.specs.models.label",
      valueKey: "productsCatalog.series.pse.detail.specs.models.value",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.specs.battery.label",
      valueKey: "productsCatalog.series.pse.detail.specs.battery.value",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.specs.lift.label",
      valueKey: "productsCatalog.series.pse.detail.specs.lift.value",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.specs.drive.label",
      valueKey: "productsCatalog.series.pse.detail.specs.drive.value",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.specs.operation.label",
      valueKey: "productsCatalog.series.pse.detail.specs.operation.value",
    },
  ],
  audienceTitleKey: "productsCatalog.series.pse.detail.audience.title",
  audienceKeys: [
    "productsCatalog.series.pse.detail.audience.items.1",
    "productsCatalog.series.pse.detail.audience.items.2",
    "productsCatalog.series.pse.detail.audience.items.3",
    "productsCatalog.series.pse.detail.audience.items.4",
    "productsCatalog.series.pse.detail.audience.items.5",
  ],
  advantagesLeftTitleKey: "productsCatalog.series.pse.detail.advantages.title",
  advantagesLeftKeys: [
    "productsCatalog.series.pse.detail.advantages.items.1",
    "productsCatalog.series.pse.detail.advantages.items.2",
    "productsCatalog.series.pse.detail.advantages.items.3",
    "productsCatalog.series.pse.detail.advantages.items.4",
    "productsCatalog.series.pse.detail.advantages.items.5",
    "productsCatalog.series.pse.detail.advantages.items.6",
    "productsCatalog.series.pse.detail.advantages.items.7",
    "productsCatalog.series.pse.detail.advantages.items.8",
  ],
  advantagesRightTitleKey: "productsCatalog.series.pse.detail.overview.title",
  advantagesRightKeys: [
    "productsCatalog.series.pse.detail.overview.items.1",
    "productsCatalog.series.pse.detail.overview.items.2",
    "productsCatalog.series.pse.detail.overview.items.3",
    "productsCatalog.series.pse.detail.overview.items.4",
    "productsCatalog.series.pse.detail.overview.items.5",
  ],
  capacityCompareTitleKey: "productsCatalog.series.pse.detail.compare.title",
  capacityCompareLeftTitleKey: "productsCatalog.series.pse.detail.compare.leftTitle",
  capacityCompareRightTitleKey: "productsCatalog.series.pse.detail.compare.rightTitle",
  capacityCompareLeftImage: "/images/products/stackers/s-prizdvihem.png",
  capacityCompareRightImage: "/images/products/stackers/bez-prizdvihem.png",
  capacityCompareRows: [
    {
      labelKey: "productsCatalog.series.pse.detail.compare.rows.1.label",
      leftKey: "productsCatalog.series.pse.detail.compare.rows.1.left",
      rightKey: "productsCatalog.series.pse.detail.compare.rows.1.right",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.compare.rows.2.label",
      leftKey: "productsCatalog.series.pse.detail.compare.rows.2.left",
      rightKey: "productsCatalog.series.pse.detail.compare.rows.2.right",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.compare.rows.3.label",
      leftKey: "productsCatalog.series.pse.detail.compare.rows.3.left",
      rightKey: "productsCatalog.series.pse.detail.compare.rows.3.right",
    },
    {
      labelKey: "productsCatalog.series.pse.detail.compare.rows.4.label",
      leftKey: "productsCatalog.series.pse.detail.compare.rows.4.left",
      rightKey: "productsCatalog.series.pse.detail.compare.rows.4.right",
    },
  ],
  argumentKey: "productsCatalog.series.pse.detail.argument",
};

const PS_SERIES_DETAIL: ProductSeriesDetail = {
  titleKey: "productsCatalog.series.ps.detail.title",
  introKey: "productsCatalog.series.ps.detail.intro",
  featureKeys: [
    {
      icon: "hydraulics",
      titleKey: "productsCatalog.series.ps.detail.features.1.title",
      descKey: "productsCatalog.series.ps.detail.features.1.desc",
    },
    {
      icon: "stability",
      titleKey: "productsCatalog.series.ps.detail.features.2.title",
      descKey: "productsCatalog.series.ps.detail.features.2.desc",
    },
    {
      icon: "ac-drive",
      titleKey: "productsCatalog.series.ps.detail.features.3.title",
      descKey: "productsCatalog.series.ps.detail.features.3.desc",
    },
    {
      icon: "maintenance",
      titleKey: "productsCatalog.series.ps.detail.features.4.title",
      descKey: "productsCatalog.series.ps.detail.features.4.desc",
    },
  ],
  specKeys: [
    {
      labelKey: "productsCatalog.series.ps.detail.specs.capacity.label",
      valueKey: "productsCatalog.series.ps.detail.specs.capacity.value",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.specs.models.label",
      valueKey: "productsCatalog.series.ps.detail.specs.models.value",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.specs.battery.label",
      valueKey: "productsCatalog.series.ps.detail.specs.battery.value",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.specs.lift.label",
      valueKey: "productsCatalog.series.ps.detail.specs.lift.value",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.specs.drive.label",
      valueKey: "productsCatalog.series.ps.detail.specs.drive.value",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.specs.operation.label",
      valueKey: "productsCatalog.series.ps.detail.specs.operation.value",
    },
  ],
  audienceTitleKey: "productsCatalog.series.ps.detail.audience.title",
  audienceKeys: [
    "productsCatalog.series.ps.detail.audience.items.1",
    "productsCatalog.series.ps.detail.audience.items.2",
    "productsCatalog.series.ps.detail.audience.items.3",
    "productsCatalog.series.ps.detail.audience.items.4",
    "productsCatalog.series.ps.detail.audience.items.5",
  ],
  advantagesLeftTitleKey: "productsCatalog.series.ps.detail.advantages.title",
  advantagesLeftKeys: [
    "productsCatalog.series.ps.detail.advantages.items.1",
    "productsCatalog.series.ps.detail.advantages.items.2",
    "productsCatalog.series.ps.detail.advantages.items.3",
    "productsCatalog.series.ps.detail.advantages.items.4",
    "productsCatalog.series.ps.detail.advantages.items.5",
    "productsCatalog.series.ps.detail.advantages.items.6",
  ],
  advantagesRightTitleKey: "productsCatalog.series.ps.detail.legend.title",
  advantagesRightKeys: [
    "productsCatalog.series.ps.detail.legend.items.1",
    "productsCatalog.series.ps.detail.legend.items.2",
    "productsCatalog.series.ps.detail.legend.items.3",
    "productsCatalog.series.ps.detail.legend.items.4",
  ],
  recommendTitleKey: "productsCatalog.series.ps.detail.recommend.title",
  recommendWhenKeys: [
    "productsCatalog.series.ps.detail.recommend.items.1",
    "productsCatalog.series.ps.detail.recommend.items.2",
    "productsCatalog.series.ps.detail.recommend.items.3",
    "productsCatalog.series.ps.detail.recommend.items.4",
  ],
  capacityCompareTitleKey: "productsCatalog.series.ps.detail.compare.title",
  capacityCompareLeftTitleKey: "productsCatalog.series.ps.detail.compare.leftTitle",
  capacityCompareRightTitleKey: "productsCatalog.series.ps.detail.compare.rightTitle",
  capacityCompareRows: [
    {
      labelKey: "productsCatalog.series.ps.detail.compare.rows.1.label",
      leftKey: "productsCatalog.series.ps.detail.compare.rows.1.left",
      rightKey: "productsCatalog.series.ps.detail.compare.rows.1.right",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.compare.rows.2.label",
      leftKey: "productsCatalog.series.ps.detail.compare.rows.2.left",
      rightKey: "productsCatalog.series.ps.detail.compare.rows.2.right",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.compare.rows.3.label",
      leftKey: "productsCatalog.series.ps.detail.compare.rows.3.left",
      rightKey: "productsCatalog.series.ps.detail.compare.rows.3.right",
    },
    {
      labelKey: "productsCatalog.series.ps.detail.compare.rows.4.label",
      leftKey: "productsCatalog.series.ps.detail.compare.rows.4.left",
      rightKey: "productsCatalog.series.ps.detail.compare.rows.4.right",
    },
  ],
  argumentKey: "productsCatalog.series.ps.detail.argument",
};

const STACKER_WALKIE_BEZ_PRIZDVIHU_PRODUCTS: ProductModel[] = [
  {
    id: "swb130",
    model: "SWB 130",
    capacity: "1300 kg",
    descriptionKey: "productsCatalog.models.swb130",
    image: "/images/products/stackers/bez-prizdvihem.png",
    buyUrl: VZV_SHOP_BEZ_PRIZDVIHU_SWB130_URL,
    seriesDetail: SWB_SERIES_DETAIL,
    specsPdfUrl: "/api/documents/swb-130-technicke-parametry",
    specsPdfFilename: "SWB-130-130D-technicke-parametry.pdf",
    specsPdfUrlEn: "/documents/swb-130-130d-en.pdf",
    specsPdfFilenameEn: "SWB-130-130S-130D.pdf",
  },
  {
    id: "pse15lc",
    model: "PSE 15 L-C",
    capacity: "1500 kg",
    descriptionKey: "productsCatalog.models.pse15lc",
    image: "/images/products/stackers/bez-prizdvihem.png",
    buyUrl: VZV_SHOP_BEZ_PRIZDVIHU_PSE15LC_URL,
    seriesDetail: PSE_SERIES_DETAIL,
    specsPdfUrl: "/documents/pse10-15l-c-en.pdf",
    specsPdfFilename: "PSE10-15L-C.pdf",
    specsPdfUrlEn: "/documents/pse10-15l-c-en.pdf",
    specsPdfFilenameEn: "PSE10-15L-C.pdf",
  },
  {
    id: "ps16l",
    model: "PS 16 L – PS 20 L",
    capacity: "1600 – 2000 kg",
    descriptionKey: "productsCatalog.models.ps16l",
    image: "/images/products/stackers/bez-prizdvihem.png",
    buyUrl: VZV_SHOP_BEZ_PRIZDVIHU_PS16L_URL,
    seriesDetail: PS_SERIES_DETAIL,
    specsPdfUrl: "/documents/ps12-20l-ps12-16dl-en.pdf",
    specsPdfFilename: "PS12-20L-PS12-16DL.pdf",
    specsPdfUrlEn: "/documents/ps12-20l-ps12-16dl-en.pdf",
    specsPdfFilenameEn: "PS12-20L-PS12-16DL.pdf",
  },
];

const STACKER_WALKIE_S_PRIZDVIHEM_PRODUCTS: ProductModel[] = [
  {
    id: "pse12nd",
    model: "PSE 12 ND",
    capacity: "1200 kg",
    descriptionKey: "productsCatalog.models.pse12nd",
    image: "/images/products/stackers/s-prizdvihem.png",
    buyUrl: VZV_SHOP_S_PRIZDVIHEM_URL,
    seriesDetail: PSE_SERIES_DETAIL,
    specsPdfUrl: "/documents/pse12nd-en.pdf",
    specsPdfFilename: "PSE12ND.pdf",
    specsPdfUrlEn: "/documents/pse12nd-en.pdf",
    specsPdfFilenameEn: "PSE12ND.pdf",
  },
  {
    id: "swb130d",
    model: "SWB 130 D",
    capacity: "1300 kg",
    descriptionKey: "productsCatalog.models.swb130d",
    image: "/images/products/stackers/s-prizdvihem.png",
    buyUrl: VZV_SHOP_S_PRIZDVIHEM_URL,
    seriesDetail: SWB_SERIES_DETAIL,
    specsPdfUrl: "/api/documents/swb-130-technicke-parametry",
    specsPdfFilename: "SWB-130-130D-technicke-parametry.pdf",
    specsPdfUrlEn: "/documents/swb-130-130d-en.pdf",
    specsPdfFilenameEn: "SWB-130-130S-130D.pdf",
  },
  {
    id: "ps16dl",
    model: "PS 16 DL",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.ps16dl",
    image: "/images/products/stackers/s-prizdvihem.png",
    buyUrl: VZV_SHOP_S_PRIZDVIHEM_URL,
    seriesDetail: PS_SERIES_DETAIL,
    specsPdfUrl: "/documents/ps12-20l-ps12-16dl-en.pdf",
    specsPdfFilename: "PS12-20L-PS12-16DL.pdf",
    specsPdfUrlEn: "/documents/ps12-20l-ps12-16dl-en.pdf",
    specsPdfFilenameEn: "PS12-20L-PS12-16DL.pdf",
  },
];

const STACKER_WALKIE_PRODUCTS: ProductModel[] = [
  ...STACKER_WALKIE_BEZ_PRIZDVIHU_PRODUCTS,
  ...STACKER_WALKIE_S_PRIZDVIHEM_PRODUCTS,
];

const STACKER_WALKIE_VARIANTS: ProductSeries[] = [
  {
    id: "walkie-bez-prizdvihem",
    slug: { cz: "bez-prizdvihem", en: "without-initial-lift" },
    badgeKey: "productsCatalog.stackerVariants.bezPrizdvihem.badge",
    titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.title",
    subtitleKey: "productsCatalog.stackerVariants.bezPrizdvihem.subtitle",
    capacityKey: "productsCatalog.stackerVariants.bezPrizdvihem.capacity",
    modelRangeKey: "productsCatalog.stackerVariants.bezPrizdvihem.modelRange",
    productLineKey: "productsCatalog.stackerVariants.bezPrizdvihem.productLine",
    descKey: "productsCatalog.stackerVariants.bezPrizdvihem.desc",
    useKeys: [
      "productsCatalog.stackerVariants.bezPrizdvihem.uses.1",
      "productsCatalog.stackerVariants.bezPrizdvihem.uses.2",
      "productsCatalog.stackerVariants.bezPrizdvihem.uses.3",
    ],
    letter: "B",
    image: "/images/products/stackers/bez-prizdvihem.png",
    gallery: ["/images/products/stackers/bez-prizdvihem.png"],
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_BEZ_PRIZDVIHU_URL,
    products: STACKER_WALKIE_BEZ_PRIZDVIHU_PRODUCTS,
    detail: {
      titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.title",
      introKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.intro",
      featureKeys: [
        {
          icon: "compact",
          titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.1.title",
          descKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.1.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.2.title",
          descKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.2.desc",
        },
        {
          icon: "safety",
          titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.3.title",
          descKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.3.desc",
        },
        {
          icon: "maintenance",
          titleKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.4.title",
          descKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.capacity.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.drive.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.drive.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.lift.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.battery.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.operation.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.operation.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.type.label",
          valueKey: "productsCatalog.stackerVariants.bezPrizdvihem.detail.specs.type.value",
        },
      ],
      specsPdfUrl: "/api/documents/catalog-specs/walkie-bez-prizdvihem",
      specsPdfFilename: "walkie-bez-prizdvihem-technicke-parametry.pdf",
    },
  },
  {
    id: "walkie-s-prizdvihem",
    slug: { cz: "s-prizdvihem", en: "with-initial-lift" },
    badgeKey: "productsCatalog.stackerVariants.sPrizdvihem.badge",
    titleKey: "productsCatalog.stackerVariants.sPrizdvihem.title",
    subtitleKey: "productsCatalog.stackerVariants.sPrizdvihem.subtitle",
    capacityKey: "productsCatalog.stackerVariants.sPrizdvihem.capacity",
    modelRangeKey: "productsCatalog.stackerVariants.sPrizdvihem.modelRange",
    productLineKey: "productsCatalog.stackerVariants.sPrizdvihem.productLine",
    descKey: "productsCatalog.stackerVariants.sPrizdvihem.desc",
    useKeys: [
      "productsCatalog.stackerVariants.sPrizdvihem.uses.1",
      "productsCatalog.stackerVariants.sPrizdvihem.uses.2",
      "productsCatalog.stackerVariants.sPrizdvihem.uses.3",
    ],
    letter: "P",
    image: "/images/products/stackers/s-prizdvihem.png",
    gallery: ["/images/products/stackers/s-prizdvihem.png"],
    ctaVariant: "dark",
    buyUrl: VZV_SHOP_S_PRIZDVIHEM_URL,
    products: STACKER_WALKIE_S_PRIZDVIHEM_PRODUCTS,
    detail: {
      titleKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.title",
      introKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.intro",
      featureKeys: [
        {
          icon: "hydraulics",
          titleKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.1.title",
          descKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.1.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.2.title",
          descKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.2.desc",
        },
        {
          icon: "stability",
          titleKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.3.title",
          descKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.3.desc",
        },
        {
          icon: "maintenance",
          titleKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.4.title",
          descKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.capacity.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.drive.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.drive.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.lift.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.battery.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.operation.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.operation.value",
        },
        {
          labelKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.type.label",
          valueKey: "productsCatalog.stackerVariants.sPrizdvihem.detail.specs.type.value",
        },
      ],
      specsPdfUrl: "/api/documents/catalog-specs/walkie-s-prizdvihem",
      specsPdfFilename: "walkie-s-prizdvihem-technicke-parametry.pdf",
    },
  },
];

const STACKER_RIDER_BEZ_PRIZDVIHU_PRODUCTS: ProductModel[] = [
  {
    id: "ps16n",
    model: "PS 16 N – PS 20 N",
    capacity: "1,6 – 2,0 t",
    descriptionKey: "productsCatalog.models.ps16n",
    image: "/images/products/stackers/s-plosinou-product.png",
    buyUrl: VZV_SHOP_RIDER_BEZ_PRIZDVIHU_PS16N_URL,
    seriesDetail: PS_SERIES_DETAIL,
    specsPdfUrl: "/documents/ps12-20n-ps16dn-en.pdf",
    specsPdfFilename: "PS12-20N-PS16DN.pdf",
    specsPdfUrlEn: "/documents/ps12-20n-ps16dn-en.pdf",
    specsPdfFilenameEn: "PS12-20N-PS16DN.pdf",
  },
];

const STACKER_RIDER_S_PRIZDVIHEM_PRODUCTS: ProductModel[] = [
  {
    id: "ps16dn",
    model: "PS 16 DN",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.ps16dn",
    image: "/images/products/stackers/s-plosinou-s-prizdvihem.png",
    buyUrl: VZV_SHOP_RIDER_S_PRIZDVIHEM_PS16DN_URL,
    seriesDetail: PS_SERIES_DETAIL,
    specsPdfUrl: "/documents/ps12-20n-ps16dn-en.pdf",
    specsPdfFilename: "PS12-20N-PS16DN.pdf",
    specsPdfUrlEn: "/documents/ps12-20n-ps16dn-en.pdf",
    specsPdfFilenameEn: "PS12-20N-PS16DN.pdf",
  },
];

const STACKER_RIDER_PRODUCTS: ProductModel[] = [
  ...STACKER_RIDER_BEZ_PRIZDVIHU_PRODUCTS,
  ...STACKER_RIDER_S_PRIZDVIHEM_PRODUCTS,
];

const STACKER_RIDER_VARIANTS: ProductSeries[] = [
  {
    id: "rider-bez-prizdvihem",
    slug: { cz: "bez-prizdvihem", en: "without-initial-lift" },
    badgeKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.badge",
    titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.title",
    subtitleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.subtitle",
    capacityKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.capacity",
    modelRangeKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.modelRange",
    productLineKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.productLine",
    descKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.desc",
    useKeys: [
      "productsCatalog.stackerRiderVariants.bezPrizdvihem.uses.1",
      "productsCatalog.stackerRiderVariants.bezPrizdvihem.uses.2",
      "productsCatalog.stackerRiderVariants.bezPrizdvihem.uses.3",
    ],
    letter: "B",
    image: "/images/products/stackers/s-plosinou-product.png",
    gallery: ["/images/products/stackers/s-plosinou-product.png"],
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_RIDER_BEZ_PRIZDVIHU_URL,
    products: STACKER_RIDER_BEZ_PRIZDVIHU_PRODUCTS,
    detail: {
      titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.title",
      introKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.intro",
      featureKeys: [
        {
          icon: "cabin",
          titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.1.title",
          descKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.1.desc",
        },
        {
          icon: "ac-drive",
          titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.2.title",
          descKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.2.desc",
        },
        {
          icon: "stability",
          titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.3.title",
          descKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.3.desc",
        },
        {
          icon: "maintenance",
          titleKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.4.title",
          descKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.capacity.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.drive.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.drive.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.lift.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.battery.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.operation.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.operation.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.type.label",
          valueKey: "productsCatalog.stackerRiderVariants.bezPrizdvihem.detail.specs.type.value",
        },
      ],
      specsPdfUrl: "/api/documents/catalog-specs/rider-bez-prizdvihem",
      specsPdfFilename: "rider-bez-prizdvihem-technicke-parametry.pdf",
    },
  },
  {
    id: "rider-s-prizdvihem",
    slug: { cz: "s-prizdvihem", en: "with-initial-lift" },
    badgeKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.badge",
    titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.title",
    subtitleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.subtitle",
    capacityKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.capacity",
    modelRangeKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.modelRange",
    productLineKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.productLine",
    descKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.desc",
    useKeys: [
      "productsCatalog.stackerRiderVariants.sPrizdvihem.uses.1",
      "productsCatalog.stackerRiderVariants.sPrizdvihem.uses.2",
      "productsCatalog.stackerRiderVariants.sPrizdvihem.uses.3",
    ],
    letter: "P",
    image: "/images/products/stackers/s-plosinou-s-prizdvihem.png",
    gallery: ["/images/products/stackers/s-plosinou-s-prizdvihem.png"],
    ctaVariant: "dark",
    buyUrl: VZV_SHOP_RIDER_S_PRIZDVIHEM_PS16DN_URL,
    products: STACKER_RIDER_S_PRIZDVIHEM_PRODUCTS,
    detail: {
      titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.title",
      introKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.intro",
      featureKeys: [
        {
          icon: "hydraulics",
          titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.1.title",
          descKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.1.desc",
        },
        {
          icon: "cabin",
          titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.2.title",
          descKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.2.desc",
        },
        {
          icon: "stability",
          titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.3.title",
          descKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.3.desc",
        },
        {
          icon: "maintenance",
          titleKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.4.title",
          descKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.features.4.desc",
        },
      ],
      specKeys: [
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.capacity.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.capacity.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.drive.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.drive.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.lift.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.lift.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.battery.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.battery.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.operation.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.operation.value",
        },
        {
          labelKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.type.label",
          valueKey: "productsCatalog.stackerRiderVariants.sPrizdvihem.detail.specs.type.value",
        },
      ],
      specsPdfUrl: "/api/documents/catalog-specs/rider-s-prizdvihem",
      specsPdfFilename: "rider-s-prizdvihem-technicke-parametry.pdf",
    },
  },
];

const STACKER_STRADDLE_PSE12NSL: ProductModel = {
  id: "pse12nsl",
  model: "PSE 12 NSL",
  capacity: "1200 kg",
  descriptionKey: "productsCatalog.models.pse12nsl",
  image: "/images/products/stackers/obkrocne.png",
  buyUrl: VZV_SHOP_OBKROCNE_PSE12NSL_URL,
  specsPdfUrl: "/documents/pse12nd-en.pdf",
  specsPdfFilename: "PSE12ND.pdf",
  specsPdfUrlEn: "/documents/pse12nd-en.pdf",
  specsPdfFilenameEn: "PSE12ND.pdf",
};

const STACKER_STRADDLE_PS16_18TSL: ProductModel = {
  id: "ps16-18tsl",
  model: "PS 16 TSL – PS 18 TSL",
  capacity: "1600 – 1800 kg",
  descriptionKey: "productsCatalog.models.ps16tsl",
  image: "/images/products/stackers/obkrocne-pt-ps.png",
  buyUrl: VZV_SHOP_OBKROCNE_PS18TSL_URL,
  specsPdfUrl: "/documents/ps16-18-tsl-en.pdf",
  specsPdfFilename: "Noblelift-PS16-18-TSL.pdf",
  specsPdfUrlEn: "/documents/ps16-18-tsl-en.pdf",
  specsPdfFilenameEn: "Noblelift-PS16-18-TSL.pdf",
};

const STACKER_STRADDLE_PRODUCTS: ProductModel[] = [
  STACKER_STRADDLE_PSE12NSL,
  STACKER_STRADDLE_PS16_18TSL,
];

const STACKER_STRADDLE_DETAIL_FEATURES = [
  {
    icon: "stability" as const,
    titleKey: "productsCatalog.stackerStraddle.detail.features.1.title",
    descKey: "productsCatalog.stackerStraddle.detail.features.1.desc",
  },
  {
    icon: "ac-drive" as const,
    titleKey: "productsCatalog.stackerStraddle.detail.features.2.title",
    descKey: "productsCatalog.stackerStraddle.detail.features.2.desc",
  },
  {
    icon: "cabin" as const,
    titleKey: "productsCatalog.stackerStraddle.detail.features.3.title",
    descKey: "productsCatalog.stackerStraddle.detail.features.3.desc",
  },
  {
    icon: "maintenance" as const,
    titleKey: "productsCatalog.stackerStraddle.detail.features.4.title",
    descKey: "productsCatalog.stackerStraddle.detail.features.4.desc",
  },
];

function createStraddleSeriesDetail(capacityValueKey: string): ProductSeriesDetail {
  return {
    titleKey: "productsCatalog.stackerStraddle.detail.title",
    introKey: "productsCatalog.stackerStraddle.detail.intro",
    featureKeys: STACKER_STRADDLE_DETAIL_FEATURES,
    specKeys: [
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.capacity.label",
        valueKey: capacityValueKey,
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.drive.label",
        valueKey: "productsCatalog.stackerStraddle.detail.specs.drive.value",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.lift.label",
        valueKey: "productsCatalog.stackerStraddle.detail.specs.lift.value",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.battery.label",
        valueKey: "productsCatalog.stackerStraddle.detail.specs.battery.value",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.operation.label",
        valueKey: "productsCatalog.stackerStraddle.detail.specs.operation.value",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.specs.type.label",
        valueKey: "productsCatalog.stackerStraddle.detail.specs.type.value",
      },
    ],
    specsPdfUrl: "/api/documents/catalog-specs/straddle",
    specsPdfFilename: "straddle-technicke-parametry.pdf",
    audienceTitleKey: "productsCatalog.stackerStraddle.detail.audience.title",
    audienceKeys: [
      "productsCatalog.stackerStraddle.detail.audience.items.1",
      "productsCatalog.stackerStraddle.detail.audience.items.2",
      "productsCatalog.stackerStraddle.detail.audience.items.3",
      "productsCatalog.stackerStraddle.detail.audience.items.4",
      "productsCatalog.stackerStraddle.detail.audience.items.5",
    ],
    advantagesLeftTitleKey: "productsCatalog.stackerStraddle.detail.advantages.title",
    advantagesLeftKeys: [
      "productsCatalog.stackerStraddle.detail.advantages.items.1",
      "productsCatalog.stackerStraddle.detail.advantages.items.2",
      "productsCatalog.stackerStraddle.detail.advantages.items.3",
      "productsCatalog.stackerStraddle.detail.advantages.items.4",
    ],
    capacityCompareTitleKey: "productsCatalog.stackerStraddle.detail.compare.title",
    capacityCompareLeftTitleKey: "productsCatalog.stackerStraddle.detail.compare.leftTitle",
    capacityCompareRightTitleKey: "productsCatalog.stackerStraddle.detail.compare.rightTitle",
    capacityCompareLeftImage: "/images/products/stackers/obkrocne.png",
    capacityCompareRightImage: "/images/products/stackers/obkrocne-pt-ps.png",
    capacityCompareRows: [
      {
        labelKey: "productsCatalog.stackerStraddle.detail.compare.rows.1.label",
        leftKey: "productsCatalog.stackerStraddle.detail.compare.rows.1.left",
        rightKey: "productsCatalog.stackerStraddle.detail.compare.rows.1.right",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.compare.rows.2.label",
        leftKey: "productsCatalog.stackerStraddle.detail.compare.rows.2.left",
        rightKey: "productsCatalog.stackerStraddle.detail.compare.rows.2.right",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.compare.rows.3.label",
        leftKey: "productsCatalog.stackerStraddle.detail.compare.rows.3.left",
        rightKey: "productsCatalog.stackerStraddle.detail.compare.rows.3.right",
      },
      {
        labelKey: "productsCatalog.stackerStraddle.detail.compare.rows.4.label",
        leftKey: "productsCatalog.stackerStraddle.detail.compare.rows.4.left",
        rightKey: "productsCatalog.stackerStraddle.detail.compare.rows.4.right",
      },
    ],
  };
}

const STACKER_STRADDLE_VARIANTS: ProductSeries[] = [
  {
    id: "straddle-pse12nsl",
    slug: { cz: "pse-12-nsl", en: "pse-12-nsl" },
    badgeKey: "productsCatalog.stackerStraddleModels.pse12nsl.badge",
    titleKey: "productsCatalog.stackerStraddleModels.pse12nsl.title",
    subtitleKey: "productsCatalog.stackerStraddleModels.pse12nsl.subtitle",
    capacityKey: "productsCatalog.stackerStraddleModels.pse12nsl.capacity",
    modelRangeKey: "productsCatalog.stackerStraddleModels.pse12nsl.modelRange",
    productLineKey: "productsCatalog.stackerStraddleModels.pse12nsl.productLine",
    descKey: "productsCatalog.stackerStraddleModels.pse12nsl.desc",
    useKeys: [
      "productsCatalog.stackerStraddleModels.pse12nsl.uses.1",
      "productsCatalog.stackerStraddleModels.pse12nsl.uses.2",
      "productsCatalog.stackerStraddleModels.pse12nsl.uses.3",
    ],
    letter: "O",
    image: "/images/products/stackers/obkrocne.png",
    gallery: ["/images/products/stackers/obkrocne.png"],
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_OBKROCNE_PSE12NSL_URL,
    products: [STACKER_STRADDLE_PSE12NSL],
    detail: {
      ...createStraddleSeriesDetail(
        "productsCatalog.stackerStraddleModels.pse12nsl.capacity",
      ),
      specsPdfUrl: "/documents/pse12nd-en.pdf",
      specsPdfFilename: "PSE12ND.pdf",
      specsPdfUrlEn: "/documents/pse12nd-en.pdf",
      specsPdfFilenameEn: "PSE12ND.pdf",
    },
  },
  {
    id: "straddle-ps16-18tsl",
    slug: { cz: "ps-16-18-tsl", en: "ps-16-18-tsl" },
    badgeKey: "productsCatalog.stackerStraddleModels.ps16tsl.badge",
    titleKey: "productsCatalog.stackerStraddleModels.ps16tsl.title",
    subtitleKey: "productsCatalog.stackerStraddleModels.ps16tsl.subtitle",
    capacityKey: "productsCatalog.stackerStraddleModels.ps16tsl.capacity",
    modelRangeKey: "productsCatalog.stackerStraddleModels.ps16tsl.modelRange",
    productLineKey: "productsCatalog.stackerStraddleModels.ps16tsl.productLine",
    descKey: "productsCatalog.stackerStraddleModels.ps16tsl.desc",
    useKeys: [
      "productsCatalog.stackerStraddleModels.ps16tsl.uses.1",
      "productsCatalog.stackerStraddleModels.ps16tsl.uses.2",
      "productsCatalog.stackerStraddleModels.ps16tsl.uses.3",
    ],
    letter: "O",
    image: "/images/products/stackers/obkrocne-pt-ps.png",
    gallery: ["/images/products/stackers/obkrocne-pt-ps.png"],
    ctaVariant: "orange",
    buyUrl: VZV_SHOP_OBKROCNE_PS18TSL_URL,
    products: [STACKER_STRADDLE_PS16_18TSL],
    detail: {
      ...createStraddleSeriesDetail(
        "productsCatalog.stackerStraddleModels.ps16tsl.capacity",
      ),
      specsPdfUrl: "/documents/ps16-18-tsl-en.pdf",
      specsPdfFilename: "Noblelift-PS16-18-TSL.pdf",
      specsPdfUrlEn: "/documents/ps16-18-tsl-en.pdf",
      specsPdfFilenameEn: "Noblelift-PS16-18-TSL.pdf",
    },
  },
];

const PALLET_MANUAL_PRODUCTS: ProductModel[] = [
  {
    id: "hptdf25",
    model: "HPT DF 25",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.hptdf25",
    image: "/images/products/pallet/manual-hand-clean.png",
    buyUrl: VZV_SHOP_PALLET_MANUAL_URL,
  },
  {
    id: "hptacy25",
    model: "HPT ACY 25",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.hptacy25",
    image: "/images/products/pallet/manual-hand-clean.png",
    buyUrl: VZV_SHOP_PALLET_MANUAL_URL,
  },
];

const PALLET_POWERED_PRODUCTS: ProductModel[] = [
  {
    id: "pwb150",
    model: "PWB 150",
    capacity: "1500 kg",
    descriptionKey: "productsCatalog.models.pwb150",
    image: "/images/products/pallet/pwb-avant.png",
    buyUrl: VZV_SHOP_PALLET_POWERED_URL,
  },
  {
    id: "pte15q2",
    model: "PTE 15 Q2",
    capacity: "1500 kg",
    descriptionKey: "productsCatalog.models.pte15q2",
    image: "/images/products/pallet/pte-atom-2.png",
    buyUrl: VZV_SHOP_PALLET_POWERED_URL,
  },
  {
    id: "pwb200",
    model: "PWB 200",
    capacity: "2000 kg",
    descriptionKey: "productsCatalog.models.pwb200",
    image: "/images/products/pallet/pwb-avant.png",
    buyUrl: VZV_SHOP_PALLET_POWERED_URL,
  },
  {
    id: "pte15nsc",
    model: "PTE 15N SC",
    capacity: "1500 kg",
    descriptionKey: "productsCatalog.models.pte15nsc",
    image: "/images/products/pallet/pte-atom-2.png",
    buyUrl: VZV_SHOP_PALLET_POWERED_URL,
  },
  {
    id: "pte15q2sc",
    model: "PTE 15 Q2SC",
    capacity: "1500 kg",
    descriptionKey: "productsCatalog.models.pte15q2sc",
    image: "/images/products/pallet/pte-atom-2.png",
    buyUrl: VZV_SHOP_PALLET_POWERED_URL,
  },
];

const TERRAIN_PRODUCTS: ProductModel[] = [
  {
    id: "fd4-rt25",
    model: "FD4 RT25",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.rt25",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
  {
    id: "fd4-rt35",
    model: "FD4 RT35",
    capacity: "3500 kg",
    descriptionKey: "productsCatalog.models.rt35",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
  {
    id: "fd2-rt25",
    model: "FD2 RT25",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.rt25",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
  {
    id: "fd2-rt35ku",
    model: "FD2 RT35KU",
    capacity: "3500 kg",
    descriptionKey: "productsCatalog.models.rt35",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
  {
    id: "fd2-rt35",
    model: "FD2 RT35",
    capacity: "3500 kg",
    descriptionKey: "productsCatalog.models.rt35",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
  {
    id: "fe2-rt25",
    model: "FE2 RT25",
    capacity: "2500 kg",
    descriptionKey: "productsCatalog.models.rt25",
    image: "/images/products/terrain/rt25-forklift.png",
    buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
  },
];

const TELEHANDLER_PRODUCTS: ProductModel[] = [
  {
    id: "th",
    model: "TH6036",
    capacity: "6000 kg",
    descriptionKey: "productsCatalog.models.th6036",
    image: "/images/products/terrain/telehandler.png",
    buyUrl: VZV_SHOP_TELEHANDLERS_URL,
  },
];

const REACH_PRODUCTS: ProductModel[] = [
  {
    id: "rt16c",
    model: "RT 16 C",
    capacity: "1600 kg",
    descriptionKey: "productsCatalog.models.rt16reach",
    image: "/images/products/menu/schubmaststapler.jpg",
    buyUrl: VZV_SHOP_REACH_TRUCKS_URL,
  },
  {
    id: "rt20pro",
    model: "RT 20 Pro",
    capacity: "2000 kg",
    descriptionKey: "productsCatalog.models.rt16reach",
    image: "/images/products/menu/schubmaststapler.jpg",
    buyUrl: VZV_SHOP_REACH_TRUCKS_URL,
  },
];

const PICKER_PRODUCTS: ProductModel[] = [
  {
    id: "oph01e",
    model: "OPH 01E",
    capacity: "1000 kg",
    descriptionKey: "productsCatalog.models.oph01",
    image: "/images/products/menu/mittelhubkommissionierer.jpg",
    buyUrl: VZV_SHOP_ORDER_PICKERS_URL,
  },
];

const SCISSOR_PRODUCTS: ProductModel[] = [
  {
    id: "sc",
    model: "SC12E-16E, SC06E-16E, SC08EC, SC08EN-10EN",
    capacity: "6 – 16 m",
    descriptionKey: "productsCatalog.models.sc12",
    image: "/images/home/categories/6.jpg",
    buyUrl: VZV_SHOP_SCISSOR_LIFTS_URL,
  },
];

export const PRODUCT_CATALOG: readonly CatalogCategory[] = [
  {
    id: "1",
    slug: { cz: "celni-voziky", en: "counterbalance-forklifts" },
    image: "/images/home/categories/1.jpg",
    subcategories: [
      {
        id: "electric",
        slug: { cz: "elektricke", en: "electric" },
        titleKey: "productsCatalog.categories.1.subcategories.electric.title",
        descKey: "productsCatalog.categories.1.subcategories.electric.desc",
        badgeKey: "productsCatalog.subcategories.electric.badge",
        icon: "electric",
        ctaVariant: "orange",
        image: "/images/products/subcategories/electric-forklift.png",
        tagKeys: [
          "productsCatalog.subcategories.electric.tags.1",
          "productsCatalog.subcategories.electric.tags.2",
          "productsCatalog.subcategories.electric.tags.3",
          "productsCatalog.subcategories.electric.tags.4",
          "productsCatalog.subcategories.electric.tags.5",
          "productsCatalog.subcategories.electric.tags.6",
          "productsCatalog.subcategories.electric.tags.7",
        ],
        products: [],
        series: ELECTRIC_FORKLIFT_SERIES,
      },
      {
        id: "diesel-lpg",
        slug: { cz: "diesel-lpg", en: "diesel-lpg" },
        titleKey: "productsCatalog.categories.1.subcategories.dieselLpg.title",
        descKey: "productsCatalog.categories.1.subcategories.dieselLpg.desc",
        badgeKey: "productsCatalog.subcategories.dieselLpg.badge",
        icon: "fuel",
        ctaVariant: "orange",
        image: "/images/products/series/cpc-d-20-38-white.png",
        modelRangeKey: "productsCatalog.dieselLpg.modelRange",
        capacityKey: "productsCatalog.dieselLpg.capacity",
        productLineKey: "productsCatalog.dieselLpg.productLine",
        gallery: DIESEL_LPG_GALLERY,
        buyUrl: VZV_SHOP_DIESEL_LPG_URL,
        tagKeys: [
          "productsCatalog.subcategories.dieselLpg.tags.1",
          "productsCatalog.subcategories.dieselLpg.tags.2",
          "productsCatalog.subcategories.dieselLpg.tags.3",
          "productsCatalog.subcategories.dieselLpg.tags.4",
          "productsCatalog.subcategories.dieselLpg.tags.5",
          "productsCatalog.subcategories.dieselLpg.tags.6",
          "productsCatalog.subcategories.dieselLpg.tags.7",
        ],
        products: DIESEL_FORKLIFT_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.dieselLpg.detail.title",
          introKey: "productsCatalog.dieselLpg.detail.intro",
          featureKeys: [
            {
              icon: "ac-drive",
              titleKey: "productsCatalog.dieselLpg.detail.features.1.title",
              descKey: "productsCatalog.dieselLpg.detail.features.1.desc",
            },
            {
              icon: "safety",
              titleKey: "productsCatalog.dieselLpg.detail.features.2.title",
              descKey: "productsCatalog.dieselLpg.detail.features.2.desc",
            },
            {
              icon: "tires",
              titleKey: "productsCatalog.dieselLpg.detail.features.3.title",
              descKey: "productsCatalog.dieselLpg.detail.features.3.desc",
            },
            {
              icon: "maintenance",
              titleKey: "productsCatalog.dieselLpg.detail.features.4.title",
              descKey: "productsCatalog.dieselLpg.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.capacity.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.drive.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.fuel.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.fuel.value",
            },
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.lift.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.lift.value",
            },
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.tires.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.tires.value",
            },
            {
              labelKey: "productsCatalog.dieselLpg.detail.specs.operation.label",
              valueKey: "productsCatalog.dieselLpg.detail.specs.operation.value",
            },
          ],
          specsPdfUrl: "/api/documents/diesel-lpg-technicke-parametry",
          specsPdfFilename: "CPC-D-20-38-technicke-parametry.pdf",
          specsPdfUrlEn: "/documents/a2-series-diesel-en.pdf",
          specsPdfFilenameEn: "A2-series-diesel.pdf",
        },
      },
    ],
  },
  {
    id: "2",
    slug: { cz: "rucni-vysokozdvizne", en: "stackers" },
    image: "/images/home/categories/2.jpg",
    showStackersHandbook: true,
    subcategories: [
      {
        id: "walkie",
        slug: { cz: "bez-plosiny", en: "without-platform" },
        titleKey: "productsCatalog.categories.2.subcategories.walkie.title",
        descKey: "productsCatalog.categories.2.subcategories.walkie.desc",
        badgeKey: "productsCatalog.subcategories.walkie.badge",
        icon: "walkie",
        ctaVariant: "orange",
        image: "/images/products/stackers/bez-plosiny.png",
        tagKeys: [
          "productsCatalog.subcategories.walkie.tags.1",
          "productsCatalog.subcategories.walkie.tags.2",
          "productsCatalog.subcategories.walkie.tags.3",
        ],
        products: [],
        series: STACKER_WALKIE_VARIANTS,
        hubPageKey: "productsCatalog.stackers.walkieHub",
      },
      {
        id: "rider",
        slug: { cz: "s-plosinou", en: "with-platform" },
        titleKey: "productsCatalog.categories.2.subcategories.rider.title",
        descKey: "productsCatalog.categories.2.subcategories.rider.desc",
        badgeKey: "productsCatalog.subcategories.rider.badge",
        icon: "rider",
        ctaVariant: "orange",
        image: "/images/products/stackers/s-plosinou-v2.png",
        tagKeys: [
          "productsCatalog.subcategories.rider.tags.1",
          "productsCatalog.subcategories.rider.tags.2",
          "productsCatalog.subcategories.rider.tags.3",
          "productsCatalog.subcategories.rider.tags.4",
        ],
        products: [],
        series: STACKER_RIDER_VARIANTS,
        hubPageKey: "productsCatalog.stackers.riderHub",
      },
      {
        id: "straddle",
        slug: { cz: "obkrocne", en: "straddle" },
        titleKey: "productsCatalog.categories.2.subcategories.straddle.title",
        descKey: "productsCatalog.categories.2.subcategories.straddle.desc",
        badgeKey: "productsCatalog.subcategories.straddle.badge",
        icon: "straddle",
        ctaVariant: "orange",
        image: "/images/products/stackers/obkrocne.png",
        tagKeys: [
          "productsCatalog.subcategories.straddle.tags.1",
          "productsCatalog.subcategories.straddle.tags.2",
          "productsCatalog.subcategories.straddle.tags.3",
        ],
        products: STACKER_STRADDLE_PRODUCTS,
        series: STACKER_STRADDLE_VARIANTS,
        hubPageKey: "productsCatalog.stackers.straddleHub",
      },
    ],
  },
  {
    id: "3",
    slug: { cz: "paletove-voziky", en: "pallet-trucks" },
    image: "/images/home/categories/3.jpg",
    subcategories: [
      {
        id: "manual",
        slug: { cz: "rucni", en: "manual" },
        titleKey: "productsCatalog.categories.3.subcategories.manual.title",
        descKey: "productsCatalog.categories.3.subcategories.manual.desc",
        badgeKey: "productsCatalog.subcategories.manual.badge",
        icon: "manual",
        ctaVariant: "orange",
        image: "/images/products/pallet/manual-hand-clean.png",
        modelRangeKey: "productsCatalog.palletManual.modelRange",
        capacityKey: "productsCatalog.palletManual.capacity",
        productLineKey: "productsCatalog.palletManual.productLine",
        gallery: ["/images/products/pallet/manual-hand-clean.png"],
        buyUrl: VZV_SHOP_PALLET_MANUAL_URL,
        tagKeys: [
          "productsCatalog.subcategories.manual.tags.1",
          "productsCatalog.subcategories.manual.tags.2",
        ],
        products: PALLET_MANUAL_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.palletManual.detail.title",
          introKey: "productsCatalog.palletManual.detail.intro",
          featureKeys: [
            {
              icon: "maintenance",
              titleKey: "productsCatalog.palletManual.detail.features.1.title",
              descKey: "productsCatalog.palletManual.detail.features.1.desc",
            },
            {
              icon: "compact",
              titleKey: "productsCatalog.palletManual.detail.features.2.title",
              descKey: "productsCatalog.palletManual.detail.features.2.desc",
            },
            {
              icon: "hydraulics",
              titleKey: "productsCatalog.palletManual.detail.features.3.title",
              descKey: "productsCatalog.palletManual.detail.features.3.desc",
            },
            {
              icon: "stability",
              titleKey: "productsCatalog.palletManual.detail.features.4.title",
              descKey: "productsCatalog.palletManual.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.palletManual.detail.specs.capacity.label",
              valueKey: "productsCatalog.palletManual.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.palletManual.detail.specs.drive.label",
              valueKey: "productsCatalog.palletManual.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.palletManual.detail.specs.lift.label",
              valueKey: "productsCatalog.palletManual.detail.specs.lift.value",
            },
            {
              labelKey: "productsCatalog.palletManual.detail.specs.forks.label",
              valueKey: "productsCatalog.palletManual.detail.specs.forks.value",
            },
            {
              labelKey: "productsCatalog.palletManual.detail.specs.operation.label",
              valueKey: "productsCatalog.palletManual.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.palletManual.detail.specs.type.label",
              valueKey: "productsCatalog.palletManual.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/manual",
          specsPdfFilename: "manual-technicke-parametry.pdf",
        },
      },
      {
        id: "powered",
        slug: { cz: "elektricke", en: "electric" },
        titleKey: "productsCatalog.categories.3.subcategories.powered.title",
        descKey: "productsCatalog.categories.3.subcategories.powered.desc",
        badgeKey: "productsCatalog.subcategories.powered.badge",
        icon: "powered",
        ctaVariant: "orange",
        image: "/images/products/pallet/pwb-avant.png",
        modelRangeKey: "productsCatalog.palletPowered.modelRange",
        capacityKey: "productsCatalog.palletPowered.capacity",
        productLineKey: "productsCatalog.palletPowered.productLine",
        gallery: [
          "/images/products/pallet/pwb-avant.png",
          "/images/products/pallet/pte-atom-2.png",
        ],
        buyUrl: VZV_SHOP_PALLET_POWERED_URL,
        tagKeys: [
          "productsCatalog.subcategories.powered.tags.1",
          "productsCatalog.subcategories.powered.tags.2",
          "productsCatalog.subcategories.powered.tags.3",
        ],
        products: PALLET_POWERED_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.palletPowered.detail.title",
          introKey: "productsCatalog.palletPowered.detail.intro",
          featureKeys: [
            {
              icon: "compact",
              titleKey: "productsCatalog.palletPowered.detail.features.1.title",
              descKey: "productsCatalog.palletPowered.detail.features.1.desc",
            },
            {
              icon: "ac-drive",
              titleKey: "productsCatalog.palletPowered.detail.features.2.title",
              descKey: "productsCatalog.palletPowered.detail.features.2.desc",
            },
            {
              icon: "battery",
              titleKey: "productsCatalog.palletPowered.detail.features.3.title",
              descKey: "productsCatalog.palletPowered.detail.features.3.desc",
            },
            {
              icon: "display",
              titleKey: "productsCatalog.palletPowered.detail.features.4.title",
              descKey: "productsCatalog.palletPowered.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.capacity.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.models.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.models.value",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.pte.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.pte.value",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.battery.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.battery.value",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.pteBattery.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.pteBattery.value",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.specs.type.label",
              valueKey: "productsCatalog.palletPowered.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/documents/pwb-150-200-en.pdf",
          specsPdfFilename: "PWB-150-200.pdf",
          specsPdfUrlEn: "/documents/pwb-150-200-en.pdf",
          specsPdfFilenameEn: "PWB-150-200.pdf",
          capacityCompareTitleKey: "productsCatalog.palletPowered.detail.capacityCompare.title",
          capacityCompareLeftTitleKey: "productsCatalog.palletPowered.detail.capacityCompare.leftTitle",
          capacityCompareRightTitleKey: "productsCatalog.palletPowered.detail.capacityCompare.rightTitle",
          capacityCompareLeftImage: "/images/products/pallet/pwb-avant.png",
          capacityCompareRightImage: "/images/products/pallet/pte-atom-2.png",
          capacityCompareRows: [
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.1.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.1.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.1.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.2.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.2.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.2.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.3.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.3.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.3.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.4.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.4.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.4.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.5.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.5.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.5.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.6.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.6.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.6.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.7.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.7.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.7.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.8.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.8.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.8.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.9.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.9.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.9.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.10.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.10.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.10.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.11.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.11.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.11.right",
            },
            {
              labelKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.12.label",
              leftKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.12.left",
              rightKey: "productsCatalog.palletPowered.detail.capacityCompare.rows.12.right",
            },
          ],
          audienceTitleKey: "productsCatalog.palletPowered.detail.audience.title",
          audienceKeys: [
            "productsCatalog.palletPowered.detail.audience.items.1",
            "productsCatalog.palletPowered.detail.audience.items.2",
            "productsCatalog.palletPowered.detail.audience.items.3",
            "productsCatalog.palletPowered.detail.audience.items.4",
            "productsCatalog.palletPowered.detail.audience.items.5",
          ],
          recommendTitleKey: "productsCatalog.palletPowered.detail.recommend.whenTitle",
          recommendWhenKeys: [
            "productsCatalog.palletPowered.detail.recommend.when.1",
            "productsCatalog.palletPowered.detail.recommend.when.2",
            "productsCatalog.palletPowered.detail.recommend.when.3",
            "productsCatalog.palletPowered.detail.recommend.when.4",
            "productsCatalog.palletPowered.detail.recommend.when.5",
          ],
          recommendOtherTitleKey: "productsCatalog.palletPowered.detail.recommend.otherTitle",
          recommendOtherKeys: [
            "productsCatalog.palletPowered.detail.recommend.other.1",
            "productsCatalog.palletPowered.detail.recommend.other.2",
            "productsCatalog.palletPowered.detail.recommend.other.3",
            "productsCatalog.palletPowered.detail.recommend.other.4",
            "productsCatalog.palletPowered.detail.recommend.other.5",
          ],
          equipmentTitleKey: "productsCatalog.palletPowered.detail.equipment.title",
          equipmentStandardKeys: [
            "productsCatalog.palletPowered.detail.equipment.standardItems.1",
            "productsCatalog.palletPowered.detail.equipment.standardItems.2",
            "productsCatalog.palletPowered.detail.equipment.standardItems.3",
            "productsCatalog.palletPowered.detail.equipment.standardItems.4",
          ],
          equipmentOptionalKeys: [
            "productsCatalog.palletPowered.detail.equipment.optionalItems.1",
            "productsCatalog.palletPowered.detail.equipment.optionalItems.2",
          ],
          advantagesLeftTitleKey: "productsCatalog.palletPowered.detail.advantages.pwbTitle",
          advantagesLeftKeys: [
            "productsCatalog.palletPowered.detail.advantages.pwb.1",
            "productsCatalog.palletPowered.detail.advantages.pwb.2",
            "productsCatalog.palletPowered.detail.advantages.pwb.3",
            "productsCatalog.palletPowered.detail.advantages.pwb.4",
            "productsCatalog.palletPowered.detail.advantages.pwb.5",
            "productsCatalog.palletPowered.detail.advantages.pwb.6",
            "productsCatalog.palletPowered.detail.advantages.pwb.7",
          ],
          advantagesRightTitleKey: "productsCatalog.palletPowered.detail.advantages.pteTitle",
          advantagesRightKeys: [
            "productsCatalog.palletPowered.detail.advantages.pte.1",
            "productsCatalog.palletPowered.detail.advantages.pte.2",
            "productsCatalog.palletPowered.detail.advantages.pte.3",
            "productsCatalog.palletPowered.detail.advantages.pte.4",
            "productsCatalog.palletPowered.detail.advantages.pte.5",
            "productsCatalog.palletPowered.detail.advantages.pte.6",
            "productsCatalog.palletPowered.detail.advantages.pte.7",
            "productsCatalog.palletPowered.detail.advantages.pte.8",
          ],
          argumentKey: "productsCatalog.palletPowered.detail.argument",
        },
      },
    ],
  },
  {
    id: "4",
    slug: { cz: "terenni-voziky", en: "rough-terrain" },
    image: "/images/home/categories/4.jpg",
    subcategories: [
      {
        id: "terrain-forklifts",
        slug: { cz: "terenni-voziky", en: "rough-terrain-forklifts" },
        titleKey: "productsCatalog.categories.4.subcategories.terrainForklifts.title",
        descKey: "productsCatalog.categories.4.subcategories.terrainForklifts.desc",
        badgeKey: "productsCatalog.subcategories.terrainForklifts.badge",
        icon: "terrain",
        ctaVariant: "orange",
        image: "/images/products/terrain/rt25-forklift.png",
        modelRangeKey: "productsCatalog.terrainForkliftsPage.modelRange",
        capacityKey: "productsCatalog.terrainForkliftsPage.capacity",
        productLineKey: "productsCatalog.terrainForkliftsPage.productLine",
        gallery: ["/images/products/terrain/rt25-forklift.png"],
        buyUrl: VZV_SHOP_TERRAIN_FORKLIFTS_URL,
        tagKeys: [
          "productsCatalog.subcategories.terrainForklifts.tags.1",
          "productsCatalog.subcategories.terrainForklifts.tags.2",
        ],
        products: TERRAIN_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.terrainForkliftsPage.detail.title",
          introKey: "productsCatalog.terrainForkliftsPage.detail.intro",
          featureKeys: [
            {
              icon: "tires",
              titleKey: "productsCatalog.terrainForkliftsPage.detail.features.1.title",
              descKey: "productsCatalog.terrainForkliftsPage.detail.features.1.desc",
            },
            {
              icon: "ac-drive",
              titleKey: "productsCatalog.terrainForkliftsPage.detail.features.2.title",
              descKey: "productsCatalog.terrainForkliftsPage.detail.features.2.desc",
            },
            {
              icon: "cabin",
              titleKey: "productsCatalog.terrainForkliftsPage.detail.features.3.title",
              descKey: "productsCatalog.terrainForkliftsPage.detail.features.3.desc",
            },
            {
              icon: "stability",
              titleKey: "productsCatalog.terrainForkliftsPage.detail.features.4.title",
              descKey: "productsCatalog.terrainForkliftsPage.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.capacity.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.drive.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.driveType.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.driveType.value",
            },
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.tires.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.tires.value",
            },
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.operation.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.terrainForkliftsPage.detail.specs.type.label",
              valueKey: "productsCatalog.terrainForkliftsPage.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/terrain-forklifts",
          specsPdfFilename: "terrain-forklifts-technicke-parametry.pdf",
        },
      },
      {
        id: "telehandlers",
        slug: { cz: "manipulatory", en: "telehandlers" },
        titleKey: "productsCatalog.categories.4.subcategories.telehandlers.title",
        descKey: "productsCatalog.categories.4.subcategories.telehandlers.desc",
        badgeKey: "productsCatalog.subcategories.telehandlers.badge",
        icon: "telescope",
        ctaVariant: "orange",
        image: "/images/products/terrain/telehandler.png",
        modelRangeKey: "productsCatalog.telehandlersPage.modelRange",
        capacityKey: "productsCatalog.telehandlersPage.capacity",
        productLineKey: "productsCatalog.telehandlersPage.productLine",
        gallery: ["/images/products/terrain/telehandler.png"],
        buyUrl: VZV_SHOP_TELEHANDLERS_URL,
        tagKeys: [
          "productsCatalog.subcategories.telehandlers.tags.1",
          "productsCatalog.subcategories.telehandlers.tags.2",
        ],
        products: TELEHANDLER_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.telehandlersPage.detail.title",
          introKey: "productsCatalog.telehandlersPage.detail.intro",
          featureKeys: [
            {
              icon: "compact",
              titleKey: "productsCatalog.telehandlersPage.detail.features.1.title",
              descKey: "productsCatalog.telehandlersPage.detail.features.1.desc",
            },
            {
              icon: "hydraulics",
              titleKey: "productsCatalog.telehandlersPage.detail.features.2.title",
              descKey: "productsCatalog.telehandlersPage.detail.features.2.desc",
            },
            {
              icon: "tires",
              titleKey: "productsCatalog.telehandlersPage.detail.features.3.title",
              descKey: "productsCatalog.telehandlersPage.detail.features.3.desc",
            },
            {
              icon: "cabin",
              titleKey: "productsCatalog.telehandlersPage.detail.features.4.title",
              descKey: "productsCatalog.telehandlersPage.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.capacity.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.drive.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.reach.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.reach.value",
            },
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.lift.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.lift.value",
            },
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.operation.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.telehandlersPage.detail.specs.type.label",
              valueKey: "productsCatalog.telehandlersPage.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/telehandlers",
          specsPdfFilename: "telehandlers-technicke-parametry.pdf",
        },
      },
    ],
  },
  {
    id: "5",
    slug: { cz: "retraky-vychystavaci", en: "reach-order-pickers" },
    image: "/images/home/categories/5.jpg",
    subcategories: [
      {
        id: "reach-trucks",
        slug: { cz: "retraky", en: "reach-trucks" },
        titleKey: "productsCatalog.categories.5.subcategories.reachTrucks.title",
        descKey: "productsCatalog.categories.5.subcategories.reachTrucks.desc",
        badgeKey: "productsCatalog.subcategories.reachTrucks.badge",
        icon: "reach",
        ctaVariant: "orange",
        image: "/images/products/menu/schubmaststapler.jpg",
        modelRangeKey: "productsCatalog.reachTrucksPage.modelRange",
        capacityKey: "productsCatalog.reachTrucksPage.capacity",
        productLineKey: "productsCatalog.reachTrucksPage.productLine",
        gallery: ["/images/products/menu/schubmaststapler.jpg"],
        buyUrl: VZV_SHOP_REACH_TRUCKS_URL,
        tagKeys: [
          "productsCatalog.subcategories.reachTrucks.tags.1",
          "productsCatalog.subcategories.reachTrucks.tags.2",
          "productsCatalog.subcategories.reachTrucks.tags.3",
        ],
        products: REACH_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.reachTrucksPage.detail.title",
          introKey: "productsCatalog.reachTrucksPage.detail.intro",
          featureKeys: [
            {
              icon: "compact",
              titleKey: "productsCatalog.reachTrucksPage.detail.features.1.title",
              descKey: "productsCatalog.reachTrucksPage.detail.features.1.desc",
            },
            {
              icon: "hydraulics",
              titleKey: "productsCatalog.reachTrucksPage.detail.features.2.title",
              descKey: "productsCatalog.reachTrucksPage.detail.features.2.desc",
            },
            {
              icon: "battery",
              titleKey: "productsCatalog.reachTrucksPage.detail.features.3.title",
              descKey: "productsCatalog.reachTrucksPage.detail.features.3.desc",
            },
            {
              icon: "stability",
              titleKey: "productsCatalog.reachTrucksPage.detail.features.4.title",
              descKey: "productsCatalog.reachTrucksPage.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.capacity.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.drive.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.lift.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.lift.value",
            },
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.battery.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.battery.value",
            },
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.operation.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.reachTrucksPage.detail.specs.type.label",
              valueKey: "productsCatalog.reachTrucksPage.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/reach-trucks",
          specsPdfFilename: "reach-trucks-technicke-parametry.pdf",
        },
      },
      {
        id: "order-pickers",
        slug: { cz: "vychystavaci-voziky", en: "order-pickers" },
        titleKey: "productsCatalog.categories.5.subcategories.orderPickers.title",
        descKey: "productsCatalog.categories.5.subcategories.orderPickers.desc",
        badgeKey: "productsCatalog.subcategories.orderPickers.badge",
        icon: "picker",
        ctaVariant: "orange",
        image: "/images/products/menu/mittelhubkommissionierer.jpg",
        modelRangeKey: "productsCatalog.orderPickersPage.modelRange",
        capacityKey: "productsCatalog.orderPickersPage.capacity",
        productLineKey: "productsCatalog.orderPickersPage.productLine",
        gallery: ["/images/products/menu/mittelhubkommissionierer.jpg"],
        buyUrl: VZV_SHOP_ORDER_PICKERS_URL,
        tagKeys: [
          "productsCatalog.subcategories.orderPickers.tags.1",
          "productsCatalog.subcategories.orderPickers.tags.2",
        ],
        products: PICKER_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.orderPickersPage.detail.title",
          introKey: "productsCatalog.orderPickersPage.detail.intro",
          featureKeys: [
            {
              icon: "compact",
              titleKey: "productsCatalog.orderPickersPage.detail.features.1.title",
              descKey: "productsCatalog.orderPickersPage.detail.features.1.desc",
            },
            {
              icon: "ac-drive",
              titleKey: "productsCatalog.orderPickersPage.detail.features.2.title",
              descKey: "productsCatalog.orderPickersPage.detail.features.2.desc",
            },
            {
              icon: "safety",
              titleKey: "productsCatalog.orderPickersPage.detail.features.3.title",
              descKey: "productsCatalog.orderPickersPage.detail.features.3.desc",
            },
            {
              icon: "maintenance",
              titleKey: "productsCatalog.orderPickersPage.detail.features.4.title",
              descKey: "productsCatalog.orderPickersPage.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.capacity.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.capacity.value",
            },
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.drive.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.lift.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.lift.value",
            },
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.operation.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.use.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.use.value",
            },
            {
              labelKey: "productsCatalog.orderPickersPage.detail.specs.type.label",
              valueKey: "productsCatalog.orderPickersPage.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/order-pickers",
          specsPdfFilename: "order-pickers-technicke-parametry.pdf",
        },
      },
    ],
  },
  {
    id: "6",
    slug: { cz: "pracovni-plosiny", en: "work-platforms" },
    image: "/images/home/categories/6.jpg",
    subcategories: [
      {
        id: "scissor",
        slug: { cz: "nuzkove", en: "scissor-lifts" },
        titleKey: "productsCatalog.categories.6.subcategories.scissor.title",
        descKey: "productsCatalog.categories.6.subcategories.scissor.desc",
        badgeKey: "productsCatalog.subcategories.scissor.badge",
        icon: "scissor",
        ctaVariant: "orange",
        image: "/images/home/categories/6.jpg",
        modelRangeKey: "productsCatalog.scissorLiftsPage.modelRange",
        capacityKey: "productsCatalog.scissorLiftsPage.capacity",
        productLineKey: "productsCatalog.scissorLiftsPage.productLine",
        gallery: ["/images/home/categories/6.jpg"],
        buyUrl: VZV_SHOP_SCISSOR_LIFTS_URL,
        tagKeys: [
          "productsCatalog.subcategories.scissor.tags.1",
          "productsCatalog.subcategories.scissor.tags.2",
        ],
        products: SCISSOR_PRODUCTS,
        detail: {
          titleKey: "productsCatalog.scissorLiftsPage.detail.title",
          introKey: "productsCatalog.scissorLiftsPage.detail.intro",
          featureKeys: [
            {
              icon: "safety",
              titleKey: "productsCatalog.scissorLiftsPage.detail.features.1.title",
              descKey: "productsCatalog.scissorLiftsPage.detail.features.1.desc",
            },
            {
              icon: "compact",
              titleKey: "productsCatalog.scissorLiftsPage.detail.features.2.title",
              descKey: "productsCatalog.scissorLiftsPage.detail.features.2.desc",
            },
            {
              icon: "battery",
              titleKey: "productsCatalog.scissorLiftsPage.detail.features.3.title",
              descKey: "productsCatalog.scissorLiftsPage.detail.features.3.desc",
            },
            {
              icon: "maintenance",
              titleKey: "productsCatalog.scissorLiftsPage.detail.features.4.title",
              descKey: "productsCatalog.scissorLiftsPage.detail.features.4.desc",
            },
          ],
          specKeys: [
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.height.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.height.value",
            },
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.drive.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.drive.value",
            },
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.platform.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.platform.value",
            },
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.operation.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.operation.value",
            },
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.use.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.use.value",
            },
            {
              labelKey: "productsCatalog.scissorLiftsPage.detail.specs.type.label",
              valueKey: "productsCatalog.scissorLiftsPage.detail.specs.type.value",
            },
          ],
          specsPdfUrl: "/api/documents/catalog-specs/scissor",
          specsPdfFilename: "scissor-technicke-parametry.pdf",
        },
      },
    ],
  },
] as const;

export function getCategoryById(id: CategoryId) {
  return PRODUCT_CATALOG.find((category) => category.id === id);
}

export function getCategoryBySlug(slug: string, locale: string) {
  return PRODUCT_CATALOG.find((category) => category.slug[locale as "cz" | "en"] === slug);
}

export function getSubcategoryBySlug(category: CatalogCategory, slug: string, locale: string) {
  return category.subcategories.find(
    (subcategory) => subcategory.slug[locale as "cz" | "en"] === slug,
  );
}

export function getSeriesBySlug(subcategory: Subcategory, slug: string, locale: string) {
  return subcategory.series?.find((series) => series.slug[locale as "cz" | "en"] === slug);
}

export function getSeriesSlug(series: ProductSeries, locale: string) {
  return series.slug[locale as "cz" | "en"];
}

export function getSubcategoryItemCount(subcategory: Subcategory) {
  if (subcategory.hubPageKey && subcategory.products.length) {
    return subcategory.products.length;
  }

  if (subcategory.series?.length) {
    return subcategory.series.length;
  }

  return subcategory.products.length;
}

export function usesSubcategorySeriesCount(subcategory: Subcategory) {
  return Boolean(subcategory.series?.length) && !(subcategory.hubPageKey && subcategory.products.length);
}

export function getCategorySlug(category: CatalogCategory, locale: string) {
  return category.slug[locale as "cz" | "en"];
}

export function getSubcategorySlug(subcategory: Subcategory, locale: string) {
  return subcategory.slug[locale as "cz" | "en"];
}

export function getModelSlug(product: ProductModel, locale: string) {
  const localeKey = locale as "cz" | "en";
  return product.slug?.[localeKey] ?? product.id;
}

export function getProductBySlugInSeries(
  series: ProductSeries,
  modelSlug: string,
  locale: string,
) {
  return series.products.find((product) => getModelSlug(product, locale) === modelSlug);
}

export function getProductBySlugInSubcategory(
  subcategory: Subcategory,
  modelSlug: string,
  locale: string,
) {
  const direct = subcategory.products.find((product) => getModelSlug(product, locale) === modelSlug);
  if (direct) {
    return direct;
  }

  for (const series of subcategory.series ?? []) {
    const product = getProductBySlugInSeries(series, modelSlug, locale);
    if (product) {
      return product;
    }
  }

  return undefined;
}

export function getLocalizedProductRouteParams(
  params: { category?: string; subcategory?: string; series?: string; model?: string },
  targetLocale: string,
) {
  const categorySlug = params.category;
  if (!categorySlug) {
    return null;
  }

  const category = PRODUCT_CATALOG.find(
    (item) => item.slug.cz === categorySlug || item.slug.en === categorySlug,
  );
  if (!category) {
    return null;
  }

  const localeKey = targetLocale as "cz" | "en";
  const localized: { category: string; subcategory?: string; series?: string; model?: string } = {
    category: category.slug[localeKey],
  };

  if (params.subcategory) {
    const subcategory = category.subcategories.find(
      (item) => item.slug.cz === params.subcategory || item.slug.en === params.subcategory,
    );
    if (subcategory) {
      localized.subcategory = subcategory.slug[localeKey];

      if (params.series && subcategory.series) {
        const series = subcategory.series.find(
          (item) => item.slug.cz === params.series || item.slug.en === params.series,
        );
        if (series) {
          localized.series = series.slug[localeKey];

          if (params.model) {
            const productMatch = series.products.find(
              (item) =>
                item.slug?.cz === params.model ||
                item.slug?.en === params.model ||
                item.id === params.model,
            );
            if (productMatch) {
              localized.model = getModelSlug(productMatch, localeKey);
            }
          }
        }
      } else if (params.model) {
        const productMatch =
          subcategory.products.find(
            (item) =>
              item.slug?.cz === params.model ||
              item.slug?.en === params.model ||
              item.id === params.model,
          ) ??
          subcategory.series
            ?.flatMap((item) => item.products)
            .find(
              (item) =>
                item.slug?.cz === params.model ||
                item.slug?.en === params.model ||
                item.id === params.model,
            );

        if (productMatch) {
          localized.model = getModelSlug(productMatch, localeKey);
        }
      }
    }
  }

  return localized;
}

export { HOME_CATEGORY_KEYS };

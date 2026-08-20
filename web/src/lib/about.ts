export const ABOUT_GALLERY = [
  {
    id: "warehouse",
    src: "/images/contact/warehouse-cervena-voda.jpg",
  },
  {
    id: "forklift",
    src: "/images/about/gallery-forklift-v1.jpg",
  },
  {
    id: "logistics",
    src: "/images/home/logistics.jpg",
  },
  {
    id: "prague",
    src: "/images/contact/warehouse-prague-v3.jpg",
  },
] as const;

export const STRENGTH_KEYS = [
  "warehouse",
  "trust",
  "serviceParts",
  "rental",
  "delivery",
  "consulting",
] as const;

export type StrengthKey = (typeof STRENGTH_KEYS)[number];
export const PILLAR_KEYS = ["quality", "reliability", "innovation"] as const;
export const STAT_KEYS = ["warehouses", "territory", "delivery", "parts"] as const;

/** Brand facts from Noblelift Sales & Product Handbook. */
export const BRAND_FACT_KEYS = [
  "experience",
  "people",
  "plants",
  "listed",
] as const;

export const BRAND_MILESTONE_KEYS = [
  "1996",
  "2000",
  "2004",
  "2012",
  "2015",
  "today",
] as const;

export const BRAND_TRUST_KEYS = [
  "experience",
  "scale",
  "portfolio",
  "ownRd",
  "quality",
  "global",
  "listed",
] as const;

export type BrandTrustKey = (typeof BRAND_TRUST_KEYS)[number];

export const DIESEL_LPG_SPECS_MODELS = [
  "CPC(D)20",
  "CPC(D)25",
  "CPC(D)30",
  "CPC(D)35",
  "CPC(D)38",
] as const;

export const DIESEL_LPG_SPECS_SOURCE_URL =
  "https://www.noblelift.com/wlbysb/info.aspx?itemid=741&lcid=50";

export const DIESEL_LPG_PDF_CONTENT = {
  cz: {
    seriesName: "A Series IC Forklift",
    capacity: "2000 - 3800 kg",
    fuel: "Diesel / LPG",
    title: "Noblelift Diesel/LPG - technicke parametry",
    subtitle: "CPC(D)20~38 | Spalovaci celni voziky",
    intro:
      "Rada A IC predstavuje spolehlivy dieselovy a LPG celni vozik Noblelift pro narocny provoz ve skladech, logistickych arealech i venkovnich aplikacich. Kombinuje vysoky vykon, dlouhou vytrvalost a robustni konstrukci pro kazdodenni manipulaci s paletami.",
    featuresTitle: "Robustni konstrukce a spolehlivy provoz",
    features: [
      "Vykonny spalovaci motor pro narocne provozy",
      "Robustni ocelova konstrukce pro venkovni i smiseny provoz",
      "Dlouha vytrvalost a rychle tankovani",
      "Ergonomicka kabina s pohodlnym sedadlem",
      "Snadna udrzba a servisni pristupnost",
      "Spolehlivy hydraulicky system zdvihu",
    ],
    paramsTitle: "Parametry",
    paramHeader: "Parametr",
    manufacturerRow: "Typ vyrobce",
    sourceNote: "Zdroj dat: Noblelift CPC(D)20~38 (item 741)",
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
  en: {
    seriesName: "A Series IC Forklift",
    capacity: "2000 - 3800 kg",
    fuel: "Diesel / LPG",
    title: "Noblelift Diesel/LPG - technical parameters",
    subtitle: "CPC(D)20~38 | Internal combustion counterbalance forklifts",
    intro:
      "The A IC series is a reliable Noblelift diesel and LPG counterbalance forklift for demanding warehouse, logistics yard and outdoor applications. It combines high output, long endurance and rugged construction for everyday pallet handling.",
    featuresTitle: "Rugged construction and reliable operation",
    features: [
      "Powerful combustion engine for demanding operations",
      "Rugged steel construction for outdoor and mixed use",
      "Long endurance and quick refuelling",
      "Ergonomic cabin with comfortable seat",
      "Easy maintenance and service access",
      "Reliable hydraulic lift system",
    ],
    paramsTitle: "Parameters",
    paramHeader: "Parameter",
    manufacturerRow: "Manufacturer's type",
    sourceNote: "Data source: Noblelift CPC(D)20~38 (item 741)",
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
} as const;

/** Parameter table sourced from Noblelift item 741 (CPC(D)20~38). */
export const DIESEL_LPG_SPECS_ROWS = [
  {
    labelCs: "Nosnost",
    labelEn: "Load capacity",
    unit: "kg",
    values: ["2000", "2500", "3000", "3500", "3800"],
  },
  {
    labelCs: "Stred zatizeni",
    labelEn: "Load centre distance",
    unit: "mm",
    values: ["500", "500", "500", "500", "500"],
  },
  {
    labelCs: "Zdvih",
    labelEn: "Lift height",
    unit: "mm",
    values: ["3000", "3000", "3000", "3000", "3000"],
  },
  {
    labelCs: "Celkova delka (bez vidlic)",
    labelEn: "Overall length (excl. forks)",
    unit: "mm",
    values: ["2628", "2628", "2770", "2835", "2875"],
  },
  {
    labelCs: "Celkova sirka (ram / pneumatiky)",
    labelEn: "Overall width (frame / tires)",
    unit: "mm",
    values: [
      "1150/1163",
      "1150/1163",
      "1195/1228",
      "1195/1228",
      "1195/1228",
    ],
  },
] as const;

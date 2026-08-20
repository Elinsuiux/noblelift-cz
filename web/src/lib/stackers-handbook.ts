export type StackersHandbookCompareRow = {
  labelKey: string;
  leftKey: string;
  rightKey: string;
};

export type StackersHandbookSection = {
  id: string;
  titleKey: string;
  introKey: string;
  image?: string;
  specKeys?: readonly { labelKey: string; valueKey: string }[];
  audienceTitleKey?: string;
  audienceKeys?: readonly string[];
  advantagesTitleKey?: string;
  advantagesKeys?: readonly string[];
  extraTitleKey?: string;
  extraKeys?: readonly string[];
  compareTitleKey?: string;
  compareLeftTitleKey?: string;
  compareRightTitleKey?: string;
  compareLeftImage?: string;
  compareRightImage?: string;
  compareRows?: readonly StackersHandbookCompareRow[];
  recommendTableTitleKey?: string;
  recommendTableRows?: readonly { modelKey: string; valueKey: string }[];
  legendTitleKey?: string;
  legendKeys?: readonly string[];
  argumentKey?: string;
};

export type StackersHandbookConfig = {
  overviewTitleKey: string;
  overviewLeadKey: string;
  overviewSeries: readonly {
    id: string;
    titleKey: string;
    image: string;
    bulletKeys: readonly string[];
  }[];
  sections: readonly StackersHandbookSection[];
};

const K = "productsCatalog.stackersHandbook";

export const STACKERS_HANDBOOK: StackersHandbookConfig = {
  overviewTitleKey: `${K}.overview.title`,
  overviewLeadKey: `${K}.overview.lead`,
  overviewSeries: [
    {
      id: "pse",
      titleKey: `${K}.overview.pse.title`,
      image: "/images/products/stackers/bez-prizdvihem.png",
      bulletKeys: [
        `${K}.overview.pse.1`,
        `${K}.overview.pse.2`,
        `${K}.overview.pse.3`,
        `${K}.overview.pse.4`,
        `${K}.overview.pse.5`,
      ],
    },
    {
      id: "swb",
      titleKey: `${K}.overview.swb.title`,
      image: "/images/products/stackers/s-prizdvihem.png",
      bulletKeys: [
        `${K}.overview.swb.1`,
        `${K}.overview.swb.2`,
        `${K}.overview.swb.3`,
        `${K}.overview.swb.4`,
        `${K}.overview.swb.5`,
      ],
    },
    {
      id: "ps",
      titleKey: `${K}.overview.ps.title`,
      image: "/images/products/stackers/s-plosinou-product.png",
      bulletKeys: [
        `${K}.overview.ps.1`,
        `${K}.overview.ps.2`,
        `${K}.overview.ps.3`,
        `${K}.overview.ps.4`,
        `${K}.overview.ps.5`,
      ],
    },
  ],
  sections: [
    {
      id: "pse",
      titleKey: `${K}.pse.title`,
      introKey: `${K}.pse.intro`,
      image: "/images/products/stackers/bez-prizdvihem.png",
      specKeys: [
        { labelKey: `${K}.pse.specs.models.label`, valueKey: `${K}.pse.specs.models.value` },
        { labelKey: `${K}.pse.specs.capacity.label`, valueKey: `${K}.pse.specs.capacity.value` },
        { labelKey: `${K}.pse.specs.lift.label`, valueKey: `${K}.pse.specs.lift.value` },
      ],
      audienceTitleKey: `${K}.pse.audience.title`,
      audienceKeys: [
        `${K}.pse.audience.1`,
        `${K}.pse.audience.2`,
        `${K}.pse.audience.3`,
        `${K}.pse.audience.4`,
        `${K}.pse.audience.5`,
      ],
      advantagesTitleKey: `${K}.pse.advantages.title`,
      advantagesKeys: [
        `${K}.pse.advantages.1`,
        `${K}.pse.advantages.2`,
        `${K}.pse.advantages.3`,
        `${K}.pse.advantages.4`,
        `${K}.pse.advantages.5`,
        `${K}.pse.advantages.6`,
        `${K}.pse.advantages.7`,
        `${K}.pse.advantages.8`,
      ],
      compareTitleKey: `${K}.pse.compare.title`,
      compareLeftTitleKey: `${K}.pse.compare.leftTitle`,
      compareRightTitleKey: `${K}.pse.compare.rightTitle`,
      compareLeftImage: "/images/products/stackers/s-prizdvihem.png",
      compareRightImage: "/images/products/stackers/bez-prizdvihem.png",
      compareRows: [
        { labelKey: `${K}.pse.compare.rows.1.label`, leftKey: `${K}.pse.compare.rows.1.left`, rightKey: `${K}.pse.compare.rows.1.right` },
        { labelKey: `${K}.pse.compare.rows.2.label`, leftKey: `${K}.pse.compare.rows.2.left`, rightKey: `${K}.pse.compare.rows.2.right` },
        { labelKey: `${K}.pse.compare.rows.3.label`, leftKey: `${K}.pse.compare.rows.3.left`, rightKey: `${K}.pse.compare.rows.3.right` },
        { labelKey: `${K}.pse.compare.rows.4.label`, leftKey: `${K}.pse.compare.rows.4.left`, rightKey: `${K}.pse.compare.rows.4.right` },
      ],
      argumentKey: `${K}.pse.argument`,
    },
    {
      id: "swb",
      titleKey: `${K}.swb.title`,
      introKey: `${K}.swb.intro`,
      image: "/images/products/stackers/s-prizdvihem.png",
      specKeys: [
        { labelKey: `${K}.swb.specs.models.label`, valueKey: `${K}.swb.specs.models.value` },
        { labelKey: `${K}.swb.specs.capacity.label`, valueKey: `${K}.swb.specs.capacity.value` },
        { labelKey: `${K}.swb.specs.lift.label`, valueKey: `${K}.swb.specs.lift.value` },
      ],
      audienceTitleKey: `${K}.swb.audience.title`,
      audienceKeys: [
        `${K}.swb.audience.1`,
        `${K}.swb.audience.2`,
        `${K}.swb.audience.3`,
        `${K}.swb.audience.4`,
      ],
      advantagesTitleKey: `${K}.swb.advantages.title`,
      advantagesKeys: [
        `${K}.swb.advantages.1`,
        `${K}.swb.advantages.2`,
        `${K}.swb.advantages.3`,
        `${K}.swb.advantages.4`,
        `${K}.swb.advantages.5`,
        `${K}.swb.advantages.6`,
        `${K}.swb.advantages.7`,
      ],
      compareTitleKey: `${K}.swb.compare.title`,
      compareLeftTitleKey: `${K}.swb.compare.leftTitle`,
      compareRightTitleKey: `${K}.swb.compare.rightTitle`,
      compareLeftImage: "/images/products/stackers/bez-prizdvihem.png",
      compareRightImage: "/images/products/stackers/s-prizdvihem.png",
      compareRows: [
        { labelKey: `${K}.swb.compare.rows.1.label`, leftKey: `${K}.swb.compare.rows.1.left`, rightKey: `${K}.swb.compare.rows.1.right` },
      ],
      extraTitleKey: `${K}.swb.initialLift.title`,
      extraKeys: [
        `${K}.swb.initialLift.1`,
        `${K}.swb.initialLift.2`,
        `${K}.swb.initialLift.3`,
        `${K}.swb.initialLift.4`,
      ],
      argumentKey: `${K}.swb.argument`,
    },
    {
      id: "ps",
      titleKey: `${K}.ps.title`,
      introKey: `${K}.ps.intro`,
      image: "/images/products/stackers/s-plosinou-product.png",
      specKeys: [
        { labelKey: `${K}.ps.specs.models.label`, valueKey: `${K}.ps.specs.models.value` },
        { labelKey: `${K}.ps.specs.capacity.label`, valueKey: `${K}.ps.specs.capacity.value` },
        { labelKey: `${K}.ps.specs.lift.label`, valueKey: `${K}.ps.specs.lift.value` },
      ],
      audienceTitleKey: `${K}.ps.audience.title`,
      audienceKeys: [
        `${K}.ps.audience.1`,
        `${K}.ps.audience.2`,
        `${K}.ps.audience.3`,
        `${K}.ps.audience.4`,
        `${K}.ps.audience.5`,
      ],
      advantagesTitleKey: `${K}.ps.advantages.title`,
      advantagesKeys: [
        `${K}.ps.advantages.1`,
        `${K}.ps.advantages.2`,
        `${K}.ps.advantages.3`,
        `${K}.ps.advantages.4`,
        `${K}.ps.advantages.5`,
        `${K}.ps.advantages.6`,
      ],
      recommendTableTitleKey: `${K}.ps.recommend.title`,
      recommendTableRows: [
        { modelKey: `${K}.ps.recommend.rows.1.model`, valueKey: `${K}.ps.recommend.rows.1.value` },
        { modelKey: `${K}.ps.recommend.rows.2.model`, valueKey: `${K}.ps.recommend.rows.2.value` },
        { modelKey: `${K}.ps.recommend.rows.3.model`, valueKey: `${K}.ps.recommend.rows.3.value` },
        { modelKey: `${K}.ps.recommend.rows.4.model`, valueKey: `${K}.ps.recommend.rows.4.value` },
      ],
      legendTitleKey: `${K}.ps.legend.title`,
      legendKeys: [
        `${K}.ps.legend.1`,
        `${K}.ps.legend.2`,
        `${K}.ps.legend.3`,
        `${K}.ps.legend.4`,
      ],
      argumentKey: `${K}.ps.argument`,
    },
    {
      id: "straddle",
      titleKey: `${K}.straddle.title`,
      introKey: `${K}.straddle.intro`,
      image: "/images/products/stackers/obkrocne.png",
      compareTitleKey: `${K}.straddle.compare.title`,
      compareLeftTitleKey: `${K}.straddle.compare.leftTitle`,
      compareRightTitleKey: `${K}.straddle.compare.rightTitle`,
      compareLeftImage: "/images/products/stackers/obkrocne.png",
      compareRightImage: "/images/products/stackers/obkrocne-pt-ps.png",
      compareRows: [
        { labelKey: `${K}.straddle.compare.rows.1.label`, leftKey: `${K}.straddle.compare.rows.1.left`, rightKey: `${K}.straddle.compare.rows.1.right` },
        { labelKey: `${K}.straddle.compare.rows.2.label`, leftKey: `${K}.straddle.compare.rows.2.left`, rightKey: `${K}.straddle.compare.rows.2.right` },
        { labelKey: `${K}.straddle.compare.rows.3.label`, leftKey: `${K}.straddle.compare.rows.3.left`, rightKey: `${K}.straddle.compare.rows.3.right` },
        { labelKey: `${K}.straddle.compare.rows.4.label`, leftKey: `${K}.straddle.compare.rows.4.left`, rightKey: `${K}.straddle.compare.rows.4.right` },
      ],
      audienceTitleKey: `${K}.straddle.audience.title`,
      audienceKeys: [
        `${K}.straddle.audience.1`,
        `${K}.straddle.audience.2`,
        `${K}.straddle.audience.3`,
        `${K}.straddle.audience.4`,
        `${K}.straddle.audience.5`,
      ],
      advantagesTitleKey: `${K}.straddle.advantages.title`,
      advantagesKeys: [
        `${K}.straddle.advantages.1`,
        `${K}.straddle.advantages.2`,
        `${K}.straddle.advantages.3`,
        `${K}.straddle.advantages.4`,
      ],
    },
  ],
};

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  isUnlocked: boolean;
  dependsOn?: string;
}

export interface SkillBranch {
  name: string;
  icon: string;
  color: string;
  nodes: SkillNode[];
}

export const SKILL_BRANCHES: SkillBranch[] = [
  {
    name: "Agriculture",
    icon: "Sprout",
    color: "emerald",
    nodes: [
      { id: "agri_1", name: "Soil Specialist", description: "Enables deep soil N-P-K testing overlay.", cost: 1, effect: "+15% crop quality detection", isUnlocked: true },
      { id: "agri_2", name: "Organic Composting", description: "Permits blending farm manure with compost.", cost: 2, effect: "+20% fertilizer effectiveness", isUnlocked: false, dependsOn: "agri_1" },
      { id: "agri_3", name: "Drip Irrigation Tech", description: "Unlocks installing water-saving subsoil pipes.", cost: 3, effect: "-30% crop water consumption", isUnlocked: false, dependsOn: "agri_2" },
      { id: "agri_4", name: "Blight Immunity", description: "Complete chemical optimization of tuber crops.", cost: 5, effect: "-75% fungal disease vulnerability", isUnlocked: false, dependsOn: "agri_3" }
    ]
  },
  {
    name: "Business",
    icon: "Briefcase",
    color: "blue",
    nodes: [
      { id: "biz_1", name: "Accounting 101", description: "Tracks detailed tax write-offs and asset values.", cost: 1, effect: "-5% annual tax liability", isUnlocked: true },
      { id: "biz_2", name: "Credit Score Booster", description: "Establishes institutional credit with the bank.", cost: 2, effect: "-2.5% bank loan interest rate", isUnlocked: false, dependsOn: "biz_1" },
      { id: "biz_3", name: "Corporate Shells", description: "Unlocks registering offshore asset subsidiaries.", cost: 4, effect: "Shields family assets from bankruptcy", isUnlocked: false, dependsOn: "biz_2" },
      { id: "biz_4", name: "Monopoly Lobbyist", description: "Allows directly petitioning Gov Office for subsidies.", cost: 6, effect: "+25% global crop subsidies", isUnlocked: false, dependsOn: "biz_3" }
    ]
  },
  {
    name: "Driving",
    icon: "SteeringWheel",
    color: "amber",
    nodes: [
      { id: "drv_1", name: "Eco Throttle", description: "Optimizes tractor torque curves to save fuel.", cost: 1, effect: "-10% vehicle fuel usage", isUnlocked: false },
      { id: "drv_2", name: "All-Wheel Friction", description: "Improves wheel slip algorithms in wet clay.", cost: 2, effect: "+20% speed on offroad mud terrain", isUnlocked: false, dependsOn: "drv_1" },
      { id: "drv_3", name: "Heavy Cargo CDL", description: "Safe driving certification for multi-axel semi-trucks.", cost: 3, effect: "Reduces rollover and brake wear by 40%", isUnlocked: false, dependsOn: "drv_2" }
    ]
  },
  {
    name: "Mechanics",
    icon: "Wrench",
    color: "red",
    nodes: [
      { id: "mec_1", name: "Lube Technician", description: "Conduct on-site oil and grease replacements.", cost: 1, effect: "+20% machine oil longevity", isUnlocked: false },
      { id: "mec_2", name: "Field Welder", description: "Conduct minor mechanical repair without workshops.", cost: 2, effect: "-50% machine repair expenses", isUnlocked: false, dependsOn: "mec_1" },
      { id: "mec_3", name: "Engine Blueprinting", description: "Overclocks engine compression ratios safely.", cost: 4, effect: "+15% tractor horsepower output", isUnlocked: false, dependsOn: "mec_2" }
    ]
  },
  {
    name: "Aquaculture",
    icon: "Fish",
    color: "cyan",
    nodes: [
      { id: "aq_1", name: "pH Management", description: "Enables adding limestone dust to acid water.", cost: 1, effect: "-20% fish mortality during storms", isUnlocked: false },
      { id: "aq_2", name: "Pellet Formulation", description: "Bakes custom high-lipid feed rations.", cost: 3, effect: "-15% Feed Conversion Ratio (FCR)", isUnlocked: false, dependsOn: "aq_1" },
      { id: "aq_3", name: "Cryo Preservation", description: "Improves handling of fresh export shrimp.", cost: 4, effect: "+30% export freshness value", isUnlocked: false, dependsOn: "aq_2" }
    ]
  },
  {
    name: "Animal Care",
    icon: "Heart",
    color: "rose",
    nodes: [
      { id: "ani_1", name: "Cattle Whisperer", description: "Improves cattle handling techniques.", cost: 1, effect: "+10% animal health stabilization", isUnlocked: false },
      { id: "ani_2", name: "In-Vitro Breeding", description: "Enables surgical sperm insertion from champions.", cost: 3, effect: "+35% genetic mutation quality transfer", isUnlocked: false, dependsOn: "ani_1" },
      { id: "ani_3", name: "Vaccination Protocol", description: "Allows administering dynamic bird flu shots.", cost: 4, effect: "Complete immunity to seasonal epidemics", isUnlocked: false, dependsOn: "ani_2" }
    ]
  },
  {
    name: "Cooking & Hospitality",
    icon: "Utensils",
    color: "orange",
    nodes: [
      { id: "cok_1", name: "Home Cook", description: "Converts farm ingredients into high-nutrition meals.", cost: 1, effect: "Increases character stamina by 30%", isUnlocked: false },
      { id: "cok_2", name: "Pastry Artistry", description: "Bakes glazed croissants with butter.", cost: 2, effect: "+25% value at village bakery shop", isUnlocked: false, dependsOn: "cok_1" },
      { id: "cok_3", name: "Gourmet Chemist", description: "Extracts custom natural pigments and sugars.", cost: 4, effect: "Provides 24-hour immunity to stress", isUnlocked: false, dependsOn: "cok_2" }
    ]
  },
  {
    name: "Crafting & Forestry",
    icon: "Hammer",
    color: "yellow",
    nodes: [
      { id: "crf_1", name: "Woodcrafter", description: "Permits shaping lumber logs into crates.", cost: 1, effect: "-20% packaging box costs", isUnlocked: false },
      { id: "crf_2", name: "Carpentry Shop", description: "Enables building modular coops and barns.", cost: 3, effect: "-40% building construction wood costs", isUnlocked: false, dependsOn: "crf_1" },
      { id: "crf_3", name: "Eco Lumberjack", description: "Allows dynamic reforestation on clear-cut zones.", cost: 4, effect: "+100% forest tree growth speed", isUnlocked: false, dependsOn: "crf_2" }
    ]
  },
  {
    name: "Trading & Arbitrage",
    icon: "TrendingUp",
    color: "purple",
    nodes: [
      { id: "trd_1", name: "Market Ticker", description: "Enables high-frequency wholesale price alerts.", cost: 1, effect: "+5% sell value on commodity exchanges", isUnlocked: false },
      { id: "trd_2", name: "Futures Hedging", description: "Purchase crops before season harvest locks prices.", cost: 3, effect: "Protects crop margin against winter crashes", isUnlocked: false, dependsOn: "trd_1" },
      { id: "trd_3", name: "Global Arbitrage", description: "Access direct shipping lanes in Rotterdam/Singapore.", cost: 5, effect: "+40% export price margins on cash crops", isUnlocked: false, dependsOn: "trd_2" }
    ]
  },
  {
    name: "Leadership",
    icon: "Award",
    color: "indigo",
    nodes: [
      { id: "ldr_1", name: "Team Captain", description: "Maintains clear employee reviews.", cost: 1, effect: "+10% hired worker baseline morale", isUnlocked: false },
      { id: "ldr_2", name: "Safety Supervisor", description: "Drastically limits factory injuries.", cost: 2, effect: "-75% workers comp legal liabilities", isUnlocked: false, dependsOn: "ldr_1" },
      { id: "ldr_3", name: "Legacy Mentor", description: "Teaches children direct corporate knowledge.", cost: 5, effect: "Children inherit 45% more skill points", isUnlocked: false, dependsOn: "ldr_2" }
    ]
  }
];

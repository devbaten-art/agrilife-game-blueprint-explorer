export interface Factory {
  id: string;
  name: string;
  description: string;
  input: { item: string; quantity: number }[];
  output: { item: string; quantity: number }[];
  machines: { name: string; cost: number; efficiencyBonus: number }[];
  workers: { tier: string; count: number; wagePerDay: number }[];
  baseMaintenance: number; // gold per day
  baseProfitMultiplier: number;
  upgradeCost: number;
  unlockedAtReputation: number;
}

export const FACTORIES: Factory[] = [
  {
    id: "rice_mill",
    name: "Automated Rice Mill",
    description: "Cleans, husks, and polishes raw paddy rice into premium grade table rice and nutrient-rich rice bran.",
    input: [{ item: "Paddy Rice", quantity: 100 }],
    output: [
      { item: "Refined White Rice", quantity: 65 },
      { item: "Organic Rice Bran", quantity: 20 }
    ],
    machines: [
      { name: "Paddy De-Husker Mark II", cost: 12000, efficiencyBonus: 12 },
      { name: "Optical Color Sorter", cost: 25000, efficiencyBonus: 18 }
    ],
    workers: [
      { tier: "Operator", count: 4, wagePerDay: 45 },
      { tier: "Quality Inspector", count: 1, wagePerDay: 70 }
    ],
    baseMaintenance: 250,
    baseProfitMultiplier: 1.35,
    upgradeCost: 50000,
    unlockedAtReputation: 1500
  },
  {
    id: "feed_mill",
    name: "Agricultural Feed Mill",
    description: "Processes grains, soy, and fish byproduct into optimized livestock pellets for livestock and fish farms.",
    input: [
      { item: "Hard Red Wheat", quantity: 40 },
      { item: "Organic Rice Bran", quantity: 40 },
      { item: "Processed Fishmeal", quantity: 20 }
    ],
    output: [{ item: "High-Protein Feed Pellets", quantity: 95 }],
    machines: [
      { name: "Heavy Duty Hammer Mill", cost: 8500, efficiencyBonus: 10 },
      { name: "Steam Pellet Extruder", cost: 19000, efficiencyBonus: 22 }
    ],
    workers: [
      { tier: "Batch Mixer Operator", count: 2, wagePerDay: 40 },
      { tier: "Loader Crew", count: 3, wagePerDay: 30 }
    ],
    baseMaintenance: 180,
    baseProfitMultiplier: 1.28,
    upgradeCost: 35000,
    unlockedAtReputation: 800
  },
  {
    id: "flour_mill",
    name: "Pneumatic Flour Mill",
    description: "Grinds wheat and auxiliary grains into fine baking flour and wheat semolina.",
    input: [{ item: "Hard Red Wheat", quantity: 100 }],
    output: [
      { item: "Baker's White Flour", quantity: 72 },
      { item: "Wheat Semolina", quantity: 15 }
    ],
    machines: [
      { name: "Pneumatic Roller Mills", cost: 15000, efficiencyBonus: 15 },
      { name: "Plansifter Purifier", cost: 22000, efficiencyBonus: 20 }
    ],
    workers: [
      { tier: "Milling Technologist", count: 2, wagePerDay: 60 },
      { tier: "Packer Operator", count: 2, wagePerDay: 35 }
    ],
    baseMaintenance: 220,
    baseProfitMultiplier: 1.30,
    upgradeCost: 45000,
    unlockedAtReputation: 1200
  },
  {
    id: "dairy_factory",
    name: "State-of-the-art Dairy Plant",
    description: "Pasteurizes raw cow and goat milk, separating it into drinking milk, gourmet cheese, and high-margin butter.",
    input: [
      { item: "Raw Milk (Cow/Goat)", quantity: 200 }
    ],
    output: [
      { item: "Pasteurized Milk", quantity: 120 },
      { item: "Artisanal Cheddar", quantity: 30 },
      { item: "Sweet Cream Butter", quantity: 15 }
    ],
    machines: [
      { name: "Flash Pasteurizer System", cost: 28000, efficiencyBonus: 25 },
      { name: "Continuous Cheese Vat", cost: 35000, efficiencyBonus: 30 }
    ],
    workers: [
      { tier: "Sterile Lab Technician", count: 1, wagePerDay: 95 },
      { tier: "Plant Operator", count: 4, wagePerDay: 50 }
    ],
    baseMaintenance: 450,
    baseProfitMultiplier: 1.55,
    upgradeCost: 80000,
    unlockedAtReputation: 3000
  },
  {
    id: "bakery",
    name: "Industrial Craft Bakery",
    description: "Combines premium baking flour, butter, and fruits into high-value packaged bread, croissants, and fruit pastries.",
    input: [
      { item: "Baker's White Flour", quantity: 50 },
      { item: "Sweet Cream Butter", quantity: 10 },
      { item: "Roma Tomato / Fruits", quantity: 20 }
    ],
    output: [
      { item: "Artisan Sourdough", quantity: 40 },
      { item: "Glazed Fruit Pastries", quantity: 25 }
    ],
    machines: [
      { name: "Spiral Dough Mixer", cost: 6000, efficiencyBonus: 10 },
      { name: "Multi-Deck Tunnel Oven", cost: 32000, efficiencyBonus: 35 }
    ],
    workers: [
      { tier: "Master Baker", count: 2, wagePerDay: 85 },
      { tier: "Pastry Chef", count: 3, wagePerDay: 65 }
    ],
    baseMaintenance: 300,
    baseProfitMultiplier: 1.48,
    upgradeCost: 60000,
    unlockedAtReputation: 2500
  },
  {
    id: "juice_factory",
    name: "Aseptic Juice Cannery",
    description: "Presses fresh apples, oranges, mangoes, and strawberries into pasteurized, shelf-stable organic juices.",
    input: [
      { item: "Fuji Apple / Orange / Mango", quantity: 100 }
    ],
    output: [
      { item: "Premium Fruit Nectar", quantity: 70 },
      { item: "Organic Citrus Pulp", quantity: 15 }
    ],
    machines: [
      { name: "Continuous Belt Press", cost: 18000, efficiencyBonus: 15 },
      { name: "UHT Sterilization Unit", cost: 42000, efficiencyBonus: 40 }
    ],
    workers: [
      { tier: "Sanitation Supervisor", count: 1, wagePerDay: 55 },
      { tier: "Bottling Operator", count: 3, wagePerDay: 40 }
    ],
    baseMaintenance: 320,
    baseProfitMultiplier: 1.42,
    upgradeCost: 65000,
    unlockedAtReputation: 2000
  },
  {
    id: "coconut_oil_factory",
    name: "Cold-Press Coconut Refinery",
    description: "Extracts virgin, cold-pressed coconut oil and produces high-demand coconut flour from mature coconut harvests.",
    input: [{ item: "Tall Coconut Palm", quantity: 80 }],
    output: [
      { item: "Virgin Coconut Oil", quantity: 25 },
      { item: "Dehydrated Coconut Flour", quantity: 35 }
    ],
    machines: [
      { name: "Hydraulic De-Husker", cost: 7000, efficiencyBonus: 8 },
      { name: "Stainless Steel Cold Expeller", cost: 24000, efficiencyBonus: 28 }
    ],
    workers: [
      { tier: "Press Mechanic", count: 2, wagePerDay: 45 },
      { tier: "Packer Crew", count: 2, wagePerDay: 30 }
    ],
    baseMaintenance: 190,
    baseProfitMultiplier: 1.38,
    upgradeCost: 40000,
    unlockedAtReputation: 1000
  },
  {
    id: "furniture_factory",
    name: "Timber & Furniture Atelier",
    description: "Cuts and shapes mature forest wood and orchard timber into premium modular home furnishings.",
    input: [
      { item: "Forest Wood Logs", quantity: 50 }
    ],
    output: [
      { item: "Premium Oak Furniture Set", quantity: 10 },
      { item: "Eco Wood Briquettes", quantity: 15 }
    ],
    machines: [
      { name: "Multi-Axis CNC Carver", cost: 45000, efficiencyBonus: 35 },
      { name: "High-Frequency Wood Dryer", cost: 15000, efficiencyBonus: 15 }
    ],
    workers: [
      { tier: "CNC Drafter & Programmer", count: 1, wagePerDay: 110 },
      { tier: "Master Joiner", count: 3, wagePerDay: 80 }
    ],
    baseMaintenance: 500,
    baseProfitMultiplier: 1.62,
    upgradeCost: 95000,
    unlockedAtReputation: 4000
  },
  {
    id: "textile_factory",
    name: "Automated Spinning & Weaving Mill",
    description: "Spins raw cotton and animal wool into high-density textiles and luxury apparel.",
    input: [
      { item: "Upland Cotton", quantity: 60 },
      { item: "Animal Wool", quantity: 30 }
    ],
    output: [{ item: "Premium Organic Apparel", quantity: 45 }],
    machines: [
      { name: "High-Speed Ring Spinning Frame", cost: 38000, efficiencyBonus: 25 },
      { name: "Air-Jet Weaving Loom", cost: 52000, efficiencyBonus: 40 }
    ],
    workers: [
      { tier: "Weaving Overseer", count: 2, wagePerDay: 70 },
      { tier: "Apparel Tailor", count: 4, wagePerDay: 55 }
    ],
    baseMaintenance: 480,
    baseProfitMultiplier: 1.58,
    upgradeCost: 85000,
    unlockedAtReputation: 3500
  },
  {
    id: "fish_processing_plant",
    name: "Cryogenic Fish Processing Plant",
    description: "Fleshes, freezes, and packs harvested tilapia, salmon, and shrimp into high-grade export seafood packs and organic fishmeal.",
    input: [{ item: "Fresh Pond Fish", quantity: 120 }],
    output: [
      { item: "Vacuum Packed Fish Fillets", quantity: 75 },
      { item: "Processed Fishmeal", quantity: 30 }
    ],
    machines: [
      { name: "Laser Filleting Robotic Arm", cost: 65000, efficiencyBonus: 45 },
      { name: "Cryogenic Nitrogen Tunnel Freezer", cost: 48000, efficiencyBonus: 35 }
    ],
    workers: [
      { tier: "HACCP Safety Auditor", count: 1, wagePerDay: 120 },
      { tier: "Processing Operator", count: 5, wagePerDay: 45 }
    ],
    baseMaintenance: 550,
    baseProfitMultiplier: 1.68,
    upgradeCost: 110000,
    unlockedAtReputation: 5000
  }
];

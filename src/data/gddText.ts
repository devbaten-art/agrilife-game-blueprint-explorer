export interface GDDSection {
  id: string;
  title: string;
  category: "Vision & Core" | "Gameplay Systems" | "Simulation & AI" | "Infrastructure & Tech" | "Production & Monetization" | "Economy & Business";
  summary: string;
  content: string; // Markdown formatted detailed content
}

export const GDD_SECTIONS: GDDSection[] = [
  {
    id: "executive_summary",
    title: "1. Executive Summary",
    category: "Vision & Core",
    summary: "High-level vision, target demographics, competitive advantages, and core design philosophies of AgriLife.",
    content: `### Executive Summary & Vision Statement

**AgriLife** is a next-generation, high-fidelity mobile life and agricultural empire simulator built on Unity 6 (URP). It bridges the gap between cozy farm games and deep, hardcore business simulators. Players do not just harvest tomatoes; they cultivate families, build global supply chains, manage multi-generational estates, drive complex machinery, and compete in dynamic, inflation-backed global markets.

#### Core Pillars
1. **Interconnected Complexity**: Every system feeds another. Fish waste fertilizes orchards; crop yields supply industrial mills; family skills dictate company overhead; weather patterns shape market pricing.
2. **Generational Legacy**: Unlike static farming simulators, characters age. Players get married, raise children, educate them, pass on skills, and eventually bequeath their agribusiness empire to their heirs.
3. **Operational Realism**: Tractors consume diesel, tires wear down, water quality in fish ponds must be chemically managed, and workers form unions or experience morale burnout.
4. **Mobile-First AAA Fidelity**: Optimized for Unity 6, utilizing the Universal Render Pipeline (URP) to deliver stunning dynamic lighting, full day/night and seasonal cycles, volumetric weather, and high-performance client execution.

#### Competitive Landscape & Differentiation
- **Cozy Competitors (Stardew Valley, Hay Day)**: Focus on static progression, lack realistic business logistics, multi-generational family trees, and realistic physical vehicle simulation.
- **Hardcore Simulators (Farming Simulator, SimCity)**: Lack the emotional attachment of family raising, NPC-driven storytelling, and mobile-first responsive mechanics.
- **AgriLife's Unique Selling Proposition (USP)**: The complete human-to-industrial pipeline. It combines emotional, family-driven character progression with a cutthroat, supply-and-demand industrial business tycoon engine.`
  },
  {
    id: "core_gameplay_loop",
    title: "2. Core Gameplay Loop",
    category: "Vision & Core",
    summary: "Detailed analysis of the Micro, Meso, Macro, and Generational loops.",
    content: `### Core Gameplay Loops & Systems Integration

\`\`\`
+-----------------------------------------------------------+
|                   MICRO LOOP (Minute-to-Minute)           |
|  - Soil tilling, crop seeding, livestock feeding, driving  |
|  - Real-time character energy, stamina & mood management   |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                   MESO LOOP (Hour-to-Hour)                |
|  - Crop harvesting, fish sorting, worker task scheduling  |
|  - Local market trading, vehicle refueling & maintenance  |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                   MACRO LOOP (Day-to-Day)                 |
|  - Family relationship events, education fee payments     |
|  - Factory feedstock supply, wholesale logistics, tax     |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|                GENERATIONAL LOOP (Year-to-Year)           |
|  - Business expansion, international shipping agreements  |
|  - Wealth transfer, character retirement, legacy unlocks   |
+-----------------------------------------------------------+
\`\`\`

#### Loop Breakdown
- **Micro Loop**: Manual operations. The tactile feel of tilling soil, watering beds, feeding specific animals, driving vehicles, and harvesting individual products. Character energy decreases, requiring nutrition and rest.
- **Meso Loop**: Tactical resource planning. Upgrading basic gear, visiting the village clinic or mechanics workshop, hiring the first helper, fulfilling basic daily orders, and monitoring local weather forecasts.
- **Macro Loop**: Strategic optimization. Building processing mills, automating logistics, negotiating shipping contracts, managing family career trajectories, paying taxes, and servicing interest-bearing loans.
- **Generational Loop**: Infinite progression. Transitioning the patriarch/matriarch to retirement. Drafting inheritance plans to minimize taxes, and continuing the empire with high-tier child heirs inheriting specialized skill perks.`
  },
  {
    id: "player_journey",
    title: "3. Player Journey",
    category: "Vision & Core",
    summary: "Detailed career phases of the player, from an indebted beginner to a global agricultural tycoon.",
    content: `### The AgriLife Player Journey

The progression framework divides the player's lifetime into seven key structural eras. Each era introduces brand-new gameplay mechanics, shifting the core experience from manual active work to strategic automation.

| Era | Title | Net Worth Target | Unlock Key Features | Core Active Work |
| :--- | :--- | :--- | :--- | :--- |
| **I** | Indebted Beginner | $0 - $10,000 | Basic handtools, local village shop, rented patch | Hand-watering, foraging, manual weed weeding |
| **II** | Growing Farmer | $10K - $100K | First tractor (used), automated sprinklers, chicken coop | Machine maintenance, seed selection, animal feed cycles |
| **III** | Business Owner | $100K - $1M | Hiring workers, wholesale contracts, cold warehouses | Worker scheduling, logistics routing, bulk sales |
| **IV** | Industrialist | $1M - $10M | Automated factories (Mills, Dairy), first semi-truck | Feedstock supply chain tuning, machine upgrades |
| **V** | Farm Empire | $10M - $50M | Multi-district farms, automated rail freight, corporate HQ | Capital allocation, brand equity, tax optimization |
| **VI** | National Leader | $50M - $250M | Subsidies lobbying, regional trade blocks, stock market | Commodity speculation, legislative influence, politics |
| **VII** | Global Ag-Tycoon | $250M+ | Port shipping container lines, private jet, world trading | Global arbitrage, corporate acquisitions, legacy prestige |`
  },
  {
    id: "open_world_design",
    title: "4. Open World Design",
    category: "Vision & Core",
    summary: "Mapping the districts, points of interest, coordinate spaces, and functional buildings.",
    content: `### Immersive Open World Layout (Verdant Valley)

The map is structured as a continuous 4x4 km streaming open world divided into several functional zones, interconnected by a dynamic highway and rail loop.

\`\`\`
       [ NORTHERN FOREST & RIVER SPRING ]
                      |
                      | (Swiftwater River)
                      v
  [ INDUSTRIAL ZONE ] ======= [ VERDANT VILLAGE CENTRE ]
          ||                        ||
          || (Rail Link)            || (Main Highway)
          ||                        ||
  [ AGRICULTURAL ZONE ] ===== [ MARITIME PORT & OCEAN ]
\`\`\`

#### Core Points of Interest (POIs)
1. **Verdant Village Centre**: Houses the **School** (where children develop business and tech skills), the **Hospital** (critical care, physical checkups, stress therapy), the **Village Bank** (saving accounts, high-interest venture loans, compound bonds), and the **Government Administrative Office** (for land titles, tax filing, and subsidy claims).
2. **Agricultural Zone**: The player's initial farm grid, which can be expanded to several adjacent fields. Neighbors other NPC farmers who trade resources.
3. **Industrial Zone**: Host to the **Factory Zone** and **Wholesale Warehouses**. Here, raw agricultural inputs are processed into higher-margin goods.
4. **Maritime Port**: Accessible in late-game. Hosts container freight docks, allowing global bulk crop export and rare agricultural machinery imports.
5. **The Wilderness (Forest, River, Lake)**: Excellent for deep forestry, wild foraging, recreational/industrial fishing, and wild seed gathering.`
  },
  {
    id: "farming_system",
    title: "5. Farming System",
    category: "Gameplay Systems",
    summary: "Physical soil preparation, planting, irrigation, chemistry, crop disease, and 100+ crop database details.",
    content: `### Deep Agriculture & Soil Science

Farming in AgriLife is not simply timer-based. It is driven by a deep, real-time chemical simulation engine.

#### Soil Chemistry Engine
Each 1m x 1m tile of crop land tracks five primary variable attributes:
- **N-P-K Levels**: Nitrogen (foliage), Phosphorus (roots), Potassium (disease resistance).
- **Moisture Level**: Driven by weather, transpiration, and irrigation grids.
- **pH Level**: Ranging from 4.0 to 9.0; affects nutrient uptake efficiency.
- **Soil Compaction**: High vehicle traffic compacts soil, reducing yield weight. Compacted soil requires deep plow ripping.
- **Organic Biomass %**: High biomass levels improve moisture and fertilizer retention.

#### Crop Diseases & Mitigation
Crops have dynamic vulnerabilities based on seasonal temperature, over-watering, and nutrient deficiencies:
- **Late Blight**: Affects tubers (potatoes, carrots) during cold, damp periods. Remediation: Copper-based fungicides.
- **Root Rot**: Triggered by persistent over-watering. Remediation: Subsoil aeration and field tiling drainage.
- **Powdery Mildew**: Triggered by high humidity and stagnant air. Remediation: Sulfur dusting and crop spacing.
- **Aphid Infestations**: Attacks leafy greens. Remediation: Organic ladybug releases or systemic chemical pesticides (which reduce final organic certification grade).

#### Detailed Crop Database
The game catalog contains 100+ items. In-depth data is loaded via the **Crop Database** tab. Crops vary in seasonality, heat tolerance, fertilizer appetite, and base dry-weight yields. Standard grains are high-volume/low-price, while cash crops (such as coffee, cocoa, saffron) require precision micro-climates but command luxury export margins.`
  },
  {
    id: "orchard_system",
    title: "6. Orchard System",
    category: "Gameplay Systems",
    summary: "Tree care, grafting, rootstock, seasonal harvests, pruning, and fruit tree life cycles.",
    content: `### Permanent Orchard Management

Unlike annual field crops, orchards represent permanent long-term capital investments that require years of structural development before reaching peak yield.

#### Life Stages of Fruit Trees
1. **Sapling (0 - 1 Years)**: Zero yield. Highly vulnerable to frost and pest damage. Requires active staking and daily watering.
2. **Juvenile (1 - 3 Years)**: Low yield. Pruning is critical during winter dormancy to establish a strong branch architecture.
3. **Mature Production (3 - 35 Years)**: High, steady yield. Yearly application of potassium-rich fertilizers is required immediately after fruit set.
4. **Senescence (35+ Years)**: Decaying yields. Requires rootstock rejuvenation, top-grafting, or systematic replacement.

#### Orchard Mechanics
- **Grafting & Rootstock Selection**: Players can graft high-value scions (e.g., Honeycrisp Apple) onto dwarf rootstocks to decrease maturation time by 40% and increase planting density, or onto robust wild rootstocks to withstand hard droughts.
- **Winter Pruning (The 'Structural Cuts')**: Minimizes the number of shoots to focus sugars and sap into 12 dominant fruiting branches, doubling fruit quality grades.
- **Frost Protection**: Using smudge pots or dynamic overhead wind machines during freezing spring nights to raise ambient branch temperature by 2°C, saving the year's blossom set.`
  },
  {
    id: "livestock_system",
    title: "7. Livestock System",
    category: "Gameplay Systems",
    summary: "Breeding, veterinary medicine, animal genetics, waste cycles, and production outputs.",
    content: `### Comprehensive Animal Husbandry

Animals in AgriLife are simulated as individual agents with unique genomic values, feeding requirements, and disease resistance coefficients.

#### Animal Management Vector
Each animal tracks:
- **Vital Indicators**: Health (0-100), Diet Saturation (0-100), Hydration (0-100), Stress (0-100).
- **Genetic Traits**: Growth Rate (g/day), Milk Fat %, Meat Yield %, Fecundity (litter size), Disease Resistance.
- **Productivity Output**: Cow (Raw Milk), Goat (Gourmet Milk/Mohair), Chicken/Duck (Eggs/Feather), Sheep (Lanolin Wool/Mutton), Horse (Draft power/Prestige).

#### Genetics & Breeding Engine
When animals mate, their offspring inherit traits via a modified Mendelian crossover matrix with a 5% mutation variance:
$$\\text{Offspring Trait} = (\\text{Sire Trait} \\times 0.45) + (\\text{Dam Trait} \\times 0.45) + (\\text{Random Mutation} \\times 0.10)$$

#### Waste & Ecosystem Loops
- **Manure Collection**: Animal sheds generate organic waste. If left unmanaged, ammonia build-up reduces animal health.
- **Slurry Fermentation**: Manure is collected into deep anaerobic biogas digestors to produce methane gas (for farm power) and high-quality liquid bio-fertilizer, replacing expensive synthetic chemical fertilizers.`
  },
  {
    id: "fish_farming",
    title: "8. Fish Farming",
    category: "Gameplay Systems",
    summary: "Pond liming, dissolved oxygen, feed conversion ratios (FCR), and aquatic yield cycles.",
    content: `### Industrial Aquaculture Simulation

Fish farming represents a highly lucrative, high-risk biological loop. The player maintains deep earthen or concrete ponds that must be carefully managed to prevent catastrophic die-offs.

#### Ponds Water Quality Matrix
1. **Dissolved Oxygen (DO)**: Measured in mg/L. Must remain between 4.5 and 8.0 mg/L. Hot summer days decrease oxygen solubility. Aerator pumps are critical.
2. **pH Levels**: Target is 6.8 - 7.8. Acidic rain drops pH, requiring calcium carbonate (liming) treatments.
3. **Ammonia ($NH_3$) & Nitrites ($NO_2^-$)**: Formed by decaying excess fish food and excrement. Toxic above 0.05 mg/L. Requires biological water filters and active water cycling.

#### Cultured Species
- **Tilapia**: Resilient, fast FCR (Feed Conversion Ratio of 1.2), low market price. Fits beginner stage.
- **Rainbow Trout**: Requires cold, highly aerated, moving water. Commands high domestic premium.
- **Pacific White Shrimp**: High stocking densities, high salinity monitoring, top-tier luxury market value.`
  },
  {
    id: "business_system",
    title: "9. Business System",
    category: "Economy & Business",
    summary: "Logistics routing, retail vs. wholesale, warehousing, distribution networks, and contracts.",
    content: `### Agribusiness Conglomerate Simulation

Once production surpasses basic village market needs, players pivot from manual selling to large-scale business operations.

#### Wholesale vs. Retail Sales Channels
- **Local Village Market**: High price per unit, but extremely low volume caps. Requires manual player presence or family help.
- **Wholesale Processing Contracts**: Medium price per unit, high recurring volume contracts. Failure to deliver on contract deadlines results in severe credit and reputation penalties.
- **Global Export (Port/Airport)**: Highest price and unlimited volumes, but requires expensive packaging, FDA-equivalent certifications, cold-chain transport, and export customs clearances.

#### Logistics & Warehousing
- **Cold Storage Logistics**: perishable items (lettuce, milk, shrimp) decompose rapidly unless stored in high-grade chilling warehouses ($4^\\circ\\text{C}$) or deep blast-freezers ($-18^\\circ\\text{C}$).
- **Supply Chain Routing**: Players design truck shipping routes. Distances translate to fuel usage, tire degradation, and transit delays. Route scheduling software upgrades automate dispatching.`
  },
  {
    id: "factory_system",
    title: "10. Factory System",
    category: "Economy & Business",
    summary: "Industrial manufacturing plants, supply chains, manufacturing formulas, and equipment upgrades.",
    content: `### Agro-Industrial Manufacturing Plants

Factories convert cheap agricultural raw products into premium consumer packaged goods. They are the primary source of compound wealth generation in the late game.

#### The 10 Primary Factory Types
The full operating formulas, input/output structures, and upgrade mechanics for all 10 factories (Rice Mill, Feed Mill, Flour Mill, Dairy Factory, Bakery, Juice Factory, Coconut Oil Factory, Furniture Factory, Textile Factory, and Fish Processing Plant) are integrated within the interactive **Factory Simulator** dashboard.`
  },
  {
    id: "family_management_system",
    title: "11. Family Management System",
    category: "Gameplay Systems",
    summary: "Durable relationships, spouse dynamics, schooling, child growth phases, estate tax, and lineage legacy.",
    content: `### Generation-Spanning Family & Lineage Mechanics

The player is not immortal. Character energy declines with age, culminating in retirement (age 65-75) or biological death. Establishing a healthy, highly skilled lineage is vital for long-term progression.

#### Partner Selection & Marital Sync
- NPCs have unique personalities, family background wealth, and skill sets.
- **Relationship Value (0-100)**: Cultivated through conversations, helpful quests, shared festival attendance, and gifting.
- **Marriage Contract**: Pools asset valuations, grants tax-filing benefits, and unlocks a permanent spouse co-manager who can automate specific farm sections.

#### Child Development & Growth Phases
1. **Infancy (0 - 2 Years)**: Requires active nanny hire or parental time. Sleep schedules affect parental stamina.
2. **Early Childhood (2 - 6 Years)**: Interactive play increases base cognitive and physical capacity caps.
3. **Schooling (6 - 18 Years)**: The player pays tuition for Village School (local skills) or Metro Academy (high business/engineering skills).
4. **Adulthood (18+)**: Fully playable. Can be assigned as farmhands, factory managers, logistics directors, or global sales agents (reducing executive salaries).

#### Inheritance & Will Execution
- **Estate Tax**: Passing assets to heirs triggers a 15% inheritance tax unless managed through a registered Family Trust (requires 50,000 gold setup, unlocks at Business level 8).
- **Will Drafting**: Distributing land, shares, vehicles, and cash across children. Highly unequal distributions trigger family stress and friction, decreasing worker morale if they manage family sectors.`
  },
  {
    id: "character_progression",
    title: "12. Character Progression",
    category: "Vision & Core",
    summary: "Core stats, health, stress, energy, physical fitness, and prestige progression.",
    content: `### Character Mechanics & Biometrics

Characters are driven by three primary biological systems: **Energy**, **Stress**, and **Health**.

#### Biometrics Formula
- **Energy Decline**: Manual tilling, plowing, and operating heavy tools reduces Stamina directly. Highly processed sugar snacks provide instant spikes followed by heavy crashes; organic high-protein meals sustain energy for 8 hours.
- **Stress Accumulation**: Driven by heavy debts, family conflicts, consecutive 14-hour workdays, and crop disease infestations. High stress reduces physical work speed by up to 35% and increases susceptibility to dynamic illness.
- **Health Decay & Longevity**: Dictated by age, chronic stress, diet, and dynamic injuries (e.g., tractor tipping, animal bites). Healthy diets and regular hospital checkups extend character lifespan by up to 15 years.`
  },
  {
    id: "skill_tree",
    title: "13. Skill Tree",
    category: "Vision & Core",
    summary: "Ten disciplines of farming, mechanics, and corporate leadership with dependency unlocks.",
    content: `### Ten Specialized Skill Branches

Experience points earned from performing specific tasks can be invested to unlock high-tier active and passive capabilities.

#### Skill Disciplines
1. **Agriculture**: Unlocks deep soil testing, custom composting, and high-speed harvesting speed.
2. **Business**: Reduces bank loan interest rates, unlocks corporate shell company registration, and adds wholesale bonuses.
3. **Driving**: Decreases diesel consumption, increases vehicle speed, and reduces heavy truck rollover risk.
4. **Mechanics**: Allows self-repairing heavy tractors, reducing expensive workshop costs.
5. **Fishing & Aquaculture**: Optimizes feed conversion ratios and increases wild fish bite probability.
6. **Animal Care**: Unlocks genetic pedigree mapping and organic milk bonuses.
7. **Cooking**: Converts crops into highly nutritious meals with status-buff benefits.
8. **Crafting**: Enables low-cost farm building construction and wooden tools.
9. **Trading**: Unlocks wholesale market arbitrage alerts and high-frequency price tracking.
10. **Leadership**: Increases hired worker morale by 1% per level and reduces supervisor overhead.`
  },
  {
    id: "worker_management",
    title: "14. Worker Management",
    category: "Economy & Business",
    summary: "Recruiting, wages, performance monitoring, morale, and automation roles.",
    content: `### Automated Workforce & HR Operations

As the farming enterprise grows, manual player actions are replaced by hiring a diverse local workforce.

#### Worker Attributes
- **Skill Proficiency (Level 1 - 10)**: Affects task efficiency and error rates (e.g., fuel wasted, livestock neglected).
- **Morale Value (0 - 100%)**: Low morale ($<40\%$) triggers labor strikes, equipment theft, and slower work rates. Morale is driven by competitive wages, reasonable work hours (max 8 hours/day without overtime pay), and comfortable site facilities.
- **Experience Accumulation**: Workers earn experience from designated work, unlocking higher-tier promotions (e.g., transitioning an operator to a Factory Supervisor).`
  },
  {
    id: "vehicle_system",
    title: "15. Vehicle System",
    category: "Gameplay Systems",
    summary: "Heavy agricultural machinery, diagnostic logs, fuel consumption, and maintenance schedules.",
    content: `### Dynamic Vehicle & Farm Machinery Physics

Vehicles are not simple static skins; they have precise weight, horsepower, terrain friction, and engine load curves.

#### Fleet Specifications
- **Tractor (Utility)**: Primary draft force. Pulls plows, seeding drills, and sprayers. Heavy load increase fuel consumption by 300%.
- **Harvester (Heavy Industrial)**: Reaps, threshes, and winnows grains. High maintenance costs.
- **Truck & Pickup**: High-speed road transport. Crucial for delivering products to wholesale terminals.
- **Excavator & Bulldozer**: Used for earthmoving, digging drainage ditches, and excavating deep aquaculture ponds.

#### Diagnostic Maintenance Loops
- **Fuel Mechanics**: Vehicles consume high-sulfur diesel or bio-diesel. Low-grade fuel reduces engine efficiency.
- **Oil & Filter Degradation**: Engine health degrades rapidly if engine oil is not replaced every 50 operating hours.
- **Tire Wear & Alignment**: Heavy mud operations increase tire wear, reducing tractive force and increasing field slip.`
  },
  {
    id: "economy_simulation",
    title: "16. Economy Simulation",
    category: "Economy & Business",
    summary: "Interactive macroeconomic engine modeling inflation, wholesale supply shocks, taxes, and loan compound interest.",
    content: `### Macroeconomic Simulation Engine

The world of AgriLife runs on a complex economic simulation engine that models dynamic macro variables.

#### Dynamic Macroeconomic Equation
The baseline price ($P$) of any commodity in the market is modeled dynamically as a function of regional demand ($D$), regional supply ($S$), current inflation rate ($I$), seasonal multiplier ($M$), and global market events ($E$):

$$P = \\left(\\frac{D}{S}\\right) \\times (1 + I) \\times M \\times E$$

#### Macro Systems
- **Taxes**: Structured tax tiers (10% local farm tax up to 35% global export tariff). File taxes before the spring deadline to avoid heavy penalties or asset seizure.
- **Subsidies**: Active government programs (e.g., "Sorghum Fuel Initiative") that pay bonuses to farmers growing specific target crops.
- **Dynamic Stocks**: In late-game, buy and trade agricultural commodity futures on the local stock exchange to hedge against winter price drops.`
  },
  {
    id: "weather_simulation",
    title: "17. Weather Simulation",
    category: "Simulation & AI",
    summary: "Volumetric climate effects, seasonal cycles, humidity, drought risk, and crop protection systems.",
    content: `### Volumetric Climate & Weather Engine

Weather directly controls soil moisture levels, crop growth speeds, vehicle handling physics, and disease probability.

#### Seasonal Cycles (1 Year = 4 Seasons = 48 Game Days)
- **Spring (12 Days)**: High rain, warm temperatures, optimal planting window. Moderate mildew probability.
- **Summer (12 Days)**: High heat, intense solar radiation, maximum evaporation rate. High irrigation needs.
- **Autumn (12 Days)**: Dry winds, cool nights, primary harvest window. Low water requirements.
- **Winter (12 Days)**: Snow, frost, freezing soil. No outdoor crops grow (requires greenhouses).

#### Weather Hazards & Mitigation
- **Flood**: Extreme storms saturate soil, rotting roots. Mitigation: Excavate deep drainage ditches and install automated sump pump grids.
- **Heat Wave / Drought**: Water tables drop, soil compaction increases. Mitigation: Deep drip irrigation, mulch placement, and water towers.
- **Drought Risk**: Restricts water draws from the village river. Ponds must recycle water.`
  },
  {
    id: "ai_system",
    title: "18. AI System",
    category: "Simulation & AI",
    summary: "Behavior trees for NPC social schedules, worker automation, and realistic animal flocking.",
    content: `### Advanced Multi-Agent AI Framework

The world feels alive because every actor runs on a customized decision-making architecture.

\`\`\`
                  [ STRATEGIC DESIRE SELECTOR ]
                  (Energy, Wealth, Relationship)
                               |
                               v
               [ UTILITY BASED ACTION EVALUATOR ]
              (Score potential targets on map)
                               |
                               v
              [ FINITE STATE MACHINE EXECUTION ]
               (Walk, Interact, Work, Sleep)
\`\`\`

#### AI Modules
- **NPC AI Schedule**: Village NPCs have daily schedules (e.g., Mayor is in the Gov Office from 9:00 to 17:00, then visits the Tavern). Schedules change on rainy days and during festivals.
- **Worker Task Automation**: Workers read farm priority task lists (e.g., 'A1: Seed Corn', 'B1: Feed Cows'). Their paths are computed using dynamic A* navigation that avoids heavy vehicle paths.
- **Animal AI Behavior**: Animals flock, search for pasture grass, seek shade during heat waves, and huddle in barns during storms.`
  },
  {
    id: "npc_design",
    title: "19. NPC Design",
    category: "Vision & Core",
    summary: "Biographies, trade relationships, and quests for village characters.",
    content: `### Village NPC Network

A roster of 30+ highly-developed characters populate the village, offering unique trade pipelines, social alliances, and story arcs.

#### Key Characters
1. **Mayor Arthur Pendelton**: Oversees land purchases, tax rates, and local village development projects. Can be lobbied for zoning permits.
2. **Dr. Evelyn Reed (Chief Surgeon)**: Operates the medical clinic. Offers health supplements, stress management therapy, and physical trauma surgeries.
3. **Marcus Vance (Lead Mechanic)**: Runs the machinery workshop. Repairs vehicles, installs performance turbochargers, and trades used parts.
4. **Alia Sterling (Chief Banker)**: Approves mortgages, processes business loans, and coordinates investment stock trading.`
  },
  {
    id: "mission_system",
    title: "20. Mission System",
    category: "Vision & Core",
    summary: "Dynamic community orders, storyline progression, and structural achievements.",
    content: `### Story, Daily, and Community Mission System

Missions provide progression guidelines, early-game capital, and global reputation points.

#### Mission Categories
- **Story Campaigns**: Multistage narrative arcs focusing on recovering the family's bankrupt farm, uncovering corporate embezzlement in the village, or pioneering sustainable energy.
- **Dynamic Commodity Board**: Daily village noticeboard requests (e.g., "Produce 50kg Organic Lettuce for School Cafeteria").
- **Emergency Events**: High-priority crises with limited timers (e.g., "Sudden blight at neighboring orchard: Deliver 20kg organic fungicide in 2 days").
- **Festivals & Agricultural Exhibitions**: Fall competitions where players display their highest-quality crops or heaviest livestock to win cash prizes and unique legacy badges.`
  },
  {
    id: "building_system",
    title: "21. Building System",
    category: "Gameplay Systems",
    summary: "Modular construction, layout editing, zoning, and facility upgrades.",
    content: `### Modular Farm & Infrastructure Construction

Players can build and customize their farming layouts. Buildings are not just cosmetic; they possess physical constraints and storage capacities.

#### Structures Portfolio
- **Dwellings (Farmhouse)**: Upgrades unlock room additions, nurseries (for expanding the family), and high-grade kitchen facilities.
- **Storage Warehouses**: Silos (for storing grains, dry corn), cold storage rooms, and dry-logistics sheds.
- **Agricultural Enclosures**: Cow Barns, Chicken Coops, Pig Pens, and greenhouses equipped with climate-control automation.
- **Utility Installations**: Deep water wells, electric generators, biogas digestors, solar panel arrays, and slurry pits.`
  },
  {
    id: "save_system",
    title: "22. Save System",
    category: "Infrastructure & Tech",
    summary: "State serialization, cloud-sync, conflict resolution, offline validation, and backup schemes.",
    content: `### Enterprise Save-State Architecture

Mobile games must handle high-latency networks and unpredictable application closures without ever risking player progress.

#### Serialization Pipeline
- **Binary JSON Format**: High-speed schema serialization, packed via custom GZIP streams before writing to disk.
- **Local SQLite DB Cache**: Tracks tick-by-tick micro-transactions, preventing database loss if the mobile battery dies instantly.
- **Deterministic Checksums**: Out-of-game local saves are signed with a server-validated HMAC SHA256 key to prevent save-file hacking and item duplicating.
- **Cloud Conflict Resolution Strategy**: On game launch, local save timestamps are compared against the Cloud version. In case of drift, the system displays an elegant, data-rich prompt highlighting total gold, family generation level, and play hours on both versions to let the player choose.`
  },
  {
    id: "multiplayer_roadmap",
    title: "23. Multiplayer Roadmap",
    category: "Infrastructure & Tech",
    summary: "Cooperative operations, global marketplace integration, and community guilds.",
    content: `### Cooperative Multiplayer Strategy

While single-player focuses on personal dynasty building, multiplayer transforms AgriLife into an active community experience.

#### Release Phases
1. **Phase 1: Friend Visits & Gifts**: Visit neighboring farms, inspect their visual layouts, help water their crops, and send premium breeding gifts.
2. **Phase 2: Decentralized Marketplace**: Player-to-player trade boards. Allows agricultural specialization (e.g., one player breeds elite cattle, another mills grain, and they trade resources).
3. **Phase 3: Cooperative Agriculture Corporations (Guilds)**: Players pool capital to build massive industrial shipping terminals and purchase expensive heavy machinery (like combine harvesters) to share amongst members.`
  },
  {
    id: "monetization",
    title: "24. Monetization",
    category: "Production & Monetization",
    summary: "Ethical free-to-play economics, VIP clubs, season passes, and customized cosmetics.",
    content: `### Ethical & Sustainable Free-to-Play Economy

AgriLife prioritizes long-term player retention over aggressive short-term monetization. We reject toxic pay-to-win (P2W) wall structures.

#### Revenue Design Vectors
- **Premium Customization (Cosmetics)**: Custom paint skins for heavy tractors, historical outfits for family members, and high-end mahogany furniture for the farmhouse.
- **Regional Season Passes**: Grants seasonal quest rewards, decorative garden layouts, and rare companion animals (e.g., sheepdogs that automate animal herding).
- **VIP Country Club Membership**: Small, recurring monthly subscription that waives the daily bank administrative fees, grants free delivery logistics slots, and gives a 5% discount at the local workshop.`
  },
  {
    id: "liveops",
    title: "25. LiveOps",
    category: "Production & Monetization",
    summary: "Seasonal content schedules, global player challenges, and rotating community festivals.",
    content: `### Live Services Operations (LiveOps)

To maintain high multi-year engagement, the game runs a tightly managed real-world events calendar.

#### Event Matrices
- **Holiday Festivals**: Themed in-game winter festivals (e.g., Winter Yuletide Fair) where snowmen, hot chocolate stands, and specific winter-hardy crops (like winter rye) yield limited-edition blueprints.
- **Community Harvesting Challenges**: Server-wide aggregate challenges (e.g., "Server must ship 10,000 tons of white rice in 7 days") that unlock public infrastructure upgrades like bridge repairs or lower port tariffs.
- **Dynamic Trade Fairs**: Rotating regional buyers who visit the village docks, offering a 30% premium on specific commodities (e.g., cocoa beans or organic wool).`
  },
  {
    id: "analytics",
    title: "26. Analytics",
    category: "Production & Monetization",
    summary: "Behavioral funnels, churn modeling, currency metrics, and automated heatmaps.",
    content: `### Production-Grade Behavioral Analytics

Deep data tracking ensures that balancing issues can be quickly identified and addressed.

#### Key Telemetry Events
1. **Economy Sink/Faucet Balance**: Tracks the total amount of gold generated (faucets) vs. gold spent (sinks) per level tier to prevent rapid hyperinflation.
2. **Funnel Churn Analysis**: Maps early-game tutorials (e.g., 'Tilling Farm -> Sowing First Seed -> Selling First Crop') to catch points where new players close the app.
3. **Tractor Heatmaps**: Coordinates mapping high-traffic vehicle paths, pointing to where players get stuck on terrain geometries or experience physics collision bugs.`
  },
  {
    id: "technical_architecture",
    title: "27. Technical Architecture",
    category: "Infrastructure & Tech",
    summary: "Unity 6 architectural pipeline, C# design patterns, game managers, and asset streams.",
    content: `### Unity 6 & C# Technical Architecture

A clean, decoupled architecture is vital for maintainability and scalability across decades of updates.

#### Core Architecture Specifications
The detailed layout of directories, assembly definitions, C# design patterns (Dependency Injection, Entity Component Systems, Event Brokers), object pooling configurations, and Addressable Asset pipeline is located in the **Technical Architecture** visualization tab.`
  },
  {
    id: "ui_ux",
    title: "28. UI / UX",
    category: "Infrastructure & Tech",
    summary: "Mobile layouts, touch safety zones, UI asset optimization, and accessibility.",
    content: `### Mobile-First Interface Architecture

The user interface must be accessible for one-handed portrait holding or comfortable two-handed landscape operations.

#### UI Guidelines
- **Responsive Layout Hierarchy**: Elements are anchored safely away from device notches and physical screen curves.
- **Dynamic Canvas Scaling**: Resolution-independent SVG vectors prevent blurring on high-density displays (e.g., Apple Retina, Samsung AMOLED).
- **Physical Feedback**: Staggered tap-down audio clicks, high-contrast text contrasts, and haptic motor tick signals are applied to all interactive buttons.`
  },
  {
    id: "audio",
    title: "29. Audio",
    category: "Infrastructure & Tech",
    summary: "Acoustic ecology, field recordings, interactive engine sound physics, and musical scoring.",
    content: `### Dynamic Acoustic Soundscapes

Audio in AgriLife provides immersive psychological feedback on the state of the game world.

#### Acoustic Systems
- **Dynamic Engine Revs**: Tractors utilize granular synthesis pitch modulation. Engine sound changes pitch based on vehicle speed, engine strain (pulling deep plows), and fuel levels.
- **Biometric Ambient Loops**: Nature sounds change dynamically based on season, time, and weather (e.g., crickets during hot summer nights; wind rustling bare branches during snowy winters).
- **Emotional Score**: Acoustic instrumentation (guitars, cellos, woodwinds) that adapts in complexity to match the player's prosperity level.`
  },
  {
    id: "graphics",
    title: "30. Graphics",
    category: "Infrastructure & Tech",
    summary: "Unity Universal Render Pipeline (URP), custom shaders, dynamic lighting, and optimization.",
    content: `### AAA Visual Execution & Shader Pipelines

AgriLife uses URP to achieve beautiful visuals on mid-range and high-end mobile devices.

#### Graphical Stack
- **Custom HLSL Foliage Shader**: Simulates dynamic wind bending, sub-surface scattering, and seasonal pigment shifting (leaves turning orange in autumn, dry in summer).
- **Depth-Based Water Shader**: Simulates physical pond turbidities, fish shadows, and dynamic ripples from aerator pumps and rain impacts.
- **Dynamic Skybox & Shadows**: Real-time atmospheric scattering. Shadows grow long as the sun sets and shorten at noon.`
  },
  {
    id: "production_plan",
    title: "31. Production Plan",
    category: "Production & Monetization",
    summary: "Gantt schedules, milestone checklist, sprint strategies, QA protocols, and risks.",
    content: `### 18-Month AAA Development Roadmap

Bringing a simulation of this scale to market requires a highly-organized, phased production strategy.

#### Timeline Breakdown
The full visual timeline, including milestones (Pre-Production, Vertical Slice, Alpha, Beta, Soft Launch, and LiveOps), risk matrices, and contingency guidelines, is detailed in the **Production Roadmap** interactive tab.`
  }
];

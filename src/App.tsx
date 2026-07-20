import React, { useState, useMemo } from "react";
import {
  Sprout,
  Briefcase,
  Shield,
  Activity,
  Wrench,
  Fish,
  Heart,
  Utensils,
  Hammer,
  TrendingUp,
  Award,
  Search,
  BookOpen,
  Sliders,
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  Compass,
  Layers,
  Settings,
  Flame,
  Zap,
  Sparkles,
  Clock,
  Truck,
  FileText,
  Map,
  X,
  Info,
  ChevronDown
} from "lucide-react";

import { CROPS, generateExtendedCrops, Crop } from "./data/crops";
import { FACTORIES, Factory } from "./data/factories";
import { GDD_SECTIONS, GDDSection } from "./data/gddText";
import { SKILL_BRANCHES, SkillBranch, SkillNode } from "./data/skills";

// Simple robust custom markdown-like renderer to parse the rich GDD text beautifully
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const processedElements = lines.map((line, idx) => {
    const trimmed = line.trim();

    // End table if line doesn't start with |
    if (inTable && !trimmed.startsWith("|")) {
      inTable = false;
      const currentHeader = [...tableHeader];
      const currentRows = [...tableRows];
      tableHeader = [];
      tableRows = [];
      return (
        <div key={`table-${idx}`} className="overflow-x-auto my-6 border border-slate-800 rounded-xl bg-slate-950/60 backdrop-blur-md">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800">
                {currentHeader.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-emerald-400 font-display">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {currentRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-slate-300 font-sans">
                      {cell.trim().replace(/\*\*(.*?)\*\*/g, "$1")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xl font-bold font-display text-white mt-8 mb-4 border-l-4 border-emerald-500 pl-3 flex items-center gap-2">
          {trimmed.substring(4)}
        </h3>
      );
    }

    // Heading 4
    if (trimmed.startsWith("#### ")) {
      return (
        <h4 key={idx} className="text-base font-semibold font-display text-emerald-400 mt-6 mb-3">
          {trimmed.substring(5)}
        </h4>
      );
    }

    // Bullet points
    if (trimmed.startsWith("- ")) {
      const parts = trimmed.substring(2).split(":");
      if (parts.length > 1) {
        return (
          <li key={idx} className="ml-6 list-disc text-slate-300 mb-2 leading-relaxed">
            <strong className="text-slate-100">{parts[0]}:</strong>
            {parts.slice(1).join(":")}
          </li>
        );
      }
      return (
        <li key={idx} className="ml-6 list-disc text-slate-300 mb-2 leading-relaxed">
          {trimmed.substring(2)}
        </li>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      if (match) {
        const parts = match[2].split(":");
        return (
          <div key={idx} className="ml-4 flex gap-3 text-slate-300 mb-3 leading-relaxed">
            <span className="font-mono text-emerald-500 font-semibold">{match[1]}.</span>
            <div>
              {parts.length > 1 ? (
                <>
                  <strong className="text-slate-100">{parts[0]}:</strong>
                  {parts.slice(1).join(":")}
                </>
              ) : (
                match[2]
              )}
            </div>
          </div>
        );
      }
    }

    // Table parser
    if (trimmed.startsWith("|")) {
      const cells = trimmed.split("|").slice(1, -1);
      if (trimmed.includes("---") || trimmed.includes(":-")) {
        // Separator line, ignore
        return null;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
        return null;
      } else {
        tableRows.push(cells);
        return null;
      }
    }

    // Horizontal Rule
    if (trimmed === "---") {
      return <hr key={idx} className="my-8 border-slate-800" />;
    }

    // Empty space
    if (trimmed === "") {
      return <div key={idx} className="h-2" />;
    }

    // Regular paragraphs with basic inline styling
    let parsedLine = trimmed;
    // Bold parsing: **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(parsedLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(parsedLine.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < parsedLine.length) {
      parts.push(parsedLine.substring(lastIndex));
    }

    return (
      <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-sm font-sans">
        {parts.length > 0 ? parts : parsedLine}
      </p>
    );
  });

  return <div className="space-y-1">{processedElements}</div>;
}

export default function App() {
  // Global Navigation State
  const [activeTab, setActiveTab] = useState<
    "gdd" | "crop_sim" | "factory_sim" | "animal_sim" | "family_sim" | "economy_sim" | "skills" | "hud_ux" | "roadmap"
  >("gdd");
  const [activeSectionId, setActiveSectionId] = useState<string>("executive_summary");
  const [gddSearch, setGddSearch] = useState<string>("");

  // Crop database seed including extra items up to 108
  const extendedCrops = useMemo(() => generateExtendedCrops(), []);

  // --- UNLOCKED SKILL STATE ---
  const [unlockedSkills, setUnlockedSkills] = useState<Record<string, boolean>>({
    agri_1: true,
    biz_1: true,
  });
  const [skillPoints, setSkillPoints] = useState<number>(3);

  // --- INTERACTIVE SIMULATION STATES ---

  // 1. Farming Crop Simulator State
  const [simCropId, setSimCropId] = useState<string>("paddy_rice");
  const [soilQuality, setSoilQuality] = useState<number>(80); // 0-100%
  const [fertilizerType, setFertilizerType] = useState<"None" | "Organic slurry" | "NPK Premium">("Organic slurry");
  const [irrigationSchedule, setIrrigationSchedule] = useState<"Optimum" | "Dry" | "Flooded">("Optimum");
  const [hasInsects, setHasInsects] = useState<boolean>(false);

  // 2. Factory Operating Pipeline State
  const [selectedFactoryId, setSelectedFactoryId] = useState<string>("rice_mill");
  const [factoryWorkers, setFactoryWorkers] = useState<number>(4);
  const [factoryMachines, setFactoryMachines] = useState<number>(1);
  const [factoryUpgradeTier, setFactoryUpgradeTier] = useState<number>(1);

  // 3. Animal Care & Pond Simulator State
  const [animalType, setAnimalType] = useState<"Cow" | "Goat" | "Sheep" | "Horse">("Cow");
  const [animalFeedLevel, setAnimalFeedLevel] = useState<number>(85);
  const [animalCleanliness, setAnimalCleanliness] = useState<number>(90);
  const [animalVaccination, setAnimalVaccination] = useState<boolean>(false);

  // Pond aquaculture state
  const [pondPh, setPondPh] = useState<number>(7.2);
  const [dissolvedOxygen, setDissolvedOxygen] = useState<number>(6.5);
  const [pondWaterFlow, setPondWaterFlow] = useState<"Low" | "Medium" | "High">("Medium");

  // 4. Family Legacy simulation State
  const [currentGeneration, setCurrentGeneration] = useState<number>(1);
  const [childEducation, setChildEducation] = useState<"None" | "Local Village" | "Metro Academy">("Local Village");
  const [childCareer, setChildCareer] = useState<"Farmhand" | "Factory Lead" | "Logistics Manager" | "Trader">("Farmhand");
  const [estateValue, setEstateValue] = useState<number>(250000);

  // 5. Weather & Macroeconomic sandbox State
  const [currentSeason, setCurrentSeason] = useState<"Spring" | "Summer" | "Autumn" | "Winter">("Spring");
  const [inflationRate, setInflationRate] = useState<number>(4); // percentage
  const [macroEvent, setMacroEvent] = useState<string>("Stable Trading");

  // Filter GDD sections based on search
  const filteredSections = useMemo(() => {
    return GDD_SECTIONS.filter(
      (section) =>
        section.title.toLowerCase().includes(gddSearch.toLowerCase()) ||
        section.summary.toLowerCase().includes(gddSearch.toLowerCase()) ||
        section.content.toLowerCase().includes(gddSearch.toLowerCase())
    );
  }, [gddSearch]);

  const activeSection = useMemo(() => {
    return GDD_SECTIONS.find((s) => s.id === activeSectionId) || GDD_SECTIONS[0];
  }, [activeSectionId]);

  // Calculations for Crop Simulator
  const cropCalculation = useMemo(() => {
    const crop = extendedCrops.find((c) => c.id === simCropId) || extendedCrops[0];
    
    // Skill bonus
    const soilSpecialistUnlocked = unlockedSkills["agri_1"];
    const organicCompostUnlocked = unlockedSkills["agri_2"];
    const dripIrrigationUnlocked = unlockedSkills["agri_3"];
    const blightImmunityUnlocked = unlockedSkills["agri_4"];

    // Base multipliers
    let yieldMultiplier = 1.0;
    let qualityScore = 70; // out of 100

    // Apply soil
    yieldMultiplier *= (soilQuality / 100) * 1.2;
    qualityScore += (soilQuality - 50) * 0.3;

    // Apply fertilizer
    if (fertilizerType === "NPK Premium") {
      yieldMultiplier *= 1.35;
      qualityScore += 5;
    } else if (fertilizerType === "Organic slurry") {
      yieldMultiplier *= organicCompostUnlocked ? 1.25 : 1.15;
      qualityScore += 15; // Higher organic grade quality
    } else {
      yieldMultiplier *= 0.7;
      qualityScore -= 15;
    }

    // Apply irrigation
    if (irrigationSchedule === "Dry") {
      yieldMultiplier *= dripIrrigationUnlocked ? 0.85 : 0.55;
      qualityScore -= 20;
    } else if (irrigationSchedule === "Flooded") {
      yieldMultiplier *= 0.65;
      qualityScore -= 10;
    } else {
      yieldMultiplier *= 1.1;
      qualityScore += 10;
    }

    // Apply insects
    let activeDiseaseProb = crop.diseaseProbability;
    if (blightImmunityUnlocked && crop.category === "Tuber") {
      activeDiseaseProb *= 0.25;
    }
    if (hasInsects) {
      yieldMultiplier *= 0.45;
      qualityScore -= 30;
    }

    // Bound quality
    qualityScore = Math.min(100, Math.max(10, Math.round(qualityScore)));

    // Calculate final yield
    const baseWeight = crop.baseWeight;
    const finalWeight = parseFloat((baseWeight * yieldMultiplier * 100).toFixed(1)); // 100 plant block
    
    // Dynamic price from macro inflation
    const inflationMultiplier = 1 + (inflationRate / 100);
    const seasonMultiplier = crop.season === currentSeason ? 1.25 : 0.85;

    const finalMarketPrice = parseFloat((crop.marketValue * inflationMultiplier * seasonMultiplier * (qualityScore / 100)).toFixed(2));
    const finalExportPrice = parseFloat((crop.exportValue * inflationMultiplier * seasonMultiplier * (qualityScore / 100) * (unlockedSkills["trd_3"] ? 1.4 : 1.0)).toFixed(2));

    const revenueDomestic = parseFloat((finalWeight * finalMarketPrice).toFixed(2));
    const revenueExport = parseFloat((finalWeight * finalExportPrice).toFixed(2));

    return {
      crop,
      finalWeight,
      qualityScore,
      finalMarketPrice,
      finalExportPrice,
      revenueDomestic,
      revenueExport,
      diseaseRisk: activeDiseaseProb,
      soilSpecialistUnlocked
    };
  }, [simCropId, soilQuality, fertilizerType, irrigationSchedule, hasInsects, currentSeason, inflationRate, unlockedSkills]);

  // Calculations for Factory System
  const factoryCalculation = useMemo(() => {
    const factory = FACTORIES.find((f) => f.id === selectedFactoryId) || FACTORIES[0];
    
    // Modifiers from upgrades
    const machineBonus = factoryMachines * 0.15;
    const workerBonus = (factoryWorkers / 4) * 0.25;
    const upgradeBonus = factoryUpgradeTier * 0.2;

    const totalEfficiency = 1.0 + machineBonus + workerBonus + upgradeBonus;
    
    // Calculate outputs and pricing
    const baseInputs = factory.input;
    const baseOutputs = factory.output;

    const scaledInputs = baseInputs.map(inp => ({
      item: inp.item,
      quantity: Math.round(inp.quantity * (totalEfficiency * 0.8))
    }));

    const scaledOutputs = baseOutputs.map(outp => ({
      item: outp.item,
      quantity: Math.round(outp.quantity * totalEfficiency)
    }));

    // Financial estimations
    const dailyWage = factory.workers.reduce((acc, curr) => acc + (curr.wagePerDay * factoryWorkers), 0);
    const dailyUpkeep = factory.baseMaintenance * (1 + (factoryMachines * 0.12)) * (1 - (unlockedSkills["mec_2"] ? 0.5 : 0));
    
    // Simulated gross profits
    const estGrossRevenue = 1500 * factory.baseProfitMultiplier * totalEfficiency;
    const netProfit = Math.round(estGrossRevenue - (dailyWage + dailyUpkeep));

    return {
      factory,
      scaledInputs,
      scaledOutputs,
      dailyWage,
      dailyUpkeep,
      netProfit,
      totalEfficiency: Math.round(totalEfficiency * 100)
    };
  }, [selectedFactoryId, factoryWorkers, factoryMachines, factoryUpgradeTier, unlockedSkills]);

  // Calculations for Animal & Pond
  const animalCalculation = useMemo(() => {
    const cattleWhispererUnlocked = unlockedSkills["ani_1"];
    const vaccineUnlocked = unlockedSkills["ani_3"] || animalVaccination;

    let baseHealth = 80;
    // apply feed and clean
    baseHealth += (animalFeedLevel - 80) * 0.5;
    baseHealth += (animalCleanliness - 80) * 0.4;
    
    if (cattleWhispererUnlocked) baseHealth += 10;
    if (vaccineUnlocked) baseHealth += 5;

    const finalHealth = Math.min(100, Math.max(10, Math.round(baseHealth)));
    const diseaseRisk = Math.max(0, 30 - (finalHealth * 0.25) - (vaccineUnlocked ? 25 : 0));

    // Yield rates
    const baseYield = animalType === "Cow" ? 25 : animalType === "Goat" ? 8 : animalType === "Sheep" ? 4 : 0;
    const finalYield = parseFloat((baseYield * (finalHealth / 100)).toFixed(1));

    return {
      finalHealth,
      diseaseRisk: Math.round(diseaseRisk),
      finalYield
    };
  }, [animalType, animalFeedLevel, animalCleanliness, animalVaccination, unlockedSkills]);

  // Pond chemistry calculations
  const pondCalculation = useMemo(() => {
    const phOffset = Math.abs(pondPh - 7.3);
    const doOffset = Math.max(0, 6.0 - dissolvedOxygen);

    let baseFcr = 1.3;
    if (unlockedSkills["aq_2"]) baseFcr -= 0.15; // custom feed bonus

    const waterFlowPenalty = pondWaterFlow === "Low" ? 15 : pondWaterFlow === "High" ? 5 : 0;
    const diseaseRisk = Math.min(100, Math.round((phOffset * 40) + (doOffset * 15) + waterFlowPenalty));
    const fishGrowthRate = Math.max(0, Math.round(100 - (phOffset * 30) - (doOffset * 25) - waterFlowPenalty));

    return {
      fcr: parseFloat(baseFcr.toFixed(2)),
      diseaseRisk,
      fishGrowthRate
    };
  }, [pondPh, dissolvedOxygen, pondWaterFlow, unlockedSkills]);

  // Calculations for Lineage & Wealth Inheritances
  const familyCalculation = useMemo(() => {
    let schoolingCost = 0;
    let skillGainBonus = 0;

    if (childEducation === "Local Village") {
      schoolingCost = 1200;
      skillGainBonus = 15;
    } else if (childEducation === "Metro Academy") {
      schoolingCost = 8500;
      skillGainBonus = 45;
    }

    // Tax projections
    const trustActive = unlockedSkills["biz_3"]; // corporate trusts
    const taxRate = trustActive ? 0.02 : 0.15; // 15% standard estate tax, reduced to 2% with trust setup
    const simulatedTax = Math.round(estateValue * taxRate);
    const inheritanceKept = estateValue - simulatedTax;

    return {
      schoolingCost,
      skillGainBonus,
      simulatedTax,
      inheritanceKept,
      trustActive
    };
  }, [childEducation, estateValue, unlockedSkills]);

  // Toggle skill lock nodes
  const toggleSkill = (nodeId: string, cost: number, dependsOn?: string) => {
    if (unlockedSkills[nodeId]) return; // Already unlocked

    // Check dependency
    if (dependsOn && !unlockedSkills[dependsOn]) {
      alert(`Cannot unlock! Requires prerequisite skill: ${dependsOn}`);
      return;
    }

    if (skillPoints < cost) {
      alert("Not enough Agri-Knowledge Skill Points! Perform more simulation trials to earn points.");
      return;
    }

    setSkillPoints((prev) => prev - cost);
    setUnlockedSkills((prev) => ({ ...prev, [nodeId]: true }));
  };

  // Trigger macroeconomic events
  const triggerMacroEvent = (event: string) => {
    setMacroEvent(event);
    if (event === "Drought Event") {
      setIrrigationSchedule("Dry");
      setSoilQuality(prev => Math.max(20, prev - 30));
    } else if (event === "Fungal Epidemic") {
      setHasInsects(true);
    } else if (event === "Bumper Subsidy Season") {
      setInflationRate(1.5);
    } else if (event === "Hyperinflation Shock") {
      setInflationRate(18.5);
    } else {
      setHasInsects(false);
      setSoilQuality(85);
      setIrrigationSchedule("Optimum");
    }
  };

  // Render clickable HUD wireframe details
  const [hudHotspot, setHudHotspot] = useState<string>("general");
  const getHudDetail = () => {
    switch (hudHotspot) {
      case "quickstats":
        return {
          title: "Player Stat Bar (Top Left)",
          desc: "Displays real-time biometrics: Energy, Stress, and Happiness percentages. Also lists active weather and time tick indices (e.g. Year 1, Autumn, Day 8, 14:30)."
        };
      case "compass":
        return {
          title: "Mini-Map Radar (Top Right)",
          desc: "Shows surrounding terrain, dynamic water tables, crop tiles, vehicle locations, and active GPS waypoints for village warehouses."
        };
      case "speedometer":
        return {
          title: "Heavy Machine Interface (Bottom Right)",
          desc: "Toggles fuel rates, vehicle attachments (plows, seed drill), mechanical temperature gauges, and CDL driving assistants."
        };
      case "quickslot":
        return {
          title: "Quick-Slot Item Bar (Bottom Center)",
          desc: "Provides rapid access to equipment, hand tools, water canisters, and active soil chemical diagnostic kits."
        };
      case "family":
        return {
          title: "Dynasty Manager Panel (Left Edge Tab)",
          desc: "Opens the multi-generational family dashboard, allowing the assignment of child roles, managing education fees, and auditing trust holdings."
        };
      case "logistics":
        return {
          title: "B2B Logistics Routing (Right Edge Tab)",
          desc: "Opens wholesale contracts, maps container trucks, registers freight schedules, and plots route fuel efficiencies."
        };
      default:
        return {
          title: "AgriLife Mobile Interface Layout (Tap wireframe areas to inspect)",
          desc: "Designed for touch controls. Includes dual-analog virtual joystick movement, adaptive thumb buttons, and highly visible metric gauges."
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-[#e2e8f0] flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Top Banner Ticker */}
      <header className="border-b border-slate-900 bg-[#0c1222]/95 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Sprout className="h-6 w-6 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-white tracking-tight flex items-center gap-2">
              AgriLife <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold border border-emerald-500/20">AAA DESIGN WORKSPACE</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">Interactive Design &amp; Technical Architecture Blueprint Portal</p>
          </div>
        </div>

        {/* Real-time configuration metrics ticker */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-mono">
          <div className="border-r border-slate-800 pr-4">
            <span className="text-slate-500">ENGINE:</span> <span className="text-white font-semibold">Unity 6 LTS</span>
          </div>
          <div className="border-r border-slate-800 pr-4">
            <span className="text-slate-500">RENDER PIPELINE:</span> <span className="text-emerald-400 font-semibold">URP 17+</span>
          </div>
          <div className="border-r border-slate-800 pr-4">
            <span className="text-slate-500">SYSTEMS CODE:</span> <span className="text-cyan-400 font-semibold">C# 12 Decoupled</span>
          </div>
          <div>
            <span className="text-slate-500">STAGE:</span> <span className="text-amber-400 font-semibold">Design-Locked (Pre-Prod)</span>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-mono font-semibold text-slate-300">Knowledge Points: <span className="text-amber-400 font-bold">{skillPoints}</span></span>
          </div>
          <button 
            onClick={() => {
              setSkillPoints(prev => prev + 2);
              alert("Knowledge points awarded! Use them in the 'Skill Tree' dashboard to unlock passive bonuses.");
            }}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-white transition-all border border-slate-800 flex items-center gap-1.5"
            title="Perform research trials to generate more skills points"
          >
            <RefreshCw className="h-3 w-3 text-emerald-400" />
            <span>Simulate Trials</span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-80 border-r border-slate-900 bg-[#080d19] flex flex-col justify-between shrink-0 max-lg:hidden">
          {/* Main Module Selectors */}
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Select Dashboard</label>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => setActiveTab("gdd")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "gdd"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>1. GDD Document Explorer</span>
                </button>

                <button
                  onClick={() => setActiveTab("skills")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "skills"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>2. Dynamic Skill Trees</span>
                </button>

                <button
                  onClick={() => setActiveTab("crop_sim")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "crop_sim"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Sprout className="h-4 w-4" />
                  <span>3. Crop Chemistry Sandbox</span>
                </button>

                <button
                  onClick={() => setActiveTab("factory_sim")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "factory_sim"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Truck className="h-4 w-4" />
                  <span>4. Factory Pipeline Engine</span>
                </button>

                <button
                  onClick={() => setActiveTab("animal_sim")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "animal_sim"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span>5. Livestock &amp; Aquaculture</span>
                </button>

                <button
                  onClick={() => setActiveTab("family_sim")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "family_sim"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>6. Family Will &amp; Inheritance</span>
                </button>

                <button
                  onClick={() => setActiveTab("economy_sim")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "economy_sim"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Sliders className="h-4 w-4" />
                  <span>7. Weather &amp; Macro Economy</span>
                </button>

                <button
                  onClick={() => setActiveTab("hud_ux")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "hud_ux"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Map className="h-4 w-4" />
                  <span>8. Mobile UI Wireframe HUD</span>
                </button>

                <button
                  onClick={() => setActiveTab("roadmap")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold font-sans transition-all border ${
                    activeTab === "roadmap"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-slate-900"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>9. Production Plan &amp; Roadmap</span>
                </button>
              </div>
            </div>

            {/* GDD Left Search & Quick Index Section */}
            {activeTab === "gdd" && (
              <div className="space-y-3 pt-3 border-t border-slate-900">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search 31 GDD Sections..."
                    value={gddSearch}
                    onChange={(e) => setGddSearch(e.target.value)}
                    className="w-full bg-[#03060c] text-xs pl-8 pr-3 py-2 rounded-md border border-slate-800 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1 max-h-[350px] overflow-y-auto pr-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">GDD Sections Index</label>
                  {filteredSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-all flex items-center justify-between ${
                        activeSectionId === sec.id
                          ? "bg-slate-900 text-white font-medium border-l-2 border-emerald-500 pl-2"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-950/40"
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <ChevronRight className="h-3 w-3 opacity-60" />
                    </button>
                  ))}
                  {filteredSections.length === 0 && (
                    <div className="text-[11px] text-slate-500 italic p-2">No matching sections found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dev credentials signature footer */}
          <div className="p-4 border-t border-slate-900 bg-[#060a12] text-[11px] text-slate-500 font-mono space-y-1">
            <div className="flex items-center justify-between">
              <span>PROJECT CODE:</span>
              <span className="text-slate-300">293B-CA5D</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AUTH STATUS:</span>
              <span className="text-emerald-500 flex items-center gap-1">● DESIGN_LOCK</span>
            </div>
          </div>
        </aside>

        {/* Content Explorer viewport */}
        <main className="flex-1 bg-[#0b0f19] flex flex-col overflow-y-auto">
          {/* Responsive Header Nav for Mobile Viewports */}
          <div className="lg:hidden bg-slate-950 border-b border-slate-900 p-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-slate-400">Nav:</span>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="bg-slate-900 text-xs border border-slate-800 p-1.5 rounded text-white"
            >
              <option value="gdd">1. GDD Document Explorer</option>
              <option value="skills">2. Skill Trees Dashboard</option>
              <option value="crop_sim">3. Crop Chemistry Sandbox</option>
              <option value="factory_sim">4. Factory Pipeline Engine</option>
              <option value="animal_sim">5. Livestock &amp; Aquaculture</option>
              <option value="family_sim">6. Family Will &amp; Inheritance</option>
              <option value="economy_sim">7. Weather &amp; Macro Economy</option>
              <option value="hud_ux">8. Mobile UI Wireframe HUD</option>
              <option value="roadmap">9. Production Plan &amp; Roadmap</option>
            </select>

            {activeTab === "gdd" && (
              <select
                value={activeSectionId}
                onChange={(e) => setActiveSectionId(e.target.value)}
                className="bg-slate-900 text-xs border border-slate-800 p-1.5 rounded text-white max-w-[150px]"
              >
                {GDD_SECTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* TAB 1: GDD DOCUMENT EXPLORER */}
          {activeTab === "gdd" && (
            <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Compass className="h-3.5 w-3.5 text-emerald-500" />
                <span>GDD EXPLORER</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-400 font-semibold uppercase">{activeSection.category}</span>
              </div>

              {/* Title & Banner card */}
              <div className="bg-gradient-to-r from-slate-950 to-[#0e172a] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <h2 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">{activeSection.title}</h2>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-2xl font-sans italic">"{activeSection.summary}"</p>
                
                {/* Micro Metadata Indicator */}
                <div className="mt-4 pt-4 border-t border-slate-900 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Status: <span className="text-emerald-400 font-semibold">Active Design Specification</span></span>
                  <span>Branch: <strong className="text-white">Systems Design</strong></span>
                  <span>Engine Hook: <strong className="text-cyan-400">Unity.Core.Systems</strong></span>
                </div>
              </div>

              {/* Parsed GDD text content */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 md:p-8 shadow-inner">
                <MarkdownRenderer content={activeSection.content} />
              </div>

              {/* Section Quick Pager */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-900">
                <button
                  disabled={GDD_SECTIONS.findIndex((s) => s.id === activeSectionId) === 0}
                  onClick={() => {
                    const idx = GDD_SECTIONS.findIndex((s) => s.id === activeSectionId);
                    if (idx > 0) setActiveSectionId(GDD_SECTIONS[idx - 1].id);
                  }}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors disabled:opacity-30 flex items-center gap-2 text-slate-300"
                >
                  &larr; Previous Document
                </button>
                <span className="text-xs font-mono text-slate-500">
                  {GDD_SECTIONS.findIndex((s) => s.id === activeSectionId) + 1} of {GDD_SECTIONS.length}
                </span>
                <button
                  disabled={GDD_SECTIONS.findIndex((s) => s.id === activeSectionId) === GDD_SECTIONS.length - 1}
                  onClick={() => {
                    const idx = GDD_SECTIONS.findIndex((s) => s.id === activeSectionId);
                    if (idx < GDD_SECTIONS.length - 1) setActiveSectionId(GDD_SECTIONS[idx + 1].id);
                  }}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors disabled:opacity-30 flex items-center gap-2 text-slate-300"
                >
                  Next Document &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SKILL TREE */}
          {activeTab === "skills" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">Dynamic RPG Career Branches</h2>
                  <p className="text-xs text-slate-400 mt-1">Unlock nodes using Agri-Knowledge Points to dynamically upgrade and affect other simulators!</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">KNOWLEDGE POINTS:</span>
                  <span className="text-xl font-bold font-mono text-amber-400">{skillPoints}</span>
                </div>
              </div>

              {/* Legend indicator */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 text-xs text-slate-400 flex items-center gap-2">
                <Info className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Unlocked skills actively adjust variables in the <strong>Crop</strong>, <strong>Factory</strong>, <strong>Animal</strong>, and <strong>Inheritance</strong> simulators below.</span>
              </div>

              {/* Grid of Branches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_BRANCHES.map((branch, bIdx) => (
                  <div key={bIdx} className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                      <div className={`h-8 w-8 rounded-lg bg-${branch.color}-500/10 text-${branch.color}-400 flex items-center justify-center`}>
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold font-display text-white">{branch.name} Branch</h3>
                        <p className="text-[10px] text-slate-500 font-mono">Specialized Talent Unlocks</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {branch.nodes.map((node) => {
                        const isUnlocked = unlockedSkills[node.id];
                        const canUnlock = !isUnlocked && (!node.dependsOn || unlockedSkills[node.dependsOn]);
                        const parentNode = node.dependsOn ? branch.nodes.find(n => n.id === node.dependsOn) : null;

                        return (
                          <div 
                            key={node.id} 
                            className={`p-3 rounded-xl border transition-all relative overflow-hidden ${
                              isUnlocked 
                                ? "bg-slate-900/60 border-slate-800" 
                                : canUnlock 
                                  ? "bg-slate-950 hover:bg-slate-900 border-slate-800" 
                                  : "bg-slate-950/20 border-slate-900 opacity-50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <h4 className={`text-xs font-bold ${isUnlocked ? "text-emerald-400" : "text-slate-200"}`}>{node.name}</h4>
                                  {node.dependsOn && (
                                    <span className="text-[8px] bg-slate-900 px-1 py-0.5 rounded text-slate-500 font-mono">
                                      Req: {parentNode?.name}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400">{node.description}</p>
                                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                  <span className="text-emerald-400 font-semibold">Active:</span>
                                  <span>{node.effect}</span>
                                </div>
                              </div>

                              <div>
                                {isUnlocked ? (
                                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded">
                                    UNLOCKED
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => toggleSkill(node.id, node.cost, node.dependsOn)}
                                    className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded transition-all ${
                                      canUnlock
                                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950"
                                        : "bg-slate-900 text-slate-600 cursor-not-allowed"
                                    }`}
                                  >
                                    {node.cost} KP
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CROP CHEMISTRY SANDBOX */}
          {activeTab === "crop_sim" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-emerald-400" />
                  Crop Biochemistry &amp; Harvesting Simulator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust biological and chemical properties below to calculate expected harvest quality, dry weight yields, and market margins.
                </p>
              </div>

              {/* Dual Layout: Parameters + Output */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Parameters Form */}
                <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-5">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Simulation Input Vectors</h3>
                  
                  {/* Crop Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Target Biological Crop</label>
                    <select
                      value={simCropId}
                      onChange={(e) => setSimCropId(e.target.value)}
                      className="w-full bg-[#03060c] text-sm py-2 px-3 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      {extendedCrops.slice(0, 20).map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.name} ({crop.category})
                        </option>
                      ))}
                      <option disabled>--- Virtual Generated GDD Items ---</option>
                      {extendedCrops.slice(20, 35).map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {crop.name} ({crop.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Soil Quality Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">Soil Quality Index</span>
                      <span className="font-mono text-emerald-400 font-bold">{soilQuality}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={soilQuality}
                      onChange={(e) => setSoilQuality(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                    <p className="text-[10px] text-slate-500">Affects dry-weight scaling. Compaction reduces this value.</p>
                  </div>

                  {/* Fertilizer Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Soil Nutrient Feeding (NPK)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["None", "Organic slurry", "NPK Premium"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFertilizerType(type)}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                            fertilizerType === type
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                              : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {fertilizerType === "Organic slurry" && unlockedSkills["agri_2"] && (
                      <p className="text-[10px] text-amber-400">Bonus active: +10% Organic Slurry composting efficiency.</p>
                    )}
                  </div>

                  {/* Irrigation schedule */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Water Management Schedule</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Dry", "Optimum", "Flooded"] as const).map((sch) => (
                        <button
                          key={sch}
                          onClick={() => setIrrigationSchedule(sch)}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                            irrigationSchedule === sch
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40"
                              : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                          }`}
                        >
                          {sch}
                        </button>
                      ))}
                    </div>
                    {irrigationSchedule === "Dry" && unlockedSkills["agri_3"] && (
                      <p className="text-[10px] text-amber-400">Drip Irrigation Bonus: Yield loss mitigated by 30% under dry parameters.</p>
                    )}
                  </div>

                  {/* Pest toggle */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-900">
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block">Insect Infestation</span>
                      <span className="text-[10px] text-slate-500">Requires fungicide or ladybugs.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasInsects}
                      onChange={(e) => setHasInsects(e.target.checked)}
                      className="accent-emerald-500 h-4 w-4"
                    />
                  </div>
                </div>

                {/* Right Side: Simulation Outputs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Primary output card */}
                  <div className="bg-gradient-to-br from-slate-950 to-[#0e1c2f] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">100 PLANT SECTOR SCALE</div>
                    
                    <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Simulated Harvest Valuation</h3>
                    
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-mono block">FINAL DRY-YIELD</span>
                        <span className="text-lg font-bold font-mono text-white mt-1 block">{cropCalculation.finalWeight} kg</span>
                      </div>
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-mono block">QUALITY SCORE</span>
                        <span className="text-lg font-bold font-mono text-emerald-400 mt-1 block">{cropCalculation.qualityScore} / 100</span>
                      </div>
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-mono block">DOMESTIC PRICE</span>
                        <span className="text-lg font-bold font-mono text-amber-400 mt-1 block">${cropCalculation.finalMarketPrice}/kg</span>
                      </div>
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-mono block">EXPORT PRICE</span>
                        <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">${cropCalculation.finalExportPrice}/kg</span>
                      </div>
                    </div>

                    {/* Financial projection bars */}
                    <div className="mt-6 pt-6 border-t border-slate-900 space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-amber-400">Total Domestic Value:</span>
                          <span className="font-bold text-white">${cropCalculation.revenueDomestic} Gold</span>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (cropCalculation.revenueDomestic / 1000) * 100)}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-cyan-400">Total Global Export Value:</span>
                          <span className="font-bold text-white">${cropCalculation.revenueExport} Gold</span>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, (cropCalculation.revenueExport / 1000) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crop Bio-specifications panel */}
                  <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Crop Genomic Specifications</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-500">Water Demand:</span>
                        <span className={`block font-bold mt-0.5 ${
                          cropCalculation.crop.waterNeed === "High" ? "text-cyan-400" : cropCalculation.crop.waterNeed === "Medium" ? "text-amber-400" : "text-emerald-400"
                        }`}>{cropCalculation.crop.waterNeed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Fertilizer Hunger:</span>
                        <span className="block font-bold text-slate-200 mt-0.5">{cropCalculation.crop.fertilizerNeed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Maturity Window:</span>
                        <span className="block font-bold text-white mt-0.5">{cropCalculation.crop.growthTime} Game Days</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Optimum Temperature:</span>
                        <span className="block font-bold text-orange-400 mt-0.5">{cropCalculation.crop.tempTolerance[0]}°C to {cropCalculation.crop.tempTolerance[1]}°C</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Blight Vulnerability:</span>
                        <span className="block font-bold text-red-400 mt-0.5">{cropCalculation.diseaseRisk}% Probability</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Standard Season:</span>
                        <span className="block font-bold text-slate-200 mt-0.5">{cropCalculation.crop.season}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FACTORY PIPELINE ENGINE */}
          {activeTab === "factory_sim" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Truck className="h-6 w-6 text-emerald-400" />
                  Agro-Industrial Factory Simulator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage workers, machines, and supply logistics across the 10 core industrial factory types.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left controls */}
                <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-5">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold text-emerald-400">Plant Controls</h3>
                  
                  {/* Select Factory Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Select Processing Facility</label>
                    <select
                      value={selectedFactoryId}
                      onChange={(e) => setSelectedFactoryId(e.target.value)}
                      className="w-full bg-[#03060c] text-sm py-2 px-3 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      {FACTORIES.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                          {fac.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Worker assignment */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Active Operators Assigned</span>
                      <span className="font-bold text-white">{factoryWorkers} Crews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFactoryWorkers(w => Math.max(1, w - 1))}
                        className="p-1.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800 hover:bg-slate-850"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex-1 text-center font-mono text-sm bg-slate-950 py-1.5 rounded-lg border border-slate-900">
                        {factoryWorkers} Operators
                      </div>
                      <button
                        onClick={() => setFactoryWorkers(w => Math.min(10, w + 1))}
                        className="p-1.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800 hover:bg-slate-850"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Machinery level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Heavy Machine Grade</span>
                      <span className="font-bold text-white">{factoryMachines} Units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFactoryMachines(m => Math.max(1, m - 1))}
                        className="p-1.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800 hover:bg-slate-850"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex-1 text-center font-mono text-sm bg-slate-950 py-1.5 rounded-lg border border-slate-900">
                        Level {factoryMachines} Systems
                      </div>
                      <button
                        onClick={() => setFactoryMachines(m => Math.min(5, m + 1))}
                        className="p-1.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800 hover:bg-slate-850"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Factory upgrade */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-900">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-semibold">Structure Upgrade Tier</span>
                      <span className="font-mono text-emerald-400">Tier {factoryUpgradeTier} / 3</span>
                    </div>
                    <button
                      onClick={() => {
                        if (factoryUpgradeTier >= 3) return;
                        setFactoryUpgradeTier(prev => prev + 1);
                        alert(`Facility upgraded to Tier ${factoryUpgradeTier + 1}! Added +20% operating efficiency.`);
                      }}
                      disabled={factoryUpgradeTier >= 3}
                      className="w-full py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs rounded-lg hover:from-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      {factoryUpgradeTier >= 3 ? "Fully Upgraded" : `Pay $${factoryCalculation.factory.upgradeCost} Gold to Upgrade`}
                    </button>
                  </div>
                </div>

                {/* Right dashboard */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Operation Overview card */}
                  <div className="bg-gradient-to-br from-slate-950 to-[#0e1c2f] border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Facility Output</h4>
                        <h3 className="text-lg font-bold font-display text-white mt-1">{factoryCalculation.factory.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{factoryCalculation.factory.description}</p>
                      </div>
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded font-mono font-bold">
                        {factoryCalculation.totalEfficiency}% Efficiency
                      </span>
                    </div>

                    {/* Input Output flowchart visualization */}
                    <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-4">
                      {/* Inputs */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-red-400 w-16 uppercase shrink-0">Feedstock:</span>
                        <div className="flex flex-wrap gap-2">
                          {factoryCalculation.scaledInputs.map((inp, idx) => (
                            <span key={idx} className="bg-[#03060c] text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-800">
                              {inp.quantity} units of {inp.item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Transition arrows */}
                      <div className="flex items-center gap-2 pl-16">
                        <ChevronDown className="h-4 w-4 text-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-slate-500">Milling &amp; Refining Loop...</span>
                      </div>

                      {/* Outputs */}
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-emerald-400 w-16 uppercase shrink-0">Outputs:</span>
                        <div className="flex flex-wrap gap-2">
                          {factoryCalculation.scaledOutputs.map((out, idx) => (
                            <span key={idx} className="bg-emerald-950/20 text-emerald-400 text-xs px-2.5 py-1 rounded-md border border-emerald-900/30 font-semibold">
                              {out.quantity} units of {out.item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Operational overhead pricing details */}
                    <div className="mt-6 pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-500">Daily Labor Costs:</span>
                        <span className="block font-bold text-white mt-1">${factoryCalculation.dailyWage} Gold</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Plant Maintenance:</span>
                        <span className="block font-bold text-white mt-1">
                          ${factoryCalculation.dailyUpkeep} Gold
                          {unlockedSkills["mec_2"] && <span className="text-[10px] text-amber-400 block font-normal">(-50% repair)</span>}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Simulated Net Profit:</span>
                        <span className="block font-bold text-emerald-400 mt-1">${factoryCalculation.netProfit} Gold / Day</span>
                      </div>
                    </div>
                  </div>

                  {/* Required machine parameters list */}
                  <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Standard Machine Configuration blueprint</h3>
                    <div className="space-y-2">
                      {factoryCalculation.factory.machines.map((mac, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs p-2 rounded bg-slate-950 border border-slate-900">
                          <div>
                            <span className="font-semibold text-slate-200 block">{mac.name}</span>
                            <span className="text-[10px] text-emerald-400">+{mac.efficiencyBonus}% production efficiency modifier</span>
                          </div>
                          <span className="text-slate-400 font-mono font-semibold">${mac.cost} Gold</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANIMAL CARE & POND SIMULATION */}
          {activeTab === "animal_sim" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Heart className="h-6 w-6 text-rose-400" />
                  Livestock &amp; Aquaculture Biosphere Simulator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage breeding, health, disease vectors, and aquatic chemical dissolved balances for high-grade yields.
                </p>
              </div>

              {/* Subsection Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Livestock Barn */}
                <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold font-display text-white">Animal Barn &amp; Genetics</h3>
                    <span className="text-[10px] font-mono text-slate-500">MENDELIAN CROSSED TRAITS</span>
                  </div>

                  {/* Select animal */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Active Specimen</label>
                    <select
                      value={animalType}
                      onChange={(e) => setAnimalType(e.target.value as any)}
                      className="w-full bg-[#03060c] text-xs py-2 px-3 rounded-lg border border-slate-800 text-white"
                    >
                      <option value="Cow">Jersey Cattle (Milk focus)</option>
                      <option value="Goat">Alpine Goat (Dairy/Mohair)</option>
                      <option value="Sheep">Merino Sheep (Organic Lanolin Wool)</option>
                      <option value="Horse">Stallion Draft (Farm Power &amp; Prestige)</option>
                    </select>
                  </div>

                  {/* Feeding parameter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Feed Saturation</span>
                      <span className="font-mono text-emerald-400 font-bold">{animalFeedLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={animalFeedLevel}
                      onChange={(e) => setAnimalFeedLevel(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                  </div>

                  {/* Cleanliness */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Barn Sanitization &amp; Hygiene</span>
                      <span className="font-mono text-emerald-400 font-bold">{animalCleanliness}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={animalCleanliness}
                      onChange={(e) => setAnimalCleanliness(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                  </div>

                  {/* Vaccine */}
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-900 text-xs">
                    <div>
                      <span className="font-semibold block text-slate-200">Inject Seasonal Epidemic Vaccine</span>
                      <span className="text-[10px] text-slate-500">Provides permanent health safety cushion.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={animalVaccination}
                      onChange={(e) => setAnimalVaccination(e.target.checked)}
                      className="accent-emerald-500 h-4 w-4"
                    />
                  </div>

                  {/* Calculations outputs */}
                  <div className="pt-3 border-t border-slate-900 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">HEALTH STATUS</span>
                      <span className="font-bold text-emerald-400">{animalCalculation.finalHealth}%</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">EPIDEMIC RISK</span>
                      <span className="font-bold text-red-400">{animalCalculation.diseaseRisk}%</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">DAILY PRODUCT YIELD</span>
                      <span className="font-bold text-cyan-400">{animalCalculation.finalYield} units</span>
                    </div>
                  </div>
                </div>

                {/* 2. Aquaculture Pond */}
                <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h3 className="text-sm font-bold font-display text-white">Aquaculture Earthen Pond</h3>
                    <span className="text-[10px] font-mono text-slate-500">WATER DISSOLVED OXIDATION</span>
                  </div>

                  {/* Water flow type */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-semibold">Aeration Pump Rate</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Low", "Medium", "High"] as const).map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setPondWaterFlow(rate)}
                          className={`py-1.5 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                            pondWaterFlow === rate
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40"
                              : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                          }`}
                        >
                          {rate}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PH Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Pond water pH Chemistry</span>
                      <span className="font-mono text-emerald-400 font-bold">{pondPh} pH</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.1"
                      value={pondPh}
                      onChange={(e) => setPondPh(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                    <p className="text-[10px] text-slate-500">Optimum is 7.2 - 7.6 pH. Rain acidification requires lime treatment.</p>
                  </div>

                  {/* Dissolved Oxygen */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Dissolved Oxygen (DO)</span>
                      <span className="font-mono text-emerald-400 font-bold">{dissolvedOxygen} mg/L</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="10.0"
                      step="0.1"
                      value={dissolvedOxygen}
                      onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                  </div>

                  {/* calculations outputs */}
                  <div className="pt-3 border-t border-slate-900 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">GROWTH ACCELERATION</span>
                      <span className="font-bold text-emerald-400">{pondCalculation.fishGrowthRate}%</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">WATER DISEASE RISK</span>
                      <span className="font-bold text-red-400">{pondCalculation.diseaseRisk}%</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-900">
                      <span className="text-slate-500 text-[10px] block">CONVERSION (FCR)</span>
                      <span className="font-bold text-cyan-400">{pondCalculation.fcr} index</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: FAMILY WILL & INHERITANCE */}
          {activeTab === "family_sim" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Users className="h-6 w-6 text-emerald-400" />
                  Generational Legacy &amp; Estate Planning
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Draft estate distribution wills, configure trusts to minimize tax liabilities, and set children schooling trajectories.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left side: parameters */}
                <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-5">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Lineage Vector Controls</h3>
                  
                  {/* Select Child schooling */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Raise &amp; Educate Child (Age 6-18)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["None", "Local Village", "Metro Academy"] as const).map((edu) => (
                        <button
                          key={edu}
                          onClick={() => setChildEducation(edu)}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                            childEducation === edu
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                              : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                          }`}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Career assignment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Set Adult Career Focus</label>
                    <select
                      value={childCareer}
                      onChange={(e) => setChildCareer(e.target.value as any)}
                      className="w-full bg-[#03060c] text-sm py-2 px-3 rounded-lg border border-slate-800 text-white"
                    >
                      <option value="Farmhand">Agribusiness Field Lead (Saves helper wages)</option>
                      <option value="Factory Lead">Milling Plant Operator (Improves processing by 15%)</option>
                      <option value="Logistics Manager">Container Fleet Dispatcher (Cuts fuel costs by 30%)</option>
                      <option value="Trader">Regional Futures Broker (Unlocks tax write-off alerts)</option>
                    </select>
                  </div>

                  {/* Estate Wealth value */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Accumulated Estate Capital Valuation</span>
                      <span className="font-mono text-emerald-400 font-bold">${estateValue.toLocaleString()} Gold</span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="1000000"
                      step="25000"
                      value={estateValue}
                      onChange={(e) => setEstateValue(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-900 h-1.5 rounded-lg"
                    />
                  </div>
                </div>

                {/* Right side output and projection */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Estate Distribution card */}
                  <div className="bg-gradient-to-br from-slate-950 to-[#0e1c2f] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Estate Will Calculations</h3>
                    
                    <div className="mt-6 space-y-4 font-mono text-xs">
                      <div className="flex justify-between p-2.5 rounded bg-slate-900/40 border border-slate-850">
                        <span className="text-slate-400">Total Estate value:</span>
                        <span className="font-bold text-white">${estateValue.toLocaleString()} Gold</span>
                      </div>

                      <div className="flex justify-between p-2.5 rounded bg-slate-900/40 border border-slate-850">
                        <span className="text-slate-400">Inheritance tax rate:</span>
                        <span className={`font-bold ${familyCalculation.trustActive ? "text-emerald-400" : "text-red-400"}`}>
                          {familyCalculation.trustActive ? "2% (Family Corporate Trust)" : "15% (Standard Probate probate)"}
                        </span>
                      </div>

                      <div className="flex justify-between p-2.5 rounded bg-slate-900/40 border border-slate-850">
                        <span className="text-slate-400">Projected inheritance tax due:</span>
                        <span className="font-bold text-red-400">${familyCalculation.simulatedTax.toLocaleString()} Gold</span>
                      </div>

                      <div className="flex justify-between p-3 rounded bg-emerald-950/20 border border-emerald-900/30 text-sm">
                        <span className="text-emerald-400 font-bold">Wealth passing to heirs:</span>
                        <span className="font-bold text-emerald-300 font-mono">${familyCalculation.inheritanceKept.toLocaleString()} Gold</span>
                      </div>
                    </div>

                    {!familyCalculation.trustActive && (
                      <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <span className="text-amber-400 font-bold block">Tax Optimization Opportunity</span>
                          Unlock the <strong className="text-white">Corporate Shells</strong> node on the Business Skill tree to shelter asset transfers under a Family Trust and reduce tax from 15% to 2%.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Education career benefits card */}
                  <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Child Development Projection</h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Required Annual Tuition Fees:</span>
                        <span className="font-mono font-bold">${familyCalculation.schoolingCost} Gold</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Offspring Skill Accumulation Multiplier:</span>
                        <span className="font-mono text-emerald-400 font-bold">+{familyCalculation.skillGainBonus}% career exp gain rate</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Target Corporate Job role:</span>
                        <span className="font-mono text-cyan-400 font-bold">{childCareer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: WEATHER & MACRO ECONOMY */}
          {activeTab === "economy_sim" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Sliders className="h-6 w-6 text-amber-400" />
                  Dynamic Weather &amp; Macroeconomic Sandbox
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust general market inflation rates and trigger dynamic seasonal hazards to simulate pricing shifts.
                </p>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs */}
                <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-5">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold text-amber-400">Climatic &amp; Economic Tweak Controls</h3>

                  {/* Season selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Active Game Season</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Spring", "Summer", "Autumn", "Winter"] as const).map((seas) => (
                        <button
                          key={seas}
                          onClick={() => setCurrentSeason(seas)}
                          className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                            currentSeason === seas
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/40"
                              : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                          }`}
                        >
                          {seas}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inflation rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Commodity Inflation Index</span>
                      <span className="font-mono text-emerald-400 font-bold">{inflationRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(parseInt(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-900 h-1.5 rounded-lg"
                    />
                    <p className="text-[10px] text-slate-500">Raises the wholesale baseline price. High rates increase feed/fuel prices.</p>
                  </div>

                  {/* Dynamic event trigger buttons */}
                  <div className="space-y-2 pt-3 border-t border-slate-900">
                    <label className="text-xs font-semibold text-slate-300 block">Trigger Environmental Event</label>
                    <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                      <button
                        onClick={() => triggerMacroEvent("Stable Trading")}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          macroEvent === "Stable Trading" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                        }`}
                      >
                        Stable Trading Conditions
                      </button>
                      <button
                        onClick={() => triggerMacroEvent("Drought Event")}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          macroEvent === "Drought Event" ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                        }`}
                      >
                        Severe Regional Drought (Cuts water/moisture)
                      </button>
                      <button
                        onClick={() => triggerMacroEvent("Fungal Epidemic")}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          macroEvent === "Fungal Epidemic" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                        }`}
                      >
                        Mildew Fungal Outbreak (Boosts crop disease)
                      </button>
                      <button
                        onClick={() => triggerMacroEvent("Hyperinflation Shock")}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          macroEvent === "Hyperinflation Shock" ? "bg-purple-500/10 text-purple-400 border-purple-500/30" : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                        }`}
                      >
                        Global Fuel &amp; Tariff Price Crisis
                      </button>
                    </div>
                  </div>
                </div>

                {/* Outputs & Equations */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Event status card */}
                  <div className="bg-gradient-to-br from-slate-950 to-[#1e150f] border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Active Sandbox Event State</h4>
                        <h3 className="text-lg font-bold font-display text-white mt-1">{macroEvent}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {macroEvent === "Stable Trading" && "Markets are balanced. Supply channels are running regularly on normal schedules."}
                          {macroEvent === "Drought Event" && "River levels have dropped. Local irrigation pumps require double diesel fuel rates."}
                          {macroEvent === "Fungal Epidemic" && "Moist conditions have triggered dynamic mildew. Check crop blights immediately."}
                          {macroEvent === "Hyperinflation Shock" && "Machinery spare parts costs are up 85%. Loan interest rates have risen."}
                        </p>
                      </div>
                    </div>

                    {/* Macro pricing formula visualization */}
                    <div className="mt-6 pt-6 border-t border-slate-900 space-y-3 font-mono text-xs">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Baseline Price Algorithm</h4>
                      <div className="p-3 bg-slate-950 rounded border border-slate-900 text-center text-white italic">
                        Price = (Demand / Supply) &times; (1 + Inflation) &times; Season_Mult
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400">
                        <div className="p-2 bg-slate-900 rounded">
                          <span className="text-slate-500 block">Season Multiplier:</span>
                          <span className="text-white font-bold">{currentSeason === "Spring" ? "1.25x Spring Crops" : currentSeason === "Summer" ? "1.35x Summer Crops" : "0.85x"}</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded">
                          <span className="text-slate-500 block">Macro Inflation Rate:</span>
                          <span className="text-white font-bold">{(1 + (inflationRate / 100)).toFixed(2)}x baseline markup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: MOBILE HUD WIREFRAME UX */}
          {activeTab === "hud_ux" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Map className="h-6 w-6 text-emerald-400" />
                  Mobile-First HUD Layout &amp; Wireframe
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Click on key wireframe hotspots of the responsive 44px mobile touch layout to view interactive technical descriptions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Side: SVG Smartphone frame */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="w-[310px] h-[610px] bg-slate-950 rounded-[40px] border-4 border-slate-800 p-3 shadow-2xl relative">
                    {/* Speaker notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full" />
                    
                    {/* Screen canvas */}
                    <div className="w-full h-full bg-[#050811] rounded-[32px] overflow-hidden relative flex flex-col justify-between p-3 border border-slate-900">
                      {/* Top bar HUD */}
                      <div className="flex justify-between items-center z-10">
                        {/* Quickstats hotspot */}
                        <button
                          onClick={() => setHudHotspot("quickstats")}
                          className={`p-1.5 rounded-lg text-[9px] font-mono border transition-all ${
                            hudHotspot === "quickstats" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                          }`}
                        >
                          [★ STAT_BAR]
                        </button>

                        {/* Compass radar hotspot */}
                        <button
                          onClick={() => setHudHotspot("compass")}
                          className={`p-1.5 rounded-lg text-[9px] font-mono border transition-all ${
                            hudHotspot === "compass" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                          }`}
                        >
                          (⌖ RADAR)
                        </button>
                      </div>

                      {/* Side edge panel hotspots */}
                      <div className="flex-1 flex justify-between items-center my-10">
                        {/* Family manager */}
                        <button
                          onClick={() => setHudHotspot("family")}
                          className={`p-1.5 rounded-r-lg text-[9px] font-mono border border-l-0 -ml-3 transition-all ${
                            hudHotspot === "family" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                          }`}
                        >
                          DYNASTY &gt;
                        </button>

                        {/* Middle placeholder screen view */}
                        <div className="text-[10px] text-slate-600 font-mono text-center flex-1 mx-2">
                          Interactive Simulated Open World Environment
                        </div>

                        {/* Logistics manager */}
                        <button
                          onClick={() => setHudHotspot("logistics")}
                          className={`p-1.5 rounded-l-lg text-[9px] font-mono border border-r-0 -mr-3 transition-all ${
                            hudHotspot === "logistics" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                          }`}
                        >
                          &lt; LOGS
                        </button>
                      </div>

                      {/* Bottom interface bars */}
                      <div className="space-y-2 z-10">
                        {/* Item quick slot bar */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => setHudHotspot("quickslot")}
                            className={`p-2 rounded-xl text-[10px] font-mono border transition-all w-11/12 text-center ${
                              hudHotspot === "quickslot" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                            }`}
                          >
                            [▭▬▭▬▭ QUICK_SLOTS]
                          </button>
                        </div>

                        {/* Machine operations */}
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] text-slate-500 font-mono">Analog Joy</span>
                          <button
                            onClick={() => setHudHotspot("speedometer")}
                            className={`p-2 rounded-full h-10 w-10 flex items-center justify-center text-[8px] font-mono border transition-all ${
                              hudHotspot === "speedometer" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-slate-900/80 text-slate-400 border-slate-800"
                            }`}
                          >
                            SPEED
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Description */}
                <div className="md:col-span-6 space-y-4">
                  <div className="bg-gradient-to-br from-slate-950 to-[#0e1c2f] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">HUD Element Inspector</h3>
                    <h2 className="text-xl font-bold font-display text-white mt-2">{getHudDetail().title}</h2>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">{getHudDetail().desc}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 space-y-2 text-xs font-mono text-slate-400">
                    <span className="font-bold text-white block">Mobile Optimization Standards</span>
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span>Touch target size:</span>
                      <span className="text-emerald-400 font-bold">44 x 44px Minimum</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span>FPS Target (Mobile):</span>
                      <span className="text-emerald-400 font-bold">60 FPS locked (Unity 6)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory foot-print:</span>
                      <span className="text-emerald-400 font-bold">Less than 1.2GB RAM peak</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: PRODUCTION LIFECYCLE ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="text-2xl font-bold font-display text-white">18-Month AAA Production Plan &amp; Gantt</h2>
                <p className="text-xs text-slate-400 mt-1">
                  AgriLife structured engineering milestones, technical risk assessments, and live services support.
                </p>
              </div>

              {/* Milestones Gantt progress bars */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 space-y-6">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Production Timeline Schedule</h3>

                <div className="space-y-4 font-mono text-xs">
                  {/* Phase 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">Phase I: Pre-Production &amp; Prototyping (Month 1-3)</span>
                      <span className="text-emerald-400 font-bold">COMPLETED</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-lg overflow-hidden flex">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">Core math simulation engine (C# models) locked; physical soil mechanics verified in tech builds.</p>
                  </div>

                  {/* Phase 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">Phase II: Vertical Slice Development (Month 4-7)</span>
                      <span className="text-emerald-400 font-bold">IN PROGRESS (75%)</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-lg overflow-hidden flex">
                      <div className="h-full bg-emerald-500 w-3/4" />
                      <div className="h-full bg-emerald-500/10 w-1/4 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">Visual shaders for crops, basic tractor engine revs, dynamic pathfinding schedules.</p>
                  </div>

                  {/* Phase 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-400">Phase III: Alpha &amp; Systems Integration (Month 8-11)</span>
                      <span className="text-slate-500">PENDING SCHEDULE</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-lg overflow-hidden">
                      <div className="h-full bg-slate-800 w-0" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">Lineage progression engine integration, wholesale container routing algorithms added.</p>
                  </div>

                  {/* Phase 4 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-400">Phase IV: Beta Testing &amp; Regional Soft Launch (Month 12-15)</span>
                      <span className="text-slate-500">PENDING SCHEDULE</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-lg overflow-hidden">
                      <div className="h-full bg-slate-800 w-0" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">Regional soft launches on Google Play store in Canada and Singapore to balance economies.</p>
                  </div>
                </div>
              </div>

              {/* Risk Mitigation Table */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Technical Risk Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="py-2 pr-4">Identified Risk Factor</th>
                        <th className="py-2 px-4">Likelihood</th>
                        <th className="py-2 px-4">Impact</th>
                        <th className="py-2 pl-4">AAA Technical Mitigation Strategy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 font-sans text-slate-300">
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-white">Mobile Frame Drop under large farms</td>
                        <td className="py-3 px-4 font-mono text-amber-400">High</td>
                        <td className="py-3 px-4 font-mono text-red-400">Critical</td>
                        <td className="py-3 pl-4">Implement GPU instanced crop meshes; dynamic level of details (LOD) toggled by distance thresholds.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-white">Save corruption during unexpected closure</td>
                        <td className="py-3 px-4 font-mono text-amber-400">Medium</td>
                        <td className="py-3 px-4 font-mono text-red-400">Critical</td>
                        <td className="py-3 pl-4">Write transactions to double-buffered local SQLite cache before serializing complete binaries.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-white">Cheat/Duping in multiplayer trading</td>
                        <td className="py-3 px-4 font-mono text-amber-400">Medium</td>
                        <td className="py-3 px-4 font-mono text-amber-400">High</td>
                        <td className="py-3 pl-4">Server-authoritative state checks; HMAC cryptographic signing keys on all transaction JSONs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Persistent global warning label to highlight sandbox environment */}
      <footer className="border-t border-slate-900 bg-[#060a12] p-2 text-center text-[10px] font-mono text-slate-500">
        AGRILIFE DESIGN SANDBOX PORTAL &copy; 2026. ALL RIGHTS DESIGN-LOCKED.
      </footer>
    </div>
  );
}

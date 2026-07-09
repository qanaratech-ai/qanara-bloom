// Realistic mock data for the Qanara Tech dashboard.
// Swap by pointing api.ts at VITE_API_BASE_URL when the backend is live.

export const farmMetrics = {
  detectionsToday: 12,
  threatLevel: "Medium" as const,
  activeCameras: 8,
  sustainabilityScore: 72,
};

export const weeklyDetections = [
  { day: "Mon", detections: 8, resolved: 6 },
  { day: "Tue", detections: 12, resolved: 10 },
  { day: "Wed", detections: 6, resolved: 6 },
  { day: "Thu", detections: 15, resolved: 12 },
  { day: "Fri", detections: 9, resolved: 9 },
  { day: "Sat", detections: 11, resolved: 8 },
  { day: "Sun", detections: 7, resolved: 7 },
];

export const pestDistribution = [
  { name: "Whitefly", value: 42 },
  { name: "Thrips", value: 23 },
  { name: "Spider Mite", value: 15 },
  { name: "Aphids", value: 12 },
  { name: "Botrytis", value: 8 },
];

export const environmentalTrend = [
  { time: "06:00", temperature: 18, humidity: 68, light: 200 },
  { time: "09:00", temperature: 22, humidity: 62, light: 12000 },
  { time: "12:00", temperature: 28, humidity: 55, light: 42000 },
  { time: "15:00", temperature: 30, humidity: 52, light: 38000 },
  { time: "18:00", temperature: 26, humidity: 58, light: 8000 },
  { time: "21:00", temperature: 21, humidity: 65, light: 400 },
];

export const monthlyPerformance = [
  { month: "Jan", detections: 82, treatments: 68 },
  { month: "Feb", detections: 94, treatments: 81 },
  { month: "Mar", detections: 110, treatments: 96 },
  { month: "Apr", detections: 78, treatments: 72 },
  { month: "May", detections: 121, treatments: 108 },
  { month: "Jun", detections: 95, treatments: 88 },
];

export const greenhouseHealth = [
  { name: "Al-Khalil Greenhouse", health: 92 },
  { name: "Jenin Farm A", health: 78 },
  { name: "Bethlehem South", health: 85 },
  { name: "Ramallah Highland", health: 68 },
];

export type Detection = {
  id: string;
  timestamp: string;
  camera: string;
  pest: string;
  confidence: number;
  threat: "High" | "Medium" | "Low";
  status: "New" | "Reviewed" | "Treated";
};

export const detections: Detection[] = [
  { id: "d1", timestamp: "2026-07-09 08:14", camera: "Cam A-02", pest: "Whitefly", confidence: 94.7, threat: "High", status: "New" },
  { id: "d2", timestamp: "2026-07-09 07:52", camera: "Cam B-05", pest: "Thrips", confidence: 88.3, threat: "Medium", status: "Reviewed" },
  { id: "d3", timestamp: "2026-07-09 07:31", camera: "Cam A-01", pest: "Spider Mite", confidence: 76.4, threat: "Low", status: "Treated" },
  { id: "d4", timestamp: "2026-07-09 06:48", camera: "Cam C-03", pest: "Whitefly", confidence: 91.2, threat: "High", status: "New" },
  { id: "d5", timestamp: "2026-07-08 22:16", camera: "Cam B-02", pest: "Aphids", confidence: 82.1, threat: "Medium", status: "Reviewed" },
  { id: "d6", timestamp: "2026-07-08 19:04", camera: "Cam A-04", pest: "Botrytis", confidence: 71.9, threat: "Low", status: "Treated" },
  { id: "d7", timestamp: "2026-07-08 15:37", camera: "Cam D-01", pest: "Whitefly", confidence: 96.5, threat: "High", status: "Treated" },
  { id: "d8", timestamp: "2026-07-08 12:20", camera: "Cam C-05", pest: "Thrips", confidence: 79.8, threat: "Medium", status: "Reviewed" },
];

export type Recommendation = {
  id: string;
  pest: string;
  action: string;
  type: "Biocontrol" | "Cultural" | "Organic";
  cost: string;
  timeline: string;
  successRate: number;
  videoId?: string;
};

export const recommendations: Recommendation[] = [
  { id: "r1", pest: "Whitefly", action: "Release Encarsia formosa parasitoids", type: "Biocontrol", cost: "$45", timeline: "5–7 days", successRate: 92, videoId: "hphQq8TIIA4" },
  { id: "r2", pest: "Whitefly", action: "Install yellow sticky traps at canopy height", type: "Cultural", cost: "$15", timeline: "Immediate", successRate: 60, videoId: "hd1mz0cbVbo" },
  { id: "r3", pest: "Thrips", action: "Deploy Neoseiulus cucumeris sachets", type: "Biocontrol", cost: "$38", timeline: "3–5 days", successRate: 87 },
  { id: "r4", pest: "Spider Mite", action: "Release Phytoseiulus persimilis", type: "Biocontrol", cost: "$52", timeline: "7 days", successRate: 89 },
];

export const marketplaceProducts = [
  { id: "p1", name: "Encarsia formosa", category: "Beneficial insect", target: "Whitefly", price: 45, rating: 4.8, stock: 24 },
  { id: "p2", name: "Phytoseiulus persimilis", category: "Predatory mite", target: "Spider Mite", price: 52, rating: 4.9, stock: 12 },
  { id: "p3", name: "Trichoderma harzianum", category: "Biofungicide", target: "Botrytis", price: 28, rating: 4.6, stock: 40 },
  { id: "p4", name: "Neoseiulus cucumeris", category: "Predatory mite", target: "Thrips", price: 38, rating: 4.7, stock: 18 },
  { id: "p5", name: "Beauveria bassiana", category: "Biopesticide", target: "Broad spectrum", price: 34, rating: 4.5, stock: 30 },
  { id: "p6", name: "Yellow sticky traps (100pk)", category: "Cultural", target: "Whitefly, Thrips", price: 15, rating: 4.4, stock: 120 },
];

export const sustainabilityScore = {
  overall: 72,
  chemical: 85,
  carbon: 68,
  biocontrol: 78,
  water: 60,
  pesticideAvoided: 340, // kg
  beneficialsReleased: 45200,
  co2Saved: 2.1, // tons
  costSaved: 8400, // USD
};

export const sustainabilityTrend = [
  { month: "Feb", score: 58, chemicals: 42, biocontrol: 12 },
  { month: "Mar", score: 62, chemicals: 36, biocontrol: 18 },
  { month: "Apr", score: 65, chemicals: 30, biocontrol: 22 },
  { month: "May", score: 68, chemicals: 24, biocontrol: 28 },
  { month: "Jun", score: 70, chemicals: 20, biocontrol: 32 },
  { month: "Jul", score: 72, chemicals: 18, biocontrol: 36 },
];

export const achievements = [
  { id: "a1", name: "Chemical-Free Week", done: true, desc: "7 consecutive days with zero synthetic chemical use." },
  { id: "a2", name: "Biocontrol Champion", done: true, desc: "Released 10,000+ beneficial insects this quarter." },
  { id: "a3", name: "Carbon Neutral", done: false, progress: 68, desc: "Reach net-zero emissions across the farm." },
  { id: "a4", name: "Water Guardian", done: false, progress: 42, desc: "Reduce water usage by 30% year-over-year." },
];

export const chemicalLog = [
  { id: "cl1", date: "2026-07-05", product: "Neem oil concentrate", amount: "2 L", organic: true, area: "Greenhouse A" },
  { id: "cl2", date: "2026-07-02", product: "Encarsia release (5,000)", amount: "5,000 insects", organic: true, area: "Greenhouse B" },
  { id: "cl3", date: "2026-06-28", product: "Bacillus thuringiensis", amount: "1.5 kg", organic: true, area: "Greenhouse C" },
];

export const carbonBreakdown = [
  { source: "Heating & climate", value: 42 },
  { source: "Fertilizer inputs", value: 24 },
  { source: "Transport", value: 18 },
  { source: "Packaging", value: 16 },
];

// Pest reference data for the demo modal.
export const pestInfo = {
  Whitefly: {
    scientificName: "Bemisia tabaci",
    description:
      "A tiny sap-sucking insect that colonizes the underside of leaves. Excretes honeydew that promotes sooty mold and vectors over 100 plant viruses.",
    symptoms: ["Yellow stippling on leaves", "Sticky honeydew coating", "Sooty mold growth", "Leaf yellowing and drop"],
    affectedPlants: ["Tomato", "Cucumber", "Pepper", "Eggplant", "Ornamentals"],
    damageType: "Direct feeding + viral transmission",
    spreadRate: "Fast — up to 300 eggs per female",
    yieldImpact: "20–100% loss if unmanaged",
  },
  Thrips: {
    scientificName: "Frankliniella occidentalis",
    description:
      "Slender rasping-sucking insects that scar leaf and fruit surfaces and transmit tospoviruses like TSWV.",
    symptoms: ["Silvery leaf scarring", "Black frass specks", "Deformed flowers and fruit"],
    affectedPlants: ["Pepper", "Cucumber", "Ornamentals", "Strawberry"],
    damageType: "Rasping + virus transmission",
    spreadRate: "Moderate — 5–7 generations per season",
    yieldImpact: "15–60% loss",
  },
  Botrytis: {
    scientificName: "Botrytis cinerea",
    description:
      "Gray mold — a necrotrophic fungus that thrives in high humidity and attacks weakened plant tissue and ripe fruit.",
    symptoms: ["Gray fuzzy mold on fruit", "Water-soaked lesions", "Stem cankers"],
    affectedPlants: ["Tomato", "Strawberry", "Cucumber", "Grape"],
    damageType: "Fungal necrosis",
    spreadRate: "Very fast in humid conditions",
    yieldImpact: "10–50% post-harvest loss",
  },
} as const;

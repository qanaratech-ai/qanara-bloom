import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Siren,
  Camera,
  Activity,
  Award,
  Leaf,
  ShoppingBag,
  Lightbulb,
  Star,
  CheckCircle2,
  Package,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PestInfoModal } from "@/components/demo/PestInfoModal";
import {
  detections,
  recommendations,
  marketplaceProducts,
  sustainabilityScore,
  farmMetrics,
  type Recommendation,
} from "@/lib/mockData";
import whiteflyPoster from "@/assets/whitefly-poster.jpg";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — Qanara Tech" },
      {
        name: "description",
        content:
          "Explore the Qanara Tech pest detection platform: live camera feed, IPM recommendations, biocontrol marketplace, and sustainability tracking.",
      },
    ],
    links: [{ rel: "canonical", href: "/demo" }],
  }),
  component: DemoPage,
});

function DemoPage() {
  const [selected, setSelected] = useState<Recommendation | null>(null);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Badge className="mb-3 bg-gradient-primary text-primary-foreground">Interactive Demo</Badge>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            See Qanara Tech <span className="text-gradient">in action</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            All five modules — dashboard, live detection, IPM engine, biocontrol marketplace, and
            sustainability — running on live mock data.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-5 h-auto p-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="detection">Live Detection</TabsTrigger>
            <TabsTrigger value="ipm">IPM</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <DemoDashboard />
          </TabsContent>
          <TabsContent value="detection" className="mt-6">
            <DemoDetection />
          </TabsContent>
          <TabsContent value="ipm" className="mt-6">
            <DemoIPM onSelect={setSelected} />
          </TabsContent>
          <TabsContent value="marketplace" className="mt-6">
            <DemoMarketplace />
          </TabsContent>
          <TabsContent value="sustainability" className="mt-6">
            <DemoSustainability />
          </TabsContent>
        </Tabs>

        <div className="mt-12 rounded-3xl bg-gradient-hero p-8 text-center text-primary-foreground shadow-card-hover">
          <h2 className="text-2xl font-bold">Ready to see it on your farm?</h2>
          <p className="mt-2 text-primary-foreground/85">
            Get the full grower console — free for 30 days.
          </p>
          <Button asChild size="lg" className="mt-4 bg-accent text-accent-foreground shadow-glow">
            <Link to="/signup" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </Button>
        </div>
      </div>
      <PestInfoModal open={!!selected} onOpenChange={(v) => !v && setSelected(null)} recommendation={selected} />
      <Footer />
    </div>
  );
}

/* -------------------- Dashboard tab -------------------- */
function DemoDashboard() {
  const metrics = [
    { label: "Detections Today", value: farmMetrics.detectionsToday, icon: Camera, color: "primary" },
    { label: "Threat Level", value: farmMetrics.threatLevel, icon: Siren, color: "warning" },
    { label: "Active Cameras", value: farmMetrics.activeCameras, icon: Activity, color: "success" },
    { label: "Sustainability", value: `${farmMetrics.sustainabilityScore}/100`, icon: Leaf, color: "success" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="shadow-card">
                <CardContent className="p-4">
                  <Icon className="mb-2 h-5 w-5 text-primary" />
                  <div className="text-2xl font-black">{m.value}</div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Detections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {detections.slice(0, 5).map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.pest}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.camera} · {d.timestamp}
                  </div>
                </div>
                <Badge
                  variant={d.threat === "High" ? "destructive" : d.threat === "Medium" ? "secondary" : "outline"}
                >
                  {d.threat}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Farm Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Farm</span>
            <span className="font-medium">Al-Khalil Greenhouse</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Crop</span>
            <span className="font-medium">Tomato · 4.2 ha</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Season</span>
            <span className="font-medium">Summer 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cameras</span>
            <span className="font-medium">8 online</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------- Detection tab -------------------- */
function DemoDetection() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const timeline = [
    { time: "08:14:02", event: "Whitefly detected — Zone A-02", type: "danger" },
    { time: "08:12:45", event: "Thrips signature — Zone B-05", type: "warn" },
    { time: "08:10:22", event: "Environmental scan complete", type: "info" },
    { time: "08:08:11", event: "New camera calibration finished", type: "info" },
    { time: "08:05:33", event: "Spider mite trace — Zone A-01", type: "warn" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden shadow-card-hover">
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={whiteflyPoster}
              className="h-full w-full object-cover"
            >
              <source src="/videos/whitefly-detection.mp4" type="video/mp4" />
            </video>

            {/* Overlays */}
            <div className="pointer-events-none absolute inset-0">
              {/* top-left */}
              <div className="absolute start-3 top-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-md bg-destructive/90 px-2.5 py-1 text-xs font-bold text-destructive-foreground shadow-glow backdrop-blur-sm">
                  <Siren className="h-3.5 w-3.5 animate-pulse-slow" />
                  <span>⚠ PEST DETECTED</span>
                </div>
                <div className="rounded-md bg-black/60 px-2.5 py-1 text-xs font-mono text-white backdrop-blur-sm">
                  Whitefly · Conf: 94.7%
                </div>
              </div>

              {/* top-right */}
              <div className="absolute end-3 top-3 space-y-1 rounded-md bg-black/60 px-2.5 py-2 text-right font-mono text-[11px] leading-relaxed text-white backdrop-blur-sm">
                <div>FPS: 30</div>
                <div>Detections: 3</div>
                <div>Zone: A-02</div>
              </div>

              {/* scan line */}
              <div className="absolute inset-x-0 h-0.5 bg-primary-glow shadow-glow" style={{ animation: "scanLine 2.4s linear infinite" }} />

              {/* bottom-left REC */}
              <div className="absolute bottom-3 start-3 flex items-center gap-2 rounded-md bg-black/60 px-2.5 py-1 text-xs font-mono text-white backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                REC · {now}
              </div>

              {/* bottom-right */}
              <div className="absolute bottom-3 end-3 rounded-md bg-success/90 px-2.5 py-1 text-xs font-semibold text-success-foreground backdrop-blur-sm">
                AI Model: Active
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "AI Confidence", value: "85%" },
            { label: "Detection Time", value: "0.3s" },
            { label: "Pests Today", value: "12" },
            { label: "Accuracy", value: "98%" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <div className="text-2xl font-black text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detection Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    t.type === "danger" ? "bg-destructive" : t.type === "warn" ? "bg-accent" : "bg-primary"
                  }`}
                />
                {i < timeline.length - 1 && <div className="mt-1 flex-1 w-px bg-border" />}
              </div>
              <div className="flex-1 pb-2">
                <div className="text-xs font-mono text-muted-foreground">{t.time}</div>
                <div className="text-sm">{t.event}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------- IPM tab -------------------- */
function DemoIPM({ onSelect }: { onSelect: (r: Recommendation) => void }) {
  const whiteflyRecs = recommendations.filter((r) => r.pest === "Whitefly");
  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>Whitefly outbreak — Zone A-02</CardTitle>
              <div className="mt-1 text-sm text-muted-foreground">
                AI generated 2 biocontrol-first options. No chemical fallback offered.
              </div>
            </div>
            <Badge variant="destructive">High threat</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {whiteflyRecs.map((r) => (
            <div key={r.id} className="flex flex-col rounded-xl border border-border bg-muted/30 p-5">
              <Badge className="mb-2 w-fit bg-gradient-success text-success-foreground">{r.type}</Badge>
              <h3 className="text-base font-semibold">{r.action}</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Cost</div>
                  <div className="font-bold">{r.cost}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Timeline</div>
                  <div className="font-bold">{r.timeline}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Efficacy</div>
                  <div className="font-bold">{r.successRate}%</div>
                </div>
              </div>
              <Button className="mt-4 w-full bg-gradient-primary" onClick={() => onSelect(r)}>
                Apply <Lightbulb className="ms-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------- Marketplace tab -------------------- */
function DemoMarketplace() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {marketplaceProducts.map((p) => (
        <Card key={p.id} className="flex flex-col shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
          <CardHeader className="pb-3">
            <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">
              <Package className="h-12 w-12 opacity-80" />
            </div>
            <CardTitle className="text-base">{p.name}</CardTitle>
            <div className="text-xs text-muted-foreground">{p.category}</div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary">Targets {p.target}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-gradient">${p.price}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  {p.rating} · {p.stock} in stock
                </div>
              </div>
              <Button size="sm" className="bg-gradient-primary">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* -------------------- Sustainability tab -------------------- */
function DemoSustainability() {
  const s = sustainabilityScore;
  const size = 200;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (s.overall / 100) * c;

  const certs = ["GlobalGAP", "EU Organic", "GRASP", "Halal Farming"];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="shadow-card-hover lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-base">Sustainability Score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative">
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="hsl(var(--muted))" fill="none" className="stroke-muted" />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="none"
                stroke="url(#susGrad)"
                strokeDasharray={c}
                strokeDashoffset={offset}
              />
              <defs>
                <linearGradient id="susGrad">
                  <stop offset="0%" stopColor="hsl(190 60% 36%)" />
                  <stop offset="100%" stopColor="hsl(160 84% 39%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-black text-gradient">{s.overall}</div>
              <div className="text-xs text-muted-foreground">out of 100</div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {certs.map((c) => (
              <Badge key={c} variant="secondary">
                <Award className="me-1 h-3 w-3" />
                {c}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Chemical reduction", value: s.chemical },
            { label: "Biocontrol usage", value: s.biocontrol },
            { label: "Carbon efficiency", value: s.carbon },
            { label: "Water stewardship", value: s.water },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{row.label}</span>
                <span className="font-semibold">{row.value}%</span>
              </div>
              <Progress value={row.value} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            <div className="rounded-lg border border-border p-3">
              <CheckCircle2 className="mb-1 h-4 w-4 text-success" />
              <div className="text-lg font-bold">{s.pesticideAvoided} kg</div>
              <div className="text-xs text-muted-foreground">Pesticide avoided</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <CheckCircle2 className="mb-1 h-4 w-4 text-success" />
              <div className="text-lg font-bold">{s.beneficialsReleased.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Beneficials released</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <CheckCircle2 className="mb-1 h-4 w-4 text-success" />
              <div className="text-lg font-bold">{s.co2Saved} t</div>
              <div className="text-xs text-muted-foreground">CO₂ saved</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <CheckCircle2 className="mb-1 h-4 w-4 text-success" />
              <div className="text-lg font-bold">${s.costSaved.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Cost saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

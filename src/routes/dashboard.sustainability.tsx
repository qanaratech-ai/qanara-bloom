import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Leaf,
  Cloud,
  Droplets,
  CheckCircle2,
  TreePine,
  Sun,
  Recycle,
  FileText,
  Share2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useSustainabilityScore,
  useSustainabilityTrend,
  useAchievements,
  useChemicalLog,
  useCarbonBreakdown,
} from "@/lib/api";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/sustainability")({
  component: SustainabilityPage,
});

function SustainabilityPage() {
  const { data: s } = useSustainabilityScore();
  const { data: trend = [] } = useSustainabilityTrend();
  const { data: achievements = [] } = useAchievements();
  const { data: log = [] } = useChemicalLog();
  const { data: carbon = [] } = useCarbonBreakdown();

  if (!s) return null;

  const sdg = [
    { code: "2", title: "Zero Hunger", desc: "Higher yields through early detection." },
    { code: "12", title: "Responsible Consumption", desc: "Reduced chemical inputs." },
    { code: "13", title: "Climate Action", desc: "Lower emissions per kg produced." },
    { code: "15", title: "Life on Land", desc: "Protecting beneficial insect populations." },
  ];

  const carbonInit = [
    { icon: TreePine, title: "Tree planting", value: "142 trees" },
    { icon: Sun, title: "Solar installation", value: "24 kWp" },
    { icon: Recycle, title: "Substrate recycling", value: "3.2 tons" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Sustainability</h1>
        <p className="text-sm text-muted-foreground">Score, certifications, and impact — all on-chain.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="chemicals">Chemical Log</TabsTrigger>
          <TabsTrigger value="carbon">Carbon</TabsTrigger>
          <TabsTrigger value="sdg">UN SDG</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-1 shadow-card-hover">
              <CardHeader>
                <CardTitle className="text-base">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl font-black text-gradient">{s.overall}</div>
                <div className="text-sm text-muted-foreground">out of 100</div>
                <div className="mt-4 space-y-3">
                  {[
                    { l: "Chemical", v: s.chemical, i: Leaf },
                    { l: "Carbon", v: s.carbon, i: Cloud },
                    { l: "Biocontrol", v: s.biocontrol, i: Sparkles },
                    { l: "Water", v: s.water, i: Droplets },
                  ].map((row) => {
                    const Icon = row.i;
                    return (
                      <div key={row.l}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="flex items-center gap-1"><Icon className="h-3 w-3" /> {row.l}</span>
                          <span className="font-semibold">{row.v}%</span>
                        </div>
                        <Progress value={row.v} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Pesticide avoided", value: `${s.pesticideAvoided} kg` },
                  { label: "Beneficials released", value: s.beneficialsReleased.toLocaleString() },
                  { label: "CO₂ saved", value: `${s.co2Saved} t` },
                  { label: "Cost savings", value: `$${s.costSaved.toLocaleString()}` },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-border p-4">
                    <CheckCircle2 className="mb-2 h-4 w-4 text-success" />
                    <div className="text-2xl font-black">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
                <div className="col-span-2 sm:col-span-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trend}>
                      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="score" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="chemicals" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="biocontrol" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6 grid gap-4 md:grid-cols-2">
          {achievements.map((a) => (
            <Card key={a.id} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.done ? "bg-gradient-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                  {a.done && <Badge className="bg-success text-success-foreground">Complete</Badge>}
                </div>
                {!a.done && a.progress != null && (
                  <div className="mt-3">
                    <Progress value={a.progress} />
                    <div className="mt-1 text-right text-xs text-muted-foreground">{a.progress}%</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="chemicals" className="mt-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Chemical & Biocontrol Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {log.map((e) => (
                <div key={e.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{e.product}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.date} · {e.area} · {e.amount}
                    </div>
                  </div>
                  {e.organic && (
                    <Badge className="bg-success/15 text-success">Organic</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon" className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Carbon Footprint Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {carbon.map((c) => (
                <div key={c.source}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{c.source}</span>
                    <span className="font-semibold">{c.value}%</span>
                  </div>
                  <Progress value={c.value} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Offset Initiatives</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {carbonInit.map((i) => {
                const Icon = i.icon;
                return (
                  <div key={i.title} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-success text-success-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{i.title}</div>
                      <div className="text-xs text-muted-foreground">{i.value}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdg" className="mt-6 grid gap-4 md:grid-cols-2">
          {sdg.map((g) => (
            <Card key={g.code} className="shadow-card">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-2xl font-black text-primary-foreground">
                  {g.code}
                </div>
                <div>
                  <div className="font-semibold">SDG {g.code} — {g.title}</div>
                  <div className="text-sm text-muted-foreground">{g.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="export" className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="shadow-card">
            <CardContent className="p-5">
              <FileText className="mb-3 h-8 w-8 text-primary" />
              <div className="font-semibold">Monthly Report (PDF)</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Full sustainability report, audit-ready.
              </div>
              <Button className="mt-4 w-full bg-gradient-primary">Download</Button>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-5">
              <Award className="mb-3 h-8 w-8 text-accent" />
              <div className="font-semibold">Blockchain Certificate</div>
              <div className="mt-1 text-xs text-muted-foreground">On-chain verifiable proof.</div>
              <Button className="mt-4 w-full" variant="outline">
                <ExternalLink className="me-2 h-4 w-4" /> View on-chain
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-5">
              <Share2 className="mb-3 h-8 w-8 text-success" />
              <div className="font-semibold">Shareable Link</div>
              <div className="mt-1 text-xs text-muted-foreground">Send to retailers or auditors.</div>
              <Button className="mt-4 w-full" variant="outline">Copy Link</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Camera,
  Siren,
  Activity,
  Leaf,
  TrendingUp,
  ArrowRight,
  Thermometer,
  Droplets,
  Sun,
  Plus,
  Bell,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  useFarmMetrics,
  useWeeklyDetections,
  usePestDistribution,
  useEnvironmentalTrend,
  useMonthlyPerformance,
  useGreenhouseHealth,
  useDetections,
  useRecommendations,
} from "@/lib/api";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function DashboardHome() {
  const { data: metrics } = useFarmMetrics();
  const { data: weekly = [] } = useWeeklyDetections();
  const { data: pests = [] } = usePestDistribution();
  const { data: env = [] } = useEnvironmentalTrend();
  const { data: monthly = [] } = useMonthlyPerformance();
  const { data: health = [] } = useGreenhouseHealth();
  const { data: detections = [] } = useDetections();
  const { data: recs = [] } = useRecommendations();

  const metricCards = [
    { label: "Detections Today", value: metrics?.detectionsToday ?? "—", icon: Camera, tone: "primary" },
    { label: "Threat Level", value: metrics?.threatLevel ?? "—", icon: Siren, tone: "warning" },
    { label: "Active Cameras", value: metrics?.activeCameras ?? "—", icon: Activity, tone: "success" },
    { label: "Sustainability", value: metrics ? `${metrics.sustainabilityScore}/100` : "—", icon: Leaf, tone: "success" },
  ];

  const envNow = env[env.length - 1] ?? { temperature: 0, humidity: 0, light: 0 };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Al-Khalil Greenhouse — Live overview</p>
        </div>
        <Badge className="bg-success/10 text-success">
          <span className="me-1.5 h-1.5 w-1.5 rounded-full bg-success" /> All systems operational
        </Badge>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metricCards.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="shadow-card transition-all hover:shadow-card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${m.tone === "warning" ? "text-accent" : m.tone === "success" ? "text-success" : "text-primary"}`} />
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                </div>
                <div className="mt-3 text-3xl font-black">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Weekly Detection Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Area type="monotone" dataKey="detections" stroke="var(--chart-1)" fill="url(#detGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="var(--chart-4)" fill="url(#resGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Pest Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pests} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {pests.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* env */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Environmental Conditions</CardTitle>
            <div className="grid grid-cols-3 gap-3 text-xs sm:gap-6">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-bold">{envNow.temperature}°C</div>
                  <div className="text-muted-foreground">Temp</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-bold">{envNow.humidity}%</div>
                  <div className="text-muted-foreground">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-bold">{envNow.light.toLocaleString()} lx</div>
                  <div className="text-muted-foreground">Light</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={env}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="light" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* monthly + health */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="detections" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="treatments" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Greenhouse Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {health.map((g) => (
              <div key={g.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="truncate">{g.name}</span>
                  <span className="font-semibold">{g.health}%</span>
                </div>
                <Progress value={g.health} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* recent + recs */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Detections</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {detections.slice(0, 6).map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.pest}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.camera} · {d.timestamp}
                  </div>
                </div>
                <div className="shrink-0 text-xs font-mono">{d.confidence.toFixed(1)}%</div>
                <Badge
                  variant={d.threat === "High" ? "destructive" : d.threat === "Medium" ? "secondary" : "outline"}
                  className="shrink-0"
                >
                  {d.threat}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Active Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recs.slice(0, 4).map((r) => (
              <div key={r.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-success text-success-foreground text-[10px]">{r.type}</Badge>
                  <span className="text-xs text-muted-foreground">{r.pest}</span>
                </div>
                <div className="mt-1 text-sm">{r.action}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {r.cost} · {r.timeline}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Plus, label: "New Scan" },
          { icon: Bell, label: "Set Alert" },
          { icon: ShoppingBag, label: "Order Biocontrol" },
          { icon: FileText, label: "Export Report" },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Button key={a.label} variant="outline" className="h-16 flex-col gap-1">
              <Icon className="h-4 w-4" />
              <span className="text-xs">{a.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

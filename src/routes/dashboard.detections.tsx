import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Eye, X, AlertTriangle, ShieldAlert, Shield, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDetections } from "@/lib/api";

export const Route = createFileRoute("/dashboard/detections")({
  component: DetectionsPage,
});

function DetectionsPage() {
  const [search, setSearch] = useState("");
  const [pest, setPest] = useState("all");
  const [camera, setCamera] = useState("all");
  const [threat, setThreat] = useState("all");
  const { data = [] } = useDetections({ search, pest, camera, threat });

  const summary = [
    { label: "High threat", value: data.filter((d) => d.threat === "High").length, icon: ShieldAlert, tone: "destructive" },
    { label: "Medium threat", value: data.filter((d) => d.threat === "Medium").length, icon: AlertTriangle, tone: "warning" },
    { label: "Low threat", value: data.filter((d) => d.threat === "Low").length, icon: Shield, tone: "success" },
    { label: "Active cameras", value: 8, icon: Activity, tone: "primary" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Detections</h1>
        <p className="text-sm text-muted-foreground">All pest signals from your camera network.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="shadow-card">
              <CardContent className="p-4">
                <Icon
                  className={`mb-2 h-5 w-5 ${
                    s.tone === "destructive"
                      ? "text-destructive"
                      : s.tone === "warning"
                        ? "text-accent"
                        : s.tone === "success"
                          ? "text-success"
                          : "text-primary"
                  }`}
                />
                <div className="text-3xl font-black">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="ps-9"
                placeholder="Search pest or camera…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={pest} onValueChange={setPest}>
              <SelectTrigger><SelectValue placeholder="Pest" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All pests</SelectItem>
                <SelectItem value="Whitefly">Whitefly</SelectItem>
                <SelectItem value="Thrips">Thrips</SelectItem>
                <SelectItem value="Spider Mite">Spider Mite</SelectItem>
                <SelectItem value="Aphids">Aphids</SelectItem>
                <SelectItem value="Botrytis">Botrytis</SelectItem>
              </SelectContent>
            </Select>
            <Select value={camera} onValueChange={setCamera}>
              <SelectTrigger><SelectValue placeholder="Camera" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cameras</SelectItem>
                <SelectItem value="Cam A-01">Cam A-01</SelectItem>
                <SelectItem value="Cam A-02">Cam A-02</SelectItem>
                <SelectItem value="Cam B-02">Cam B-02</SelectItem>
                <SelectItem value="Cam B-05">Cam B-05</SelectItem>
                <SelectItem value="Cam C-03">Cam C-03</SelectItem>
              </SelectContent>
            </Select>
            <Select value={threat} onValueChange={setThreat}>
              <SelectTrigger><SelectValue placeholder="Threat" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All threats</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date / Time</TableHead>
                  <TableHead>Camera</TableHead>
                  <TableHead>Pest</TableHead>
                  <TableHead className="w-40">Confidence</TableHead>
                  <TableHead>Threat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-mono text-xs">{d.timestamp}</TableCell>
                    <TableCell>{d.camera}</TableCell>
                    <TableCell className="font-medium">{d.pest}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={d.confidence} className="h-2 w-20" />
                        <span className="text-xs">{d.confidence.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={d.threat === "High" ? "destructive" : d.threat === "Medium" ? "secondary" : "outline"}
                      >
                        {d.threat}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{d.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      No detections match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

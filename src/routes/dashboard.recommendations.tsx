import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbulb, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PestInfoModal } from "@/components/demo/PestInfoModal";
import { useRecommendations, useApplyRecommendation } from "@/lib/api";
import type { Recommendation } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/recommendations")({
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const [selected, setSelected] = useState<Recommendation | null>(null);
  const { data = [] } = useRecommendations();
  const apply = useApplyRecommendation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">IPM Recommendations</h1>
        <p className="text-sm text-muted-foreground">
          Biocontrol-first treatment plans generated for your active detections.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((r) => (
          <Card key={r.id} className="shadow-card transition-all hover:shadow-card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-gradient-primary text-primary-foreground">{r.type}</Badge>
                <div className="text-xs text-muted-foreground">Targets: {r.pest}</div>
              </div>
              <CardTitle className="mt-2 text-lg">{r.action}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-muted-foreground">Cost</div>
                  <div className="mt-1 text-base font-bold">{r.cost}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-muted-foreground">Timeline</div>
                  <div className="mt-1 text-base font-bold">{r.timeline}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-muted-foreground">Success</div>
                  <div className="mt-1 text-base font-bold">{r.successRate}%</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-gradient-primary"
                  onClick={() => {
                    apply.mutate(r.id, {
                      onSuccess: () => toast.success(`Applied: ${r.action}`),
                    });
                    setSelected(r);
                  }}
                >
                  <Check className="me-2 h-4 w-4" /> Apply
                </Button>
                <Button variant="outline" onClick={() => setSelected(r)}>
                  <Lightbulb className="me-2 h-4 w-4" /> Details
                </Button>
                <Button variant="ghost" size="icon" title="Dismiss">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PestInfoModal
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
        recommendation={selected}
      />
    </div>
  );
}

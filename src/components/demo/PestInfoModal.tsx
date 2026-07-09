import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { pestInfo } from "@/lib/mockData";
import type { Recommendation } from "@/lib/mockData";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  recommendation: Recommendation | null;
}

export function PestInfoModal({ open, onOpenChange, recommendation }: Props) {
  if (!recommendation) return null;
  const info = pestInfo[recommendation.pest as keyof typeof pestInfo];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {recommendation.pest}
            {info && (
              <span className="ms-2 text-sm font-normal italic text-muted-foreground">
                {info.scientificName}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {info && (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">{info.description}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Damage
                </div>
                <div className="mt-1 text-sm">{info.damageType}</div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Spread rate
                </div>
                <div className="mt-1 text-sm">{info.spreadRate}</div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Yield impact
                </div>
                <div className="mt-1 text-sm">{info.yieldImpact}</div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Success rate
                </div>
                <div className="mt-1 text-sm">{recommendation.successRate}%</div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold">Symptoms to look for</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {info.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold">Affected crops</h4>
              <div className="flex flex-wrap gap-2">
                {info.affectedPlants.map((p) => (
                  <Badge key={p} variant="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />
          </>
        )}

        <div>
          <h4 className="mb-2 text-sm font-semibold">Recommended treatment</h4>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-gradient-primary text-primary-foreground">{recommendation.type}</Badge>
              <span className="text-sm font-medium">{recommendation.action}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Cost</div>
                <div className="font-semibold">{recommendation.cost}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Timeline</div>
                <div className="font-semibold">{recommendation.timeline}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Efficacy</div>
                <div className="font-semibold">{recommendation.successRate}%</div>
              </div>
            </div>
          </div>
        </div>

        {recommendation.videoId && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Application guide</h4>
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${recommendation.videoId}?rel=0`}
                title="Application guide"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

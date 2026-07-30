import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, ScanLine, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { checkHealth, predictImage, DETECTOR_API_URL, type PredictResponse } from "@/lib/detector";

type Status = "idle" | "loading" | "done" | "error";

export function ScanUploadDialog({
  trigger,
  className,
}: {
  trigger?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgBox, setImgBox] = useState({ w: 0, h: 0, natW: 1, natH: 1 });

  useEffect(() => {
    if (!open) return;
    const ac = new AbortController();
    checkHealth(ac.signal).then(setOnline);
    return () => ac.abort();
  }, [open]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const reset = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setResult(null);
    setError(null);
    setStatus("idle");
  };

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
    setStatus("idle");
  };

  const run = async () => {
    if (!file) return;
    setStatus("loading");
    setError(null);
    try {
      const res = await predictImage(file);
      setResult(res);
      setStatus("done");
    } catch (e) {
      setError(
        e instanceof Error && e.message.includes("Failed to fetch")
          ? `Cannot reach the detector API at ${DETECTOR_API_URL}. Start the backend and allow CORS from this origin.`
          : e instanceof Error
            ? e.message
            : "Prediction failed",
      );
      setStatus("error");
    }
  };

  const onImgLoad = () => {
    const el = imgRef.current;
    if (!el) return;
    setImgBox({ w: el.clientWidth, h: el.clientHeight, natW: el.naturalWidth || 1, natH: el.naturalHeight || 1 });
  };

  const infected = result?.verdict?.toUpperCase() === "INFECTED";
  const scaleX = imgBox.w / imgBox.natW;
  const scaleY = imgBox.h / imgBox.natH;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline" className={className}>
            <ScanLine className="me-2 h-4 w-4" />
            Scan photo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5 text-primary" /> AI Leaf Scan
          </DialogTitle>
          <DialogDescription>
            Upload a leaf photo — it is sent to your detector API for a whitefly infection verdict.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={`h-2 w-2 rounded-full ${
              online === null ? "bg-muted-foreground" : online ? "bg-success" : "bg-destructive"
            }`}
          />
          <span className="truncate">
            {online === null ? "Checking API…" : online ? "API online" : "API offline"} · {DETECTOR_API_URL}
          </span>
        </div>

        {!preview ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              pick(e.dataTransfer.files?.[0]);
            }}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-10 text-center transition-colors hover:border-primary hover:bg-muted/60"
          >
            <Upload className="h-8 w-8 text-primary" />
            <div className="text-sm font-medium">Click or drop a leaf photo</div>
            <div className="text-xs text-muted-foreground">JPG or PNG</div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative inline-block w-full overflow-hidden rounded-xl border border-border">
              <img
                ref={imgRef}
                src={preview}
                alt="Uploaded leaf"
                onLoad={onImgLoad}
                className="block w-full object-contain"
              />
              {result?.boxes?.map((b, i) => (
                <div
                  key={i}
                  className="absolute rounded-sm border-2 border-destructive"
                  style={{
                    left: b.bbox_xyxy[0] * scaleX,
                    top: b.bbox_xyxy[1] * scaleY,
                    width: (b.bbox_xyxy[2] - b.bbox_xyxy[0]) * scaleX,
                    height: (b.bbox_xyxy[3] - b.bbox_xyxy[1]) * scaleY,
                  }}
                >
                  <span className="absolute -top-5 start-0 whitespace-nowrap rounded bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {b.class} {(b.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            {result && (
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      infected
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-success text-success-foreground"
                    }
                  >
                    {infected ? (
                      <AlertTriangle className="me-1 h-3 w-3" />
                    ) : (
                      <CheckCircle2 className="me-1 h-3 w-3" />
                    )}
                    {result.verdict}
                  </Badge>
                  <span className="text-sm font-bold">{(result.confidence * 100).toFixed(1)}% confidence</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-muted-foreground">Candidates detected</div>
                    <div className="mt-1 text-base font-bold">{result.num_candidates_detected ?? "—"}</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-muted-foreground">Threshold used</div>
                    <div className="mt-1 text-base font-bold">{result.threshold_used ?? "—"}</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-primary text-primary-foreground"
                onClick={run}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="me-2 h-4 w-4 animate-spin" /> Analyzing…
                  </>
                ) : (
                  <>
                    <ScanLine className="me-2 h-4 w-4" /> {result ? "Re-analyze" : "Analyze photo"}
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={reset} disabled={status === "loading"}>
                <RefreshCw className="me-2 h-4 w-4" /> New photo
              </Button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </DialogContent>
    </Dialog>
  );
}

/**
 * Whitefly Leaf Infection Detector API client.
 *
 * Points at the FastAPI backend you run locally (or anywhere reachable).
 * Configure with a single env var:
 *
 *   VITE_DETECTOR_API_URL=http://localhost:8000
 *
 * Endpoints used:
 *   GET  /health          -> health string
 *   POST /predict         -> multipart/form-data { file } -> PredictResponse
 *   POST /predict/batch   -> multipart/form-data { files[] } -> PredictResponse[]
 */

export const DETECTOR_API_URL: string =
  (typeof import.meta !== "undefined" &&
    (import.meta as { env?: { VITE_DETECTOR_API_URL?: string } }).env?.VITE_DETECTOR_API_URL) ||
  "http://localhost:8000";

export interface DetectionBox {
  class: string;
  confidence: number;
  bbox_xyxy: [number, number, number, number];
  counted_toward_verdict?: boolean;
}

export interface PredictResponse {
  verdict: string; // "INFECTED" | "HEALTHY"
  confidence: number; // 0..1
  threshold_used?: number;
  num_candidates_detected?: number;
  boxes?: DetectionBox[];
}

async function parseError(res: Response): Promise<never> {
  let detail = `${res.status} ${res.statusText}`;
  try {
    const body = (await res.json()) as { detail?: unknown };
    if (body?.detail) detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
  } catch {
    /* ignore */
  }
  throw new Error(detail);
}

export async function checkHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${DETECTOR_API_URL}/health`, { signal });
    return res.ok;
  } catch {
    return false;
  }
}

export async function predictImage(file: File, signal?: AbortSignal): Promise<PredictResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${DETECTOR_API_URL}/predict`, { method: "POST", body: form, signal });
  if (!res.ok) return parseError(res);
  const data = await res.json();
  return (typeof data === "string" ? JSON.parse(data) : data) as PredictResponse;
}

export async function predictBatch(files: File[], signal?: AbortSignal): Promise<PredictResponse[]> {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  const res = await fetch(`${DETECTOR_API_URL}/predict/batch`, { method: "POST", body: form, signal });
  if (!res.ok) return parseError(res);
  const data = await res.json();
  return (typeof data === "string" ? JSON.parse(data) : data) as PredictResponse[];
}

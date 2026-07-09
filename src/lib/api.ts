/**
 * Qanara Tech — API layer.
 *
 * All UI data hooks live here. Today they return mock data with an artificial
 * network delay so charts show the react-query loading states. To go live:
 *
 *   1. Set VITE_API_BASE_URL in your .env
 *   2. Replace the body of each queryFn with a real fetch(`${BASE}/…`) call
 *   3. Everything else in the app (hooks, components, cache) stays identical.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as mock from "./mockData";

export const API_BASE_URL: string =
  (typeof import.meta !== "undefined" && (import.meta as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL) ||
  "";

const delay = <T,>(data: T, ms = 250) => new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));

// Generic typed fetcher — wire up when API_BASE_URL is set.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  return (await res.json()) as T;
}

// ---- Farm & dashboard ----
export const useFarmMetrics = () =>
  useQuery({
    queryKey: ["farm", "metrics"],
    queryFn: () => delay(mock.farmMetrics),
  });

export const useWeeklyDetections = () =>
  useQuery({ queryKey: ["analytics", "weekly"], queryFn: () => delay(mock.weeklyDetections) });

export const usePestDistribution = () =>
  useQuery({ queryKey: ["analytics", "pests"], queryFn: () => delay(mock.pestDistribution) });

export const useEnvironmentalTrend = () =>
  useQuery({ queryKey: ["analytics", "environmental"], queryFn: () => delay(mock.environmentalTrend) });

export const useMonthlyPerformance = () =>
  useQuery({ queryKey: ["analytics", "monthly"], queryFn: () => delay(mock.monthlyPerformance) });

export const useGreenhouseHealth = () =>
  useQuery({ queryKey: ["farm", "health"], queryFn: () => delay(mock.greenhouseHealth) });

// ---- Detections ----
export interface DetectionFilters {
  search?: string;
  pest?: string;
  camera?: string;
  threat?: string;
}
export const useDetections = (filters: DetectionFilters = {}) =>
  useQuery({
    queryKey: ["detections", filters],
    queryFn: async () => {
      const all = await delay(mock.detections);
      return all.filter((d) => {
        if (filters.search && !`${d.pest} ${d.camera}`.toLowerCase().includes(filters.search.toLowerCase()))
          return false;
        if (filters.pest && filters.pest !== "all" && d.pest !== filters.pest) return false;
        if (filters.camera && filters.camera !== "all" && d.camera !== filters.camera) return false;
        if (filters.threat && filters.threat !== "all" && d.threat !== filters.threat) return false;
        return true;
      });
    },
  });

// ---- Recommendations ----
export const useRecommendations = () =>
  useQuery({ queryKey: ["recommendations"], queryFn: () => delay(mock.recommendations) });

export const useApplyRecommendation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => delay({ id, applied: true }, 400),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recommendations"] }),
  });
};

// ---- Marketplace ----
export const useMarketplaceProducts = () =>
  useQuery({ queryKey: ["marketplace"], queryFn: () => delay(mock.marketplaceProducts) });

// ---- Sustainability ----
export const useSustainabilityScore = () =>
  useQuery({ queryKey: ["sustainability", "score"], queryFn: () => delay(mock.sustainabilityScore) });

export const useSustainabilityTrend = () =>
  useQuery({ queryKey: ["sustainability", "trend"], queryFn: () => delay(mock.sustainabilityTrend) });

export const useAchievements = () =>
  useQuery({ queryKey: ["sustainability", "achievements"], queryFn: () => delay(mock.achievements) });

export const useChemicalLog = () =>
  useQuery({ queryKey: ["sustainability", "chemicals"], queryFn: () => delay(mock.chemicalLog) });

export const useCarbonBreakdown = () =>
  useQuery({ queryKey: ["sustainability", "carbon"], queryFn: () => delay(mock.carbonBreakdown) });

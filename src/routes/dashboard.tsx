import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Qanara Tech" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
});

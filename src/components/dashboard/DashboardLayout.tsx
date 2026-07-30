import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Camera,
  Lightbulb,
  ShoppingBag,
  Leaf,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ScanUploadDialog } from "@/components/ScanUploadDialog";

import { useLanguage } from "@/contexts/LanguageContext";
import logoAsset from "@/assets/qanara-logo.png.asset.json";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const items = [
    { to: "/dashboard", label: t("dash.nav.dashboard"), icon: LayoutDashboard },
    { to: "/dashboard/detections", label: t("dash.nav.detections"), icon: Camera },
    { to: "/dashboard/recommendations", label: t("dash.nav.recommendations"), icon: Lightbulb },
    { to: "/demo", label: t("dash.nav.marketplace"), icon: ShoppingBag },
    { to: "/dashboard/sustainability", label: t("dash.nav.sustainability"), icon: Leaf },
    { to: "/dashboard", label: t("dash.nav.analytics"), icon: BarChart3 },
    { to: "/dashboard", label: t("dash.nav.settings"), icon: Settings },
  ];

  const Sidebar = () => (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <img src={logoAsset.url} alt="Qanara" className="h-9 w-9 rounded-full bg-white/10 p-0.5" />
        <div>
          <div className="text-sm font-bold">Qanara Tech</div>
          <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
            Grower Console
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((it, i) => {
          const active = pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={i}
              to={it.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("dash.nav.signOut")}</span>
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-y-0 start-0 z-40 hidden lg:block">
        <Sidebar />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <button className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-success" />
              Al-Khalil Greenhouse
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ScanUploadDialog />
            <LanguageSwitcher />

            <button className="relative rounded-md p-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
              AK
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

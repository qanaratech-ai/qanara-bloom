import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CheckCircle2 } from "lucide-react";
import logoAsset from "@/assets/qanara-logo.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Qanara Tech" },
      { name: "description", content: "Sign in to your Qanara Tech grower dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /auth/login via api.ts
    setTimeout(() => navigate({ to: "/dashboard" }), 500);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Qanara Tech" className="h-9 w-9" />
            <span className="text-base font-bold">Qanara Tech</span>
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-3xl font-black tracking-tight">{t("auth.signIn.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.signIn.subtitle")}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required autoComplete="email" placeholder="you@farm.com" />
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" required autoComplete="current-password" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-glow">
              {loading ? "…" : t("auth.submitIn")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              {t("auth.signUp")}
            </Link>
          </p>
        </div>
        <div />
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 flex flex-col justify-center p-14 text-primary-foreground">
          <img src={logoAsset.url} alt="" className="mb-8 h-20 w-20 animate-float rounded-2xl bg-white/10 p-2 backdrop-blur-sm" />
          <h2 className="text-3xl font-black">Welcome back, grower.</h2>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            Real-time pest detection, IPM guidance, and a certified sustainability ledger — all
            waiting in your greenhouse console.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Live detections & alerts", "AI-generated IPM plans", "Blockchain-verified reports"].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Sprout, Camera, LineChart, Award } from "lucide-react";
import logoAsset from "@/assets/qanara-logo.png.asset.json";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Get Started — Qanara Tech" },
      { name: "description", content: "Create your free 30-day Qanara Tech account. No credit card required." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /auth/signup via api.ts
    setTimeout(() => navigate({ to: "/dashboard" }), 500);
  };

  const steps = [
    { icon: Sprout, title: "Create your account", desc: "Tell us about your farm." },
    { icon: Camera, title: "Install a camera", desc: "Plug-and-play in under 15 minutes." },
    { icon: LineChart, title: "Start detecting", desc: "First insights within 24 hours." },
    { icon: Award, title: "Earn certifications", desc: "Auto-generated audit reports." },
  ];

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
          <h1 className="text-3xl font-black tracking-tight">{t("auth.signUp.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.signUp.subtitle")}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="name">{t("auth.name")}</Label>
              <Input id="name" required autoComplete="name" />
            </div>
            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="phone">{t("auth.phone")}</Label>
              <Input id="phone" type="tel" required autoComplete="tel" />
            </div>
            <div>
              <Label htmlFor="country">{t("auth.country")}</Label>
              <Select defaultValue="PS">
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PS">Palestine</SelectItem>
                  <SelectItem value="IL">Israel</SelectItem>
                  <SelectItem value="SA">Saudi Arabia</SelectItem>
                  <SelectItem value="AE">United Arab Emirates</SelectItem>
                  <SelectItem value="EG">Egypt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" required autoComplete="new-password" minLength={8} />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-glow">
              {loading ? "…" : t("auth.submitUp")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t("auth.signIn")}
            </Link>
          </p>
        </div>
        <div />
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 flex flex-col justify-center p-14 text-primary-foreground">
          <img src={logoAsset.url} alt="" className="mb-8 h-20 w-20 animate-float rounded-2xl bg-white/10 p-2" />
          <h2 className="text-3xl font-black">Get running in 4 steps.</h2>
          <div className="mt-8 space-y-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-primary-foreground/75">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

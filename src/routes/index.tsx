import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Lightbulb,
  ShoppingBag,
  Link as LinkIcon,
  BarChart3,
  Globe,
  Check,
  X,
  Sparkles,
  Play,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/hero-greenhouse.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const { t } = useLanguage();

  const stats = [
    { value: "30-40%", label: t("stats.chemical") },
    { value: "7-14", label: t("stats.earlier") },
    { value: "10×", label: t("stats.affordable") },
    { value: "100%", label: t("stats.blockchain") },
  ];

  const features = [
    { icon: Camera, title: t("features.detection.title"), desc: t("features.detection.desc") },
    { icon: Lightbulb, title: t("features.ipm.title"), desc: t("features.ipm.desc") },
    { icon: ShoppingBag, title: t("features.marketplace.title"), desc: t("features.marketplace.desc") },
    { icon: LinkIcon, title: t("features.blockchain.title"), desc: t("features.blockchain.desc") },
    { icon: BarChart3, title: t("features.analytics.title"), desc: t("features.analytics.desc") },
    { icon: Globe, title: t("features.global.title"), desc: t("features.global.desc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Greenhouse" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in text-primary-foreground">
            <Badge className="mb-6 border-white/20 bg-white/10 text-primary-foreground backdrop-blur-sm">
              <Sparkles className="me-1.5 h-3 w-3" />
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.title.1")}{" "}
              <span className="inline-block bg-gradient-accent bg-clip-text text-transparent">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.2")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground shadow-glow-lg hover:opacity-90"
              >
                <Link to="/signup" className="gap-2">
                  {t("hero.cta.trial")}
                  <ArrowRight className="h-5 w-5 rtl-flip" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-primary-foreground backdrop-blur-sm hover:bg-white/20"
              >
                <Link to="/demo" className="gap-2">
                  <Play className="h-5 w-5" />
                  {t("hero.cta.demo")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid animate-slide-up grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 text-primary-foreground backdrop-blur-md"
              >
                <div className="text-3xl font-black tracking-tight sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/75">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("features.subtitle")}</p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-muted/40 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {t("pricing.title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Competitors */}
            <div className="rounded-3xl border border-border bg-card p-8 opacity-80">
              <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("pricing.competitors.name")}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black text-muted-foreground line-through">
                  {t("pricing.competitors.price")}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{t("pricing.competitors.suffix")}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  t("pricing.competitors.f1"),
                  t("pricing.competitors.f2"),
                  t("pricing.competitors.f3"),
                  t("pricing.competitors.f4"),
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Us */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-card p-8 shadow-card-hover">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-primary" />
              <Badge className="mb-4 bg-gradient-accent text-accent-foreground">Recommended</Badge>
              <div className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t("pricing.us.name")}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black text-gradient">{t("pricing.us.price")}</span>
              </div>
              <div className="text-sm text-muted-foreground">{t("pricing.us.suffix")}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  t("pricing.us.f1"),
                  t("pricing.us.f2"),
                  t("pricing.us.f3"),
                  t("pricing.us.f4"),
                  t("pricing.us.f5"),
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 w-full bg-gradient-primary shadow-glow">
                <Link to="/signup">{t("hero.cta.trial")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-hero" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="relative mx-auto max-w-4xl px-4 text-center text-primary-foreground sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            {t("cta.subtitle")}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent text-accent-foreground shadow-glow-lg hover:opacity-90"
          >
            <Link to="/signup" className="gap-2">
              {t("cta.button")}
              <ArrowRight className="h-5 w-5 rtl-flip" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

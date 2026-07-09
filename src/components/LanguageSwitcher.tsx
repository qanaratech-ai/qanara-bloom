import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher({ variant = "ghost" }: { variant?: "ghost" | "outline" }) {
  const { toggle, t } = useLanguage();
  return (
    <Button variant={variant} size="sm" onClick={toggle} className="gap-2">
      <Languages className="h-4 w-4" />
      <span>{t("lang.switch")}</span>
    </Button>
  );
}

import { useLanguage } from "@/contexts/LanguageContext";
import logoAsset from "@/assets/qanara-logo.png.asset.json";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Qanara Tech" className="h-10 w-10 rounded-full" />
            <div>
              <div className="text-sm font-bold text-foreground">Qanara Tech</div>
              <div className="text-xs text-muted-foreground">{t("footer.tagline")}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Qanara Tech. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}

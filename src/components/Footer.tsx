/**
 * @fileoverview Footer com logo, navegação e copyright.
 */

import { useTranslation } from "react-i18next";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import logo from "/src/assets/Logotipo/logo.png";

const FOOTER_NAV_ITEMS = [
  { labelKey: "nav.home", sectionId: "home" },
  { labelKey: "nav.about", sectionId: "about" },
  { labelKey: "nav.games", sectionId: "games" },
  { labelKey: "nav.contact", sectionId: "contact" },
] as const;

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useScrollToSection();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <img
            src={logo}
            alt={t("site.name")}
            className="h-10 w-auto rounded-lg"
            loading="lazy"
          />

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {FOOTER_NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t(item.labelKey)}
              </button>
            ))}
            <a
              href={t("nav.pressLink")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.press")}
            </a>
          </nav>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

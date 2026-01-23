/**
 * @fileoverview Footer com logo, navegação e copyright.
 * 
 * Replica a navegação do header para permitir acesso rápido
 * a qualquer seção sem precisar rolar até o topo.
 */

import { useTranslation } from "react-i18next";
import logo from "/src/assets/Logotipo/logo.png";

/** Offset em pixels para compensar o header fixo durante scroll */
const HEADER_OFFSET = 80;

/**
 * Rola suavemente até uma seção específica da página.
 */
const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img
              src={logo}
              alt={t("site.name")}
              className="h-10 w-auto rounded-lg"
              loading="lazy"
            />
          </div>

          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Footer navigation"
          >
            <button
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("games")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.games")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </button>
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

/**
 * @fileoverview Header fixo com navegação, seletor de idioma e menu mobile.
 * 
 * Implementa scroll suave para seções, dropdown de idiomas e
 * menu hamburger responsivo para dispositivos móveis.
 */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import logo from "/src/assets/Logotipo/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Offset em pixels para compensar o header fixo durante scroll */
const HEADER_OFFSET = 80;

/** Threshold de scroll em pixels para ativar o efeito de blur no header */
const SCROLL_THRESHOLD = 20;

interface NavItem {
  labelKey: string;
  id: string;
}

/** Itens de navegação principal - ordem define exibição no menu */
const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", id: "home" },
  { labelKey: "nav.about", id: "about" },
  { labelKey: "nav.games", id: "games" },
  { labelKey: "nav.contact", id: "contact" },
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);

  // Detecta scroll para aplicar efeito visual no header
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Rola suavemente até uma seção e fecha o menu mobile.
   */
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handlePressClick = (): void => {
    window.open(t("nav.pressLink"), "_blank", "noopener,noreferrer");
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-card border-b border-border"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:opacity-80 transition-opacity"
            aria-label={t("nav.home")}
          >
            <img
              src={logo}
              alt={t("site.name")}
              className="h-12 w-auto rounded-lg"
              loading="eager"
            />
          </button>

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t(item.labelKey)}
              </button>
            ))}

            <button
              onClick={handlePressClick}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {t("nav.press")}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5">
                  <Globe size={18} className="text-muted-foreground" />
                  {i18n.language === "en" ? "English" : "Português"}
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card border-border min-w-[120px]"
              >
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={`cursor-pointer ${
                    i18n.language === "en"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage("pt")}
                  className={`cursor-pointer ${
                    i18n.language === "pt"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegação Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left"
                >
                  {t(item.labelKey)}
                </button>
              ))}

              <button
                onClick={handlePressClick}
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
              >
                {t("nav.press")}
              </button>

              {/* Seletor de idioma expansível no mobile */}
              <div>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 text-left w-full"
                  aria-expanded={isLanguageMenuOpen}
                >
                  <Globe size={18} className="text-muted-foreground" />
                  {i18n.language === "en" ? "English" : "Português"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isLanguageMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isLanguageMenuOpen
                      ? "max-h-24 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col space-y-2 pl-4">
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        setIsLanguageMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 rounded transition-colors ${
                        i18n.language === "en"
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("pt");
                        setIsLanguageMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 rounded transition-colors ${
                        i18n.language === "pt"
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Português
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

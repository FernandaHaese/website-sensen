/**
 * @fileoverview Header fixo com navegação, seletor de idioma e menu mobile.
 */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import logo from "/src/assets/Logotipo/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SCROLL_BLUR_THRESHOLD = 20;

interface NavItem {
  labelKey: string;
  sectionId: string;
}

const NAVIGATION_ITEMS: NavItem[] = [
  { labelKey: "nav.home", sectionId: "home" },
  { labelKey: "nav.about", sectionId: "about" },
  { labelKey: "nav.games", sectionId: "games" },
  { labelKey: "nav.contact", sectionId: "contact" },
];

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
] as const;

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { scrollToSection } = useScrollToSection();
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageExpanded, setIsMobileLanguageExpanded] = useState(false);

  useEffect(() => {
    const updateScrollState = (): void => {
      setHasScrolledPastThreshold(window.scrollY > SCROLL_BLUR_THRESHOLD);
    };
    window.addEventListener("scroll", updateScrollState);
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const handleNavigationClick = (sectionId: string): void => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handlePressKitClick = (): void => {
    window.open(t("nav.pressLink"), "_blank", "noopener,noreferrer");
  };

  const handleLanguageChange = (languageCode: string): void => {
    i18n.changeLanguage(languageCode);
    setIsMobileLanguageExpanded(false);
    setIsMobileMenuOpen(false);
  };

  const currentLanguageLabel = i18n.language === "en" ? "English" : "Português";

  const getLanguageItemStyle = (languageCode: string): string => {
    const isActive = i18n.language === languageCode;
    return isActive
      ? "text-foreground font-medium"
      : "text-muted-foreground hover:text-foreground";
  };

  const headerBackgroundStyle = hasScrolledPastThreshold
    ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
    : "bg-card border-b border-border";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBackgroundStyle}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => handleNavigationClick("home")}
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

          <DesktopNavigation
            items={NAVIGATION_ITEMS}
            onNavigate={handleNavigationClick}
            onPressKitClick={handlePressKitClick}
            currentLanguageLabel={currentLanguageLabel}
            onLanguageChange={handleLanguageChange}
            getLanguageItemStyle={getLanguageItemStyle}
            t={t}
          />

          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <MobileNavigation
            items={NAVIGATION_ITEMS}
            onNavigate={handleNavigationClick}
            onPressKitClick={handlePressKitClick}
            currentLanguageLabel={currentLanguageLabel}
            isLanguageExpanded={isMobileLanguageExpanded}
            onToggleLanguage={() => setIsMobileLanguageExpanded(!isMobileLanguageExpanded)}
            onLanguageChange={handleLanguageChange}
            currentLanguage={i18n.language}
            t={t}
          />
        )}
      </nav>
    </header>
  );
};

interface DesktopNavigationProps {
  items: NavItem[];
  onNavigate: (sectionId: string) => void;
  onPressKitClick: () => void;
  currentLanguageLabel: string;
  onLanguageChange: (code: string) => void;
  getLanguageItemStyle: (code: string) => string;
  t: (key: string) => string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  items,
  onNavigate,
  onPressKitClick,
  currentLanguageLabel,
  onLanguageChange,
  getLanguageItemStyle,
  t,
}) => (
  <div className="hidden md:flex items-center space-x-8">
    {items.map((item) => (
      <button
        key={item.sectionId}
        onClick={() => onNavigate(item.sectionId)}
        className="text-foreground hover:text-primary transition-colors font-medium"
      >
        {t(item.labelKey)}
      </button>
    ))}

    <button
      onClick={onPressKitClick}
      className="text-foreground hover:text-primary transition-colors font-medium"
    >
      {t("nav.press")}
    </button>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5">
          <Globe size={18} className="text-muted-foreground" />
          {currentLanguageLabel}
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border min-w-[120px]">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`cursor-pointer ${getLanguageItemStyle(lang.code)}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

interface MobileNavigationProps {
  items: NavItem[];
  onNavigate: (sectionId: string) => void;
  onPressKitClick: () => void;
  currentLanguageLabel: string;
  isLanguageExpanded: boolean;
  onToggleLanguage: () => void;
  onLanguageChange: (code: string) => void;
  currentLanguage: string;
  t: (key: string) => string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  onNavigate,
  onPressKitClick,
  currentLanguageLabel,
  isLanguageExpanded,
  onToggleLanguage,
  onLanguageChange,
  currentLanguage,
  t,
}) => (
  <div className="md:hidden py-4 border-t border-border animate-fade-in">
    <div className="flex flex-col space-y-4">
      {items.map((item) => (
        <button
          key={item.sectionId}
          onClick={() => onNavigate(item.sectionId)}
          className="text-foreground hover:text-primary transition-colors font-medium text-left"
        >
          {t(item.labelKey)}
        </button>
      ))}

      <button
        onClick={onPressKitClick}
        className="text-foreground hover:text-primary transition-colors font-medium text-left"
      >
        {t("nav.press")}
      </button>

      <div>
        <button
          onClick={onToggleLanguage}
          className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5 text-left w-full"
          aria-expanded={isLanguageExpanded}
        >
          <Globe size={18} className="text-muted-foreground" />
          {currentLanguageLabel}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isLanguageExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isLanguageExpanded ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 pl-4">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`text-left py-2 px-3 rounded transition-colors ${
                  currentLanguage === lang.code
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

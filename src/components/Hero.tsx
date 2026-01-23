/**
 * @fileoverview Seção hero da página inicial.
 * 
 * Exibe o vídeo de fundo em loop com overlay escuro para contraste,
 * título principal, subtítulo e CTAs para navegação e Steam.
 */

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-background.mp4";

/** Offset em pixels para compensar o header fixo durante scroll */
const HEADER_OFFSET = 80;

/**
 * Rola suavemente até uma seção específica da página.
 * 
 * @param sectionId - ID do elemento HTML para scroll
 */
const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Vídeo de fundo com blur para não competir com o texto */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover blur-[2px]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay escuro para garantir legibilidade do texto */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          {t("hero.title")}
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            variant="default"
            onClick={() => scrollToSection("games")}
            className="text-lg px-8 py-6"
            aria-label={t("hero.cta.games")}
          >
            {t("hero.cta.games")}
          </Button>
          <Button
            size="lg"
            variant="outline-glow"
            asChild
            className="text-lg px-8 py-6"
          >
            <a
              href={t("social.steam")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("hero.cta.steam")} - ${t("site.name")}`}
            >
              {t("hero.cta.steam")}
            </a>
          </Button>
        </div>
      </div>

      {/* Indicador de scroll animado para guiar o usuário */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
          <ChevronDown className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </section>
  );
};

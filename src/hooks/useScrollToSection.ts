/**
 * Hook utilitário para navegação suave entre seções da página.
 * Centraliza a lógica de scroll que estava duplicada em Header, Hero e Footer.
 */

const HEADER_HEIGHT_OFFSET = 80;

export const useScrollToSection = () => {
  const scrollToSection = (sectionId: string): void => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const elementTopPosition = targetElement.getBoundingClientRect().top;
    const scrollTargetPosition = elementTopPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET;
    
    window.scrollTo({ top: scrollTargetPosition, behavior: "smooth" });
  };

  return { scrollToSection };
};

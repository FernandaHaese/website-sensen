import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';

export const Footer = () => {
  const { t, language } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-xl font-bold gradient-text">
            {content.site.name}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {content.nav.home[language]}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {content.nav.about[language]}
            </button>
            <button
              onClick={() => scrollToSection('games')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {content.nav.games[language]}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {content.nav.contact[language]}
            </button>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t(content.footer.copyright)}
        </div>
      </div>
    </footer>
  );
};

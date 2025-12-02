import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div>
            <img 
              src={logo} 
              alt={t('site.name')} 
              className="h-10 w-auto rounded-lg" 
              loading="lazy"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            <button
              onClick={() => scrollToSection('home')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('games')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.games')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.contact')}
            </button>
            <a
              href={t('nav.pressLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('nav.press')}
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

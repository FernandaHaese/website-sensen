import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  labelKey: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.home', id: 'home' },
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.games', id: 'games' },
  { labelKey: 'nav.contact', id: 'contact' },
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handlePressClick = (): void => {
    window.open(t('nav.pressLink'), '_blank', 'noopener,noreferrer');
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-card border-b border-border'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="hover:opacity-80 transition-opacity"
            aria-label={t('nav.home')}
          >
            <img 
              src={logo} 
              alt={t('site.name')} 
              className="h-12 w-auto rounded-lg" 
              loading="eager"
            />
          </button>

          {/* Desktop Navigation */}
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
              {t('nav.press')}
            </button>
            
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  {i18n.language === 'en' ? 'Language' : 'Idioma'}
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem 
                  onClick={() => changeLanguage('en')}
                  className={`cursor-pointer focus:bg-transparent ${
                    i18n.language === 'en' 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                  }`}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => changeLanguage('pt')}
                  className={`cursor-pointer focus:bg-transparent ${
                    i18n.language === 'pt' 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
                  }`}
                >
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
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
                {t('nav.press')}
              </button>
              
              {/* Mobile Language Expandable Menu */}
              <div>
                <button 
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 text-left w-full"
                  aria-expanded={isLanguageMenuOpen}
                >
                  {i18n.language === 'en' ? 'Language' : 'Idioma'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Language Options */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isLanguageMenuOpen ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col space-y-2 pl-4">
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsLanguageMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 rounded transition-colors ${
                        i18n.language === 'en' 
                          ? 'text-primary font-semibold' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('pt');
                        setIsLanguageMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 rounded transition-colors ${
                        i18n.language === 'pt' 
                          ? 'text-primary font-semibold' 
                          : 'text-muted-foreground hover:text-foreground'
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

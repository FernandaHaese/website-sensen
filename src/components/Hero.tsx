import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';

export const Hero = () => {
  const { t } = useTranslation();

  const scrollToGames = () => {
    const element = document.getElementById('games');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-10" 
             style={{ background: 'var(--hero-gradient)' }} />
        {/* Placeholder for video - will be replaced with actual video */}
        <div className="w-full h-full bg-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          {t(content.hero.title)}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-12 animate-fade-in" 
           style={{ animationDelay: '0.2s' }}>
          {t(content.hero.subtitle)}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" 
             style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToGames}
            className="text-lg px-8 py-6 hover-lift"
          >
            {t(content.hero.cta.games)}
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift"
          >
            <a href={content.social.steam} target="_blank" rel="noopener noreferrer">
              {t(content.hero.cta.steam)}
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

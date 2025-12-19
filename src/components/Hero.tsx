import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import heroVideo from '@/assets/hero-background.mp4';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const scrollToGames = (): void => {
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 animate-fade-in" 
           style={{ animationDelay: '0.2s' }}>
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" 
             style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            variant="default"
            onClick={scrollToGames}
            className="text-lg px-8 py-6"
            aria-label={t('hero.cta.games')}
          >
            {t('hero.cta.games')}
          </Button>
          <Button
            size="lg"
            variant="outline-glow"
            asChild
            className="text-lg px-8 py-6"
          >
            <a 
              href={t('social.steam')} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${t('hero.cta.steam')} - ${t('site.name')}`}
            >
              {t('hero.cta.steam')}
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
          <ChevronDown className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </section>
  );
};

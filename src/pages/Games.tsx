import { useTranslation } from 'react-i18next';
import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  gif?: string;
  video: string;
  steamUrl: string;
  pressKitUrl: string;
}

const GamesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const games = t('games.catalog', { returnObjects: true }) as Game[];

  return (
    <>
      <SEO 
        title={t('seo.games.title')}
        description={t('seo.games.description')}
        url="/games"
      />
      <Header />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="section-container">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('nav.home')}
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t('games.title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('games.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <GameCard key={game.id} {...game} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GamesPage;

import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GamesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="section-container">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            {t(content.games.title)}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t(content.games.description)}
          </p>
        </div>

        {/* Full Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.games.catalog.map((game, index) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={t(game.description)}
              image={game.image}
              video={game.video}
              steamUrl={game.steamUrl}
              pressKitUrl={game.pressKitUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;

import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { GameCard } from './GameCard';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const Games = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  // Show first 9 games on home page
  const displayedGames = content.games.catalog.slice(0, 9);

  return (
    <section id="games" className="bg-secondary/30">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t(content.games.title)}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t(content.games.description)}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedGames.map((game, index) => (
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

        {/* See More Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/games')}
            className="px-8 hover-lift"
          >
            {t(content.games.seeMore)}
          </Button>
        </div>
      </div>
    </section>
  );
};

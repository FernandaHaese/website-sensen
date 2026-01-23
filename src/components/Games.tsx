/**
 * @fileoverview Seção de catálogo de jogos na página inicial.
 * 
 * Exibe uma grid limitada de jogos com botão para ver todos.
 * Os dados são carregados do arquivo de traduções.
 */

import { useTranslation } from 'react-i18next';
import { GameCard } from './GameCard';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  steamUrl: string;
  pressKitUrl: string;
}

/** Quantidade máxima de jogos exibidos na home (grid 3x3) */
const MAX_GAMES_DISPLAYED = 9;

export const Games: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const games = t('games.catalog', { returnObjects: true }) as Game[];
  const displayedGames = games.slice(0, MAX_GAMES_DISPLAYED);

  return (
    <section id="games" className="bg-secondary/30">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t('games.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('games.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedGames.map((game, index) => (
            <GameCard key={game.id} {...game} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" onClick={() => navigate('/games')} className="px-8 hover-lift">
            {t('games.seeMore')}
          </Button>
        </div>
      </div>
    </section>
  );
};

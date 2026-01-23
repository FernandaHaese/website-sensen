/**
 * @fileoverview Card de jogo com preview de GIF ao hover.
 * 
 * Exibe imagem estática do jogo e troca para GIF animado quando
 * o usuário passa o mouse, criando um preview de gameplay.
 */

import { useMemo, useState } from 'react';
import { Button } from './ui/button';

interface GameCardProps {
  /** Título do jogo */
  title: string;
  /** Descrição breve do jogo */
  description: string;
  /** Caminho da imagem estática de capa */
  image: string;
  /** Caminho do GIF de gameplay (opcional) */
  video: string;
  /** URL da página do jogo na Steam */
  steamUrl: string;
  /** URL do Press Kit do jogo */
  pressKitUrl: string;
  /** Índice para escalonamento de animação */
  index: number;
}

/** Delay base em segundos para animação escalonada entre cards */
const ANIMATION_DELAY_BASE = 0.05;

/**
 * Renderiza um card de jogo com troca dinâmica entre imagem e GIF.
 * O GIF só é carregado quando necessário para otimizar performance.
 */
export const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description,
  image,
  video,
  steamUrl, 
  pressKitUrl,
  index 
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Adiciona timestamp para forçar reload do GIF e reiniciar animação
  const gifSrc = useMemo(() => {
    if (!video) return "";
    return isHovered ? `${video}?t=${Date.now()}` : "";
  }, [video, isHovered]);
  
  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
      style={{ animationDelay: `${index * ANIMATION_DELAY_BASE}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {!isHovered && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        )}
        {isHovered && video && (
          <img
            src={gifSrc}
            alt={`${title} gameplay`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay escuro sutil no hover para transição visual */}
        {isHovered && <div className="absolute inset-0 bg-black/40" />}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex gap-3">
          <Button asChild size="sm" className="flex-1">
            <a href={steamUrl} target="_blank" rel="noopener noreferrer">Steam</a>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={pressKitUrl} target="_blank" rel="noopener noreferrer">Press Kit</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

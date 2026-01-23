/**
 * @fileoverview Card de jogo com preview de GIF ao hover.
 */

import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { getAssetPath } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  video: string;
  steamUrl: string;
  pressKitUrl: string;
  index: number;
}

const STAGGER_ANIMATION_DELAY = 0.05;

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  image,
  video,
  steamUrl,
  pressKitUrl,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const animatedGifSource = useMemo(() => {
    if (!video || !isHovered) return "";
    return `${getAssetPath(video)}?t=${Date.now()}`;
  }, [video, isHovered]);

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
      style={{ animationDelay: `${index * STAGGER_ANIMATION_DELAY}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GameMediaPreview
        isHovered={isHovered}
        staticImage={getAssetPath(image)}
        animatedGif={animatedGifSource}
        title={title}
      />

      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <GameCardActions steamUrl={steamUrl} pressKitUrl={pressKitUrl} />
      </div>
    </div>
  );
};

interface GameMediaPreviewProps {
  isHovered: boolean;
  staticImage: string;
  animatedGif: string;
  title: string;
}

const GameMediaPreview: React.FC<GameMediaPreviewProps> = ({
  isHovered,
  staticImage,
  animatedGif,
  title,
}) => (
  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
    {!isHovered && (
      <img
        src={staticImage}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    )}
    {isHovered && animatedGif && (
      <img
        src={animatedGif}
        alt={`${title} gameplay`}
        className="w-full h-full object-cover"
      />
    )}
    {isHovered && <div className="absolute inset-0 bg-black/40" />}
  </div>
);

interface GameCardActionsProps {
  steamUrl: string;
  pressKitUrl: string;
}

const GameCardActions: React.FC<GameCardActionsProps> = ({
  steamUrl,
  pressKitUrl,
}) => (
  <div className="flex gap-3">
    <Button asChild size="sm" className="flex-1">
      <a href={steamUrl} target="_blank" rel="noopener noreferrer">
        Steam
      </a>
    </Button>
    <Button asChild variant="outline" size="sm" className="flex-1">
      <a href={pressKitUrl} target="_blank" rel="noopener noreferrer">
        Press Kit
      </a>
    </Button>
  </div>
);

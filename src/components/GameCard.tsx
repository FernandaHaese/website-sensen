import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  gif?: string;
  video: string;
  steamUrl: string;
  pressKitUrl: string;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description,
  image,
  gif,
  steamUrl, 
  pressKitUrl,
  index 
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [gifError, setGifError] = useState<boolean>(false);

  const showGif = isHovered && gif && !gifError;

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {/* Static image - always rendered, fades out on hover */}
        {!imageError && (
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              showGif ? "opacity-0" : "opacity-100"
            )}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        
        {/* GIF - preloaded, fades in on hover */}
        {gif && !gifError && (
          <img
            src={gif}
            alt={`${title} gameplay`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
              showGif ? "opacity-100" : "opacity-0"
            )}
            onError={() => setGifError(true)}
            loading="lazy"
          />
        )}
        
        {isHovered && <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />}
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

import { useState } from 'react';
import { Button } from './ui/button';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  video: string;
  steamUrl: string;
  pressKitUrl: string;
  index: number;
}

export const GameCard = ({ 
  title, 
  description, 
  image, 
  video, 
  steamUrl, 
  pressKitUrl,
  index 
}: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {/* Image - shown by default */}
        {!isHovered && !imageError && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Darkening effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          {title}
        </h3>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            asChild
            size="sm"
            className="flex-1"
          >
            <a href={steamUrl} target="_blank" rel="noopener noreferrer">
              Steam
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <a href={pressKitUrl} target="_blank" rel="noopener noreferrer">
              Press Kit
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

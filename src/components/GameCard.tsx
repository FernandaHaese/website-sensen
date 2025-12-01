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
        
        {/* Video - shown on hover (placeholder for now) */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
            <div className="text-primary-foreground text-sm">Video Preview</div>
          </div>
        )}
        
        {/* Title Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white px-4 text-center">{title}</h3>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground mb-4 line-clamp-2 min-h-[3rem]">
          {description}
        </p>
        
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

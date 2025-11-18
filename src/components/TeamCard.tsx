import { useState } from 'react';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

export const TeamCard = ({ name, role, image, index }: TeamCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-square relative overflow-hidden">
        {/* Placeholder with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        
        {/* Image overlay */}
        {!imageError && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
        
        {/* Name and Role - shown on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/90 text-lg">{role}</p>
        </div>
      </div>
    </div>
  );
};

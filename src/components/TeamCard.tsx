/**
 * @fileoverview Card de membro da equipe com efeito hover.
 */

import { useState } from "react";
import { getAssetPath } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const STAGGER_ANIMATION_DELAY = 0.1;

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  image,
  index,
}) => {
  const [hasImageFailed, setHasImageFailed] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover-lift animate-fade-in"
      style={{ animationDelay: `${index * STAGGER_ANIMATION_DELAY}s` }}
    >
      <div className="aspect-square relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br to-accent/20" />

        {!hasImageFailed && (
          <img
            src={getAssetPath(image)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setHasImageFailed(true)}
          />
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />

        <TeamMemberOverlay name={name} role={role} />
      </div>
    </div>
  );
};

interface TeamMemberOverlayProps {
  name: string;
  role: string;
}

const TeamMemberOverlay: React.FC<TeamMemberOverlayProps> = ({
  name,
  role,
}) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
    <p className="text-white/90 text-lg">{role}</p>
  </div>
);

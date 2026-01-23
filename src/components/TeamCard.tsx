/**
 * @fileoverview Card de membro da equipe com efeito hover.
 * 
 * Exibe foto do membro com overlay de nome/cargo que aparece ao hover.
 * Inclui fallback visual caso a imagem falhe ao carregar.
 */

import { useState } from 'react';

interface TeamCardProps {
  /** Nome do membro da equipe */
  name: string;
  /** Cargo/função do membro */
  role: string;
  /** Caminho da imagem do membro */
  image: string;
  /** Índice para escalonamento de animação */
  index: number;
}

/** Delay base em segundos para animação escalonada entre cards */
const ANIMATION_DELAY_BASE = 0.1;

/**
 * Renderiza um card de membro da equipe com animação de entrada
 * e efeito de revelação de informações ao hover.
 */
export const TeamCard = ({ name, role, image, index }: TeamCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover-lift animate-fade-in"
      style={{ animationDelay: `${index * ANIMATION_DELAY_BASE}s` }}
    >
      <div className="aspect-square relative overflow-hidden">
        {/* Gradiente de placeholder visível se imagem falhar */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        
        {!imageError && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay escuro progressivo no hover para destaque do texto */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
        
        {/* Informações reveladas apenas no hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/90 text-lg">{role}</p>
        </div>
      </div>
    </div>
  );
};

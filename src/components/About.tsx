/**
 * @fileoverview Seção "Sobre Nós" com apresentação da equipe.
 * 
 * Exibe descrição da empresa e cards dos membros do time,
 * com dados carregados do arquivo de traduções.
 */

import { useTranslation } from 'react-i18next';
import { TeamCard } from './TeamCard';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

/** Quantidade máxima de membros exibidos na seção About */
const MAX_TEAM_MEMBERS_DISPLAYED = 2;

export const About: React.FC = () => {
  const { t } = useTranslation();
  const team = t('team', { returnObjects: true }) as TeamMember[];

  return (
    <section id="about" className="bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 gradient-text">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-16">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Array.isArray(team) && team.slice(0, MAX_TEAM_MEMBERS_DISPLAYED).map((member, index) => (
            <TeamCard
              key={`team-member-${index}`}
              name={member.name}
              role={member.role}
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

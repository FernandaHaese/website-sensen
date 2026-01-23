/**
 * @fileoverview Seção "Sobre Nós" com apresentação da equipe.
 */

import { useTranslation } from 'react-i18next';
import { TeamCard } from './TeamCard';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const MAX_VISIBLE_TEAM_MEMBERS = 2;

export const About: React.FC = () => {
  const { t } = useTranslation();
  const teamMembers = t('team', { returnObjects: true }) as TeamMember[];

  if (!Array.isArray(teamMembers)) return null;

  const visibleMembers = teamMembers.slice(0, MAX_VISIBLE_TEAM_MEMBERS);

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
          {visibleMembers.map((member, index) => (
            <TeamCard
              key={member.name}
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

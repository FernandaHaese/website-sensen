import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { TeamCard } from './TeamCard';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 gradient-text">
            {t(content.about.title)}
          </h2>
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-16">
            {t(content.about.description)}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {content.team.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={t(member.role)}
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

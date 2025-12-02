import { useState } from 'react';
import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import facebookIcon from '@/assets/social-facebook.png';
import twitterIcon from '@/assets/social-twitter.png';
import instagramIcon from '@/assets/social-instagram.png';
import threadsIcon from '@/assets/social-threads.png';
import steamIcon from '@/assets/social-steam.png';
import blueskyIcon from '@/assets/social-bluesky.png';
import presskitIcon from '@/assets/social-presskit.png';

export const Contact = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error(t(content.contact.form.error));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t(content.contact.form.success));
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="bg-background">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text">
            {t(content.contact.title)}
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            {t(content.contact.description)}
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Input
              type="email"
              placeholder={t(content.contact.form.placeholder)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12"
              required
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="px-8 hover-lift"
            >
              {t(content.contact.form.button)}
            </Button>
          </form>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href={content.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href={content.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="X (Twitter)"
            >
              <img src={twitterIcon} alt="X (Twitter)" className="w-6 h-6" />
            </a>
            <a
              href={content.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href={content.social.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Threads"
            >
              <img src={threadsIcon} alt="Threads" className="w-6 h-6" />
            </a>
            <a
              href={content.social.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Steam"
            >
              <img src={steamIcon} alt="Steam" className="w-6 h-6" />
            </a>
            <a
              href={content.social.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Bluesky"
            >
              <img src={blueskyIcon} alt="Bluesky" className="w-6 h-6" />
            </a>
            <a
              href={content.social.pressKit}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Press Kit"
            >
              <img src={presskitIcon} alt="Press Kit" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

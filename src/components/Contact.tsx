import { useState } from 'react';
import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Facebook, Twitter } from 'lucide-react';

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
              href={content.social.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Steam"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </a>
            <a
              href={content.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href={content.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href={content.social.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Bluesky"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </a>
            <a
              href={content.social.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Threads"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

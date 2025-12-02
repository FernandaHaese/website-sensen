import { useState } from 'react';
import { useTranslation } from '@/hooks/useLanguage';
import content from '@/data/content.json';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

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
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/>
              </svg>
            </a>
            <a
              href={content.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="X (Twitter)"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={content.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
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
                <path d="M12.186 3.012C8.32 2.926 5.65 4.955 4.673 8.203a.75.75 0 0 0 1.426.432c.815-2.716 2.925-4.318 6.015-4.244 1.764.042 3.242.587 4.274 1.574 1.027.982 1.59 2.431 1.625 4.193a6.92 6.92 0 0 0-3.12-.737c-3.24 0-5.583 2.11-5.583 5.023 0 2.954 2.328 5.107 5.544 5.107 2.957 0 5.04-1.773 5.654-4.538.189-.85.297-1.801.339-2.883.083-2.13-.457-4.01-1.716-5.301C16.855 3.56 14.75 3.044 12.186 3.012ZM16.5 13.644c0 2.059-1.478 3.611-3.544 3.611-1.838 0-3.044-1.273-3.044-3.107 0-1.882 1.223-3.023 3.083-3.023 1.862 0 3.505 1.15 3.505 2.519Z"/>
              </svg>
            </a>
            <a
              href={content.social.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Steam"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-4.6 0-8.45-3.08-9.64-7.27l3.83 1.58a2.84 2.84 0 0 0 2.78 2.27c1.56 0 2.83-1.27 2.83-2.83v-.13l3.4-2.43h.08c2.08 0 3.77-1.69 3.77-3.77s-1.69-3.77-3.77-3.77-3.78 1.69-3.78 3.77v.05l-2.37 3.46-.16-.01c-.59 0-1.14.18-1.59.49L2.42 11.5C2.54 6.29 6.85 2 12 2m-.03 7.7c1.39 0 2.52 1.13 2.52 2.52 0 1.39-1.13 2.52-2.52 2.52-1.39 0-2.52-1.13-2.52-2.52 0-1.39 1.13-2.52 2.52-2.52m-3.89 5.75c.4-.21.85-.32 1.32-.32.65 0 1.25.24 1.71.67l-1.4-.58c-.76-.31-1.63.06-1.94.82-.31.76.06 1.62.82 1.94l1.63.67c-.11.01-.22.02-.33.02-1.04 0-1.89-.85-1.89-1.89 0-.43.15-.83.41-1.15.23-.3.57-.52.96-.63m9.43-3.95c0-1.39-1.13-2.52-2.52-2.52-1.39 0-2.52 1.13-2.52 2.52 0 1.39 1.13 2.52 2.52 2.52 1.39 0 2.52-1.13 2.52-2.52m-4.43 0c0-1.06.86-1.91 1.91-1.91s1.91.86 1.91 1.91c0 1.06-.86 1.91-1.91 1.91s-1.91-.85-1.91-1.91Z"/>
              </svg>
            </a>
            <a
              href={content.social.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Bluesky"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
              </svg>
            </a>
            <a
              href={content.social.pressKit}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Press Kit"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H5c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

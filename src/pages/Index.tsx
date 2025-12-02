import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Games } from '@/components/Games';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useTranslation } from 'react-i18next';

const Index: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        url="/"
      />
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Games />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;

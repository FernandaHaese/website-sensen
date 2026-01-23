/**
 * @fileoverview Componente para gerenciamento de meta tags SEO.
 * 
 * Centraliza a configuração de Open Graph, Twitter Cards e dados estruturados
 * para melhorar a indexação e compartilhamento em redes sociais.
 */

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/** URL base do site para construção de URLs absolutas */
const SITE_URL = 'https://fernandahaese.github.io/sensen-games';

interface SEOProps {
  /** Título da página (usa nome do site como fallback) */
  title?: string;
  /** Descrição da página para meta description e OG */
  description?: string;
  /** Tipo de conteúdo para Open Graph */
  type?: 'website' | 'article';
  /** Caminho da imagem OG relativo à raiz do site */
  image?: string;
  /** Caminho da página para canonical URL */
  url?: string;
  /** Dados estruturados JSON-LD para rich snippets */
  structuredData?: Record<string, unknown>;
}

/**
 * Renderiza meta tags SEO usando react-helmet-async.
 * 
 * @param props - Propriedades de configuração SEO
 * @returns Elemento Helmet com meta tags configuradas
 * 
 * @example
 * ```tsx
 * <SEO 
 *   title="Nossos Jogos" 
 *   description="Confira os jogos desenvolvidos pela Sensen Games"
 *   url="/games"
 * />
 * ```
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  type = 'website',
  image = '/og-image.jpg',
  url,
  structuredData,
}) => {
  const { t } = useTranslation();
  
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullTitle = title || t('site.name');
  const fullDescription = description || t('site.description');

  return (
    <Helmet>
      <html lang={document.documentElement.lang || 'pt'} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph - compartilhamento em redes sociais */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:site_name" content={t('site.name')} />
      
      {/* Twitter Card - preview em tweets */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
      
      {/* Dados estruturados para rich snippets no Google */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { publications } from '../data/publications';

type SeoProps = {
  title: string;
  description: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

const configuredSiteUrl =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://your-domain.example';
const configuredBasePath =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
const siteUrl = configuredSiteUrl.endsWith(configuredBasePath)
  ? configuredSiteUrl
  : `${configuredSiteUrl}${configuredBasePath}`;

export function Seo({ title, description, type = 'website', noIndex = false }: SeoProps) {
  const location = useLocation();
  useEffect(() => {
    document.title = `${title} — ${profile.name}`;
    const routePath =
      configuredBasePath && location.pathname.startsWith(configuredBasePath)
        ? location.pathname.slice(configuredBasePath.length) || '/'
        : location.pathname;
    const canonicalUrl = `${siteUrl}${routePath === '/' ? '' : routePath}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noIndex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = description;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${title} — ${profile.name}`;
    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    if (ogDescription) ogDescription.content = description;
    const ogType = document.querySelector<HTMLMetaElement>('meta[property="og:type"]');
    if (ogType) ogType.content = type;
    const twitterUrl = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.content = canonicalUrl;
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (noIndex) {
      ogUrl?.remove();
    } else {
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = canonicalUrl;
    }
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = noIndex ? 'noindex, nofollow' : 'index, follow';
  }, [description, location.pathname, title, type, noIndex]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          url: siteUrl,
          email: profile.email,
          jobTitle: profile.role,
          address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
          sameAs: [
            'https://www.linkedin.com/in/pritam-sarkar-5aba07212/',
            'https://github.com/pritamsarkarprs001',
            'https://scholar.google.com/citations?user=7gBgU5MAAAAJ&hl=en',
            'https://orcid.org/0009-0006-1297-4760',
          ],
          knowsAbout: [
            'Machine Learning',
            'Computer Vision',
            'Geospatial Analysis',
            'Multimodal AI',
            'Data Science',
          ],
        }),
      }}
    />
  );
}

export function ScholarlySeo() {
  return (
    <>
      {publications.map((publication) => (
        <script
          key={publication.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarlyArticle',
              headline: publication.title,
              name: publication.title,
              datePublished: String(publication.year),
              author: { '@type': 'Person', name: 'Pritam Sarkar' },
              isPartOf: { '@type': 'PublicationIssue', name: publication.venue },
              url:
                publication.doi ||
                publication.repository ||
                `${siteUrl}/research/${publication.slug}`,
            }),
          }}
        />
      ))}
    </>
  );
}

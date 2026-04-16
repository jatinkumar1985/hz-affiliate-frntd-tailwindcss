import JsonLd from '@/components/utils/jsonLd';
import { buildAbsoluteUrl } from '@/components/utils/url';

export default function Schema({ schema }) {
  const baseUrl = process.env.NEXT_PUBLIC_MODE_BASE_URL || '';
  const authorSlug = [schema?.author_url, schema?.id].filter(Boolean).join('-');
  const authorUrl = buildAbsoluteUrl(baseUrl, 'authors', authorSlug);

  const WebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${schema?.first_name || ''} ${schema?.last_name || ''}`.trim(),
    url: authorUrl,
    description: schema?.bio || '',
    publisher: {
      "@type": "Organization",
      name: "Jagran",
      logo: {
        "@type": "ImageObject",
        url: process.env.NEXT_PUBLIC_BASE_SITE_SCHEMA_LOGO || '',
        width: 600,
        height: 60
      }
    }
  };

  const PersonJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": authorUrl,
    name: `${schema?.first_name || ''} ${schema?.last_name || ''}`.trim(),
    jobTitle: schema?.designation || '',
    description: schema?.bio || '',
    image: schema?.user_image || '',
    url: authorUrl,
    email: schema?.email ? `mailto:${schema.email}` : '',
    nationality: {
      "@type": "Country",
      name: "Indian"
    },
    worksFor: {
      "@type": "Organization",
      "@id": "https://www.jagranreviews.com/",
      name: "Jagran Reviews",
      url: "https://www.jagranreviews.com"
    }
  };

  return (
    <>
      <JsonLd id="jsonld-author-webpage" data={WebPageJsonLd} />
      <JsonLd id="jsonld-author-person" data={PersonJsonLd} />
    </>
  );
}

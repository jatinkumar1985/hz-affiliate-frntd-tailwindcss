import JsonLd from '@/components/utils/jsonLd';
import { buildAbsoluteUrl } from '@/components/utils/url';

export default function Schema({ schema, schemaListing }) {
  const baseUrl = process.env.NEXT_PUBLIC_MODE_BASE_URL || '';
  const authorsPath = buildAbsoluteUrl(baseUrl, 'authors');
  const authors = Array.isArray(schemaListing) ? schemaListing : [];

  const WebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: schema?.meta_title || '',
    url: authorsPath,
    description: schema?.meta_description || '',
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

  const AuthorListJsonLd = authors.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: authors.map((author, index) => {
      const authorSlug = [author?.author_url, author?.id].filter(Boolean).join('-');

      return {
        "@type": "ListItem",
        name: `${author?.first_name || ''} ${author?.last_name || ''}`.trim(),
        position: index + 1,
        url: buildAbsoluteUrl(baseUrl, 'authors', authorSlug)
      };
    })
  } : null;

  return (
    <>
      <JsonLd id="jsonld-author-list-webpage" data={WebPageJsonLd} />
      {AuthorListJsonLd && <JsonLd id="jsonld-author-list" data={AuthorListJsonLd} />}
    </>
  );
}

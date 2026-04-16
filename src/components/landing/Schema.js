import JsonLd from '@/components/utils/jsonLd';
import { buildAbsoluteUrl } from '@/components/utils/url';

export default function Schema({ schemaData, category, localUrl }) {
  const schema = schemaData?.seo_details || {};
  const schemaListing = Array.isArray(schemaData?.rows) ? schemaData.rows : [];
  const baseUrl = process.env.NEXT_PUBLIC_MODE_BASE_URL || '';
  const pageUrl = buildAbsoluteUrl(baseUrl, localUrl, category);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: schema?.meta_title || category || '',
    url: pageUrl,
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

  const articleListJsonLd = schemaListing.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: schemaListing.map((items, index) => {
      const articleSlug = [items?.page_url, items?.id].filter(Boolean).join('-');

      return {
        "@type": "ListItem",
        additionalType: "Article",
        position: index + 1,
        name: items?.title || '',
        url: buildAbsoluteUrl(
          baseUrl,
          localUrl,
          items?.category?.category_slug,
          items?.subcategory?.category_slug,
          articleSlug
        ),
        image: `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH || ''}${items?.thumb_image || ''}`
      };
    })
  } : null;

  return (
    <>
      <JsonLd id="jsonld-category-webpage" data={webPageJsonLd} />
      {articleListJsonLd && <JsonLd id="jsonld-category-list" data={articleListJsonLd} />}
    </>
  );
}

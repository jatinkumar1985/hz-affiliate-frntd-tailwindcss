import JsonLd from '@/components/utils/jsonLd';
import { formatName } from '@/components/utils/dataLayer';
import { buildAbsoluteUrl } from '@/components/utils/url';

export default function Schema({ schema = {}, schemaProduct = {}, author = {}, localUrl, lang }) {
  const {
    category = {},
    subcategory = {},
    meta_title = '',
    meta_description = '',
    meta_keyword = [],
    page_url = '',
    id = '',
    big_image = '',
    schema_body = '',
    schema_bottom_body = '',
    publish_date_schema = '',
    updated_at_schema,
    faq = []
  } = schema;

  const { category_name = '', category_slug = '' } = category;
  const { category_name: subcatName = '', category_slug: subcatSlug = '' } = subcategory;
  const baseUrl = process.env.NEXT_PUBLIC_MODE_BASE_URL || '';
  const sectionBaseUrl = buildAbsoluteUrl(baseUrl, localUrl);
  const articleSlug = [page_url, id].filter(Boolean).join('-');
  const canonicalUrl = buildAbsoluteUrl(baseUrl, localUrl, category_slug, subcatSlug, articleSlug);
  const authorName = formatName(author?.first_name, author?.last_name);
  const authorSlug = [author?.author_url, author?.id].filter(Boolean).join('-');
  const authorUrl = authorName !== 'na' ? buildAbsoluteUrl(baseUrl, 'authors', authorSlug) : '';
  const imgPath = process.env.NEXT_PUBLIC_MODE_IMAGE_PATH || '';
  const logoUrl = process.env.NEXT_PUBLIC_BASE_SITE_SCHEMA_LOGO || '';

  const keywords = Array.isArray(meta_keyword)
    ? meta_keyword.filter(Boolean)
    : typeof meta_keyword === 'string'
      ? meta_keyword.split(',').map((item) => item.trim()).filter(Boolean)
      : [];

  const breadcrumbItems = [
    {
      name: 'Home',
      item: sectionBaseUrl
    },
    category_name || category_slug ? {
      name: category_name || category_slug,
      item: buildAbsoluteUrl(baseUrl, localUrl, category_slug)
    } : null,
    subcatName || subcatSlug ? {
      name: subcatName || subcatSlug,
      item: buildAbsoluteUrl(baseUrl, localUrl, category_slug, subcatSlug)
    } : null
  ].filter(Boolean);

  const BreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };

  const ArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    inLanguage: lang,
    headline: meta_title,
    description: meta_description,
    ...(keywords.length > 0 ? { keywords } : {}),
    articleSection: category_name || category_slug,
    url: canonicalUrl,
    ...(big_image ? {
      image: {
        "@type": "ImageObject",
        url: `${imgPath}${big_image}`,
        width: 1200,
        height: 675
      }
    } : {}),
    datePublished: publish_date_schema,
    dateModified: updated_at_schema || publish_date_schema,
    articleBody: [schema_body, schemaProduct?.schema_products || '', schema_bottom_body].filter(Boolean).join(' '),
    ...(authorName !== 'na' && authorUrl ? {
      author: [
        {
          "@type": "Person",
          name: authorName,
          url: authorUrl
        }
      ]
    } : {}),
    publisher: {
      "@type": "Organization",
      name: "Jagran Reviews",
      url: sectionBaseUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 600,
        height: 60
      }
    },
    ...(big_image ? {
      associatedMedia: {
        "@type": "ImageObject",
        url: `${imgPath}${big_image}`,
        caption: meta_title,
        description: meta_description,
        width: 1200,
        height: 675
      }
    } : {})
  };

  const WebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta_title || category_name || '',
    url: canonicalUrl,
    description: meta_description,
    publisher: {
      "@type": "Organization",
      name: "Jagran",
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 600,
        height: 60
      }
    }
  };

  const faqEntities = Array.isArray(faq) && faq.length > 0
    ? faq
      .filter((item) => item && item.question && item.answer)
      .map((item) => ({
        "@type": "Question",
        name: String(item.question || '').replace(/<\/?[^>]+(>|$)|"/g, ''),
        acceptedAnswer: {
          "@type": "Answer",
          text: String(item.answer || '').replace(/<\/?[^>]+(>|$)|"/gi, '')
        }
      }))
    : [];

  const FAQPageJsonLd = faqEntities.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities
  } : null;

  return (
    <>
      <JsonLd id="jsonld-breadcrumb" data={BreadcrumbJsonLd} />
      <JsonLd id="jsonld-article" data={ArticleJsonLd} />
      <JsonLd id="jsonld-webpage" data={WebPageJsonLd} />
      {FAQPageJsonLd && <JsonLd id="jsonld-faq" data={FAQPageJsonLd} />}
    </>
  );
}

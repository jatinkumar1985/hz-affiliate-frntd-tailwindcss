export async function ArticleCategoriesService(params) {
  const { local } = params || {};
  if (!local) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-categories`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('ArticleCategoriesService error:', error);
    return null;
  }
}
export async function ArticleTagsHomeService(params) {
  const { local } = params || {};
  if (!local) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-tags/top-searches`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('ArticleTagsHomeService error:', error);
    return null;
  }
}
export async function ArticleTagsPageService(params) {
  const { local, slug } = params || {};
  if (!local || !slug) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-tags/top-searches/${slug}`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('ArticleTagsPageService error:', error);
    return null;
  }
}
export async function QuickLinksService(params) {
  const { local } = params || {};
  if (!local) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-tags/quick-links`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('QuickLinksService error:', error);
    return null;
  }
}
export async function PromoBannerService(params) {
  const { local, slug } = params || {};
  if (!local || !slug) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-slider/${slug}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        // Cache-Control header is optional – Next.js prioritizes its own caching
        // 'Cache-Control': 'public, max-age=300'
      },
      // IMPORTANT: remove these – let 'use cache' + cacheLife control caching
      // cache: 'no-store',
      // next: { revalidate: 0 }
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('PromoBannerService error:', error);
    return null;
  }
}

export async function LatestArticleService(params) {
  const { local, pageNo = 0, limit = 10 } = params || {};
  if (!local) return null;

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article/${pageNo}/${limit}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function ArticleByCategoryService(params) {
  const { local, categoryType, pageNo = 0, limit = 10 } = params || {};

  if (!local || !categoryType) {
    return null;
  }

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-by-category/${categoryType}/${pageNo}/${limit}`;
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error?.message?.includes('status: 404')) {
      return null;
    }
    console.error('ArticleByCategoryService error:', error);
    return null;
  }
}
export async function CategoryWidgetsService(params) {
  const { local } = params || {};
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-category-widgets`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('CategoryWidgetsService error:', error);
    return null;
  }
}

export async function AuthorListService(params) {
  const { language } = params || {};
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API_WMS}get-author-list/${language}-herzindagi.com/Affiliate`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('AuthorListService error:', error);
    return null;
  }
}

export async function ArticleAuthorListingService(params) {
  const { local, authorId, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-by-author/${authorId}/${pageNo}/${limit}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ArticleAuthorListingService error:', error);
    return null;
  }
}

export async function CategoryListingService(params) {
  const { local, category, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-by-category/${category}/${pageNo}/${limit}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('CategoryListingService error:', error);
    return null;
  }
}

export async function ArticleSidebarService(params) {
  const { local, category, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-sidebar/${category}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ArticleSidebarService error:', error);
    return null;
  }
}
export async function SearchArticleService(params) {
  const { local, keyword, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/search-article/${keyword}/${pageNo}/${limit}`;
    // console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('SearchArticleService error:', error);
    return null;
  }
}

export async function LiveProductsService(params) {
  const { local, productIds } = params || {};

  if (!local || !productIds) {
    return {};
  }

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-products-widget/${productIds}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const amazonProducts = responseData?.data?.amazon_products;

    if (!Array.isArray(amazonProducts)) {
      return {};
    }

    return amazonProducts.reduce((acc, product) => {
      const productId = Object.keys(product)[0];
      acc[productId] = product[productId];
      return acc;
    }, {});
  } catch (error) {
    if (error?.name === 'AbortError' || error?.message?.includes('aborted')) {
      return {};
    }
    console.error('LiveProductsService error:', error);
    return {};
  }
}
// You can convert other services (SubCategoryListingService etc.) the same way...

import { cacheLife, cacheTag } from 'next/cache';
import { ArticleCategoriesService, PromoBannerService, LatestArticleService, CategoryWidgetsService, ArticleByCategoryService, QuickLinksService, ArticleTagsHomeService, AuthorListService, ArticleAuthorListingService, CategoryListingService, ArticleSidebarService, ArticleTagsPageService, SearchArticleService } from './ListingService';
import { ArticleAuthorDetailPageService, ArticleAuthorDetailService, ArticleDetailService, ArticleProductsService, PageMetaService } from './DetailService';

export async function getCachedArticleCategories({local}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-categories`);

  const data = await ArticleCategoriesService({local});
  return data;
}
export async function getCachedArticleTagsHome({local}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-tags-home`);

  const data = await ArticleTagsHomeService({local});
  return data;
}
export async function getCachedArticleTagsPage({local,slug}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-tags-${slug}`);

  const data = await ArticleTagsPageService({local,slug});
  return data;
}
export async function getCachedQuickLinks({local}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`quick-links`);

  const data = await QuickLinksService({local});
  return data;
}

// Recommended: use 'hours' for most promo banners (changes rarely)
export async function getCachedPromoBanner({local,slug}) {
  'use cache';
  
  cacheLife('hours');                    // ← best balance for promo banners
  // Alternative (if it changes more often):
  // cacheLife('minutes');
  // or custom: cacheLife({ revalidate: 1800, expire: 86400 }); // 30 min / 1 day
  
  cacheTag(`promo-banner-${slug}`);
  // Optional: add generic tag for bulk invalidation
  // cacheTag('all-promos');

  const data = await PromoBannerService({local,slug});
  return data;
}

export async function getCachedLatestArticleService({local,pageNo=1,limit=10}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`latest-articles-page-${pageNo}`);

  const data = await LatestArticleService({local,pageNo,limit});
  return data;
}

export async function getCachedArticleByCategoryService({ local, categoryType, pageNo = 1, limit = 10 } = {}) {
  'use cache';

  cacheLife('minutes');
  cacheTag(`articles-list-${categoryType}-${pageNo}`);

  const data = await ArticleByCategoryService({ local, categoryType, pageNo, limit });
  return data;
}

export async function getCachedCategoryWidgetsService({local}) {
  'use cache';
  
  cacheLife('max');                  // Rarely changes
  cacheTag(`category-widgets`);

  const data = await CategoryWidgetsService({local});
  return data;
}

export async function getCachedArticleDetailService({local, id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`article-detail-${id}`);

  const data = await ArticleDetailService({ local, id });
  return data;
}

export async function getCachedArticleProductsService({local,id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`article-product-${id}`);

  const data = await ArticleProductsService({ local, id });
  return data;
}

export async function getCachedArticleAuthorDetailService({local,id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`author-detail-${id}`);

  const data = await ArticleAuthorDetailService({ local, id });
  return data;
}
export async function getCachedArticleAuthorDetailPageService({language,slug}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`author-detail-${slug}`);

  const data = await ArticleAuthorDetailPageService({ language,slug });
  return data;
}
export async function getCachedAuthorListService({language}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`get-author-list`);

  const data = await AuthorListService({language});
  return data;
}

export async function getCachedArticleAuthorListingService({ local,authorId, pageNo = 1, limit = 10 } = {}) {
  'use cache';
  
  console.log('authorId:', authorId, 'pageNo:', pageNo, 'limit:', limit); // 👈 check this
  
  cacheLife('minutes');
  cacheTag(`articles-list-${authorId}-${pageNo}`);

  const data = await ArticleAuthorListingService({ local,authorId, pageNo, limit });
  return data;
}

export async function getCachedCategoryListingService({ local,category, pageNo = 1, limit = 10 } = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`article-by-category-${category}-${pageNo}`);

  const data = await CategoryListingService({ local,category, pageNo, limit });
  return data;
}

export async function getCachedArticleSidebarService({ local,category, pageNo, limit} = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`article-sidebar-${category}`);

  const data = await ArticleSidebarService({ local, category, pageNo, limit });
  return data;
}

export async function getCachedPageMetaService({ local,slug} = {}) {
  'use cache';
  
  
  cacheLife('max');
  cacheTag(`get_meta-${slug}`);

  const data = await PageMetaService({ local,slug });
  return data;
}

export async function getCachedSearchArticleService({ local,keyword} = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`search-article-${keyword}`);

  const data = await SearchArticleService({ local,keyword });
  return data;
}

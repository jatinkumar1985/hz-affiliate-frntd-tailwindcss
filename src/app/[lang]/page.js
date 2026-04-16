import { getCachedArticleByCategoryService, getCachedArticleTagsHome, getCachedLatestArticleService, getCachedPageMetaService, getCachedPromoBanner } from '@/services/CachedServices';
import TopSearch from '@/components/global/TopSearch';
import React, { Suspense } from 'react'
import LatestNews from '@/components/home/LatestNews';
import PromoBanner from '@/components/global/PromoBanner';
import ArticleWidget from '@/components/home/ArticleWidget';

export async function generateMetadata(){
  const MetaApi = getCachedPageMetaService({slug:'home-page'});
  const [MetaResult] = await Promise.allSettled([MetaApi]);
  // console.log(MetaResult);
  
  const MetaData = MetaResult.status === 'fulfilled' ? MetaResult.value : null;
  const Meta = MetaData?.data[0] || {};
  return {
    title: Meta.meta_title,
    description: Meta.meta_description,
    keywords: Meta.meta_keyword,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/`,
    },
    openGraph: {
      title: Meta.meta_title,
      description: Meta.meta_description,
      url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}`,
      images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
      siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
    },
  };
}
// ──────────────────────────────────────────────
//  Configuration – easy to extend / reorder
// ──────────────────────────────────────────────
const WIDGET_CONFIG = [
  { category: 'home-solutions-electronics', label: 'Home Solutions and Electronics', articlesPerPage: 4, },
  { category: 'gadget-zone', label: 'Gadget Zone', articlesPerPage: 4, },
  { category: 'household-furnishings', label: 'Household Furnishings', articlesPerPage: 4, },
  { category: 'style-vault', label: 'Style Vault', articlesPerPage: 4, },
  { category: 'glam-and-glamour', label: 'Glam and Glamour', articlesPerPage: 4, },
  { category: 'fit-zone', label: 'Fit Zone', articlesPerPage: 4, },
  { category: 'reading-corner', label: 'Reading Corner', articlesPerPage: 4, },
  { category: 'what-to-gift', label: 'What To Gift', articlesPerPage: 4, },
  { category: 'others', label: 'Others', articlesPerPage: 4, },
];

export default async function Page({params}) {
    const { lang } = await params;
    let local;
    let localUrl;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
    // Prepare all parallel fetches
    const promises = [
        getCachedArticleTagsHome({local}),
        getCachedPromoBanner({local,slug:'no-category'}),
        getCachedLatestArticleService({local,pageNo:1,limit:10}),
        ...WIDGET_CONFIG.map((cfg) =>
            getCachedArticleByCategoryService({
                local,
                categoryType: cfg.category,
                pageNo: 1,
                limit: cfg.articlesPerPage,
            })
        ),
    ];
    const results = await Promise.allSettled(promises);

    const [topSearchesResult, promoResult, latestResult, ...widgetResults] = results;

    const topSearchesData = topSearchesResult.status === 'fulfilled' ? topSearchesResult.value : null;
    const promoData = promoResult.status === 'fulfilled' ? promoResult.value : null;
    const latestData = latestResult.status === 'fulfilled' ? latestResult.value : null;
    
    
    // Pair widget results with their config (order preserved)
    const widgets = widgetResults.map((result, index) => {
        const config = WIDGET_CONFIG[index];
        return {
            config,
            data: result.status === 'fulfilled' ? result.value : null,
        };
    });
    return (
        <>
            <TopSearch TopSearches={topSearchesData} />
            {latestData && <LatestNews LatestNewsData={latestData} localUrl={localUrl} />}
            {promoData && (
                <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-xl mx-4 lg:mx-auto max-w-7xl mt-2 lg:mt-8" />} >
                    <PromoBanner PromoBannerData={promoData} />
                </Suspense>
            )}
            {widgets && widgets.map(({ config, data }, idx) =>
                data ? (
                    <ArticleWidget key={`${config.category}-${idx}`} listing={data} label={config.label} localUrl={localUrl} />
                ) : null
            )}
        </>
    )
}

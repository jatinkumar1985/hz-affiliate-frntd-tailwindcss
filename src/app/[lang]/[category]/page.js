import ArticleSideBar from '@/components/detail/ArticleSideBar';
import TopSearch from '@/components/global/TopSearch';
import Breadcrumb from '@/components/landing/Breadcrumb';
import CategoryListing from '@/components/landing/CategoryListing';
import DataLayer from '@/components/landing/DataLayer';
import Schema from '@/components/landing/Schema';
import ShortDescriptionWithToggle from '@/components/landing/ShortDescriptionWithToggle';
import { getCachedArticleByCategoryService, getCachedArticleTagsPage, getCachedLatestArticleService, getCachedPageMetaService } from '@/services/CachedServices';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    const { lang, category } = await params;
    let local;
    let localUrl;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
    const MetaApi = getCachedArticleByCategoryService({
      local,
      categoryType: category,
      pageNo: '1',
      limit: '1',
    });
    const [MetaData] = await Promise.all([MetaApi]);    
    const Meta = MetaData?.data?.article?.seo_details || {};
    return {
        title: Meta.meta_title,
        description: Meta.meta_description,
        keywords: Meta.meta_keyword,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                'max-image-preview': 'large',
            },
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${category}`,
        },
        openGraph: {
            title: Meta.meta_title,
            description: Meta.meta_description,
            url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${category}`,
            images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
            siteName: process.env.NEXT_PUBLIC_DOMIN_NAME,
        },
    };
}

async function CategoryContent({ params }) {
    const { lang, category } = await params;
    let local;
    let localUrl;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
    const CategoryListingData = await getCachedArticleByCategoryService({
        local,
        categoryType: category,
        pageNo: '1',
        limit: '18',
    });
    
    if (!CategoryListingData) {
        notFound();
    }

    const title = category.charAt(0).toUpperCase() + category.slice(1).replaceAll('-', ' ');

    const latestResult = await getCachedLatestArticleService({local,pageNo:1,limit:10});
    const articleTagsPageResult = await getCachedArticleTagsPage({ local,slug: category });
    const [latestData, articleTagsPageData] = await Promise.all([latestResult, articleTagsPageResult]);    
    return (
        <>
          {CategoryListingData && <Schema schemaData={CategoryListingData?.data?.article} category={category} localUrl={localUrl} />}
          {category && <DataLayer category={category} language={lang === 'hi' ? 'hindi' : 'english'} />}
          {articleTagsPageData&&<TopSearch TopSearches={articleTagsPageData} />}
          <div className='max-w-7xl mx-4 lg:mx-auto py-6 lg:py-6'>
              <div className='grid grid-cols-1 lg:grid-cols-7'>
                  <div className='col-span-5'>
                      <Breadcrumb title={title} />
                      <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>
                          <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-pink-200 before:-z-10'>
                              {title}
                          </span>
                      </h1>
                      <ShortDescriptionWithToggle data={CategoryListingData?.data?.article?.seo_details} />
                      <CategoryListing
                          initialPosts={CategoryListingData}
                          category={category}
                          local={local}
                          localUrl={localUrl}
                      />
                  </div>
                  <div className='col-span-2 lg:pl-8 pt-8 pb-2 lg:py-14'>
                      <div className='sticky top-10 mt-10 lg:mt-0'>
                          {latestData && <ArticleSideBar label="you may also like" listing={latestData} localUrl={localUrl} />}
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
}

function CategoryListingSkeleton() {
  return (
    <div className='max-w-7xl mx-4 lg:mx-auto py-6 animate-pulse'>
      <div className='flex gap-2 mb-4'>
        <div className='h-4 w-4 bg-gray-200 rounded' />
        <div className='h-4 bg-gray-200 rounded w-1/4' />
      </div>
      <div className='h-6 bg-gray-200 rounded w-4/5 mb-4' />
      <div className='space-y-2 mb-8'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='h-3 w-full bg-gray-200 rounded' />
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-7'>
        <div className='col-span-5'>
          <div className="lg:grid lg:grid-cols-3 space-y-4 lg:gap-6 mb-8">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex flex-row lg:flex-col rounded-xl overflow-hidden animate-pulse">
                <div className="shrink-0 w-28 lg:w-full h-18 lg:h-40 bg-gray-200 rounded-xl" />
                <div className="ml-4 lg:ml-0 lg:mt-2 flex-1 space-y-2">
                  <div className="h-2 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-300 rounded" />
                  <div className="h-3 w-full bg-gray-300 rounded" />
                  <div className="h-3 w-2/3 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-2'></div>
      </div>
    </div>
  );
}

export default function Page(props) {
    return (
        <Suspense fallback={<CategoryListingSkeleton />}>
            <CategoryContent {...props} />
        </Suspense>
    );
}

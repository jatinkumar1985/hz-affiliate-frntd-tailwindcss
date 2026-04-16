import GlobalLink from '@/components/global/GlobalLink';
import SearchListing from '@/components/search/SearchListing';
import { getCachedSearchArticleService } from '@/services/CachedServices';
import React, { Suspense } from 'react'


async function SearchContent({paramsPromise}) {
    const { lang } = await paramsPromise;
    let local;
    let localUrl;
    let language;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
        language='english'
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
        language='hindi'
    }
    const keyword = (await paramsPromise).keyword;
    const title = keyword.replaceAll('-',' ')
    const SearchArticleApi = getCachedSearchArticleService({local,keyword,pageNo:1,limit:18});
    const [SearchArticleData] = await Promise.all([SearchArticleApi]);
    // console.log(SearchArticleData,'SearchArticleData');
    return (
        <>
            <div className='max-w-7xl mx-4 lg:mx-auto py-6'>
                <div className='grid grid-cols-1 lg:grid-cols-4'>
                    <div className='col-span-3'>
                        <nav aria-label="Breadcrumb" className="flex mb-6">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <div>
                                        <GlobalLink href="/" className="text-gray-400 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-4 shrink-0" viewBox="0 0 16 16">
                                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                            </svg>
                                            <span className="sr-only">Home</span>
                                        </GlobalLink>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-3 shrink-0 text-gray-400" viewBox="0 0 16 16">
                                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                        <span className="ml-2 text-xs font-medium text-gray-500 capitalize" >
                                            {title}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className='text-3xl lg:text-4xl font-black mb-4 capitalize'>{title}</h1>
                        {/* <p className='text-base lg:text-lg mb-4'>{description}</p> */}
                        {SearchArticleData && <SearchListing
                            initialPosts={SearchArticleData}
                            keyword={keyword}
                            local={local}
                            localUrl={localUrl}
                        />}
                    </div>
                    <div className='col-span-1 lg:pl-8 pt-8 pb-2 lg:py-14'>
                        {/* <div className='mb-12'><CompareBanner /></div> */}
                        <div className='sticky top-10 mt-10 lg:mt-0'>
                            {/* <div className='lg:mb-8'>{GlobalProductsData && <WhatHot WhatHot={GlobalProductsData} />}</div> */}
                            {/* <div className='mb-8'><ShopSimilar ShopSimilar={CategoryListingData} /></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function CategoryListingSkeleton() {
  return (
    <div className="lg:grid lg:grid-cols-3 space-y-4 lg:gap-6 mb-8">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="flex flex-row lg:flex-col rounded-xl overflow-hidden animate-pulse">
          <div className="shrink-0 w-28 lg:w-full h-24 lg:h-40 bg-gray-200 rounded-xl" />
          <div className="ml-4 lg:ml-0 lg:mt-2 flex-1 space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}


export default function Page({ params }) {
  // ✅ Do NOT await params here — pass the Promise down
  return (
    <Suspense fallback={<CategoryListingSkeleton />}>
      <SearchContent paramsPromise={params} />
    </Suspense>
  );
}
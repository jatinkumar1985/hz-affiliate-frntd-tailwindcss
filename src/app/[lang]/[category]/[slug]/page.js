import ArticleSideBar from '@/components/detail/ArticleSideBar';
import Breadcrumb from '@/components/detail/Breadcrumb';
import DataLayer from '@/components/detail/DataLayer';
import Faq from '@/components/detail/Faq';
import HeroWidget from '@/components/detail/HeroWidget';
import Products from '@/components/detail/Products';
import ProductTableWidget from '@/components/detail/ProductTableWidget';
import RelatedProducts from '@/components/detail/RelatedProducts';
import Schema from '@/components/detail/Schema';
import TemplateCard from '@/components/detail/TemplateCard';
import TrusCardBottom from '@/components/detail/TrusCardBottom';
import TrusCardTop from '@/components/detail/TrusCardTop';
import WindowScrollReveal from '@/components/detail/WindowScrollReveal';
import TopSearch from '@/components/global/TopSearch';
import { getCachedArticleAuthorDetailService, getCachedArticleDetailService, getCachedArticleProductsService, getCachedArticleSidebarService, getCachedArticleTagsPage, getCachedCategoryListingService } from '@/services/CachedServices';
import { LiveProductsService } from '@/services/ListingService';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    const { lang, category, slug } = await params;
    let local;
    let localUrl;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
    const id = slug.split('-').pop().trim();
    const data = await getCachedArticleDetailService({ local,id });
    const Meta = data?.data.article || {};
    
    // const mobile  = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta.mobile_image}`;
    // const desktop = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta.big_image}`;

    // Preload with media — works in Next.js 15
    // ReactDOM.preload(mobile,  { as: "image", media: "(max-width: 1023px)"  });
    // ReactDOM.preload(desktop, { as: "image", media: "(min-width: 1024px)" });
    return {
        title: Meta?.meta_title,
        description: Meta?.meta_description,
        keywords: Meta?.meta_keyword,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                'max-image-preview': 'large',
            },
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${category}/${Meta?.page_url}-${Meta?.id}`,
        },
        openGraph: {
            title: Meta?.meta_title,
            description: Meta?.meta_description,
            url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${category}/${Meta?.page_url}-${Meta?.id}`,
            images: `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta?.big_image}`,
            siteName: process.env.NEXT_PUBLIC_DOMIN_NAME,
        },
    };
}

async function ArticleContent({ params }) {
    const { lang, category, slug } = await params;
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
    const id = slug.split('-').pop().trim();

    const [articleData, ArticleProducts] = await Promise.all([
        getCachedArticleDetailService({ local,id }),
        getCachedArticleProductsService({ local,id }),
    ]);
    if(!articleData){
        notFound()
    }
    const data = articleData?.data?.article;
    
    const authorData = await getCachedArticleAuthorDetailService({ local,id: data?.author_id });
    const author = authorData?.data?.author;
    
    const relatedArticleResult = await getCachedCategoryListingService({ local,category: category, pageNo:1, limit:8 });
    const articleSidebarResult = await getCachedArticleSidebarService({ local,category: category, pageNo:1, limit:6 });
    const articleTagsPageResult = await getCachedArticleTagsPage({local,slug:category});
    const [relatedArticleData,articleSidebarData,articleTagsPageData] = await Promise.all([relatedArticleResult,articleSidebarResult,articleTagsPageResult]);  
    // console.log(articleSidebarData,'articleSidebarData');
    const trackingTagString = author?.authorData?.tracking_tag;
    const trackingTag = trackingTagString && JSON.parse(trackingTagString);
    const tracking_tag = (trackingTag && trackingTag[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID]) || process.env.NEXT_PUBLIC_DEFAULT_TAG;
    const productsObj = ArticleProducts?.data?.products;
    const rows = productsObj?.rows || [];
    if (!ArticleProducts || !rows.length) return null;
    const productIds = rows .map((row) => row.amazon_product_id) .filter(Boolean) .join(',');
    const liveProducts = await LiveProductsService({ local, productIds });
    // console.log(liveProducts,'liveProducts');
    
    const wrapTablesWithScrollDiv = (htmlString) => {
        if (!htmlString) return '';
        return htmlString
            .replace(/<table([^>]*)>/gi, '<div class="overflow-x-auto"><table$1>')
            .replace(/<\/table>/gi, '</table></div>');
    };
    return (
        <>
            <Schema schema={data} schemaProduct={ArticleProducts?.data?.products} author={author} localUrl={localUrl} lang={lang} />
            <DataLayer datalayer={data} author={author} language={language} />
            {articleTagsPageData&&<TopSearch TopSearches={articleTagsPageData} />}
            <div className='max-w-7xl mx-4 lg:mx-auto pt-6 lg:pt-6'>
                <Breadcrumb breadcrumb={data} />
                <HeroWidget data={data} author={author} />
                <div className='grid grid-cols-4 lg:mb-20'>
                    <div className='col-span-4 lg:col-span-3 lg:pr-14'>
                        {ArticleProducts?.data?.template_type==="template1"&&<TrusCardTop language={language} localUrl={localUrl} />}
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: wrapTablesWithScrollDiv(data?.body) }} />
                        {ArticleProducts?.data?.template_type==="default"&&<WindowScrollReveal>
                            <ProductTableWidget
                                ArticleDetail={data}
                                ArticleProducts={ArticleProducts}
                                tracking_tag={"?tag=" + tracking_tag}
                            />
                        </WindowScrollReveal>}
                        {ArticleProducts?.data?.template_type==="default"&&<TrusCardTop language={language} localUrl={localUrl} />}
                        {ArticleProducts?.data?.template_type==="default"&&<Products
                            ArticleProducts={ArticleProducts}
                            tracking_tag={"?tag=" + tracking_tag}
                            local={local}
                            liveProducts={liveProducts}
                        />}
                        {ArticleProducts?.data?.template_type==="template1"&&<TemplateCard
                            ArticleCard={ArticleProducts?.data?.products}
                            tracking_tag={"?tag=" + tracking_tag}
                        />}
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: wrapTablesWithScrollDiv(data?.bottom_of_article) }} />
                        <div className="text-sm leading-6 mb-6 mt-6">
                            <p>
                                <strong>Disclaimer:</strong>{' '}
                                <em className="text-gray-500">
                                    {/* ...disclaimer text... */}
                                </em>
                            </p>
                        </div>
                        {ArticleProducts?.data?.template_type==="template1"&&<TrusCardBottom />}
                        <div className='mb-6 lg:mb-0'>{data && <Faq Faq={data} />}</div>
                    </div>
                    <div className='col-span-4 lg:col-span-1'>
                        <div className='sticky top-10 mt-10 lg:mt-0 mb-8'>
                            {relatedArticleData && <ArticleSideBar label="More For You" listing={relatedArticleData} articleid={id} />}
                        </div>
                    </div>
                </div>
                {articleSidebarData && <RelatedProducts label="Recommended" SubCategory={articleSidebarData} articleid={id} />}
            </div>
        </>
    );
}

function ArticleSkeleton() {
    return (
        <div className='max-w-7xl mx-4 lg:mx-auto py-6 animate-pulse'>
            <div className='flex gap-2 mb-4'>
                <div className='h-4 w-4 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded w-1/2' />
            </div>
            <div className='h-6 bg-gray-200 rounded w-full mb-2' />
            <div className='h-6 bg-gray-200 rounded w-4/6 mb-4' />
            <div className='space-y-2 mb-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='h-3 w-full bg-gray-200 rounded' />
                ))}
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='space-y-1'>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='h-2 w-32 bg-gray-200 rounded' />
                    ))}
                </div>
                <div className='flex gap-2 shrink-0'>
                    <div className='h-9 w-24 bg-gray-200 rounded-full' />
                    <div className='h-9 w-9 bg-gray-200 rounded-full' />
                </div>
            </div>
            <div className='aspect-video bg-gray-200 rounded-xl w-full mb-4' />
            <div className='space-y-2 mb-4'>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className='h-3 w-full bg-gray-200 rounded' />
                ))}
            </div>
        </div>
    );
}

export default function Page(props) {
    return (
        <Suspense fallback={<ArticleSkeleton />}>
            <ArticleContent {...props} />
        </Suspense>
    );
}

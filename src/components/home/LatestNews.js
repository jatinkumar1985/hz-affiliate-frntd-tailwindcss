import React from 'react'
import GlobalLink from '../global/GlobalLink';
import LazyMedia from '../global/LazyMedia';

export default function LatestNews({ LatestNewsData, localUrl }) {

    const articleComponents = LatestNewsData?.data?.article?.rows?.map((items, index) => {
        const categorySlug = items?.category?.category_slug;
        const subcategorySlug = items?.subcategory?.category_slug;
        const desktopImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.big_image}`;
        const mobileImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.thumb_image}`;
        return (
            <div key={index} className={`group flex ${index === 0 ? 'flex-col lg:flex-col' : 'flex-row lg:flex-col'}`} >
                {/* Image Section */}
                <div className={`shrink-0 ${index === 0 ? 'w-full lg:w-full mb-3 lg:mb-4' : 'w-28 lg:w-full mb-0 lg:mb-3'}`} >
                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${categorySlug}/${items?.page_url}-${items?.id}`}>
                        {index === 0 ? 
                            <picture>
                                <source media="(min-width: 1024px)" srcSet={desktopImageUrl} />
                                <img
                                    src={mobileImageUrl}
                                    alt={items?.title}
                                    width={1200}
                                    height={645}
                                    className={`object-cover aspect-auto lg:aspect-3/2 h-auto rounded-2xl`}
                                    fetchPriority="high"
                                    loading="eager"
                                />
                            </picture> :
                            <LazyMedia
                                type="image"
                                // src={`${index === 0 ? `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.big_image}`:`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.thumb_image}`}`}
                                src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.thumb_image}`}
                                alt={items?.title}
                                width={1200}
                                height={645}
                                className={`object-cover ${index === 0
                                        ? 'aspect-auto lg:aspect-3/2 h-auto rounded-2xl'
                                        : 'aspect-auto lg:aspect-4/2 rounded-lg'
                                    }`}
                                placeholderHeight={`${index === 0 ? 'h-48 w-full' : 'h-16 w-full'}`}
                            />
                        }
                        
                    </GlobalLink>
                </div>
                <div
                    className={`${index === 0
                            ? 'lg:mt-0 lg:ml-0'
                            : 'ml-4 lg:ml-0 lg:mt-0 w-full'
                        }`}
                >
                    <p className={`${index === 0 ? 'mb-1' : 'mb-1'} text-[9px]/2 uppercase text-pink-600 hover:text-pink-700`}>
                        <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${categorySlug}`}>{items?.category?.category_name}</GlobalLink>
                    </p>
                    <h3
                        className={` text-gray-900 group-hover:underline ${index === 0
                                ? 'text-xl/6 lg:text-3xl font-extrabold'
                                : 'text-[13px]/4 lg:text-base/5.5 font-bold'
                            }`}
                    >
                        <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${categorySlug}/${items?.page_url}-${items?.id}`}>{items?.title}</GlobalLink>
                    </h3>
                </div>
            </div>
        );
    });

    return (
        <div className="max-w-7xl mx-auto space-y-4 px-4 lg:px-0 mb-6 lg:mb-14 pt-2 lg:pt-6">
            {/* <h2 className='text-xl lg:text-2xl uppercase font-black mb-4 lg:mb-6 flex justify-between items-center'>
                <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-pink-200 before:z-[-10]'>Latest News</span>
                <GlobalLink
                    href="/latest-product-news"
                    className="inline-flex items-center gap-x-0.5 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
                >
                    <span className=''>View More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5 text-red-700" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </GlobalLink>
            </h2> */}
            <div className="flex flex-col lg:grid lg:grid-cols-4 grid-rows-2 gap-4 lg:gap-10">
                <div className='order-2 lg:order-1'>{articleComponents[1]}</div>
                <div className="col-start-1 row-start-2 order-3 lg:order-2">{articleComponents[2]}</div>
                <div className="col-span-2 row-span-2 col-start-2 row-start-1 mb-2 lg:mb-0 order-1 lg:order-3">{articleComponents[0]}</div>
                <div className="col-start-4 row-start-1 order-4 lg:order-3"> {articleComponents[3]} </div>
                <div className="col-start-4 row-start-2 order-5 lg:order-4">{articleComponents[4]}</div>
            </div>
        </div>
    )
}

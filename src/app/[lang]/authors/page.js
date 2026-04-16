import AuthorListing from '@/components/author/AuthorListing';
import GlobalLink from '@/components/global/GlobalLink';
import React from 'react'
import Schema from '@/components/author/listing/Schema';
import DataLayer from '@/components/author/listing/DataLayer';
import { getCachedAuthorListService } from '@/services/CachedServices';

const meta = {
    meta_title: "Authors Panel, Complete Bio of Authors - Jagran Reviews",
    meta_description: "Get all the content created by the The Daily Jagran Editorial desk curated under the name of authors related to Entertainment, News, Sports, Lifestyle and crime news of https://www.jagranreviews.com",
    meta_keywords: "The Daily Jagran Authors, The Daily Jagran Writers, The Daily Jagran Content Writers, The Daily Jagran Editorial Desk",
}
export async function generateMetadata({params}) {
    const { lang } = await params;
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
    return {
        title: meta?.meta_title,
        description: meta?.meta_description,
        keywords: meta?.meta_keywords,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                'max-image-preview': 'large',
            },
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/authors`,
        },
        openGraph: {
            title: meta?.meta_title,
            description: meta?.meta_description,
            url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/authors`,
            images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
            siteName: process.env.NEXT_PUBLIC_DOMIN_NAME,
        },
    };
}

export default async function Page({params}) {
    const { lang } = await params;
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
    const AuthorListApi = getCachedAuthorListService({language});
    const [AuthorListApiData] = await Promise.all([AuthorListApi]);    
    return (
        <>
            <Schema schema={meta} schemaListing={AuthorListApiData?.data?.authorList} />
            <DataLayer language={language} />
            <div className='max-w-7xl mx-4 lg:mx-auto py-6'>
                <div className='grid grid-cols-1'>
                    <nav aria-label="Breadcrumb" className="flex mb-6">
                        <ol role="list" className="flex items-center space-x-2">
                            <li>
                                <div>
                                    <GlobalLink href="/" className="text-gray-400 hover:text-red-700">
                                        {/* <HomeIcon aria-hidden="true" className="size-4 shrink-0" /> */}
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
                                    <span className="ml-2 text-xs font-medium text-gray-500" >
                                        Authors
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    {/* <h1 className='text-3xl lg:text-4xl font-black mb-4'>{title}</h1> */}
                    {/* <p className='text-base lg:text-lg mb-4'>{description}</p> */}
                    <AuthorListing AuthorListingData={AuthorListApiData} localUrl={localUrl} />
                </div>
            </div>
        </>
    )
}
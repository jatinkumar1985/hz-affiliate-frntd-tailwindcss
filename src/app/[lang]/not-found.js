
import React from 'react'
import LazyMedia from '@/components/global/LazyMedia';
// import LatestProductNews from '@/components/global/LatestProductNews';

export default function Custom404({ params }) {
    return (
        <>
            <div className="max-w-4xl mx-auto py-8 px-6 lg:px-0">
                <div className='space-y-4 grid grid-cols-1 lg:grid-cols-4'>
                    <div className="w-56 lg:w-96 h-auto mx-auto lg:col-span-2">
                        <LazyMedia
                            type="image"
                            alt="404 - Page Not Found"
                            width={500}
                            height={500}
                            className="w-42 lg:w-96 h-auto"
                            src={`https://www.jagranimages.com/images/jagran-review/404.svg`}
                        />
                    </div>
                    <div className="lg:col-span-2 flex items-center">
                        <div className='text-center lg:text-left'>
                            <p className='mb-3'>Oops! The page your looking doesn&apos;t exist or has your moved</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <LatestProductNews /> */}
        </>
    )
}
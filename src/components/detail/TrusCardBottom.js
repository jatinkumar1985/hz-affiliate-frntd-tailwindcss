import React from 'react'
import LazyMedia from '../global/LazyMedia'

export default function TrusCardBottom() {
    return (
        <div className='bg-gray-100 rounded-xl p-4 lg:p-6 mb-6 border border-dashed border-gray-300'>
            <div className='flex gap-2 mb-1'>
                <div className='w-5 h-5'>
                    <LazyMedia
                        type="image"
                        src={`https://www.jagranimages.com/images/jagran-review/security.svg`}
                        alt="Our Core Values"
                        width={20}
                        height={20}
                        className={`object-cover`}
                    />
                </div>
                <span className='font-bold text-base'>Our Core Values</span>
            </div>
            <p className='font-bold text-sm'>Transparent, Honest Reviews</p>
            <p className='text-sm mb-2'>We provide straightforward insights into each product’s strengths and weaknesses, so you can make confident, informed decisions.</p>
            <p className='font-bold text-sm'>Trusted Brands Priority</p>
            <p className='text-sm mb-2'>We focus on products from reliable brands known for quality, consistency, and customer satisfaction.</p>
            <p className='font-bold text-sm'>Smarter Value for Your Money</p>
            <p className='text-sm'>We highlight products that strike the perfect balance between cost, quality, and performance, so you get true value without the extra cost.</p>
        </div>
    )
}
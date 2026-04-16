"use client"
import React, { useState } from 'react'

export default function ShortDescriptionWithToggle({data}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const words = data?.description?.trim().split(/\s+/) || [];
    const shortText = words.slice(0, 15).join(' ') + (words.length > 15 ? '...' : '');
    return (
        <p className='text-sm sm:text-[16px] leading-5 sm:leading-normal mb-8 lg:mb-8 text-gray-900 sm:tracking-tight'>
            {isExpanded ? data?.description : shortText}{' '}
            {words.length > 15 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-pink-600 font-bold hover:underline uppercase text-xs cursor-pointer'
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </p>
    )
}
"use client"
import React, { useState } from 'react'

export default function ShortDescriptionWithToggle({data}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const words = data?.short_description?.trim().split(/\s+/) || [];
    const shortText = words.slice(0, 49).join(' ') + (words.length > 50 ? '...' : '');
    return (
        <p className='text-sm sm:text-[16px] leading-5 sm:leading-[1.5] mb-4 lg:mb-6 text-gray-900 sm:tracking-tight'>
            {isExpanded ? data?.short_description : shortText}{' '}
            {words.length > 50 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='text-red-600 font-bold hover:underline uppercase text-xs cursor-pointer'
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </p>
    )
}
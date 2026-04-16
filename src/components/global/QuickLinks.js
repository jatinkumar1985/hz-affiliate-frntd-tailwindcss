import React from 'react'
import GlobalLink from './GlobalLink'

export default function QuickLinks({QuickLinkData}) {
    return (
        <div className="bg-gray-50 px-4 py-6">
            <div className='max-w-7xl lg:mx-auto'>
                <h2 className='text-xl lg:text-2xl uppercase font-[900] mb-6 lg:mb-6 flex justify-start items-center gap-1'>
                    <span className='size-7 flex items-center justify-center bg-red-600 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='size-4 text-white' viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                        </svg>
                    </span>
                    <span className='relative '>Quick Links</span>
                </h2>
                <ul className='flex flex-wrap quicklink'>
                    {QuickLinkData?.data?.tags["quick-links"].map((items, id) => {
                        return (
                            <li key={id} className='text-xs/4 lg:text-sm/6 mb-1'><GlobalLink href={`${items.article_url}`} className="font-semibold hover:underline">{items.tag_name}</GlobalLink></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

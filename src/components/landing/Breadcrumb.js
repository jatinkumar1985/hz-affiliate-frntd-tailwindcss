import React from 'react'
import GlobalLink from '../global/GlobalLink'

export default function Breadcrumb({title}) {
    return (
        <nav aria-label="Breadcrumb" className="flex mb-4 lg:mb-6">
            <ol role="list" className="flex items-center space-x-2">
                <li>
                    <div>
                        <GlobalLink href="/" className="text-gray-400 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-3.5" viewBox="0 0 16 16">
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
                        <span className="ml-2 text-[9px] lg:text-xs font-medium text-gray-500 uppercase" >
                            {title}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}
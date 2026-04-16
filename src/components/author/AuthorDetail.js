import React from 'react'
import GlobalLink from '../global/GlobalLink'
import Image from 'next/image'

export default function AuthorDetail({person}) {   
    let bioMap = {};
    try {
        bioMap = JSON.parse(person?.bio_allProducts || '{}');
    } catch (err) {
        console.error("Failed to parse bio_allProducts:", err);
    }
    const bio = bioMap[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID] || person?.bio;
    return (
        <div className="flex flex-col gap-10 lg:py-12 first:pt-0 last:pb-0 sm:flex-row">
            <div className="flex-auto">
                <div className='flex items-end gap-8'>
                    <div className="w-[100px] lg:w-[200px] overflow-hidden rounded-lg lg:rounded-2xl mt-1 lg:mt-0">
                        <Image
                            src={person?.user_image}
                            alt={`${person?.first_name} ${person?.last_name}`}
                            width={500}
                            height={500}
                            className="aspect-auto w-full flex-none rounded-lg lg:rounded-2xl object-cover transition duration-300 ease-in-out hover:scale-110"
                        />
                    </div>
                    <div className=''>
                        <h1 className="text-xl lg:text-3xl font-bold text-gray-900">{person?.first_name} {person?.last_name}</h1>
                        <h2 className="text-base/7 text-gray-900">{person?.designation}</h2>
                        <p className="text-xs/8 font-semibold tracking-tight text-gray-600">
                            <GlobalLink href={`mailto:${person?.email}`} title={`${person?.email}`} target="_blank" className="hover:underline">
                                {person?.email}
                            </GlobalLink>
                        </p>
                    </div>
                </div>
                <p className="mt-6 text-base">{bio}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                    {person?.social_handle?.twitter &&
                        <li>
                            <a href={person?.social_handle?.twitter} target='_blank' rel="nofollow sponsored" className="text-gray-400 hover:text-red-500">
                                <span className="sr-only">X</span>
                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                </svg>
                            </a>
                        </li>
                    }
                    {person?.social_handle?.linkedin &&
                        <li>
                            <a href={person?.social_handle?.linkedin} target='_blank' rel="nofollow sponsored" className="text-gray-400 hover:text-red-500">
                                <span className="sr-only">LinkedIn</span>
                                <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                                    <path
                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    }
                    {person?.social_handle?.facebook &&
                        <li>
                            <a href={person?.social_handle?.facebook} target='_blank' rel="nofollow sponsored" className="text-gray-400 hover:text-red-500">
                                <span className="sr-only">Facebook</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="size-5" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </a>
                        </li>
                    }
                </ul>
                <div className="mt-6 border-t border-gray-100 mb-4 lg:mb-0">
                    <dl className="divide-y divide-gray-100">
                        {person?.location && person?.location.trim() !== '' &&
                            <div className="py-3 lg:py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm/6 font-bold text-gray-900">Location</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{person.location}</dd>
                            </div>}
                        {person?.expertise && person?.expertise.trim() !== '' &&
                            <div className="py-3 lg:py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm/6 font-bold text-gray-900">Area of expertise</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{person.expertise}</dd>
                            </div>}
                        {person?.languages && person?.languages.trim() !== '' &&
                            <div className="py-3 lg:py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm/6 font-bold text-gray-900">Language Spoken</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{person.languages}</dd>
                            </div>}
                        {person?.award_and_certification && person.award_and_certification.trim() !== '' &&
                            <div className="py-3 lg:py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm/6 font-bold text-gray-900">Honors and Awards</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{person.award_and_certification}</dd>
                            </div>}
                    </dl>
                </div>
            </div>
        </div>
    )
}
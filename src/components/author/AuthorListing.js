import React from 'react'
import Image from 'next/image';
import GlobalLink from '../global/GlobalLink';
export default function AuthorListing({AuthorListingData,localUrl}) {
    return (
        <div className="max-w-7xl mx-auto">
            <ul
                role="list"
                className="mx-auto mt-4 lg:mt-10 mb-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 lg:gap-y-20 lg:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
            >
                {AuthorListingData?.data?.authorList.map((person, index) => {
                    let bioMap = {};
                    try {
                        bioMap = JSON.parse(person?.bio_allProducts || '{}');
                    } catch (err) {
                        console.error("Failed to parse bio_allProducts:", err);
                    }
                    const bio = bioMap[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID] || person?.bio;
                    return (
                        <li key={index} className="flex gap-4 lg:gap-6 flex-row">
                            <div className="w-25 lg:w-50 overflow-hidden rounded-lg lg:rounded-2xl mt-1 lg:mt-0">
                                <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/authors/${person?.author_url}`}>
                                    <Image
                                        src={person?.user_image}
                                        alt={`${person?.first_name} ${person?.last_name}`}
                                        width={500}
                                        height={500}
                                        className="aspect-4/5 w-full flex-none rounded-lg lg:rounded-2xl object-cover transition duration-300 ease-in-out hover:scale-110"
                                    />
                                </GlobalLink>
                            </div>

                            <div className="w-full lg:w-[calc(100%-200px)]">
                                <h3 className="text-sm lg:text-lg font-semibold tracking-tight hover:underline">
                                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/authors/${person?.author_url}`}>
                                        {person?.first_name} {person?.last_name}
                                    </GlobalLink>
                                </h3>
                                <p className="mt-2 text-sm lg:text-base line-clamp-5 mb-2 lg:mb-4"> {bio} </p>
                                <GlobalLink
                                    href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/authors/${person?.author_url}`}
                                    className="text-red-600 hover:text-white border-red-600 hover:bg-red-600 border focus:outline-none rounded-full text-xs lg:text-sm px-4 py-2 text-center"
                                >
                                    View Profile
                                </GlobalLink>
                            </div>
                        </li>
                    );
                })}

            </ul>
        </div>
    )
}
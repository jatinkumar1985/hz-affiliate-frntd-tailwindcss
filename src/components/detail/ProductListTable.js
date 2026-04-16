"use client";
import React, { useState } from 'react'

export default function ProductListTable(props) {
    const [visibleRows, setVisibleRows] = useState(3);
    const handleShowMore = () => {
        setVisibleRows((prev) => prev + 3); // Adjust the number to show more rows each time
    };
    return (
        <>
            <div className="overflow-x-auto p-2 -m-2">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 mb-0">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Top Products
                                    </th>
                                    {props.data.display_features!=0?<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Feature
                                    </th>:''}
                                    
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {props.articleProducts && props.articleProducts.data.products.rows.slice(0, visibleRows).map((item, id) => {
                                    const incrementedId = id + 1;
                                    const formattedId = incrementedId < 10 ? `0${incrementedId}` : incrementedId;
                                    var amazon1 = item?.amazon_url?.split('?')[0] + props.tracking_tag;
                                    return (
                                        <tr key={id}>
                                            <td className="px-3 py-4 text-sm text-gray-500"><a href={amazon1} rel="nofollow sponsored" target='_blank' className='text-red-600 hover:text-red-700 font-semibold'>{item.title}</a></td>
                                            {props.data.display_features!=0?<td className="px-3 py-4 text-sm text-gray-500"><span>{item.feature}</span></td>:''}
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.rating}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {props.articleProducts && visibleRows < props.articleProducts.data.products.rows.length && (
                <div className='flex items-center justify-center mt-4'>
                    <button onClick={handleShowMore} type="button" className="focus:outline-none uppercase text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-bold rounded-full text-xs px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Show More Products</button>
                </div>
            )}
        </>
    )
}
"use client";
import React, { useState } from 'react';

export default function Faq(props) {
    // const [activeIndex, setActiveIndex] = useState(0);
    // const toggleItem = (index) => {
    //     setActiveIndex(activeIndex === index ? null : index);
    // };
    return (
        <>
            {props?.Faq?.faq?.length !== 0 ? (
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">FAQ&apos;s</h3>
                    <ul className="space-y-0.5">
                        {props.Faq.faq.map((item, index) => (
                            <li key={index} className="">
                                <div
                                    className={`flex justify-between items-center p-4 cursor-pointer bg-gray-100/80`}
                                    // onClick={() => toggleItem(index)}
                                >
                                    <div className='font-bold'>{item.question || ''}</div>
                                    {/* <span className="text-lg">{activeIndex === index ? '-' : '+'}</span> */}
                                </div>
                                <div
                                    className={`overflow-hidden max-h-screen p-4 bg-gray-50/50 }`}
                                >
                                    <div
                                        className="text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: item.answer || '' }}
                                    ></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

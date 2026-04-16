import React from 'react'
import LazyMedia from '../global/LazyMedia'

export default function TrusCardTop({language,localUrl}) {
    console.log(language,'language');
    
    return (
        <div className='bg-gray-100 rounded-xl p-4 lg:p-6 mb-6 border border-dashed border-gray-300'>
            <div className='flex gap-2'>
                <div className='w-5 h-5'>
                    <LazyMedia
                        type="image"
                        src={`https://www.jagranimages.com/images/jagran-review/secure-shield.svg`}
                        alt="Vetted Options"
                        width={20}
                        height={20}
                        className={`object-cover`}
                    />
                </div>
                {language==='english'&&<span className='font-bold'>Vetted Options</span>}
                {language==='hindi'&&<span className='font-bold text-md'>जांचे गए विकल्प</span>}
            </div>
            {language==='english'&&<p className='text-sm'>We thoroughly evaluate every product through a combination of <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/our-editorial-standards`} className='text-red-700 hover:underline' target="_blank">hands-on research</a> and <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/how-we-evaluate-products`} className='text-red-700 hover:underline' target="_blank">insights</a> from reputable industry sources.</p>}
            {language==='hindi'&&<p className='text-md'>हमारे द्वारा चुने हर <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/testing-standards`} className='text-red-700 hover:underline' target="_blank">प्रोडक्ट का चयन</a> सही रीसर्च करके किया जाता है, जिसमें <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/product-review-methodology`} className='text-red-700 hover:underline' target="_blank">विशिष्टताओं की तुलना,</a> विशेषज्ञ समीक्षाएं, सही ग्राहकों के विचार और वैल्यू फॉर मनी शामिल है।</p>}
        </div>
    )
}
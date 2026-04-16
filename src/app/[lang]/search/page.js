import { notFound } from 'next/navigation'
import React from 'react'

export default async function Page({ params }) {
    const { lang } = await params;
    let local;
    let localUrl;
    if(lang==='en'){
        local='en_US'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    }else if(lang==='hi'){
        local='hi_IN'
        localUrl=`/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
    notFound();
    return (
        <></>
    )
}
import { notFound } from 'next/navigation';
import React from 'react'

const Meta = {
    meta_title: "HerZindagi Your Picks: How We Select Products",
    meta_keyword: "",
    meta_description: "HerZindagi’s curation standards for selecting the best products. We evaluate brand trust, performance history, and real-user feedback to help you make informed buying decisions.",
}

export async function generateMetadata({params}){
    const { lang } = await params;
    let localUrl;
    if (lang === 'en') {
        localUrl = `/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}`
    } else if (lang === 'hi') {
        localUrl = `/${process.env.NEXT_PUBLIC_MODE_BASE_PATH}/hindi`
    }
  return {
    title: Meta.meta_title,
    description: Meta.meta_description,
    keywords: Meta.meta_keyword,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/how-we-select-products`,
    },
    openGraph: {
      title: Meta.meta_title,
      description: Meta.meta_description,
      url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}`,
      images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
      siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
    },
  };
}

export default async function Page({params}) {
    const { lang } = await params;

    if (lang !== 'en') {
        notFound();
    }
    return (
        <>

            <div className='max-w-7xl mx-4 lg:mx-auto py-6 lg:py-6 article-body'>
                <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>Our Curation Standard: How We Select Products?</h1>
                <p>At HerZindagi, our goal is to help users make informed choices before making any additions to their home, day-to-day lifestyle, and more. With thousands of products available online, we ensure bringing the best to you. Here are the top points we keep in mind while choosing products:</p>
                <h3>1. Brand Integrity and Trustworthiness</h3>
                <p>The selection of products begins with a deep dive into the brand’s history and how much users trust that particular company. We only prioritize companies that have built a reputation for transparency, quality manufacturing, and reliable customer service to deliver the best value for money. We ensure picking up the brands that not only sell products but also back their users with consistent support. </p>
                <h3>2. Proven Performance History</h3>
                <p>Rather than looking solely to the latest trends, we look back at the long performance history. We look for all the series/lineups offered by the brand and how well they have performed over the years, and their selling point. We consider giving priority to consistency and meaningful improvements, which also helps you gain insights into how the latest release is better than the previous one and how it's worth the upgrade.</p>
                <h3>3. Real-World User Verification</h3>
                <p>Marketing descriptions only tell half the story; to get reliable insights, we thoroughly go through all the available user reviews and ratings available on Amazon from verified buyers. Then, targets look for which particular theme has been discussed more (like durability, after-sales services, operations, etc) to understand how the product works in a real home.</p>
                <h3>4. The "Value-Add" Factor</h3>
                <p>Once a product earns a spot in our list, we gather more information about its use case and to whom it will be most suitable. For example, we ask: Does this provide the best value for money? Does it solve a specific problem? Does it have a feature that makes it stand out among other similar products? After considering all these factors, we streamline our articles. </p>
            </div>
        </>
    )
}

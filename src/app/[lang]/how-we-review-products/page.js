import { notFound } from 'next/navigation';
import React from 'react'

const Meta = {
    meta_title: "How We Review Products at Your Picks | HerZindagi",
    meta_keyword: "",
    meta_description: "Learn how HerZindagi’s Your Picks reviews products using verified Amazon reviews, buying trends, competitor comparisons, and rating stability checks to recommend the best options.",
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
      index: true,
      follow: true,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/how-we-review-products`,
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
                <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>How We Review Products At “Your Picks”?</h1>
                <p>We understand how cautious one can be while bringing home any appliance or product. To make your search easier, we thoroughly review products available on Amazon based on user feedback and buying trends. While we don't always put every item in a lab, we use a data-backed selection process to ensure our selected products are the best in their class. Here is exactly how we choose the products: </p>
                <h3>1. The Voice of the Customer (Verified Amazon Reviews) </h3>
                <ul>
                    <li>We look for a particular pattern and style by considering what the one common point of concern mentioned by multiple users over months is to find the flaw or standout feature in a particular product. We prioritize first-hand information given by the users over the brand’s marketing claims.</li>
                    <li>We follow a particular standard and look out for the most recent reviews available on Amazon from trusted buyers to ensure the product’s current quality matches its history.</li>
                </ul>
                <h3>2. Market Popularity and Selling Volume</h3>
                <p>A product that consistently stays at the top of the "Best Seller" charts on Amazon does so for a reason. We look out for the particular selling points and features that make that particular product truly worth calling Best. If a product is selling in high volumes and maintaining a high rating, it is a strong candidate for our product selection.</p>
                <h3>3. Rigorous Brand Comparison</h3>
                <p>Every "Pick" is compared against at least 3-5 of its direct competitors. For instance, if we are doing a review of TV brands we consider going for three or two market giants like Sony, Samsung, LG and do an in-depth search on how a particular brand offers more for your money than a comparable brand. We suggest those brands that offer better after-sales service and reliable warranties.</p>
                <h3>4. Simplifying Product Understanding</h3>
                <p>We write content not for the professionals or users who have a good knowledge, but rather we focus on every type of user and break down the specifications in their simplest form for better understanding. For example, just listing a battery size or a motor's wattage, we evaluate how those features solve a problem for you, to eventually serve users' search intent.</p>
                <h3>5. Review Integrity and Rating Stability</h3>
                <p>We are careful about "fake" or "incentivized" reviews. Our team looks for Rating Stability by checking if the product has maintained a consistent 4-star or higher rating over a long period. We always cross-check for products with high ratings with fewer reviews, as this might be an indication of manipulated reviews. </p>
            </div>
        </>
    )
}

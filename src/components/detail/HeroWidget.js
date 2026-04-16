"use client"
import React from 'react'
import GlobalLink from '../global/GlobalLink';
import { DDPub } from '../utils/Date';
import ShortDescriptionWithToggle from './ShortDescriptionWithToggle';
import GlobalButton from '../global/GlobalButton';

export default function HeroWidget({data, author}) {
    const latestDate = data?.publish_date > data?.updated_at ? data?.publish_date : data?.updated_at;
    const desktopImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${data?.big_image}`;
    const mobileImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${data?.mobile_image}`;

    const handleNativeShare = async () => {
        const shareUrl = window.location.href;
        const shareTitle = data?.title || "Jagran Reviews";
        const shareText = `Check out this article: ${shareTitle}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
                // datalayerClickSocial(...) ← removed
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Sharing failed", error);
                }
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
            } catch (err) {
                alert("Share not supported. Please copy the link manually.");
            }
        }
    };

    return (
        <>
            <h1 className="text-2xl sm:text-4xl leading-8 sm:leading-[1.3] font-extrabold mb-2 lg:mb-4 text-gray-900 sm:tracking-tight"> {data?.title} </h1>
            <ShortDescriptionWithToggle data={data} />
            <div className='flex justify-between'>
                <div className="flex flex-col mb-4 lg:mb-8 uppercase">
                    <p className="lg:text-[10px] text-[8px] text-gray-700">By : <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${author?.author_url}`} className="font-bold text-gray-600 hover:text-red-600">{author?.first_name} {author?.last_name}</GlobalLink></p>
                    <p className="lg:text-[10px] text-[8px] text-gray-700">Last Updated on : <span className="font-bold text-gray-600">{DDPub(latestDate)}</span></p>
                    <p className="lg:text-[10px] text-[8px] text-gray-700">Published on : <span className="font-bold text-gray-600">{data.publish_date_display}</span></p>
                </div>
                <div>
                    <div className='flex justify-center mb-4 lg:mb-8 gap-1'>
                        <GlobalLink href="https://www.instagram.com/thedailyjagran?igsh=cHk5MWI4OHg0NXFs" target="_blank" rel="noreferrer" className="flex items-center text-white font-semibold rounded-full gap-1 py-0 lg:py-2 px-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
                            <span className='uppercase lg:text-[10px] text-[8px] text-shadow-2xs'>follow us</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-instagram fill-white" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                        </GlobalLink>
                        <GlobalButton onClick={handleNativeShare} className="flex lg:hidden items-center gap-2 border border-gray-300 hover:border-red-600 hover:text-red-700 font-semibold rounded-full py-2 px-2">
                            {/* <span className='uppercase text-xs text-shadow-2xs'>Share</span> */}
                            {/* <ShareIcon className='size-4' /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='size-4' viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                            </svg>
                        </GlobalButton>
                    </div>
                </div>
            </div>
            <figure className="mb-4 lg:mb-8">
                <picture>
                    <source 
                        media="(min-width: 1024px)" 
                        srcSet={desktopImageUrl} 
                        fetchPriority="high"
                    />
                    <img
                        src={mobileImageUrl}
                        alt={data?.title}
                        width={1200}
                        height={645}
                        className="rounded-xl lg:rounded-3xl h-auto w-full"
                        fetchPriority="high"
                        loading="eager"
                    />
                </picture>
                <figcaption className="text-[10px]/3 text-gray-400 px-2 py-1 capitalize">{data?.big_image_caption}</figcaption>
            </figure>
        </>
    )
}
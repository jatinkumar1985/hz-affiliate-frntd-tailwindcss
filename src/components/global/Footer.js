import React from 'react'
import GlobalLink from './GlobalLink'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className='bg-black pb-12 lg:pb-0'>
            <div className='max-w-7xl mx-auto px-6 sm:px-6 lg:px-0 pb-6 lg:pt-6'>
                <div className='grid grid-cols-3 gap-2 lg:gap-20 py-8 border-b border-gray-700'>
                    <div className='col-span-3 lg:col-span-1 mb-4'>
                        <div className='lg:w-full mb-4'>
                            <GlobalLink href="/" className="flex justify-start">
                                <Image
                                    src={`https://www.herzindagi.com/logo-footer.svg`}
                                    alt="jagran reviews"
                                    width={300}
                                    height={113}
                                    className="w-37.5 h-10 cursor-pointer"
                                    loading="lazy"
                                />
                            </GlobalLink>
                        </div>
                        <p className='text-sm text-gray-200 mb-4'>Jagran Reviews brings you expert-led product reviews, in-depth comparisons, smart buying guides, and curated deals across top categories. Make confident purchase decisions with trusted insights, latest trends, and value-driven recommendations — all in one place.</p>
                        <p className='text-sm text-gray-200 mb-4'>For any feedback or complaint email to <GlobalLink href="mailto:compliant_gro@jagrannewmedia.com" className="text-gray-50 underline">compliant_gro@jagrannewmedia.com</GlobalLink></p>
                        <div className='lg:w-full'>
                            <div className='flex justify-start gap-2 mb-2 lg:mb-2'>
                                <GlobalLink href="https://www.facebook.com/TheDailyJagran" target="_blank" rel="noreferrer" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src={`https://www.jagranimages.com/images/jagran-review/facebook.svg`}
                                        alt="Facebook"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                                <GlobalLink href="https://www.instagram.com/thedailyjagran?igsh=cHk5MWI4OHg0NXFs" target="_blank" rel="noreferrer" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src={`https://www.jagranimages.com/images/jagran-review/instagram.svg`}
                                        alt="Instagram"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                                <GlobalLink href="https://x.com/TheDailyJagran" target="_blank" rel="noreferrer" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src={`https://www.jagranimages.com/images/jagran-review/twitter.svg`}
                                        alt="Instagram"
                                        width={14}
                                        height={14}
                                        className="w-4 h-4 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                                <GlobalLink href="https://www.youtube.com/@thedailyjagran" target="_blank" rel="noreferrer" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src={`https://www.jagranimages.com/images/jagran-review/youtube.svg`}
                                        alt="Instagram"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                            </div>
                            <p className='text-white mb-2 text-xs font-semibold'>Connect & Share</p>
                            {/* <p className='text-sm text-gray-200 lg:mb-4'>Expert-curated deals you can trust, refreshed regularly - <GlobalLink href="/deals" className="text-gray-50 underline font-bold">Check Deals</GlobalLink></p> */}
                        </div>
                    </div>
                    <div className='col-span-3 lg:col-span-2 lg:flex gap-10'>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                           
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="About us" href="/about-us" rel="" aria-label="About us">About us</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Advertise with Us" href="/advertise-withus" rel="noopener noreferrer" target="_blank" aria-label="Advertise with Us">Advertise with Us</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Book Print Ad" href="https://bookads.jagran.com" rel="noopener noreferrer" target="_blank" aria-label="Book Print Ad">Book Print Ad</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Contact us" href="/contact-us" rel="noopener noreferrer" target="_blank" aria-label="Contact us">Contact us</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Privacy Policy" href="/privacy-policy" rel="" aria-label="Privacy Policy">Privacy Policy</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Disclaimer" href="/terms-conditions" rel="" aria-label="Disclaimer">Disclaimer</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="This website follows the DNPA’s code of conduct" href="/dnpa-code-of-ethics-for-digital-news-websites" rel="" aria-label="This website follows the DNPA’s code of conduct">This website follows the DNPA’s code of conduct</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Sitemap" href="/smart-guide/sitemap" rel="" aria-label="Sitemap">Sitemap</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Authors" href="/smart-guide/authors" target="_self" aria-label="Authors">Authors</GlobalLink>
                            <GlobalLink className="text-sm text-gray-400 hover:text-white" title="Feeds" href="/smart-guide/rss" target="_self" aria-label="Feeds">Feeds</GlobalLink>
                        </div>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                            <GlobalLink href="https://www.jagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Hindi</GlobalLink>
                            <GlobalLink href="https://www.thedailyjagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">The Daily Jagran</GlobalLink>
                            <GlobalLink href="https://www.gujaratijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Gujarati Jagran</GlobalLink>
                            <GlobalLink href="https://www.marathijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Marathi</GlobalLink>
                            <GlobalLink href="https://www.onlymyhealth.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Only My Health</GlobalLink>
                            <GlobalLink href="https://www.jagranjosh.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Josh</GlobalLink>
                            <GlobalLink href="https://www.naidunia.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Nai Dunia</GlobalLink>
                            <GlobalLink href="https://www.inextlive.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Inextlive</GlobalLink>
                        </div>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                            <GlobalLink href="https://www.herzindagi.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Her Zindagi</GlobalLink>
                            <GlobalLink href="https://www.punjabijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Punjabi Jagran</GlobalLink>
                            <GlobalLink href="https://www.vishvasnews.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Vishvas News</GlobalLink>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                    <div className='py-4'>
                        <span className="text-sm text-gray-400 whitespace-nowrap">© 2026 Jagran New Media. All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
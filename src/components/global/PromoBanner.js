"use client";
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import GlobalLink from './GlobalLink';

export default function PromoBanner({PromoBannerData}) {
    return (
        <>
            <div className='lg:max-w-7xl sm:max-w-6xl mx-auto lg:mb-10 px-4 lg:px-0 mt-2 lg:mt-8'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={15} 
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !bg-gray-50/10 border !border-black/40 !w-2 lg:!w-2.5 !h-2 lg:!h-2.5 !mx-0.5',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-orange-600/100 !border-orange-600/100 !-mb-[1px] !w-2.5 lg:!w-3 !h-2.5 lg:!h-3 !scale-110',
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    lazy={{
                        loadPrevNext: true,
                        loadPrevNextAmount: 2,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                    }}
                    modules={[Pagination, Autoplay]} 
                    className="mySwiper pb-8! lg:pb-10!"
                >
                    {PromoBannerData?.map((items,index)=>{
                        const desktopImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.image}`                                           
                        const mobileImageUrl = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.image}`                                           
                        return(
                            <SwiperSlide key={index} className='overflow-hidden rounded-xl lg:rounded-2xl'>
                                <GlobalLink href={items.url} target={items.target} rel="nofollow sponsored">
                                    {/* <Image
                                        src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.image}`}
                                        alt={items?.title}
                                        width={1200}
                                        height={675}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        priority={index === 0}
                                        className="flex-none overflow-hidden rounded-xl lg:rounded-xl object-cover transition duration-300 ease-in-out aspect-[3/1] lg:aspect-[5/1] w-full"
                                    /> */}
                                    <picture>
                                        <source media="(min-width: 1024px)" srcSet={desktopImageUrl} />
                                        <img
                                            src={mobileImageUrl}
                                            alt={items?.title}
                                            width={1200}
                                            height={645}
                                            className="flex-none overflow-hidden rounded-xl lg:rounded-xl object-cover transition duration-300 ease-in-out  w-full"
                                            fetchPriority="high"
                                            loading="eager"
                                        />
                                    </picture>
                                </GlobalLink>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <style jsx global>{`
                .mySwiper .swiper-pagination {
                    bottom: 10px !important;
                }
                
                .mySwiper .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                    opacity: 1;
                }
                
                .mySwiper .swiper-pagination-bullet:hover {
                    transform: scale(1.1);
                    background-color: rgba(255, 255, 255, 0.9) !important;
                }
            `}</style>
        </>
    )
}
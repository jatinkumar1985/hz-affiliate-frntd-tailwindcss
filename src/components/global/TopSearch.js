"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import GlobalLink from './GlobalLink';
import { lowerText } from '@/components/utils/dataLayer';

export default function TopSearch({ TopSearches }) {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-0">
      <div className="flex items-center gap-4 py-3">
        {/* Label - fixed width / shrink-0 */}
        <div className="text-sm font-semibold text-gray-800 shrink-0">
          Top Searches :
        </div>

        {/* Full-width row with arrows at both ends */}
        <div className="relative flex-1 flex items-center min-w-0">
          {/* Left arrow – aligned to the very left */}
          

          {/* Swiper – takes available space between arrows */}
          <Swiper
            slidesPerView="auto"
            spaceBetween={8}
            freeMode={true}
            modules={[FreeMode, Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="static! px-10 sm:px-12 lg:px-16" // ← padding = space reserved for arrows
          >
            {TopSearches?.data?.tags["top-searches"]?.map((item, index) => (
              <SwiperSlide key={index} className="w-auto!">
                <GlobalLink
                  href={`${item.article_url}`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-xs uppercase font-medium text-gray-800 hover:bg-gray-200 transition-colors whitespace-nowrap"
                  eventName="top_searches_tab_click"
                  data={{
                    cta_text: lowerText(item.tag_name),
                    loggeduser_id: "guest",
                    registration_status: "guest",
                    section_name: "top searches",
                    uid: "na",
                    usertype: "guest",
                    storyID: "na",
                    tvc_page_cat: "na",
                  }}
                >
                  {item.tag_name}
                </GlobalLink>
              </SwiperSlide>
            ))}
          </Swiper>

                  {/* <button
                      className="swiper-button-prev flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
                      aria-label="Previous searches"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-2" viewBox="0 0 16 16">
                          <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                      </svg>
                  </button>
                  <button
                      className="swiper-button-next flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
                      aria-label="Next searches"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-2" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                      </svg>
                  </button> */}
        </div>
      </div>
    </div>
  );
}

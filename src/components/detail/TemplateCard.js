"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import GlobalLink from "../global/GlobalLink";
import LazyMedia from "../global/LazyMedia";
import { pushToDataLayer } from "@/components/utils/dataLayer";

// Helper function moved outside to avoid repeated re-creation
function calculateDiscount(salePrice, price) {
  if (!salePrice || !price) return null;
  const original = parseFloat(salePrice);
  const discounted = parseFloat(price);
  if (original <= discounted || original <= 0) return null;
  const discount = ((original - discounted) / original) * 100;
  return Math.round(discount);
}

// Memoize listener to avoid multiple bindings
function setupPaginationTracking(swiper) {
  const paginationEl = swiper.pagination?.el;
  if (!paginationEl || paginationEl._hasTrendingSliderListener) return;
  paginationEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("swiper-pagination-bullet")) return;
    const bullets = Array.from(
      paginationEl.querySelectorAll(".swiper-pagination-bullet")
    );
    const bulletIndex = bullets.indexOf(e.target);

    pushToDataLayer({
      event: "trending_slider_click",
      section_name: "trending products",
      cta_header: "na",
      cta_subheader: "na",
      cta_text: `bullet ${bulletIndex + 1}`,
      page_cat: "news",
    });
  });
  // Only bind once to prevent stacking listeners
  paginationEl._hasTrendingSliderListener = true;
}

export default function TemplateCard({ ArticleCard }) {
  if (!Array.isArray(ArticleCard) || ArticleCard.length === 0) return null;

  return (
    <>
      {ArticleCard.map((data, id) => (
        <div className="article-body" key={id}>
          {data?.title && <h3>{data.title}</h3>}
          {data?.body && (
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          )}
          <div className="bg-[#fff9cc] rounded-2xl pt-6 my-6">
            <Swiper
              className="mySwiper px-4! lg:px-6! pb-10!"
              spaceBetween={15}
              slidesPerView={1.5}
              breakpoints={{
                640: { slidesPerView: 2.5, spaceBetween: 25 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
              }}
              onSwiper={setupPaginationTracking}
              pagination={{
                clickable: true,
                bulletClass:
                  "swiper-pagination-bullet !bg-gray-50/10 border !border-gray-500 !w-2 lg:!w-2.5 !h-2 lg:!h-2.5 !mx-0.5",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !bg-gray-900/100 !border-gray-900/100 !-mb-[1px] !w-2.5 lg:!w-3 !h-2.5 lg:!h-3 !scale-110",
              }}
              modules={[Pagination]}
            >
              {(data?.products || []).map((item, index) => {
                const discountPercentage = calculateDiscount(
                  item?.sale_price,
                  item?.price
                );
                return (
                  <SwiperSlide
                    key={index}
                    className="overflow-hidden rounded-2xl lg:rounded-2xl bg-white group border border-[#d6c970] relative"
                  >
                    {discountPercentage && (
                      <div className="block w-full absolute left-0 top-0">
                        <div className="flagDiscount">
                          {discountPercentage}% OFF
                        </div>
                      </div>
                    )}
                    <GlobalLink
                      ariaLabel={item.product_title}
                      target="_blank"
                      rel="nofollow sponsored"
                      href={item.amazon_url}
                      className="flex items-center justify-center h-44 p-2"
                    >
                      <LazyMedia
                        type="image"
                        src={item?.image}
                        alt={item.product_title || "Article image"}
                        width={200}
                        height={200}
                        className="h-auto w-auto max-h-48 object-contain"
                      />
                    </GlobalLink>
                    <div className="text-gray-900 group-hover:underline font-bold px-4 mb-1">
                      <GlobalLink
                        ariaLabel={item.product_title}
                        target="_blank"
                        rel="nofollow sponsored"
                        href={item.amazon_url}
                        className="text-[13px] lg:text-sm line-clamp-3"
                      >
                        {item.product_title}
                      </GlobalLink>
                    </div>
                    <div className="text-lg font-bold px-4 mb-3">
                      ₹{item.price}
                      {item.sale_price && (
                        <span className="block text-sm text-gray-500 line-through">
                          ₹{item.sale_price}
                        </span>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      ))}
    </>
  );
}

'use client';

import LazyMedia from '@/components/global/LazyMedia';
import { useEffect, useRef } from 'react';

export default function VerticalThumbnailSlider({ item }) {
  const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  useEffect(() => {
    const loadSwiper = async () => {
      // Guard: bail out if either ref isn't mounted yet
      if (!mainSwiperRef.current || !thumbSwiperRef.current) return;

      const Swiper = (await import('swiper')).default;
      const { Navigation, Thumbs } = await import('swiper/modules');

      const thumbSwiper = new Swiper(thumbSwiperRef.current, {
        modules: [Navigation, Thumbs],
        direction: 'vertical',
        slidesPerView: 4,
        spaceBetween: 5,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
      });

      new Swiper(mainSwiperRef.current, {
        modules: [Navigation, Thumbs],
        direction: 'vertical',
        spaceBetween: 30,
        thumbs: { swiper: thumbSwiper },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    };

    loadSwiper();
  }, []);

  // ── Safe image handling ───────────────────────────────────────
  let images = [];

  // Case 1: images is already a proper array → use it
  if (Array.isArray(item?.images) && item.images.length > 0) {
    images = item.images;
  }
  // Case 2: images is a non-empty string → treat as single image
  else if (typeof item?.images === 'string' && item.images.trim() !== '') {
    images = [{ Large: item.images, Medium: item.images }];
  }
  // Case 3: no valid images → use amazon_image or placeholder
  else {
    const fallbackSrc =
      item?.amazon_image ||
      item?.image ||
      'https://www.jagranimages.com/images/jagran-review/placeholder.jpg';

    images = [{ Large: fallbackSrc, Medium: fallbackSrc }];
  }

  // ── At least one image is guaranteed now ──
  // console.log(images,'images');
  
  return (
    <div className="mb-4">
      <div className="flex gap-2 max-w-6xl w-full mx-auto">
        {/* Main Image Area */}
        <div className="flex-1 relative">
          <div
            ref={mainSwiperRef}
            className="swiper h-80 sm:h-100 lg:h-125 overflow-hidden bg-gray-50"
          >
            <div className="swiper-wrapper">
              {images.map((slide, i) => (
                <div key={i} className="swiper-slide">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <LazyMedia
                      type="image"
                      width={600}
                      height={600}
                      className="max-h-full max-w-full object-contain"
                      alt={`Product image ${i + 1}`}
                      src={slide?.Large || slide?.url || images[0].Large}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows – vertical layout friendly */}
            {images.length > 1 && (
              <>
                <div className="swiper-button-prev flex! items-center! justify-center! w-10! h-10! rounded-full! bg-black/40! !backdrop-blur-sm !text-white hover:!bg-black/60 transition-all absolute !left-1/2 !top-2 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path id="path2" d="m12 9.414-6.293 6.293c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7-7c.39-.391 1.024-.391 1.414 0l7 7c.39.39.39 1.024 0 1.414s-1.024.39-1.414 0z" />
                  </svg>
                </div>

                <div className="swiper-button-next !flex !items-center !justify-center !w-10 !h-10 !rounded-full !bg-black/40 !backdrop-blur-sm !text-white hover:!bg-black/60 transition-all absolute !left-1/2 !bottom-2 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails (vertical) */}
        {images.length > 1 && (
        <div className="w-16 lg:w-20 shrink-0">
          <div
            ref={thumbSwiperRef}
            className="swiper h-80 lg:h-125"
          >
            <div className="swiper-wrapper">
              {images.map((slide, i) => (
                <div key={`thumb-${i}`} className="swiper-slide h-auto! pb-2">
                  <div className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.06] hover:shadow-md swiper-slide-thumb-active:!scale-105 swiper-slide-thumb-active:!shadow-lg">
                    <LazyMedia
                      type="image"
                      width={140}
                      height={140}
                      className="w-full aspect-square object-cover"
                      alt={`Thumbnail ${i + 1}`}
                      src={slide?.Medium || slide?.Large || images[0].Medium || images[0].Large}
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity swiper-slide-thumb-active:!opacity-0 hover:opacity-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Custom Swiper styles */}
      <style jsx>{`
        .swiper-slide-thumb-active .relative {
          outline: 2.5px solid #ffffff;
          outline-offset: 2px;
        }

        .swiper-button-prev,
        .swiper-button-next {
          transition: all 0.25s ease;
        }

        .swiper-button-prev svg,
        .swiper-button-next svg {
          width:20px;
          height:20px;
        }

        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 1.1rem !important;
        }

        .swiper-button-disabled {
          opacity: 0.4 !important;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
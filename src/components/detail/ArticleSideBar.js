import React from "react";
import GlobalLink from "../global/GlobalLink";
import LazyMedia from "../global/LazyMedia";

export default function ArticleSideBar({ listing, label, articleid, localUrl }) {
  const rows = listing?.data?.article?.rows || [];
  // Filter out the current article, and memoize result (cheap op, so keep inline)
  const filteredItems = rows.filter((item) => item.id !== articleid);

  if (!filteredItems.length) return null;

  // Reuse the function to generate article link to DRY
  const getArticleUrl = (catSlug, pageUrl, id) =>
    `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${catSlug}/${pageUrl}-${id}`;

  const getImageSrc = (thumb_image) =>
    `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${thumb_image}`;

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <h2 className="text-xl lg:text-lg uppercase font-black mb-4 lg:mb-6 flex justify-between items-center">
        <span className="relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-pink-200 before:-z-10">
          {label}
        </span>
        {/* Uncomment to show 'View More'
        <GlobalLink
          href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${listing?.data?.article?.seo_details?.category?.category_slug || ""}`}
          className="inline-flex items-center gap-x-0.5 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
        >
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5 text-red-700" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
          </svg>
        </GlobalLink>
        */}
      </h2>
      <div className="space-y-6 mb-6">
        {filteredItems.slice(0, 5).map((item) => {
          const catSlug = item?.category?.category_slug || "";
          return (
            <div
              key={item.id}
              className="flex flex-row rounded-xl overflow-hidden group"
            >
              <GlobalLink
                href={getArticleUrl(catSlug, item?.page_url, item?.id)}
                className="shrink-0 w-26"
              >
                <LazyMedia
                  type="image"
                  src={getImageSrc(item?.thumb_image)}
                  alt={item?.title}
                  width={1200}
                  height={645}
                  className="object-cover rounded-xl"
                />
              </GlobalLink>
              <div className="ml-4">
                <p className="mb-1 text-[9px]/2 uppercase text-pink-600 hover:text-pink-700">
                  <GlobalLink
                    href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${catSlug}`}
                  >
                    {item?.category?.category_name}
                  </GlobalLink>
                </p>
                <h3 className="text-gray-900 group-hover:underline text-[13px]/4 font-bold">
                  <GlobalLink
                    href={getArticleUrl(catSlug, item?.page_url, item?.id)}
                  >
                    {item?.title}
                  </GlobalLink>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
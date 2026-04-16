"use client";
import React from "react";
import GlobalLink from "../global/GlobalLink";
import Image from "next/image";
import GlobalButton from "../global/GlobalButton";
import { useLoadMore } from "../hooks/useLoadMore";
// import NotFound from "../global/NotFound";

export default function SearchListing({ initialPosts, keyword, local, localUrl }) {
  const initialItems = initialPosts?.data?.article?.rows || [];  
  // Fetch via proxy (no token exposed)
  const fetchFunction = async ({ pageNo, limit }) => {
    const res = await fetch(
      // `/api/proxy/search-article/${keyword}/${pageNo}/${limit}`,
      `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/search-article/${keyword}/${pageNo}/${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
  };

  const { items, loading, hasMore, error, loadMore } = useLoadMore({
    fetchFunction,
    initialItems,
    limit: 18,
  });

  // Determine whether to show the Load More button
  const showLoadMore = items.length > 0 && (hasMore || loading);

  return (
    <>
      <div className="lg:grid lg:grid-cols-3 space-y-4 lg:gap-6 mb-8">
        {items.length > 0 ? (
          items.map((item) => {
            const catSlug = item?.category?.category_slug || "";
            const subSlug = item?.subcategory?.category_slug || "";
            const itemId = item?.id;

            return (
              <div key={itemId} className="flex flex-row lg:flex-col rounded-xl overflow-hidden group">
                <div className="shrink-0 w-28 lg:w-full mb-2">
                  <GlobalLink
                    eventName="content_click"
                    data={{
                      article_subcategory: `${item?.subcategory?.category_name?.toLowerCase()}`,
                      article_category: `${item?.category?.category_name?.toLowerCase()}`,
                      content_title: `${item?.title?.toLowerCase()}`,
                      section_name: "search",
                      storyID: `${item?.id}`,
                      page_cat: "news",
                      article_positon_in_section: 1
                    }}
                    href={`${localUrl}/${catSlug}/${subSlug}/${item?.page_url}-${itemId}`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.big_image}`}
                      alt={item.title || "Article image"}
                      width={1200}
                      height={645}
                      className="object-cover rounded-xl w-full"
                      priority={false}
                    />
                  </GlobalLink>
                </div>

                <div className="ml-4 lg:ml-0 lg:mt-2 flex-1">
                  <p className="mb-1 text-[9px] uppercase text-gray-500 hover:text-red-700">
                    <GlobalLink href={`${localUrl}/${catSlug}`}>
                      {item.category?.category_name || "Uncategorized"}
                    </GlobalLink>
                  </p>

                  <h3 className="text-gray-900 group-hover:underline text-[13px] leading-5 lg:text-base font-bold">
                    <GlobalLink
                      eventName="content_click"
                      data={{
                        article_subcategory: `${item?.subcategory?.category_name?.toLowerCase()}`,
                        article_category: `${item?.category?.category_name?.toLowerCase()}`,
                        content_title: `${item?.title?.toLowerCase()}`,
                        section_name: "search",
                        storyID: `${item?.id}`,
                        page_cat: "news",
                        article_positon_in_section: 1
                      }}
                    href={`${localUrl}/${catSlug}/${subSlug}/${item?.page_url}-${itemId}`}>
                      {item.title}
                    </GlobalLink>
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-3 text-center text-gray-500">No articles found.</p>
        )}
      </div>

      {/* Load More Button - Only show if there are items and (hasMore or loading) */}
      {showLoadMore && (
        <div className="flex justify-center mb-2 lg:mb-16">
          <GlobalButton
            onClick={loadMore}
            disabled={loading || !hasMore}
            className="inline-flex cursor-pointer items-center gap-x-2 rounded-full bg-red-400 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
            {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="-ml-0.5 size-4" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>}
          </GlobalButton>
        </div>
      )}

      {error && (
        <div className="max-w-sm mx-auto">
          {/* <NotFound
            title="No Posts"
            label="There have been no posts in this section yet"
          /> */}
        </div>
      )}
    </>
  );
}
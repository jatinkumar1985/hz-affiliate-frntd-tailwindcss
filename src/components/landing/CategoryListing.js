"use client";
import React from "react";
import GlobalLink from "../global/GlobalLink";
import GlobalButton from "../global/GlobalButton";
import LazyMedia from "../global/LazyMedia";
import { useLoadMore } from "../hooks/useLoadMore";

export default function CategoryListing({ initialPosts, category, local, localUrl }) {
  const initialItems = initialPosts?.data?.article?.rows || [];
  const payloadWithCache = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      // 'Cache-Control': 'public, max-age=120'
    },
    next: { revalidate: 300 }
  };
  // Fetch via proxy (no token exposed)
  const fetchFunction = async ({ pageNo, limit }) => {
    // const res = await fetch(
    //   // `/api/proxy/get-article-by-category/${category}/${pageNo}/${limit}`,
    //   `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-by-category/${category}/${pageNo}/${limit}`,
    //   { cache: "no-store" }
    // );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article-by-category/${category}/${pageNo}/${limit}`,
      {
        ...payloadWithCache,
        // cache: "no-store",
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

  const totalCount = initialPosts?.data?.article?.count;
  
  // Determine whether to show the Load More button
  const showLoadMore = items.length > 0 && (hasMore || loading) && (totalCount === undefined || totalCount > 18);

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
                    href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${catSlug}/${item?.page_url}-${itemId}`}
                  >
                    {/* <Image
                      src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.big_image}`}
                      alt={item.title || "Article image"}
                      width={1200}
                      height={645}
                      className="object-cover rounded-xl w-full"
                      priority={false}
                    /> */}
                    <LazyMedia
                      type="image"
                      src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.thumb_image}`}
                      alt={item.title}
                      width={300}
                      height={168}
                      className="object-cover rounded-xl w-full"
                      placeholderHeight={`h-16 w-full`}
                    />
                  </GlobalLink>
                </div>

                <div className="ml-4 lg:ml-0 lg:mt-2 flex-1">
                  <p className="mb-1 text-[9px] uppercase text-pink-600 hover:text-pink-700">
                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${catSlug}`}>
                      {item.category?.category_name}
                    </GlobalLink>
                  </p>

                  <h3 className="text-gray-900 group-hover:underline text-[13px] leading-5 lg:text-base font-bold">
                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${catSlug}/${item?.page_url}-${itemId}`}>
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
            {!loading &&
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="-ml-0.5 size-4" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
              </svg>
            }
            
          </GlobalButton>
        </div>
      )}

      {/* {error && (
        <div className="max-w-sm mx-auto">
          <NotFound
            title="No Posts"
            label="There have been no posts in this section yet"
          />
        </div>
      )} */}
    </>
  );
}
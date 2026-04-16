"use client";
import React, { useState, useCallback, useMemo } from "react";
import GlobalButton from "../global/GlobalButton";
import GlobalLink from "../global/GlobalLink";
import LazyMedia from "../global/LazyMedia";
import Rating from "./Rating";

const INITIAL_VISIBLE_ROWS = 3;

function calculateDiscount(salesPrice, price) {
  if (!salesPrice || !price) return null;
  const original = parseFloat(salesPrice);
  const discounted = parseFloat(price);
  if (original <= discounted || original <= 0) return null;
  return Math.round(((original - discounted) / original) * 100);
}

export default function ProductTableWidget({ ArticleDetail, ArticleProducts, tracking_tag }) {
  const items = ArticleDetail?.data?.article;
  const myntra_tracking_tag = "";

  const [visibleRows, setVisibleRows] = useState(INITIAL_VISIBLE_ROWS);

  const handleShowMore = useCallback(() => {
    setVisibleRows((prev) => prev + INITIAL_VISIBLE_ROWS);
  }, []);

  // Memoize rows for performance if rows or visibleRows change
  const displayedProducts = useMemo(() => {
    return (
      ArticleProducts?.data?.products?.rows?.slice(0, visibleRows) ?? []
    );
  }, [ArticleProducts, visibleRows]);

  // Memoize length check to minimize deep property access
  const hasMore =
    (ArticleProducts?.data?.products?.rows?.length ?? 0) > visibleRows;

  if (!ArticleProducts) return null;

  return (
    <>
      <ul className="overflow-hidden mb-6 lg:mb-8 rounded-lg bg-white border border-dashed border-slate-400 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        {displayedProducts.map((item, id) => {
          // Defensive property checks and normalization
          const amazonUrl = typeof item?.amazon_url === "string" ? item.amazon_url : "";
          const baseUrl = amazonUrl.split("?")[0] || "";

          const isMyntra = baseUrl.includes("www.myntra.com");
          const affiliateUrl =
            baseUrl +
            (isMyntra ? myntra_tracking_tag + tracking_tag : tracking_tag);

          const discountPercentage = calculateDiscount(item?.sales_price, item?.price);

          return (
            <li
              key={item?.id ?? id}
              className="flex py-5 flex-col relative border-b border-dashed border-gray-400 last:border-0"
            >
              {discountPercentage && (
                <div className="block w-full absolute left-0 top-0">
                  <div className="flagDiscount">{discountPercentage}% OFF</div>
                </div>
              )}
              <div
                className={`px-5 text-base font-semibold flex justify-between gap-2 ${
                  discountPercentage ? "pt-4" : ""
                }`}
              >
                <div className="flex-1">
                  <GlobalLink
                    href={affiliateUrl}
                    className="hover:underline mb-2 block"
                    target="_blank"
                    rel="nofollow sponsored"
                    eventName="affiliate_product_click"
                  >
                    {item.title}
                  </GlobalLink>
                  <div className="flex gap-2">
                    <div className="w-[50px]">
                      <LazyMedia
                        type="image"
                        alt={item?.alt}
                        width={603}
                        height={182}
                        className="h-auto mt-1"
                        src="https://www.jagranimages.com/images/Amazon_logo.svg"
                      />
                    </div>
                    <div>
                      <Rating rating={item?.rating} size="xs" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {item?.sales_price && (
                    <span className="text-gray-500 line-through text-xs">
                      ₹{item.sales_price}
                    </span>
                  )}
                  {item?.price && (
                    <span className="text-pink-600 font-bold text-xl mb-2">
                      ₹{item.price}
                    </span>
                  )}
                  <GlobalLink
                    href={affiliateUrl}
                    className="cursor-pointer whitespace-nowrap text-[10px] uppercase font-bold px-4 py-1.5 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                    target="_blank"
                    rel="nofollow sponsored"
                    eventName="purchase"
                    data={{
                      language: "english",
                      category: item?.category?.category_name,
                      sub_category: item?.subcategory?.category_name,
                      page_type: "article detail",
                      content_group: "Item Details Page",
                      ecommerce: {
                        transaction_id: "",
                        value: "",
                        tax: "",
                        shipping: "",
                        currency: "INR",
                        coupon: "",
                        customer_type: "new",
                        items: [
                          {
                            item_id: item?.id,
                            item_name: (item?.title ?? "").toLowerCase(),
                            affiliation: "",
                            coupon: "",
                            discount: "",
                            index: 0,
                            item_brand:
                              item?.all_specifications?.find(
                                (spec) => spec.key === "Brand"
                              )?.value?.toLowerCase() ?? "na",
                            item_category: item?.category?.category_name,
                            item_category2: item?.subcategory?.category_name,
                            item_category3: "",
                            item_category4: "",
                            item_category5: "",
                            item_list_id: "related_products",
                            item_list_name: "Related Products",
                            item_variant: "",
                            location_id: "",
                            price: item?.price,
                            quantity: "",
                          },
                        ],
                      },
                    }}
                  >
                    Get This
                  </GlobalLink>
                </div>
              </div>
            </li>
          );
        })}
        {hasMore && (
          <li className="py-4 flex justify-center">
            <GlobalButton
              onClick={handleShowMore}
              className="cursor-pointer text-xs uppercase font-bold px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              eventName="cta_click"
            >
              Show More Products
            </GlobalButton>
          </li>
        )}
      </ul>
    </>
  );
}
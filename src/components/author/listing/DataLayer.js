"use client";
import { useEffect } from "react";
import { pushToDataLayer } from "@/components/utils/dataLayer";

export default function DataLayer({language}) {
  useEffect(() => {
    const lastPageType = localStorage.getItem("page_type") || "na";
    const lastStoryId = localStorage.getItem("product_id") || "na";
    const lastAuthor = localStorage.getItem("author") || "na";

    const currentPageType = "author listing";
    const currentStoryId = "na";
    const currentAuthor = "na";

    pushToDataLayer({
        event: 'jagran_reviews_pageview',
        language: language,
        page_type: 'author listing',
        category: 'authors',
        is_affiliate_page:false,
        content_group: 'author listing page',
        referrer_page_type: lastPageType,
        referrer_story_id: lastStoryId,
        referrer_author: lastAuthor,
    });

    // console.log("PDP → referrer:", lastPageType, lastStoryId, lastAuthor);
    // store current page metadata for next navigation
    localStorage.setItem("page_type", currentPageType);
    localStorage.setItem("product_id", currentStoryId);
    localStorage.setItem("author", currentAuthor);
  }, []);

  return null;
}

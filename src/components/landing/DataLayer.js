"use client";

import { useEffect } from "react";
import { lowerText, pushToDataLayer } from "@/components/utils/dataLayer";

export default function DataLayer({ category, language = "english" }) {
  useEffect(() => {
    if (!category) return;

    const currentPageType = `${category} landing page`;
    const currentStoryId = "na";
    const currentAuthor = "na";

    pushToDataLayer({
      event: "english_pageview",
      language,
      tvc_page_cat: lowerText(category),
      tvc_page_type: currentPageType,
    });

    localStorage.setItem("page_type", currentPageType);
    localStorage.setItem("product_id", currentStoryId);
    localStorage.setItem("author", currentAuthor);
  }, [category, language]);

  return null;
}

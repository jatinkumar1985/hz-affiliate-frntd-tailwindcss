"use client";

import { useEffect } from "react";
import { formatName, lowerText, pushToDataLayer } from "@/components/utils/dataLayer";

export default function DataLayer({ datalayer, author, language }) {
  useEffect(() => {
    const currentPageType = "article detail";
    const currentStoryId = datalayer?.id || "na";
    const currentAuthor = formatName(author?.first_name, author?.last_name);
    const keywordSource = Array.isArray(datalayer?.meta_keyword)
      ? datalayer.meta_keyword
      : typeof datalayer?.meta_keyword === "string"
        ? datalayer.meta_keyword.trim().split(/\s+/)
        : [];
    const previewTags = keywordSource.length > 0 ? keywordSource.slice(0, 25).join(" ") : "na";
    const bodyText = typeof datalayer?.body === "string" ? datalayer.body.trim() : "";
    const wordCount = bodyText ? bodyText.split(/\s+/).length : "na";

    pushToDataLayer({
      event: "english_pageview",
      language,
      tvc_page_cat: lowerText(datalayer?.category?.category_name),
      tvc_page_type: currentPageType,
      tvc_detail_page: currentPageType,
      tvc_author: currentAuthor,
      storyID: currentStoryId,
      tvc_word_count: wordCount,
      tvc_publish_date: datalayer?.publish_date_schema || "na",
      tvc_update_date: datalayer?.updated_at_schema || "na",
      article_tags: previewTags,
      is_affiliate_page: true,
      tvc_video_embed: "no",
      article_type: "affiliate article",
    });

    localStorage.setItem("page_type", currentPageType);
    localStorage.setItem("product_id", currentStoryId);
    localStorage.setItem("author", currentAuthor);
  }, [datalayer, author, language]);

  return null;
}

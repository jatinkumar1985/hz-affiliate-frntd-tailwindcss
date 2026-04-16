"use client";

import { pushToDataLayer } from "@/components/utils/dataLayer";

function getStoredValue(key) {
  if (typeof window === "undefined") return "na";
  return localStorage.getItem(key) || "na";
}

const GlobalLink = ({
  children,
  href,
  rel,
  className,
  title,
  target,
  data,
  eventName,
  onClick,
  ariaLabel,
  ...props
}) => {
  const handleClick = (e) => {
    if (data && eventName) {
      const eventData = {
        event: eventName,
        referrer_page_type: getStoredValue("page_type"),
        referrer_story_id: getStoredValue("product_id"),
        referrer_author: getStoredValue("author"),
        ...data,
      };
      pushToDataLayer(eventData);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      className={className}
      title={title}
      href={href}
      rel={rel}
      target={target}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </a>
  );
};

export default GlobalLink;

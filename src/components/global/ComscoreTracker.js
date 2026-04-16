"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const COMSCORE_PUBLISHER_ID = "13184768";
const COMSCORE_ENDPOINT = "https://sb.scorecardresearch.com/p";
const COMSCORE_PAGEVIEW_PARAMS = {
  c1: "2",
  c2: COMSCORE_PUBLISHER_ID,
  cs_ucfr: "1",
};
const DEFAULT_CS_CFG = "1001110";
const DEFAULT_CV = "2.0";
const DEFAULT_CS_IT = "b1";

let lastTrackedRouteKey = "";
let lastTrackedPageUrl = "";

function trackPageView() {
  if (typeof window === "undefined") {
    return;
  }

  const currentPageUrl = window.location.href;
  const referrerUrl = lastTrackedPageUrl || document.referrer || "";
  const charset = document.characterSet || document.charset || "UTF-8";
  const csCfg = DEFAULT_CS_CFG;
  const cv = DEFAULT_CV;
  const csIt = DEFAULT_CS_IT;
  const eventTimestamp = Date.now().toString();

  const url = new URL(COMSCORE_ENDPOINT);
  Object.entries(COMSCORE_PAGEVIEW_PARAMS).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  url.searchParams.set("ns__t", eventTimestamp);
  // url.searchParams.set("ns_t", eventTimestamp);
  url.searchParams.set("ns_c", charset);
  url.searchParams.set("cs_cfg", csCfg);
  url.searchParams.set("cv", cv);
  url.searchParams.set("cs_it", csIt);
  url.searchParams.set("c7", currentPageUrl);
  url.searchParams.set("c8", document.title || "");
  url.searchParams.set("c9", referrerUrl);

  const pixel = new Image(1, 1);
  pixel.src = url.toString();
  lastTrackedPageUrl = currentPageUrl;
}

export default function ComscoreTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() || "";
  const routeKey = queryString ? `${pathname}?${queryString}` : pathname;

  useEffect(() => {
    if (!routeKey || routeKey === lastTrackedRouteKey) {
      return;
    }

    trackPageView();
    lastTrackedRouteKey = routeKey;
  }, [routeKey]);

  return null;
}

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import comscore from "@comscore/analytics";

const COMSCORE_PUBLISHER_ID = "13184768";
const COMSCORE_VIEW_LABELS = {
  c1: "2",
  c2: COMSCORE_PUBLISHER_ID,
  cs_ucfr: "1",
};

let isComscoreInitialized = false;
let lastTrackedRouteKey = "";

function initializeComscore() {
  if (isComscoreInitialized) {
    return;
  }

  const publisherConfiguration = new comscore.configuration.PublisherConfiguration({
    publisherId: COMSCORE_PUBLISHER_ID,
  });

  comscore.configuration.addClient(publisherConfiguration);
  comscore.start();
  isComscoreInitialized = true;
}

export default function ComscoreTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() || "";
  const routeKey = queryString ? `${pathname}?${queryString}` : pathname;

  useEffect(() => {
    initializeComscore();

    if (!routeKey || routeKey === lastTrackedRouteKey) {
      return;
    }

    comscore.notifyViewEvent(COMSCORE_VIEW_LABELS);
    lastTrackedRouteKey = routeKey;
  }, [routeKey]);

  return null;
}

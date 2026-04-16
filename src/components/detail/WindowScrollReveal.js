"use client";

import React, { useEffect, useRef, useState } from "react";

const DEFAULT_EVENTS = [
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
];

function ScrollPlaceholder() {
  return (
    <div className="mb-6 lg:mb-8 overflow-hidden rounded-lg border border-dashed border-slate-300 bg-white px-5 py-6 shadow-[0_0_30px_rgba(0,0,0,0.05)]">
      <div className="mb-4 h-4 w-44 rounded bg-gray-200" />
      <div className="space-y-3">
        <div className="h-12 rounded bg-gray-100" />
        <div className="h-12 rounded bg-gray-100" />
        <div className="h-12 rounded bg-gray-100" />
      </div>
      <div className="mt-4 h-9 w-36 rounded bg-gray-200" />
    </div>
  );
}

export default function WindowScrollReveal({
  children,
  className = "",
  events = DEFAULT_EVENTS,
  revealOffset = 200,
  fallback = <ScrollPlaceholder />,
}) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldRender) return undefined;

    let frameId = null;

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (
        rect.top <= viewportHeight + revealOffset &&
        rect.bottom >= -revealOffset
      ) {
        setShouldRender(true);
      }
    };

    const scheduleCheck = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        checkVisibility();
      });
    };

    checkVisibility();
    events.forEach((eventName) => {
      window.addEventListener(eventName, scheduleCheck, { passive: true });
    });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      events.forEach((eventName) => {
        window.removeEventListener(eventName, scheduleCheck);
      });
    };
  }, [events, revealOffset, shouldRender]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

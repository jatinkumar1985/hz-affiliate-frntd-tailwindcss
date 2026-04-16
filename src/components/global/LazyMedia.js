"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LazyMedia({
  src,
  alt = "",
  width = 1200,
  height = 675,
  className = "w-full h-auto",
  placeholderHeight,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.50 } // Load when 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const renderMedia = () => {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={true}
      />
    );
  };

  return (
    <div ref={ref} className="w-full flex justify-center items-center">
      {isVisible ? (
        renderMedia()
      ) : (
        <>
          <div className={`flex items-center justify-center bg-gray-50 ${placeholderHeight || ''}`}>
            <div className="opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" width="50" height="50">
                <path d="M501.001,167.767h-50.378v-34.01c0-6.075-4.925-11-11-11h-60.355c-6.075,0-11,4.925-11,11   c0,6.075,4.925,11,11,11h49.355v253.177H113.045v-49.355c0-6.075-4.925-11-11-11c-6.075,0-11,4.925-11,11v60.355   c0,6.075,4.925,11,11,11h35.033v50.378c0,6.075,4.925,11,11,11h352.923c6.075,0,11-4.925,11-11V178.767   C512.001,172.692,507.077,167.767,501.001,167.767z M490.001,459.312H159.078v-39.378h280.545c6.075,0,11-4.925,11-11V189.767   h39.378V459.312z"/>
                <path d="M210.48,175.445c-22.987,0-41.689-18.702-41.689-41.689s18.702-41.689,41.689-41.689    s41.689,18.702,41.689,41.689S233.467,175.445,210.48,175.445z M210.48,114.068c-10.856,0-19.689,8.833-19.689,19.689    c0,10.856,8.833,19.689,19.689,19.689c10.857,0,19.689-8.833,19.689-19.689C230.168,122.9,221.336,114.068,210.48,114.068z"/>
                <path d="M387.461,355.902c1.807-1.979,2.802-4.655,2.808-7.329V41.69c0-6.075-4.925-11-11-11H11.001c-6.075,0-11,4.925-11,11    v306.889c-0.097,5.904,5.089,11.11,11,11h368.264C382.347,359.573,385.433,358.239,387.461,355.902z M368.269,52.69v265.229    l-87.921-106.76c-1.972-2.395-4.862-3.845-7.961-3.995c-3.098-0.145-6.115,1.017-8.309,3.209l-53.599,53.6l-68.944-68.944    c-2.178-2.178-5.177-3.349-8.248-3.211c-3.078,0.131-5.96,1.548-7.944,3.904L22.001,318.439V52.69H368.269z M34.645,337.579    l99.807-118.521l60.471,60.471l-58.051,58.05H34.645z M218.258,287.307l52.81-52.811l84.892,103.083H167.986L218.258,287.307z"/>
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


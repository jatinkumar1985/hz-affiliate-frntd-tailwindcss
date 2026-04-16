"use client";
import React, { useEffect, useState } from "react";
import GlobalLink from "./GlobalLink";
import Image from "next/image";

export default function LatestProductNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article/0/4`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Failed to fetch articles (HTTP ${res.status})`);
        }

        const result = await res.json();

        if (!result.success || !result.data?.article?.rows) {
          throw new Error("Invalid response format from API");
        }

        setArticles(result.data.article.rows);
      } catch (err) {
        console.error("Error fetching latest articles:", err);
        setError("Unable to load latest product news right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mb-6">
      <h2 className='text-xl lg:text-2xl uppercase font-black mb-4 lg:mb-4 flex justify-between items-center'><span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-red-300 before:-z-10'>Latest News</span></h2>

      {!loading && !error && articles.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((item, index) => {
            const categorySlug = item?.category?.category_slug || 'uncategorized';
            const subcategorySlug = item?.subcategory?.category_slug || 'all';
            const url = `/${categorySlug}/${subcategorySlug}/${item?.page_url}-${item?.id}`;

            return (
                <div key={index} className="flex gap-3 group">
                    <GlobalLink href={url} className="shrink-0">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${item.big_image}`}
                            alt={item.title}
                            width={96}
                            height={64}
                            className="w-24 h-16 object-cover rounded-lg"
                        />
                    </GlobalLink>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:underline leading-tight">
                            <GlobalLink href={url}>{item.title}</GlobalLink>
                        </h4>
                    </div>
                </div>
            );
        })}
        </div>
      )}
    </section>
  );
}
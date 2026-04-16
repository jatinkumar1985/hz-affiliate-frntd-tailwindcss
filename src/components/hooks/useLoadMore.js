'use client';

import { useCallback, useState } from "react";

export function useLoadMore({
  fetchFunction,
  initialItems = [],
  initialPage = 0,
  limit = 18,
  loadMoreData,
}) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction({
        pageNo: page + 18,     // Jump +18 pages
        ...loadMoreData,
        limit,                 // Always 18
      });

      const newRows = result?.data?.article?.rows || [];

      setItems((prev) => [...prev, ...newRows]);
      setPage(page + 18);    // Update current page by +18

      if (newRows.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, loading, hasMore, limit, loadMoreData]);

  const reset = useCallback(() => {
    setItems(initialItems);
    setPage(initialPage);
    setLoading(false);
    setHasMore(true);
    setError(null);
  }, [initialItems, initialPage]);

  return {
    items,
    loading,
    hasMore,
    error,
    loadMore,
    reset,
  };
}
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import GlobalLink from './GlobalLink';
import GlobalButton from './GlobalButton';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function CommonSearchModal({ open, onClose, local, localUrl }) {
    const [query, setQuery] = useState('');
    // const [allProducts, setAllProducts] = useState([]);
    const [allLatestArticle, setLatestArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // Close modal and reset - wrapped with useCallback for stable reference
    const handleClose = useCallback(() => {
        onClose();
        setQuery('');
    }, [onClose]);

    // Focus input after modal transition completes
    const handleTransitionEnd = () => {
        if (open && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEsc);
            return () => document.removeEventListener('keydown', handleEsc);
        }
    }, [open, handleClose]);


    // Fetch Latest Articles
    useEffect(() => {
        if (!open) return;

        const fetchAllLatestArticle = async () => {
            setLoading(true);
            try {
                const payloadWithCache = {
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                  }
                };
                // const res = await fetch(`${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article/0/4`);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_MODE_BASE_API}${local}/get-article/0/4`,
                    payloadWithCache
                );
                if (!res.ok) throw new Error('Failed to fetch articles');
                const result = await res.json();
                setLatestArticle(result?.data?.article?.rows || []);
            } catch (err) {
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllLatestArticle();
    }, [open]);

    // Handle search on Enter
    const handleSearch = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            const searchUrl = `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/search/${encodeURIComponent(query.trim().replaceAll(' ', '-'))}`;
            window.location.href = searchUrl;
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center py-4 lg:py-18 px-4 lg:px-10">
                    <DialogPanel
                        transition
                        onTransitionEnd={handleTransitionEnd}
                        className="relative w-full max-w-xl transform overflow-hidden transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {/* Close Button */}
                        <GlobalButton
                            onClick={handleClose}
                            className="bg-gray-800 hover:bg-gray-700 rounded-r-md w-15 h-15 flex items-center justify-center absolute right-0 top-0 z-10 cursor-pointer transition"
                            aria-label="Close search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-6 text-white" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </GlobalButton>

                        {/* Search Input */}
                        <div className="relative bg-white shadow-[0_0_35px_rgba(0,0,0,0.30)] rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search Article... [Press Enter]"
                                className="w-full rounded-md bg-white pl-16 pr-12 py-4 text-lg text-gray-900 placeholder:text-sm placeholder:lg:text-2xl placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-800 focus:ring-inset"
                                autoFocus
                            />
                            {loading && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg className="h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Hot Products & Latest News */}
                        <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-lg">
                            <div className="grid grid-cols-1 lg:gap-6">

                                {/* Latest News */}
                                <div className="col-span-2 bg-gray-50 p-6">
                                    <h3 className="text-lg uppercase font-black mb-5 text-gray-800">
                                        Latest Product News
                                    </h3>
                                    <div className="space-y-4">
                                        {allLatestArticle.map((item, index) => {
                                            const categorySlug = item?.category?.category_slug || 'uncategorized';
                                            const subcategorySlug = item?.subcategory?.category_slug || 'all';
                                            const url = `${process.env.NEXT_PUBLIC_MODE_BASE_URL}${localUrl}/${categorySlug}/${item?.page_url}-${item?.id}`;

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
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { PCOEpisode, PCOListResponse } from "@/types/pco";

function formatPublishedDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleRow({ episode }: { episode: PCOEpisode }) {
  const { title, published_at, image_url } = episode.attributes;

  return (
    <div className="flex items-start gap-4">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-brand-blue/10">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-blue/10">
            <svg
              className="w-8 h-8 text-brand-blue/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 leading-snug line-clamp-2">{title}</p>
        {published_at && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <svg
              className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span className="text-sm text-gray-400">
              {formatPublishedDate(published_at)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function NieuwsScreen() {
  const [episodes, setEpisodes] = useState<PCOEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pco/nieuws")
      .then((r) => r.json())
      .then((data: PCOListResponse<PCOEpisode> & { error?: string }) => {
        if (data.error) throw new Error(data.error);
        setEpisodes(data.data ?? []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const ep of episodes) {
      const t = ep.attributes.series_title;
      if (t && !seen.has(t)) {
        seen.add(t);
        result.push(t);
      }
    }
    return result;
  }, [episodes]);

  const filtered = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesSearch =
        !search ||
        ep.attributes.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !activeCategory || ep.attributes.series_title === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [episodes, search, activeCategory]);

  const visibleCategories = categories.slice(0, 4);
  const extraCount = categories.length - visibleCategories.length;

  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 pt-10 pb-8 max-w-3xl md:mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-5">Nieuws</h1>

        {/* Search bar */}
        <div className="relative mb-7">
          <input
            type="search"
            placeholder="Zoek berichten"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-5 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Categories */}
        {!loading && categories.length > 0 && (
          <div className="mb-7">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Categorieën
            </h2>
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-brand-teal text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {extraCount > 0 && (
                <span className="flex items-center px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                  +{extraCount}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Article list */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Laatste berichten
          </h2>

          {loading ? (
            <LoadingSpinner label="Berichten laden..." />
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400 text-sm">Geen berichten gevonden</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((episode) => (
                <div key={episode.id} className="py-4 first:pt-0">
                  <ArticleRow episode={episode} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

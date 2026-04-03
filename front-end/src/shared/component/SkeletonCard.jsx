import React from "react";

/* ── Single Skeleton Card ── */
export const SkeletonCard = ({ width = "w-[300px]", height = "h-[250px]" }) => (
  <div className={`${width} flex-shrink-0 flex flex-col gap-3 animate-pulse`}>
    <div className={`${height} rounded-xl bg-gray-300/60`} />
    <div className="h-4 w-3/4 rounded bg-gray-300/60" />
    <div className="h-3 w-1/2 rounded bg-gray-300/40" />
    <div className="h-3 w-2/3 rounded bg-gray-300/40" />
    <div className="h-9 w-full rounded-lg bg-gray-300/50" />
  </div>
);

/* ── Horizontal row of skeleton cards (for Food, Hotel, Shop pages) ── */
export const SkeletonGrid = ({ count = 3 }) => (
  <div className="flex gap-8 overflow-hidden p-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/* ── Full-width skeleton banner (for Hero sections) ── */
export const SkeletonBanner = () => (
  <div className="w-full animate-pulse flex flex-col items-center gap-4 py-24 px-4">
    <div className="w-full md:w-[60vw] h-[30vh] md:h-[60vh] rounded-xl bg-gray-300/60" />
    <div className="h-6 w-48 rounded bg-gray-300/50" />
    <div className="h-4 w-72 rounded bg-gray-300/40" />
  </div>
);

/* ── Large center card skeleton (for Destination slider) ── */
export const SkeletonDestination = () => (
  <div className="w-full animate-pulse flex flex-col items-center gap-4 py-8">
    <div className="h-6 w-48 rounded bg-gray-300/50" />
    <div className="w-full md:w-[40%] h-[50vh] md:h-[65vh] rounded-xl bg-gray-300/60" />
    <div className="h-4 w-64 rounded bg-gray-300/40" />
    <div className="h-10 w-32 rounded-xl bg-gray-300/50" />
  </div>
);

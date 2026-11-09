"use client";

import React from "react";
import { brandConfig } from "@/config/brand.config";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function BrandLogo({ size = "md", showTagline = false }: BrandLogoProps) {
  if (brandConfig.logo.mode === "image") {
    const heightClass =
      size === "sm" ? "h-7" : size === "lg" ? "h-12" : "h-9";
    return (
      <div className="inline-flex shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandConfig.logo.imagePath}
          alt={brandConfig.logo.imageAlt}
          className={`${heightClass} w-auto object-contain`}
        />
      </div>
    );
  }

  const textSize =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-xl"
      : "text-base";

  return (
    <div className="inline-flex shrink-0 flex-col select-none">
      <div className="inline-flex items-center gap-3 whitespace-nowrap">
        {/* Строгий минималистичный символ рампы */}
        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/80 bg-zinc-950">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="absolute h-[1.5px] w-4 -rotate-45 bg-white" />
        </span>

        {/* Единый шрифт, единый кегль и чёткий отступ между словами */}
        <div
          className={`inline-flex items-center gap-2 font-sans font-extrabold uppercase tracking-[0.14em] text-white ${textSize}`}
        >
          <span>ТЕАТРА</span>
          <span className="inline-flex items-center rounded-sm bg-white px-2 py-0.5 text-zinc-950">
            {brandConfig.logo.accentWord}
          </span>
        </div>
      </div>

      {showTagline && (
        <span className="mt-1.5 text-xs text-zinc-400 tracking-normal">
          {brandConfig.tagline}
        </span>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { TheatreEpisode } from "@/types/theatre";
import { MapPin, Play, Search, Sparkles } from "lucide-react";

interface TheatreCatalogProps {
  theatres: TheatreEpisode[];
  selectedId: string;
  onSelectFromCatalog: (theatre: TheatreEpisode) => void;
}

export function TheatreCatalog({
  theatres,
  selectedId,
  onSelectFromCatalog,
}: TheatreCatalogProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return theatres;
    return theatres.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [theatres, query]);

  return (
    <section id="catalog" className="scroll-mt-24 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Реестр проекта «Театра нет»
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
            Все независимые театры на карте и в очереди съёмок
          </h2>
        </div>

        {/* Поиск по городу или названию */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по городу или тегу..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <div
              key={item.id}
              onClick={() => onSelectFromCatalog(item)}
              className={`group flex flex-col justify-between rounded-2xl border p-5 transition cursor-pointer ${
                isSelected
                  ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.city}
                  </span>
                  {item.episodeNumber ? (
                    <span className="rounded bg-white px-2 py-0.5 text-[11px] font-black text-zinc-950">
                      Выпуск #{item.episodeNumber}
                    </span>
                  ) : (
                    <span className="rounded bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-400 border border-zinc-800">
                      В базе
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-display text-xl font-bold text-white group-hover:underline">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 line-clamp-3">
                  {item.shortPitch}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-zinc-200 font-medium">
                  <Play className="h-3 w-3 text-white fill-current" />
                  {item.video.status === "editing"
                    ? "На монтаже"
                    : item.video.status === "released"
                    ? "Смотреть обзор"
                    : "Карточка театра"}
                </span>

                {item.needs.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-300">
                    <Sparkles className="h-3 w-3" />
                    Нужен партнёр
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

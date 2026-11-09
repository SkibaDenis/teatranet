"use client";

import React, { useState } from "react";
import { TheatreEpisode } from "@/types/theatre";
import { X, Tv, ExternalLink, HeartHandshake } from "lucide-react";

interface VideoModalProps {
  theatre: TheatreEpisode | null;
  onClose: () => void;
  onGoToDossier: () => void;
}

export function VideoModal({
  theatre,
  onClose,
  onGoToDossier,
}: VideoModalProps) {
  const [source, setSource] = useState<"youtube" | "vk">("youtube");

  if (!theatre) return null;

  const cleanYoutubeId = (() => {
    const raw = theatre.video.youtubeId?.trim();
    if (!raw) return null;
    const match = raw.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : raw;
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#09090b] p-5 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {theatre.city} • {theatre.name}
            </div>
            <h3 className="mt-0.5 font-display text-lg font-bold text-white">
              {theatre.video.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400">
              <Tv className="h-3.5 w-3.5 text-white" />
              Источник:
            </span>
            <button
              type="button"
              onClick={() => setSource("youtube")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                source === "youtube"
                  ? "bg-white text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 border border-zinc-800"
              }`}
            >
              YouTube
            </button>
            <button
              type="button"
              onClick={() => setSource("vk")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                source === "vk"
                  ? "bg-white text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 border border-zinc-800"
              }`}
            >
              VK Видео
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
          {source === "youtube" && cleanYoutubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${cleanYoutubeId}?autoplay=1&rel=0`}
              title={theatre.video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : source === "vk" && theatre.video.vkEmbedUrl ? (
            <iframe
              className="h-full w-full"
              src={theatre.video.vkEmbedUrl}
              title={theatre.video.title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <p className="font-display text-xl font-bold text-white">
                {theatre.video.status === "editing"
                  ? "Выпуск #1 («Один театр», Краснодар) на стадии монтажа"
                  : "Видео для этой платформы скоро появится"}
              </p>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400">
                {theatre.video.logline}
              </p>
              <p className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2 text-xs text-zinc-200">
                Подсказка: добавьте <code className="font-mono">youtubeId</code> или <code className="font-mono">vkEmbedUrl</code> в файле <code className="font-mono">src/data/theatres.ts</code>
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-xs text-zinc-400 max-w-xl">
            {theatre.shortPitch}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToDossier();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 cursor-pointer"
            >
              Полное досье театра
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <a
              href="#bridge"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-zinc-950 hover:bg-zinc-200"
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              Поддержать этот театр
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

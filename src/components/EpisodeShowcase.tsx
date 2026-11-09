"use client";

import React, { useState } from "react";
import { TheatreEpisode } from "@/types/theatre";
import {
  Play,
  Tv,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  ExternalLink,
  HeartHandshake,
  Quote,
  Ticket,
  Wrench,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface EpisodeShowcaseProps {
  theatre: TheatreEpisode;
  onSelectSupportTarget: (theatreName: string, needTitle?: string) => void;
}

export function EpisodeShowcase({
  theatre,
  onSelectSupportTarget,
}: EpisodeShowcaseProps) {
  const [playerSource, setPlayerSource] = useState<"youtube" | "vk" | "teaser">(
    theatre.video.youtubeId ? "youtube" : "teaser"
  );
  const [isPlayingEmbed, setIsPlayingEmbed] = useState(false);

  const needCategoryBadge = {
    equipment: {
      label: "Оборудование и техника",
      icon: Wrench,
      color: "text-white bg-zinc-900 border-zinc-700",
    },
    sponsorship: {
      label: "Меценатство / Партнёр выпуска",
      icon: HeartHandshake,
      color: "text-zinc-950 bg-white border-white font-bold",
    },
    space: {
      label: "Площадка и инфраструктура",
      icon: Building2,
      color: "text-zinc-200 bg-zinc-900 border-zinc-700",
    },
    tickets: {
      label: "Зрительская поддержка",
      icon: Ticket,
      color: "text-zinc-200 bg-zinc-900 border-zinc-700",
    },
  };

  const cleanYoutubeId = React.useMemo(() => {
    const raw = theatre.video.youtubeId?.trim();
    if (!raw) return null;
    const match = raw.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : raw;
  }, [theatre.video.youtubeId]);

  return (
    <section
      id="episode-dossier"
      className="scroll-mt-24 rounded-3xl border border-zinc-800 bg-[#09090b] p-6 sm:p-10 shadow-2xl"
    >
      {/* Шапка досье */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-300">
            <span className="rounded bg-white px-2 py-0.5 font-black text-zinc-950">
              {theatre.episodeNumber
                ? `Выпуск #${theatre.episodeNumber}`
                : "Досье театра"}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-white">{theatre.city}</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {theatre.name}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-400">
            {theatre.stageType} • Адрес: {theatre.address}
          </p>
        </div>

        {/* Переключатель источника видеоплеера (YouTube / ВК Видео / О выпуске) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 mr-1 flex items-center gap-1">
            <Tv className="h-3.5 w-3.5 text-white" />
            Плеер:
          </span>
          <button
            type="button"
            onClick={() => {
              setPlayerSource("youtube");
              setIsPlayingEmbed(false);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
              playerSource === "youtube"
                ? "bg-white text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
            }`}
          >
            YouTube
          </button>
          <button
            type="button"
            onClick={() => {
              setPlayerSource("vk");
              setIsPlayingEmbed(false);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
              playerSource === "vk"
                ? "bg-white text-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
            }`}
          >
            VK Видео
          </button>
          <button
            type="button"
            onClick={() => {
              setPlayerSource("teaser");
              setIsPlayingEmbed(false);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
              playerSource === "teaser"
                ? "bg-white text-zinc-950"
                : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
            }`}
          >
            О выпуске
          </button>
        </div>
      </div>

      {/* Сетка: Видеоплеер + Паспорт театра */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Левая часть (7 колонок): Встроенный видеоплеер и заметки ведущего */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl">
            {playerSource === "youtube" && cleanYoutubeId && isPlayingEmbed ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${cleanYoutubeId}?autoplay=1&rel=0`}
                title={theatre.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : playerSource === "vk" && theatre.video.vkEmbedUrl && isPlayingEmbed ? (
              <iframe
                className="h-full w-full"
                src={theatre.video.vkEmbedUrl}
                title={theatre.video.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Заставка плеера в чёрно-белой эстетике «Одного театра» */
              <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-zinc-950 via-[#0e0e11] to-zinc-900 p-6 sm:p-8">
                {/* Белый свет софита на фоне заставки */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1 text-xs font-medium text-zinc-200">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        theatre.video.status === "editing"
                          ? "bg-white animate-ping"
                          : "bg-white"
                      }`}
                    />
                    {theatre.video.releaseDate}
                    {theatre.video.duration ? ` • ${theatre.video.duration}` : ""}
                  </span>

                  <span className="rounded-md bg-zinc-900 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-300 border border-zinc-800">
                    {playerSource === "youtube"
                      ? "YouTube"
                      : playerSource === "vk"
                      ? "VK Видео"
                      : "Анонс"}
                  </span>
                </div>

                {/* Центральная кнопка Play */}
                <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl mx-auto">
                  {playerSource === "vk" && !theatre.video.vkEmbedUrl ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 text-center">
                      <p className="text-sm font-semibold text-white">
                        Плеер VK Видео готов к подключению
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        Вставьте ссылку <code className="text-white">vkEmbedUrl</code> в файле{" "}
                        <code className="text-white">src/data/theatres.ts</code> после публикации ролика во ВКонтакте.
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsPlayingEmbed(true)}
                        className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-zinc-950 shadow-[0_0_40px_rgba(255,255,255,0.35)] transition duration-300 hover:scale-105 hover:bg-zinc-200 cursor-pointer"
                        aria-label="Запустить видеообзор"
                      >
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </button>
                      <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white">
                        {theatre.video.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 line-clamp-2">
                        {theatre.video.logline}
                      </p>
                    </>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
                  <span>Проект «ТЕАТРА НЕТ» • Документальный обзор</span>
                  {theatre.video.status === "editing" && (
                    <span className="text-white font-semibold">
                      Статус: Монтаж 1-го выпуска («Один театр», Краснодар)
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Прямая речь ведущего-актёра */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
              <Quote className="h-4 w-4" />
              Взгляд изнутри • Комментарий ведущего «Театра нет»
            </div>
            <p className="mt-2.5 text-sm sm:text-base italic leading-relaxed text-zinc-200">
              {theatre.video.hostNote}
            </p>
          </div>

          {/* Развёрнутая история театра */}
          <div>
            <h4 className="font-display text-xl font-bold text-white">
              История и контекст театра
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {theatre.fullStory}
            </p>

            {/* Теги */}
            <div className="mt-4 flex flex-wrap gap-2">
              {theatre.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Правая часть (5 колонок): Паспорт театра + Блок для спонсоров и меценатов */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Паспорт площадки */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="font-display text-xl font-bold text-white">
              Паспорт независимого театра
            </h3>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-xs border-b border-zinc-800 pb-4">
              <div>
                <dt className="text-zinc-400 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                  Город
                </dt>
                <dd className="mt-1 font-semibold text-white text-sm">
                  {theatre.city}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-white" />
                  Год открытия
                </dt>
                <dd className="mt-1 font-semibold text-white text-sm">
                  {theatre.foundedYear} год
                </dd>
              </div>
              <div>
                <dt className="text-zinc-400 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-white" />
                  Вместимость зала
                </dt>
                <dd className="mt-1 font-semibold text-white text-sm">
                  {theatre.seatsCount ? `~${theatre.seatsCount} зрителей` : "Камерный зал"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-400">Основатели / Команда</dt>
                <dd className="mt-1 font-semibold text-white text-xs">
                  {theatre.artisticDirector}
                </dd>
              </div>
            </dl>

            {/* Знаковые спектакли */}
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Репертуар и знаковые постановки:
              </div>
              <ul className="mt-2 space-y-1.5">
                {theatre.keyPerformances.map((perf) => (
                  <li
                    key={perf}
                    className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-white" />
                    <span>{perf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ссылки на сам театр */}
            <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-zinc-800">
              {theatre.links.website && (
                <a
                  href={theatre.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200"
                >
                  Официальный сайт театра
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {theatre.links.vk && (
                <a
                  href={theatre.links.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                >
                  ВКонтакте
                </a>
              )}
              {theatre.links.telegram && (
                <a
                  href={theatre.links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                >
                  Telegram-канал
                </a>
              )}
            </div>
          </div>

          {/* Блок «Чем помочь этому театру» — мост со спонсоров и зрителями */}
          <div className="rounded-2xl border border-white/25 bg-gradient-to-b from-white/[0.06] via-zinc-900/80 to-zinc-950 p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="h-4 w-4" />
              Запросы театра для меценатов, бизнеса и зрителей
            </div>
            <p className="mt-1 text-xs text-zinc-300">
              Проект «Театра нет» помогает связать коммерческие структуры и людей культуры напрямую с задачами независимых сцен:
            </p>

            <div className="mt-4 space-y-3">
              {theatre.needs.map((need, idx) => {
                const meta = needCategoryBadge[need.category];
                const Icon = meta.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${meta.color}`}
                      >
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </span>
                      {need.estimate && (
                        <span className="text-xs font-bold text-white">
                          {need.estimate}
                        </span>
                      )}
                    </div>
                    <h5 className="mt-2 text-sm font-semibold text-white">
                      {need.title}
                    </h5>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      {need.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectSupportTarget(theatre.name, need.title)
                      }
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-white underline decoration-zinc-500 underline-offset-4 hover:decoration-white cursor-pointer"
                    >
                      <HeartHandshake className="h-3.5 w-3.5" />
                      Откликнуться как спонсор / помочь театру →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

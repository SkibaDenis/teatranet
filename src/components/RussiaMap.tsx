"use client";

import React, { useState, useMemo } from "react";
import { TheatreEpisode, EpisodeStatus } from "@/types/theatre";
import { resolveTheatreCoords } from "@/data/cities";
import {
  Play,
  Film,
  Compass,
  MapPin,
  Sparkles,
  HeartHandshake,
  ArrowUpRight,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface RussiaMapProps {
  theatres: TheatreEpisode[];
  selectedId: string;
  onSelectTheatre: (id: string) => void;
  onWatchEpisode: (theatre: TheatreEpisode) => void;
  onScrollToDetails: () => void;
}

type MapFilter = "all" | "editing" | "numbered" | "candidates";

export function RussiaMap({
  theatres,
  selectedId,
  onSelectTheatre,
  onWatchEpisode,
  onScrollToDetails,
}: RussiaMapProps) {
  const [filter, setFilter] = useState<MapFilter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTheatres = useMemo(() => {
    if (filter === "all") return theatres;
    if (filter === "editing") {
      return theatres.filter((t) => t.video.status === "editing");
    }
    if (filter === "numbered") {
      return theatres.filter((t) => t.episodeNumber !== null);
    }
    return theatres.filter((t) => t.episodeNumber === null);
  }, [theatres, filter]);

  const selectedTheatre = useMemo(
    () => theatres.find((t) => t.id === selectedId) || theatres[0],
    [theatres, selectedId]
  );

  // Вычисляем окно из 3 карточек под картой вокруг текущего выбранного театра
  const threeFeaturedCards = useMemo(() => {
    if (theatres.length <= 3) return theatres;
    const currentIndex = Math.max(
      0,
      theatres.findIndex((t) => t.id === selectedTheatre.id)
    );
    // Если выбран первый — показываем [0, 1, 2]; если последний — [N-3, N-2, N-1]; иначе [i-1, i, i+1]
    let startIndex = currentIndex - 1;
    if (startIndex < 0) startIndex = 0;
    if (startIndex + 3 > theatres.length) {
      startIndex = theatres.length - 3;
    }
    return theatres.slice(startIndex, startIndex + 3);
  }, [theatres, selectedTheatre.id]);

  function handleStepTheatre(direction: -1 | 1) {
    const currentIndex = theatres.findIndex((t) => t.id === selectedTheatre.id);
    const nextIndex =
      (currentIndex + direction + theatres.length) % theatres.length;
    onSelectTheatre(theatres[nextIndex].id);
  }

  // Точки маршрута для номерных выпусков (соединяем пунктирной линией экспедиции)
  const numberedRoutePoints = useMemo(() => {
    return [...theatres]
      .filter((t) => t.episodeNumber !== null)
      .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0))
      .map((t) => ({
        theatre: t,
        coords: resolveTheatreCoords(t.cityKey, t.mapCoords),
      }));
  }, [theatres]);

  const routePathD = useMemo(() => {
    if (numberedRoutePoints.length < 2) return "";
    return numberedRoutePoints
      .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.coords.x} ${pt.coords.y}`)
      .join(" ");
  }, [numberedRoutePoints]);

  const statusMeta: Record<
    EpisodeStatus,
    { label: string; dotClass: string; badgeClass: string }
  > = {
    released: {
      label: "Выпуск вышел",
      dotClass: "bg-white shadow-[0_0_10px_#ffffff]",
      badgeClass: "bg-white text-zinc-950 border-white font-bold",
    },
    editing: {
      label: "Выпуск #1 • На монтаже",
      dotClass: "bg-white shadow-[0_0_12px_#ffffff]",
      badgeClass: "bg-white/15 text-white border-white/50",
    },
    upcoming: {
      label: "В маршруте съёмок",
      dotClass: "bg-zinc-500",
      badgeClass: "bg-zinc-900 text-zinc-300 border-zinc-700",
    },
  };

  function handleFilterChange(nextFilter: MapFilter) {
    setFilter(nextFilter);
    const list =
      nextFilter === "all"
        ? theatres
        : nextFilter === "editing"
        ? theatres.filter((t) => t.video.status === "editing")
        : nextFilter === "numbered"
        ? theatres.filter((t) => t.episodeNumber !== null)
        : theatres.filter((t) => t.episodeNumber === null);

    if (list.length > 0 && !list.some((t) => t.id === selectedId)) {
      onSelectTheatre(list[0].id);
    }
  }

  return (
    <div className="relative">
      {/* Панель фильтров над картой */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-3.5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <Layers className="h-3.5 w-3.5 text-white" />
            Фильтр карты:
          </span>
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              filter === "all"
                ? "bg-white text-zinc-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Все театры ({theatres.length})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("editing")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              filter === "editing"
                ? "bg-white text-zinc-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current animate-ping" />
            Выпуск #1 • На монтаже (1)
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("numbered")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              filter === "numbered"
                ? "bg-white text-zinc-950 font-bold"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            Маршрут 1-го сезона ({theatres.filter((t) => t.episodeNumber !== null).length})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange("candidates")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              filter === "candidates"
                ? "bg-white text-zinc-950 font-bold"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-zinc-500" />
            Кандидаты в экспедицию ({theatres.filter((t) => t.episodeNumber === null).length})
          </button>
        </div>

        {/* Легенда маршрута */}
        <div className="hidden xl:flex items-center gap-4 text-xs text-zinc-400 pr-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 border-b border-dashed border-white/70" />
            Маршрут экспедиции «Театра нет» (старт: Краснодар)
          </span>
        </div>
      </div>

      {/* Основная сетка: Карта России слева + Полная карточка выбранного театра справа */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        {/* Левая колонка (8 из 12): Карта России + 3 крупные карточки под ней */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800 bg-[#09090b] p-4 sm:p-6 lg:col-span-8 shadow-2xl">
          <div className="pointer-events-none absolute -top-28 left-1/3 h-80 w-80 rounded-full bg-white/[0.06] blur-3xl" />

          {/* Верхний информационный бейдж на карте */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Compass className="h-4 w-4 text-white" />
              <span>Нажмите на любую точку города на карте, чтобы открыть обзор театра</span>
            </div>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-[11px] font-medium text-zinc-200">
              Выбрано: {selectedTheatre.city} — {selectedTheatre.name}
            </span>
          </div>

          {/* Векторная карта России (центрирована по вертикали, без лишних пустот) */}
          <div className="relative my-auto w-full py-2 select-none overflow-hidden">
            <svg
              viewBox="0 0 1000 440"
              className="w-full h-auto block"
              role="img"
              aria-label="Интерактивная карта независимых театров России"
            >
              <defs>
                <linearGradient id="russiaMonoFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#141417" />
                  <stop offset="50%" stopColor="#101013" />
                  <stop offset="100%" stopColor="#18181b" />
                </linearGradient>

                <radialGradient id="whiteSpotlight" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Координатная театральная сетка */}
              <g stroke="#27272a" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.6">
                <path d="M 40 115 Q 500 160 960 105" fill="none" />
                <path d="M 40 215 Q 500 260 960 205" fill="none" />
                <path d="M 40 315 Q 500 360 960 305" fill="none" />
                <path d="M 40 405 Q 500 435 960 395" fill="none" />
                <line x1="195" y1="25" x2="175" y2="435" />
                <line x1="368" y1="25" x2="365" y2="435" />
                <line x1="550" y1="25" x2="550" y2="435" />
                <line x1="740" y1="25" x2="760" y2="435" />
              </g>

              {/* Калининградский анклав */}
              <path
                d="M 74 238 L 98 234 L 103 248 L 82 254 Z"
                fill="url(#russiaMonoFill)"
                stroke="#52525b"
                strokeWidth="1.5"
              />

              {/* Основной стилизованный контур России */}
              <path
                d="
                  M 148 182
                  L 164 148
                  L 178 112
                  L 190 80
                  L 222 86
                  L 232 115
                  L 210 132
                  L 242 138
                  L 278 112
                  L 322 104
                  L 365 92
                  L 392 122
                  L 415 102
                  L 462 96
                  L 508 72
                  L 568 54
                  L 622 68
                  L 658 92
                  L 725 88
                  L 795 96
                  L 868 106
                  L 942 126
                  L 976 156
                  L 948 188
                  L 918 196
                  L 946 238
                  L 928 296
                  L 908 308
                  L 904 252
                  L 888 214
                  L 852 235
                  L 838 282
                  L 872 332
                  L 882 384
                  L 860 434
                  L 840 426
                  L 842 382
                  L 808 364
                  L 768 358
                  L 732 382
                  L 692 384
                  L 642 372
                  L 598 354
                  L 556 368
                  L 508 368
                  L 458 346
                  L 402 338
                  L 354 334
                  L 304 336
                  L 262 356
                  L 234 388
                  L 202 418
                  L 164 414
                  L 150 388
                  L 132 374
                  L 148 348
                  L 166 332
                  L 162 296
                  L 144 268
                  L 142 224
                  Z
                "
                fill="url(#russiaMonoFill)"
                stroke="#71717a"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Остров Сахалин */}
              <path
                d="M 898 318 L 910 332 L 908 382 L 894 374 Z"
                fill="url(#russiaMonoFill)"
                stroke="#52525b"
                strokeWidth="1.4"
              />

              {/* Новая Земля */}
              <path
                d="M 332 56 L 368 42 L 376 54 L 340 76 Z"
                fill="url(#russiaMonoFill)"
                stroke="#52525b"
                strokeWidth="1.2"
              />

              {/* Внутренние границы макрорегионов */}
              <g stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" fill="none">
                <path d="M 365 92 L 358 190 L 366 280 L 354 334" />
                <path d="M 555 62 L 560 210 L 556 368" />
                <path d="M 725 88 L 718 235 L 732 382" />
              </g>

              {/* Озеро Байкал */}
              <path
                d="M 672 326 Q 680 346 664 362"
                stroke="#a1a1aa"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
              />

              {/* Подписи макрорегионов */}
              <g
                fill="#3f3f46"
                fontSize="10"
                fontWeight="600"
                letterSpacing="3"
                className="uppercase pointer-events-none"
              >
                <text x="195" y="215">Европейская часть</text>
                <text x="342" y="235">Урал</text>
                <text x="485" y="235">Сибирь</text>
                <text x="745" y="245">Дальний Восток</text>
              </g>

              {/* Линия маршрута экспедиции */}
              {routePathD && (
                <path
                  d={routePathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeDasharray="5 6"
                  opacity="0.45"
                />
              )}

              {/* Белый луч театрального софита на выбранный театр */}
              {selectedTheatre && (() => {
                const activeCoords = resolveTheatreCoords(
                  selectedTheatre.cityKey,
                  selectedTheatre.mapCoords
                );
                return (
                  <g className="pointer-events-none">
                    <polygon
                      points={`${activeCoords.x - 65},0 ${activeCoords.x + 65},0 ${
                        activeCoords.x + 26
                      },${activeCoords.y} ${activeCoords.x - 26},${activeCoords.y}`}
                      fill="url(#whiteSpotlight)"
                      opacity="0.32"
                    />
                    <circle
                      cx={activeCoords.x}
                      cy={activeCoords.y}
                      r="34"
                      fill="url(#whiteSpotlight)"
                    />
                  </g>
                );
              })()}

              {/* Интерактивные точки театров на карте */}
              {filteredTheatres.map((theatre) => {
                const coords = resolveTheatreCoords(
                  theatre.cityKey,
                  theatre.mapCoords
                );
                const isSelected = theatre.id === selectedTheatre?.id;
                const isHovered = theatre.id === hoveredId;
                const status = theatre.video.status;

                const pinStroke =
                  isSelected || status === "editing" || status === "released"
                    ? "#ffffff"
                    : "#a1a1aa";

                return (
                  <g
                    key={theatre.id}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    onClick={() => onSelectTheatre(theatre.id)}
                    onMouseEnter={() => setHoveredId(theatre.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-pointer group"
                  >
                    {(isSelected || status === "editing") && (
                      <circle
                        r={isSelected ? "18" : "14"}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        opacity={isSelected ? "0.85" : "0.45"}
                      >
                        <animate
                          attributeName="r"
                          values={isSelected ? "11;21;11" : "9;16;9"}
                          dur="2.6s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.8;0.1;0.8"
                          dur="2.6s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    <circle
                      r={isSelected ? "12" : isHovered ? "10" : "8"}
                      fill={isSelected ? "#ffffff" : "#09090b"}
                      stroke={pinStroke}
                      strokeWidth={isSelected ? "3" : "2"}
                    />

                    {theatre.episodeNumber ? (
                      <text
                        y="3.5"
                        textAnchor="middle"
                        fill={isSelected ? "#09090b" : "#ffffff"}
                        fontSize="9.5"
                        fontWeight="800"
                      >
                        {theatre.episodeNumber}
                      </text>
                    ) : (
                      <circle
                        r="3"
                        fill={isSelected ? "#09090b" : "#a1a1aa"}
                      />
                    )}

                    <g
                      transform={`translate(0, ${
                        isSelected ? -20 : -15
                      })`}
                    >
                      <rect
                        x={-(theatre.city.length * 3.4 + 10)}
                        y="-12"
                        width={theatre.city.length * 6.8 + 20}
                        height="18"
                        rx="4"
                        fill={isSelected ? "#ffffff" : "#09090b"}
                        fillOpacity={isSelected ? "0.98" : "0.88"}
                        stroke={isSelected ? "#ffffff" : "#3f3f46"}
                        strokeWidth="1"
                      />
                      <text
                        y="0"
                        textAnchor="middle"
                        fill={isSelected ? "#09090b" : "#e4e4e7"}
                        fontSize="9.5"
                        fontWeight={isSelected ? "800" : "500"}
                      >
                        {theatre.city}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Нижний блок под картой: 3 просторные карточки с полным названием и описанием */}
          <div className="mt-3 border-t border-zinc-800/90 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Текущий фокус и соседние точки маршрута
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStepTheatre(-1)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-white hover:text-white cursor-pointer"
                  aria-label="Предыдущий театр"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStepTheatre(1)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-white hover:text-white cursor-pointer"
                  aria-label="Следующий театр"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {threeFeaturedCards.map((item) => {
                const active = item.id === selectedTheatre?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectTheatre(item.id)}
                    className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition cursor-pointer ${
                      active
                        ? "border-white bg-white text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.18)]"
                        : "border-zinc-800/90 bg-zinc-900/60 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            active ? "text-zinc-900" : "text-zinc-400"
                          }`}
                        >
                          {item.city}
                        </span>
                        <span
                          className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-extrabold ${
                            active
                              ? "bg-zinc-950 text-white"
                              : item.episodeNumber
                              ? "bg-zinc-800 text-white"
                              : "bg-zinc-950 text-zinc-400 border border-zinc-800"
                          }`}
                        >
                          {item.episodeNumber
                            ? `Выпуск #${item.episodeNumber}`
                            : "В маршруте"}
                        </span>
                      </div>

                      <div
                        className={`mt-2 font-display text-base font-bold leading-snug ${
                          active ? "text-zinc-950" : "text-white"
                        }`}
                      >
                        {item.name}
                      </div>

                      <p
                        className={`mt-1 text-xs leading-relaxed ${
                          active ? "text-zinc-700" : "text-zinc-400"
                        }`}
                      >
                        {item.stageType}
                      </p>
                    </div>

                    <div
                      className={`mt-3 pt-2 border-t text-[11px] font-semibold flex items-center justify-between ${
                        active
                          ? "border-zinc-950/15 text-zinc-950"
                          : "border-zinc-800/80 text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      <span>{item.video.releaseDate}</span>
                      <span>{active ? "Выбрано •" : "Открыть →"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Правая колонка (4 из 12): ПОЛНАЯ КАРТОЧКА ТЕАТРА БЕЗ ОБРЕЗКИ ТЕКСТА */}
        {selectedTheatre && (
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-[#09090b] p-6 lg:col-span-4 shadow-2xl">
            <div>
              {/* Верхние бейджи статуса и выпуска */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    statusMeta[selectedTheatre.video.status].badgeClass
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      statusMeta[selectedTheatre.video.status].dotClass
                    }`}
                  />
                  {statusMeta[selectedTheatre.video.status].label}
                </span>

                {selectedTheatre.episodeNumber ? (
                  <span className="rounded-md bg-white px-2.5 py-1 text-xs font-black uppercase tracking-wider text-zinc-950">
                    Выпуск #{selectedTheatre.episodeNumber}
                  </span>
                ) : (
                  <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                    В очереди съёмок
                  </span>
                )}
              </div>

              {/* Город и Название театра */}
              <div className="mt-4">
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-zinc-300">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                  {selectedTheatre.city} • Основан в {selectedTheatre.foundedYear} г.
                  {selectedTheatre.seatsCount
                    ? ` • Зал ~${selectedTheatre.seatsCount} мест`
                    : ""}
                </div>
                <h3 className="mt-1.5 font-display text-3xl font-bold leading-snug text-white">
                  {selectedTheatre.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {selectedTheatre.stageType}
                </p>
              </div>

              {/* Полное описание театра */}
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {selectedTheatre.shortPitch}
              </p>

              {/* Превью-блок видеообзора (полный текст и цитата ведущего) */}
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 font-medium text-white">
                    <Film className="h-3.5 w-3.5 text-white" />
                    Видеообзор проекта «Театра нет»
                  </span>
                  <span>{selectedTheatre.video.releaseDate}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">
                  {selectedTheatre.video.title}
                </p>
                <p className="mt-2 text-xs italic leading-relaxed text-zinc-300 border-l-2 border-white/60 pl-3">
                  {selectedTheatre.video.hostNote}
                </p>
              </div>

              {/* Блок актуальной нужды театра для спонсоров и зрителей */}
              {selectedTheatre.needs.length > 0 && (
                <div className="mt-4 rounded-2xl border border-zinc-700/80 bg-zinc-900/40 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                    Как поддержать этот театр сейчас:
                  </div>
                  <p className="mt-1 text-xs font-medium text-zinc-200">
                    {selectedTheatre.needs[0].title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-400">
                    {selectedTheatre.needs[0].description}
                  </p>
                </div>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onWatchEpisode(selectedTheatre)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition hover:bg-zinc-200 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                {selectedTheatre.video.status === "released"
                  ? "Смотреть выпуск прямо на сайте"
                  : selectedTheatre.video.status === "editing"
                  ? "Открыть плеер (Выпуск #1 • На монтаже)"
                  : "Смотреть анонс и карточку выпуска"}
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onScrollToDetails}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800 cursor-pointer"
                >
                  Досье театра
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                </button>
                <a
                  href="#bridge"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Помочь театру
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { RussiaMap } from "@/components/RussiaMap";
import { EpisodeShowcase } from "@/components/EpisodeShowcase";
import { TheatreCatalog } from "@/components/TheatreCatalog";
import { CommunityBridge } from "@/components/CommunityBridge";
import { ManifestoSection } from "@/components/ManifestoSection";
import { Footer } from "@/components/Footer";
import { VideoModal } from "@/components/VideoModal";
import { THEATRES_DATA } from "@/data/theatres";
import { TheatreEpisode } from "@/types/theatre";
import { brandConfig } from "@/config/brand.config";
import { Film } from "lucide-react";

export default function HomePage() {
  const [selectedId, setSelectedId] = useState<string>(THEATRES_DATA[0].id);
  const [modalTheatre, setModalTheatre] = useState<TheatreEpisode | null>(null);
  const [preselectedSupportTarget, setPreselectedSupportTarget] =
    useState<string>("");

  const selectedTheatre = useMemo(
    () => THEATRES_DATA.find((t) => t.id === selectedId) || THEATRES_DATA[0],
    [selectedId]
  );

  const totalNeedsCount = useMemo(
    () => THEATRES_DATA.reduce((acc, t) => acc + t.needs.length, 0),
    []
  );

  function scrollToElement(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleSelectSupportTarget(theatreName: string, needTitle?: string) {
    setPreselectedSupportTarget(
      needTitle ? `${theatreName} (${needTitle})` : theatreName
    );
    scrollToElement("bridge");
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#070708]">
      <Navbar />

      <main className="flex-1">
        {/* HERO + ИНТЕРАКТИВНАЯ КАРТА РОССИИ НА ГЛАВНОМ ЭКРАНЕ */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12">
          {/* Холодное монохромное сценическое освещение (Black & White) */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-white/[0.04] blur-[130px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Вступительный блок над картой */}
            <div className="mb-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-200">
                  <Film className="h-3.5 w-3.5 text-white" />
                  <span>{brandConfig.host.title}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{brandConfig.host.frequency}</span>
                </div>

                <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.15]">
                  Карта независимых театров России
                </h1>

                <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400">
                  Документальный видеопроект и культурная платформа{" "}
                  <strong className="font-semibold text-white">«Театра нет»</strong>. Первый выпуск посвящён краснодарскому{" "}
                  <strong className="font-semibold text-white">«Одному театру»</strong>, где служит ведущий проекта. Каждый месяц мы снимаем обзор на коммерческий театр, отмечаем его на карте страны и помогаем связать независимые сцены со зрителями и меценатами.
                </p>
              </div>

              {/* Быстрая статистика и фокус месяца */}
              <div className="lg:col-span-4 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 font-semibold text-white whitespace-nowrap">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                    Выпуск #1: «Один театр»
                  </span>
                  <span className="text-zinc-400 whitespace-nowrap">Краснодар • На монтаже</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
                  <div className="rounded-xl bg-zinc-950 p-2.5 border border-zinc-800">
                    <div className="font-display text-lg font-bold text-white">
                      {THEATRES_DATA.length}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Точек на карте
                    </div>
                  </div>
                  <div className="rounded-xl bg-zinc-950 p-2.5 border border-zinc-800">
                    <div className="font-display text-lg font-bold text-white">
                      {
                        THEATRES_DATA.filter((t) => t.episodeNumber !== null)
                          .length
                      }
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Выпуска в плане
                    </div>
                  </div>
                  <div className="rounded-xl bg-zinc-950 p-2.5 border border-zinc-800">
                    <div className="font-display text-lg font-bold text-white">
                      {totalNeedsCount}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Запросов спонсорам
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ИНТЕРАКТИВНАЯ КАРТА РОССИИ */}
            <div id="map-section" className="scroll-mt-24">
              <RussiaMap
                theatres={THEATRES_DATA}
                selectedId={selectedId}
                onSelectTheatre={(id) => setSelectedId(id)}
                onWatchEpisode={(theatre) => setModalTheatre(theatre)}
                onScrollToDetails={() => scrollToElement("episode-dossier")}
              />
            </div>
          </div>
        </section>

        {/* ПОЛНЫЙ ОБЗОР И ДОСЬЕ ВЫБРАННОГО ТЕАТРА */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <EpisodeShowcase
            theatre={selectedTheatre}
            onSelectSupportTarget={(theatreName, needTitle) =>
              handleSelectSupportTarget(theatreName, needTitle)
            }
          />
        </div>

        {/* КАТАЛОГ ВСЕХ ТОЧЕК И ВЫПУСКОВ */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TheatreCatalog
            theatres={THEATRES_DATA}
            selectedId={selectedId}
            onSelectFromCatalog={(theatre) => {
              setSelectedId(theatre.id);
              scrollToElement("episode-dossier");
            }}
          />
        </div>

        {/* МОСТ: ТЕАТРЫ ↔ БИЗНЕС / МЕЦЕНАТЫ ↔ СООБЩЕСТВО */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CommunityBridge
            theatres={THEATRES_DATA}
            preselectedTarget={preselectedSupportTarget}
          />
        </div>

        {/* МАНИФЕСТ И ПОДДЕРЖКА САМОГО ПРОЕКТА «ТЕАТРА НЕТ» */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <ManifestoSection />
        </div>
      </main>

      <Footer />

      {/* Модальное окно быстрого просмотра видеовыпуска */}
      <VideoModal
        theatre={modalTheatre}
        onClose={() => setModalTheatre(null)}
        onGoToDossier={() => scrollToElement("episode-dossier")}
      />
    </div>
  );
}

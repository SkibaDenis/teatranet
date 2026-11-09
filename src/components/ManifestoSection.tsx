"use client";

import React from "react";
import { brandConfig } from "@/config/brand.config";
import {
  Flame,
  Film,
  HeartHandshake,
  Compass,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function ManifestoSection() {
  return (
    <section id="manifesto" className="scroll-mt-24 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Левая колонка: Манифест «Почему ТЕАТРА НЕТ?» */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#09090b] p-6 sm:p-10 lg:col-span-7 shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/[0.05] blur-3xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            <Flame className="h-3.5 w-3.5" />
            Манифест проекта
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Говорят, без госбюджетов и люстр «театра нет». Мы начинаем с краснодарского «Одного театра», чтобы доказать обратное.
          </h2>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-300">
            {brandConfig.host.manifestoQuote}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-zinc-800 pt-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
              <Film className="h-5 w-5 text-white" />
              <div className="mt-2 font-display text-lg font-bold text-white">
                1 раз в месяц
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Регулярные документальные выпуски-обзоры из разных городов страны.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
              <Compass className="h-5 w-5 text-white" />
              <div className="mt-2 font-display text-lg font-bold text-white">
                Взгляд актёра
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Ведущий сам служит в коммерческом «Одном театре» и говорит с индустрией на одном языке.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
              <HeartHandshake className="h-5 w-5 text-white" />
              <div className="mt-2 font-display text-lg font-bold text-white">
                Прямая польза
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Каждая точка на карте — это мост между театром, зрителем и меценатом.
              </p>
            </div>
          </div>
        </div>

        {/* Правая колонка: Поддержка самого проекта «Театра нет» */}
        <div
          id="support-project"
          className="scroll-mt-24 flex flex-col justify-between rounded-3xl border border-white/25 bg-gradient-to-b from-white/[0.06] via-[#09090b] to-[#09090b] p-6 sm:p-10 lg:col-span-5 shadow-2xl"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Поддержать экспедицию «Театра нет»
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              {brandConfig.projectSupport.currentGoalTitle}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {brandConfig.projectSupport.currentGoalDescription}
            </p>

            {/* Ступени участия */}
            <div className="mt-6 space-y-3">
              {brandConfig.projectSupport.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-white">
                      {tier.title}
                    </span>
                    <span className="rounded bg-white px-2.5 py-0.5 text-xs font-black text-zinc-950">
                      {tier.amount}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {tier.perk}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={brandConfig.projectSupport.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition hover:bg-zinc-200"
            >
              Поддержать проект
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="#bridge"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs sm:text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800"
            >
              Стать попечителем сезона
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

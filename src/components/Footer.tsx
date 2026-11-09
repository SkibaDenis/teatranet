"use client";

import React from "react";
import { BrandLogo } from "./BrandLogo";
import { brandConfig } from "@/config/brand.config";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#070708] py-12 text-xs text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo size="md" showTagline />
            <p className="mt-4 max-w-sm leading-relaxed text-zinc-400">
              Некоммерческий культурный проект и видеожурнал о независимых и коммерческих театрах России. Первый выпуск посвящён краснодарскому «Одному театру». Каждый месяц — новая точка на карте страны.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold uppercase tracking-wider text-white">
              Навигация
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#map-section" className="hover:text-white">
                  Интерактивная карта России
                </a>
              </li>
              <li>
                <a href="#episode-dossier" className="hover:text-white">
                  Выпуск #1: «Один театр» (Краснодар)
                </a>
              </li>
              <li>
                <a href="#bridge" className="hover:text-white">
                  Стать спонсором или пригласить на съёмки
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-white">
                  Манифест «Театра нет»
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-semibold uppercase tracking-wider text-white">
              Площадки и связь
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={brandConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-200 hover:border-white"
              >
                YouTube-канал
              </a>
              <a
                href={brandConfig.socials.vkVideo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-200 hover:border-white"
              >
                VK Видео
              </a>
              <a
                href={brandConfig.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-200 hover:border-white"
              >
                Telegram проекта
              </a>
            </div>
            <p className="mt-4 text-zinc-500">
              По вопросам съёмок, меценатства и партнёрства:{" "}
              <a
                href={`mailto:${brandConfig.socials.email}`}
                className="text-zinc-200 underline decoration-zinc-700 hover:text-white"
              >
                {brandConfig.socials.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-zinc-900 pt-6 sm:flex-row sm:items-center text-[11px] text-zinc-500">
          <span>
            © {new Date().getFullYear()} Проект «{brandConfig.name}». Чёрно-белая монохромная дизайн-система.
          </span>
          <span>
            Настройки шрифтов, логотипа и контента: <code className="text-zinc-300">src/config/brand.config.ts</code> и <code className="text-zinc-300">src/data/theatres.ts</code>
          </span>
        </div>
      </div>
    </footer>
  );
}

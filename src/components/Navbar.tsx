"use client";

import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Карта", href: "#map-section" },
  { label: "Выпуск #1", href: "#episode-dossier" },
  { label: "База театров", href: "#catalog" },
  { label: "Театрам и спонсорам", href: "#bridge" },
  { label: "Манифест", href: "#manifesto" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-[#070708]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Левая часть: Логотип с фиксированным отступом */}
        <a href="#top" className="shrink-0 focus:outline-none">
          <BrandLogo size="md" />
        </a>

        {/* Центральная часть: Единая навигация в одну строку без переносов */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-sans text-[13px] font-medium tracking-wide text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Правая часть: Кнопки действия (единый размер и шрифт, без переносов) */}
        <div className="hidden sm:flex shrink-0 items-center gap-3">
          <a
            href="#bridge"
            className="whitespace-nowrap rounded-lg border border-zinc-700 bg-zinc-900/90 px-4 py-2 font-sans text-[13px] font-semibold text-zinc-100 transition hover:border-white hover:bg-zinc-800"
          >
            Предложить театр
          </a>

          <a
            href="#support-project"
            className="whitespace-nowrap rounded-lg bg-white px-4 py-2 font-sans text-[13px] font-bold text-zinc-950 transition hover:bg-zinc-200"
          >
            Поддержать проект
          </a>
        </div>

        {/* Кнопка мобильного меню на узких экранах */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex lg:hidden items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-200 hover:border-zinc-600"
          aria-label="Открыть меню"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Раскрывающееся меню для планшетов и телефонов */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-[#070708] px-4 py-4 lg:hidden">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-sans text-sm font-medium text-zinc-300 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-zinc-800/80 pt-4 sm:hidden">
            <a
              href="#bridge"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2.5 text-center font-sans text-xs font-semibold text-white"
            >
              Предложить театр
            </a>
            <a
              href="#support-project"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-lg bg-white py-2.5 text-center font-sans text-xs font-bold text-zinc-950"
            >
              Поддержать проект
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

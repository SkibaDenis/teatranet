import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { brandConfig } from "@/config/brand.config";

const displayFont = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const sansFont = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${brandConfig.name} — ${brandConfig.tagline}`,
  description:
    "Интерактивная карта и документальный видеопроект о независимых и коммерческих театрах России. Выпуск #1 — «Один театр» (Краснодар).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${displayFont.variable} ${sansFont.variable} dark`}
    >
      <body className="min-h-screen bg-[#070708] text-zinc-100 antialiased selection:bg-white selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { TheatreEpisode } from "@/types/theatre";
import {
  HeartHandshake,
  Drama,
  Users,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  Clapperboard,
} from "lucide-react";

interface CommunityBridgeProps {
  theatres: TheatreEpisode[];
  preselectedTarget?: string;
}

type ParticipantRole = "theatre" | "sponsor" | "community";

export function CommunityBridge({
  theatres,
  preselectedTarget,
}: CommunityBridgeProps) {
  const [role, setRole] = useState<ParticipantRole>("sponsor");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [targetTheatre, setTargetTheatre] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedTarget) {
      setRole("sponsor");
      setTargetTheatre(preselectedTarget);
    }
  }, [preselectedTarget]);

  const roleConfigs: Record<
    ParticipantRole,
    {
      badge: string;
      title: string;
      subtitle: string;
      orgPlaceholder: string;
      messagePlaceholder: string;
      icon: React.ElementType;
    }
  > = {
    theatre: {
      badge: "Для независимых и коммерческих театров",
      title: "Позвать «Театра нет» на съёмки",
      subtitle:
        "Расскажите о вашем театре, репертуаре и задачах. Мы приедем, снимем честный документальный обзор, добавим вашу сцену на карту России и поможем привлечь зрителей и меценатов.",
      orgPlaceholder: "Название вашего театра",
      messagePlaceholder:
        "Расскажите коротко о вашей площадке: сколько лет существуете, какие спектакли идут и какая поддержка (оборудование, спонсоры, огласка) сейчас нужнее всего...",
      icon: Drama,
    },
    sponsor: {
      badge: "Для бизнеса, спонсоров и меценатов",
      title: "Поддержать театр или стать партнёром выпуска",
      subtitle:
        "Свяжите ваш бренд с живой негосударственной культурой: помогите конкретному театру с карты оборудованием или грантом, выкупите целевой показ для команды или станьте попечителем следующего выпуска «Театра нет».",
      orgPlaceholder: "Компания / Бренд / Фонд (или частный меценат)",
      messagePlaceholder:
        "Укажите, какой формат вам интересен: адресная помощь выбранному театру, партнёрская интеграция в видеовыпуск «Театра нет», предоставление техники/площадки...",
      icon: HeartHandshake,
    },
    community: {
      badge: "Для зрителей, актёров и людей культуры",
      title: "Предложить театр на карту или присоединиться",
      subtitle:
        "Знаете крутой камерный коммерческий театр в своём городе, о котором должна узнать вся страна? Или хотите помочь проекту как оператор, драматург, куратор или волонтёр? Напишите нам.",
      orgPlaceholder: "Ваша сфера (зритель, актёр, режиссёр, медиа)",
      messagePlaceholder:
        "О каком театре в вашем городе нам обязательно нужно снять выпуск, или в каком формате вы хотите поучаствовать в проекте...",
      icon: Users,
    },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name,
          organization,
          city,
          contact,
          targetTheatre,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ошибка отправки");
      }

      setSubmittedSuccess(true);
      setName("");
      setOrganization("");
      setCity("");
      setContact("");
      setMessage("");
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Не удалось отправить заявку"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentRole = roleConfigs[role];

  return (
    <section id="bridge" className="scroll-mt-24 py-12">
      <div className="rounded-3xl border border-zinc-800 bg-[#09090b] p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Заголовок секции */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Культурная сеть и патронаж • Больше чем витрина
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Связываем независимые театры, бизнес и людей культуры
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
            «Театра нет» — это не просто видеообзоры раз в месяц. Это точка сборки для тех, кто делает негосударственный театр в России, и тех, кто готов его поддерживать: спонсоров, коммерческих партнёров, продюсеров и зрителей.
          </p>
        </div>

        {/* Три карточки экосистемы */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setRole("theatre");
              setSubmittedSuccess(false);
            }}
            className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition cursor-pointer ${
              role === "theatre"
                ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-950">
                  <Clapperboard className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  01 / Театрам
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Я представляю театр
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                Позвать проект на съёмки обзора, попасть на карту России и опубликовать список нужд театра для спонсоров.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center text-xs font-bold text-white">
              Заполнить анкету театра →
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("sponsor");
              setSubmittedSuccess(false);
            }}
            className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition cursor-pointer ${
              role === "sponsor"
                ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-950">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  02 / Бизнесу и меценатам
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Я спонсор / партнёр
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                Поддержать конкретный коммерческий театр оборудованием, грантом, бартером или стать генеральным партнёром выпуска.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center text-xs font-bold text-white">
              Предложить поддержку →
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("community");
              setSubmittedSuccess(false);
            }}
            className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition cursor-pointer ${
              role === "community"
                ? "border-white bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-950">
                  <Users className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  03 / Сообществу
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                Я зритель / человек культуры
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                Порекомендовать независимый театр в своём городе, предложить коллаборацию или войти в команду проекта.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center text-xs font-bold text-white">
              Написать в редакцию →
            </span>
          </button>
        </div>

        {/* Форма обратной связи */}
        <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                {currentRole.badge}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {currentRole.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {currentRole.subtitle}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 text-xs text-zinc-400 space-y-2">
              <div className="font-semibold text-white">
                Как устроена работа с заявками:
              </div>
              <p>
                • Заявки от театров попадают напрямую автору и продюсеру маршрута съёмок «Театра нет».
              </p>
              <p>
                • Предложения от спонсоров мы связываем напрямую с дирекцией выбранного театра без комиссий.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submittedSuccess ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/5 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-white" />
                <h4 className="mt-4 font-display text-2xl font-bold text-white">
                  Заявка принята!
                </h4>
                <p className="mt-2 max-w-md text-sm text-zinc-300">
                  Спасибо за участие в развитии независимых театров России. Команда проекта «Театра нет» свяжется с вами по указанному контакту в ближайшее время.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-6 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 cursor-pointer"
                >
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Петров"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Город
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Например: Краснодар, Москва, Пермь..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Театр / Компания / Роль
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={currentRole.orgPlaceholder}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Telegram / Телефон / Email для связи *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="@username или +7 (999) ..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {role === "sponsor" && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Какой театр или направление вы хотите поддержать?
                    </label>
                    <select
                      value={targetTheatre}
                      onChange={(e) => setTargetTheatre(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    >
                      <option value="">
                        Партнёрство со всем проектом «Театра нет» / Любой театр
                      </option>
                      {theatres.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.city} — {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Подробности предложения *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentRole.messagePlaceholder}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-medium text-zinc-200">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Отправка..." : "Отправить в «Театра нет»"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

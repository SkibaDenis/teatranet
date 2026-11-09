import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      role,
      name,
      organization,
      city,
      contact,
      targetTheatre,
      message,
    } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Пожалуйста, заполните имя, контакт для связи и сообщение." },
        { status: 400 }
      );
    }

    const entry = {
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      role: role || "sponsor",
      name,
      organization: organization || "",
      city: city || "",
      contact,
      targetTheatre: targetTheatre || "",
      message,
    };

    // 1. Если настроены переменные окружения Telegram-бота, мгновенно шлём уведомление в Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const roleLabels: Record<string, string> = {
        theatre: "🎭 Заявка от независимого театра",
        sponsor: "🤝 Предложение от спонсора / мецената",
        community: "🌟 Сообщение от зрителя / человека культуры",
      };
      const text = [
        `<b>${roleLabels[entry.role] || "Новая заявка на сайте ТЕАТРА НЕТ"}</b>`,
        `<b>Имя:</b> ${entry.name}`,
        entry.organization ? `<b>Театр / Компания:</b> ${entry.organization}` : "",
        entry.city ? `<b>Город:</b> ${entry.city}` : "",
        entry.targetTheatre ? `<b>Целевой театр / запрос:</b> ${entry.targetTheatre}` : "",
        `<b>Контакт:</b> ${entry.contact}`,
        `<b>Сообщение:</b>\n${entry.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }).catch(() => {
        // Не блокируем ответ пользователю при сетевой ошибке Telegram
      });
    }

    // 2. Локально сохраняем заявку в файл submissions.json (удобно при разработке и на VPS)
    try {
      const dataFile = path.join(process.cwd(), "submissions.json");
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(dataFile, "utf8");
        existing = JSON.parse(raw);
      } catch {
        existing = [];
      }
      existing.unshift(entry);
      await fs.writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
    } catch {
      // На read-only serverless окружениях (например, Vercel без БД) пропускаем запись в файл
    }

    return NextResponse.json({ ok: true, entry });
  } catch {
    return NextResponse.json(
      { error: "Не удалось обработать заявку. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}

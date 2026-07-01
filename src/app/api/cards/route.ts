import { db } from "@/db";
import { cards } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      creatorName,
      recipientName,
      message,
      slots,
      theme,
      emoji,
      notifyEmail,
    } = body;

    if (!creatorName || !recipientName || !slots || !Array.isArray(slots) || slots.length === 0) {
      return Response.json(
        { error: "Необходимо указать имена и хотя бы один вариант встречи" },
        { status: 400 }
      );
    }

    const id = nanoid(10);

    const [card] = await db
      .insert(cards)
      .values({
        id,
        creatorName,
        recipientName,
        message: message ?? "",
        slots,
        theme: theme ?? "sunset",
        emoji: emoji ?? "🌟",
        notifyEmail: notifyEmail ?? null,
      })
      .returning();

    return Response.json({ card }, { status: 201 });
  } catch (err) {
    console.error("POST /api/cards error:", err);
    return Response.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

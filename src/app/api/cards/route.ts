import { NextResponse } from "next/server";
import { createCard } from "@/lib/card-storage";
import type { MeetingCard } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const card = body.card as MeetingCard;

    if (!card?.id || !card?.title || !Array.isArray(card.dates)) {
      return NextResponse.json(
        { error: "Некорректные данные открытки" },
        { status: 400 },
      );
    }

    const session = await createCard(card);
    return NextResponse.json(session);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ошибка сервера";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createCard } from "@/lib/card-storage";
import { PostBodySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = PostBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные открытки", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const session = await createCard(parsed.data.card);
    return NextResponse.json(session);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ошибка сервера";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

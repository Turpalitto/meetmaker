import { NextResponse } from "next/server";
import { z } from "zod";
import { getCard, updateCard } from "@/lib/card-storage";
import { PatchBodySchema, MeetingStatusSchema, RecipientChoiceSchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getCard(id);
    if (!session) {
      return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    }
    return NextResponse.json(session);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ошибка сервера";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = PatchBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const patch: {
      status?: z.infer<typeof MeetingStatusSchema>;
      recipient_choice?: z.infer<typeof RecipientChoiceSchema>;
    } = {};

    if (parsed.data.status) patch.status = parsed.data.status;
    if (parsed.data.recipientChoice) {
      patch.status = "response_received";
      patch.recipient_choice = parsed.data.recipientChoice;
    }

    const session = await updateCard(id, patch);
    if (!session) {
      return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    }
    return NextResponse.json(session);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ошибка сервера";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

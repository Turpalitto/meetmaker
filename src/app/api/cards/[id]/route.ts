import { NextResponse } from "next/server";
import { getCard, updateCard } from "@/lib/card-storage";
import type { MeetingStatus, RecipientChoice } from "@/types";

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

    const patch: {
      status?: MeetingStatus;
      recipient_choice?: RecipientChoice;
    } = {};

    if (body.status) patch.status = body.status;
    if (body.recipientChoice) {
      patch.status = "confirmed";
      patch.recipient_choice = body.recipientChoice;
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

import { db } from "@/db";
import { cards } from "@/db/schema";
import type { Slot } from "@/db/schema";
import { sendChoiceNotification } from "@/lib/email";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [card] = await db.select().from(cards).where(eq(cards.id, id));

    if (!card) {
      return Response.json({ error: "Открытка не найдена" }, { status: 404 });
    }

    return Response.json({ card });
  } catch (err) {
    console.error("GET /api/cards/[id] error:", err);
    return Response.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { chosenSlotId, status } = body;

    const [existing] = await db.select().from(cards).where(eq(cards.id, id));
    if (!existing) {
      return Response.json({ error: "Открытка не найдена" }, { status: 404 });
    }

    if (existing.status !== "pending") {
      return Response.json({ error: "Уже выбран вариант" }, { status: 409 });
    }

    const updateData: Partial<typeof existing> = {
      updatedAt: new Date(),
    };

    if (chosenSlotId !== undefined) updateData.chosenSlotId = chosenSlotId;
    if (status !== undefined) updateData.status = status;

    const [updated] = await db
      .update(cards)
      .set(updateData)
      .where(eq(cards.id, id))
      .returning();

    if (
      updated.status === "accepted" &&
      updated.notifyEmail &&
      updated.chosenSlotId
    ) {
      const slots = updated.slots as Slot[];
      const slot = slots.find((s) => s.id === updated.chosenSlotId);
      if (slot) {
        const base =
          process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
          "https://meetmaker.vercel.app";
        void sendChoiceNotification({
          to: updated.notifyEmail,
          creatorName: updated.creatorName,
          recipientName: updated.recipientName,
          slot,
          cardUrl: `${base}/status/${updated.id}`,
        });
      }
    }

    return Response.json({ card: updated });
  } catch (err) {
    console.error("PATCH /api/cards/[id] error:", err);
    return Response.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

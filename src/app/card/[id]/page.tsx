import type { Metadata } from "next";
import { db } from "@/db";
import { cards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import CardView from "./CardView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [card] = await db.select().from(cards).where(eq(cards.id, id));
  if (!card) return { title: "Открытка не найдена — MeetMaker" };
  return {
    title: `Приглашение от ${card.creatorName} — MeetMaker`,
    description: `${card.recipientName}, тебя приглашают на встречу!`,
  };
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [card] = await db.select().from(cards).where(eq(cards.id, id));

  if (!card) notFound();

  return <CardView card={card} />;
}

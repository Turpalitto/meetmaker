import type { Metadata } from "next";
import { db } from "@/db";
import { cards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import StatusView from "./StatusView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [card] = await db.select().from(cards).where(eq(cards.id, id));
  if (!card) return { title: "Не найдено — MeetMaker" };
  return {
    title: `Статус открытки для ${card.recipientName} — MeetMaker`,
  };
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [card] = await db.select().from(cards).where(eq(cards.id, id));

  if (!card) notFound();

  return <StatusView card={card} />;
}

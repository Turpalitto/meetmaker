import { db } from "@/db";
import { cards } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    let hasCards = false;
    try {
      await db.select({ id: cards.id }).from(cards).limit(1);
      hasCards = true;
    } catch {
      hasCards = false;
    }
    return Response.json({
      ok: true,
      storage: "postgresql",
      cardsTable: hasCards,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "database_error";
    return Response.json(
      { ok: false, storage: "postgresql", error: message },
      { status: 500 },
    );
  }
}

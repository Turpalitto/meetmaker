import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, storage: "postgresql" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "database_error";
    return Response.json({ ok: false, storage: "postgresql", error: message }, { status: 500 });
  }
}

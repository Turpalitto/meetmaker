import { isSupabaseConfigured } from "@/lib/card-storage";

export async function GET() {
  const storage = isSupabaseConfigured() ? "supabase" : "memory";

  return Response.json({
    ok: true,
    storage,
    persistent: storage === "supabase",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  });
}

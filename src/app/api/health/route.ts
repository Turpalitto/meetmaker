import { getStorageBackend } from "@/lib/card-storage";

export async function GET() {
  const storage = getStorageBackend();

  return Response.json({
    ok: true,
    storage,
    persistent: storage !== "memory",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    githubRepo: process.env.GITHUB_STORAGE_REPO ?? null,
  });
}

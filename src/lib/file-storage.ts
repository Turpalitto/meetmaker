import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { CardRow } from "@/lib/card-storage";

const DATA_DIR = path.join(process.cwd(), ".data", "cards");

function assertFileStorageAvailable(): void {
  if (process.env.VERCEL) {
    throw new Error(
      "File storage is not available on Vercel. Configure Supabase or GitHub storage.",
    );
  }
}

function safeId(id: string): string {
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safe) throw new Error("Некорректный id открытки");
  return safe;
}

function cardFilePath(id: string): string {
  return path.join(DATA_DIR, `${safeId(id)}.json`);
}

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function fileCreateCard(row: CardRow): Promise<void> {
  assertFileStorageAvailable();
  await ensureDataDir();
  await writeFile(cardFilePath(row.id), JSON.stringify(row, null, 2), "utf-8");
}

export async function fileGetCard(id: string): Promise<CardRow | null> {
  try {
    const content = await readFile(cardFilePath(id), "utf-8");
    return JSON.parse(content) as CardRow;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function fileUpdateCard(
  id: string,
  patch: Partial<Pick<CardRow, "status" | "recipient_choice">>,
): Promise<CardRow | null> {
  assertFileStorageAvailable();
  const row = await fileGetCard(id);
  if (!row) return null;
  const updated: CardRow = { ...row, ...patch };
  await writeFile(cardFilePath(id), JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

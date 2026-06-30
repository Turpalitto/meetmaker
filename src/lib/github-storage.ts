import type { CardRow } from "@/lib/card-storage";

const API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo =
    process.env.GITHUB_STORAGE_REPO ?? "Turpalitto/meetmaker-data";
  if (!token) return null;
  return { token, repo };
}

function cardPath(id: string): string {
  return `cards/${id}.json`;
}

async function ghFetch(
  path: string,
  init: RequestInit & { method: "GET" | "PUT" },
): Promise<Response> {
  const config = getConfig();
  if (!config) throw new Error("GitHub storage not configured");

  const [owner, repo] = config.repo.split("/");
  const url = `${API}/repos/${owner}/${repo}/contents/${path}`;

  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
  });
}

async function readCard(id: string): Promise<CardRow | null> {
  const res = await ghFetch(cardPath(id), { method: "GET" });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub read failed: ${res.status} ${body}`);
  }

  const payload = (await res.json()) as { content: string };
  const json = Buffer.from(payload.content, "base64").toString("utf8");
  return JSON.parse(json) as CardRow;
}

async function writeCard(row: CardRow, sha?: string): Promise<void> {
  const config = getConfig();
  if (!config) throw new Error("GitHub storage not configured");

  const [owner, repo] = config.repo.split("/");
  const path = cardPath(row.id);
  const content = Buffer.from(JSON.stringify(row, null, 2), "utf8").toString(
    "base64",
  );

  const res = await fetch(`${API}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `meetmaker: ${sha ? "update" : "create"} card ${row.id}`,
      content,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${body}`);
  }
}

async function readCardWithSha(
  id: string,
): Promise<{ row: CardRow; sha: string } | null> {
  const res = await ghFetch(cardPath(id), { method: "GET" });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub read failed: ${res.status} ${body}`);
  }

  const payload = (await res.json()) as { content: string; sha: string };
  const json = Buffer.from(payload.content, "base64").toString("utf8");
  return { row: JSON.parse(json) as CardRow, sha: payload.sha };
}

export function isGitHubConfigured(): boolean {
  return Boolean(getConfig());
}

export async function githubCreateCard(row: CardRow): Promise<void> {
  await writeCard(row);
}

export async function githubGetCard(id: string): Promise<CardRow | null> {
  return readCard(id);
}

export async function githubUpdateCard(
  id: string,
  patch: Partial<Pick<CardRow, "status" | "recipient_choice">>,
): Promise<CardRow | null> {
  const existing = await readCardWithSha(id);
  if (!existing) return null;

  const updated: CardRow = { ...existing.row, ...patch };
  await writeCard(updated, existing.sha);
  return updated;
}

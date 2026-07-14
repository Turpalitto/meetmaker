import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("getStorageBackend", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 'supabase' when Supabase env vars are set", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "fake-service-key";
    const { getStorageBackend } = await import("@/lib/card-storage");
    expect(getStorageBackend()).toBe("supabase");
  });

  it("returns 'github' when only GitHub token is set", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.GITHUB_TOKEN = "ghp_fake";
    const { getStorageBackend } = await import("@/lib/card-storage");
    expect(getStorageBackend()).toBe("github");
  });

  it("returns 'file' when no storage env vars are configured", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.GITHUB_TOKEN;
    const { getStorageBackend } = await import("@/lib/card-storage");
    expect(getStorageBackend()).toBe("file");
  });

  it("prefers supabase over github when both are configured", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "fake-service-key";
    process.env.GITHUB_TOKEN = "ghp_fake";
    const { getStorageBackend } = await import("@/lib/card-storage");
    expect(getStorageBackend()).toBe("supabase");
  });
});

describe("isSupabaseConfigured", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns true when both URL and service key are set", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "fake-service-key";
    const { isSupabaseConfigured } = await import("@/lib/card-storage");
    expect(isSupabaseConfigured()).toBe(true);
  });

  it("returns false when only URL is set", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    const { isSupabaseConfigured } = await import("@/lib/card-storage");
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("returns false when neither is set", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    const { isSupabaseConfigured } = await import("@/lib/card-storage");
    expect(isSupabaseConfigured()).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import {
  MeetingStatusSchema,
  PatchBodySchema,
  PostBodySchema,
  RecipientChoiceSchema,
} from "@/lib/validation";

describe("MeetingStatusSchema", () => {
  it("accepts all valid statuses", () => {
    const valid = ["created", "link_opened", "recipient_choosing", "response_received", "confirmed"];
    for (const s of valid) {
      expect(MeetingStatusSchema.safeParse(s).success).toBe(true);
    }
  });

  it("rejects invalid status", () => {
    expect(MeetingStatusSchema.safeParse("deleted").success).toBe(false);
    expect(MeetingStatusSchema.safeParse("").success).toBe(false);
    expect(MeetingStatusSchema.safeParse(123).success).toBe(false);
  });
});

describe("RecipientChoiceSchema", () => {
  it("accepts full choice with place", () => {
    const choice = {
      date: "2026-07-14",
      time: "15:00",
      place: { id: "p1", name: "Кафе" },
    };
    expect(RecipientChoiceSchema.safeParse(choice).success).toBe(true);
  });

  it("accepts choice with null place", () => {
    const choice = {
      date: "2026-07-14",
      time: "15:00",
      place: null,
    };
    expect(RecipientChoiceSchema.safeParse(choice).success).toBe(true);
  });

  it("rejects missing date", () => {
    const choice = {
      time: "15:00",
      place: null,
    };
    expect(RecipientChoiceSchema.safeParse(choice).success).toBe(false);
  });

  it("rejects missing time", () => {
    const choice = {
      date: "2026-07-14",
      place: null,
    };
    expect(RecipientChoiceSchema.safeParse(choice).success).toBe(false);
  });
});

describe("PatchBodySchema", () => {
  it("accepts status-only patch", () => {
    expect(PatchBodySchema.safeParse({ status: "confirmed" }).success).toBe(true);
  });

  it("accepts recipientChoice-only patch", () => {
    expect(
      PatchBodySchema.safeParse({
        recipientChoice: {
          date: "2026-07-14",
          time: "15:00",
          place: null,
        },
      }).success,
    ).toBe(true);
  });

  it("accepts empty object (no-op)", () => {
    expect(PatchBodySchema.safeParse({}).success).toBe(true);
  });

  it("rejects invalid status", () => {
    expect(PatchBodySchema.safeParse({ status: "invalid" }).success).toBe(false);
  });
});

describe("PostBodySchema", () => {
  const validCard = {
    id: "abc-123",
    title: "Кофе",
    dates: [{ date: "2026-07-14", times: ["10:00", "14:00"] }],
    places: [{ id: "p1", name: "Кафе" }],
    theme: "coffee",
    createdAt: "2026-07-14T10:00:00Z",
  };

  it("accepts valid card", () => {
    expect(PostBodySchema.safeParse({ card: validCard }).success).toBe(true);
  });

  it("accepts card with optional fields", () => {
    expect(
      PostBodySchema.safeParse({
        card: { ...validCard, recipientName: "Катя", personalNote: "Привет", appearance: "dark" },
      }).success,
    ).toBe(true);
  });

  it("rejects empty title", () => {
    expect(
      PostBodySchema.safeParse({ card: { ...validCard, title: "" } }).success,
    ).toBe(false);
  });

  it("rejects invalid theme", () => {
    expect(
      PostBodySchema.safeParse({ card: { ...validCard, theme: "luxury" } }).success,
    ).toBe(false);
  });

  it("rejects missing id", () => {
    const noId = { ...validCard } as Partial<typeof validCard>;
    delete noId.id;
    expect(PostBodySchema.safeParse({ card: noId }).success).toBe(false);
  });

  it("rejects missing dates array", () => {
    const noDates = { ...validCard } as Partial<typeof validCard>;
    delete noDates.dates;
    expect(PostBodySchema.safeParse({ card: noDates }).success).toBe(false);
  });
});

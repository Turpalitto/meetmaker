import { describe, it, expect } from "vitest";
import {
  pluralRu,
  formatDate,
  formatDateShort,
  toLocalDateStr,
  choiceToLabel,
} from "@/lib/utils";

describe("pluralRu", () => {
  it("returns 'one' form for 1, 21, 31, 101", () => {
    expect(pluralRu(1, "вариант", "варианта", "вариантов")).toBe("вариант");
    expect(pluralRu(21, "вариант", "варианта", "вариантов")).toBe("вариант");
    expect(pluralRu(31, "вариант", "варианта", "вариантов")).toBe("вариант");
    expect(pluralRu(101, "вариант", "варианта", "вариантов")).toBe("вариант");
  });

  it("returns 'few' form for 2-4, 22-24, 33-34", () => {
    expect(pluralRu(2, "вариант", "варианта", "вариантов")).toBe("варианта");
    expect(pluralRu(3, "вариант", "варианта", "вариантов")).toBe("варианта");
    expect(pluralRu(4, "вариант", "варианта", "вариантов")).toBe("варианта");
    expect(pluralRu(22, "вариант", "варианта", "вариантов")).toBe("варианта");
    expect(pluralRu(33, "вариант", "варианта", "вариантов")).toBe("варианта");
  });

  it("returns 'many' form for 0, 5-20, 25-30", () => {
    expect(pluralRu(0, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(5, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(11, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(12, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(20, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(25, "вариант", "варианта", "вариантов")).toBe("вариантов");
  });

  it("handles 11-14 as 'many' (special case)", () => {
    expect(pluralRu(11, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(12, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(13, "вариант", "варианта", "вариантов")).toBe("вариантов");
    expect(pluralRu(14, "вариант", "варианта", "вариантов")).toBe("вариантов");
  });
});

describe("formatDate", () => {
  it("formats ISO date string in Russian", () => {
    const result = formatDate("2026-07-14");
    expect(result).toContain("14");
    expect(result.toLowerCase()).toContain("июл");
  });

  it("handles year boundary dates", () => {
    expect(() => formatDate("2026-01-01")).not.toThrow();
    expect(() => formatDate("2026-12-31")).not.toThrow();
  });
});

describe("formatDateShort", () => {
  it("formats date with short weekday and month", () => {
    const result = formatDateShort("2026-07-14");
    expect(result).toContain("14");
  });
});

describe("toLocalDateStr", () => {
  it("pads month and day with zeros", () => {
    const date = new Date(2026, 0, 5);
    expect(toLocalDateStr(date)).toBe("2026-01-05");
  });

  it("formats double-digit month and day without padding", () => {
    const date = new Date(2026, 10, 15);
    expect(toLocalDateStr(date)).toBe("2026-11-15");
  });
});

describe("choiceToLabel", () => {
  it("combines date, time and place", () => {
    const choice = {
      date: "2026-07-14",
      time: "15:00",
      place: { id: "p1", name: "Кафе" },
    };
    const label = choiceToLabel(choice);
    expect(label).toContain("15:00");
    expect(label).toContain("Кафе");
  });

  it("works without place", () => {
    const choice = {
      date: "2026-07-14",
      time: "15:00",
      place: null,
    };
    const label = choiceToLabel(choice);
    expect(label).toContain("15:00");
    expect(label).not.toContain("·");
  });
});

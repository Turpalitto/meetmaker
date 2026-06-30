import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Place, RecipientChoice } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatTime(timeStr: string): string {
  return timeStr;
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function getNextWeekDates(count: number = 7): string[] {
  const dates: string[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export function generateShareUrl(cardId: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/card/${cardId}`;
  }
  return `/card/${cardId}`;
}

export function downloadICS(
  choice: { date: string; time: string; place: Place | null },
  title: string,
) {
  const [year, month, day] = choice.date.split("-").map(Number);
  const [hour, minute] = choice.time.split(":").map(Number);

  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatICS = (d: Date): string =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const location = choice.place?.name || "";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MeetMaker//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@meetmaker`,
    `DTSTART:${formatICS(startDate)}`,
    `DTEND:${formatICS(endDate)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title.replace(/\s+/g, "_")}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function choiceToLabel(choice: RecipientChoice): string {
  const date = formatDateShort(choice.date);
  const place = choice.place?.name ? ` · ${choice.place.name}` : "";
  return `${date}, ${choice.time}${place}`;
}

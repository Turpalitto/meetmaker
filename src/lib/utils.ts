import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMMM yyyy", { locale: ru });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string, timeStr: string): string {
  try {
    const fullDate = format(parseISO(dateStr), "d MMMM, EEEE", { locale: ru });
    return `${fullDate} в ${timeStr}`;
  } catch {
    return `${dateStr} ${timeStr}`;
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadICS(
  slot: { date: string; time: string; place: string },
  title: string,
) {
  const [year, month, day] = slot.date.split("-").map(Number);
  const [hour, minute] = slot.time.split(":").map(Number);

  const startDate = new Date(year, month - 1, day, hour, minute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatICS = (d: Date): string =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MeetMaker//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@meetmaker`,
    `DTSTART:${formatICS(startDate)}`,
    `DTEND:${formatICS(endDate)}`,
    `SUMMARY:${title}`,
    `LOCATION:${slot.place}`,
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

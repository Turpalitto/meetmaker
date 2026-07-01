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

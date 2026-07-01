"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getTheme } from "@/lib/themes";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Card, Slot } from "@/db/schema";

export default function StatusView({ card: initialCard }: { card: Card }) {
  const [card, setCard] = useState<Card>(initialCard);
  const [copied, setCopied] = useState(false);
  const [polling, setPolling] = useState(false);

  const theme = getTheme(card.theme);
  const slots = card.slots as Slot[];
  const chosenSlot = slots.find((s) => s.id === card.chosenSlotId);

  const cardUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/card/${card.id}`
      : `/card/${card.id}`;

  const refreshCard = useCallback(async () => {
    try {
      const res = await fetch(`/api/cards/${card.id}`);
      if (res.ok) {
        const data = await res.json();
        setCard(data.card);
      }
    } catch {
      // ignore
    }
  }, [card.id]);

  useEffect(() => {
    if (card.status !== "pending") return;
    setPolling(true);
    const interval = setInterval(refreshCard, 5000);
    return () => {
      clearInterval(interval);
      setPolling(false);
    };
  }, [card.status, refreshCard]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  const statusInfo = {
    pending: {
      emoji: "⏳",
      label: "Ожидает ответа",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      desc: `${card.recipientName} ещё не выбрал(а) вариант`,
    },
    accepted: {
      emoji: "✅",
      label: "Встреча подтверждена!",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      desc: `${card.recipientName} подтвердил(а) встречу`,
    },
    declined: {
      emoji: "❌",
      label: "Приглашение отклонено",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      desc: `${card.recipientName} не смог(ла) принять приглашение`,
    },
  }[card.status];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="glass-white border-b border-white/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <span className="text-2xl">💌</span>
            <span>MeetMaker</span>
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-sm hover:scale-105 transition-transform"
          >
            + Новая открытка
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Твоя открытка</h1>
        <p className="text-slate-500 mb-8">Следи за статусом и делись ссылкой</p>

        <div className={cn("rounded-2xl border p-5 mb-6 flex items-start gap-4", statusInfo.bg, statusInfo.border)}>
          <span className="text-3xl">{statusInfo.emoji}</span>
          <div className="flex-1">
            <p className={cn("font-bold text-lg", statusInfo.color)}>{statusInfo.label}</p>
            <p className="text-slate-500 text-sm mt-0.5">{statusInfo.desc}</p>
            {card.status === "pending" && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-500 text-xs">{polling ? "Обновляется каждые 5 секунд..." : "Ожидание..."}</span>
              </div>
            )}
          </div>
          {card.status === "pending" && (
            <button
              onClick={refreshCard}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-white/60"
              title="Обновить"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {card.status === "accepted" && chosenSlot && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">Выбранное время встречи</p>
            <div className="flex items-start gap-4">
              <span className="text-4xl">🗓️</span>
              <div>
                <p className="font-bold text-slate-900 text-xl">{formatDateTime(chosenSlot.date, chosenSlot.time)}</p>
                <p className="text-slate-500 mt-1">📍 {chosenSlot.place}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">🔗 Ссылка для получателя</p>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-mono truncate">
              {cardUrl}
            </div>
            <button
              onClick={handleCopy}
              className={cn(
                "px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex-shrink-0",
                copied
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105"
              )}
            >
              {copied ? "✓ Скопировано!" : "Копировать"}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Отправь эту ссылку {card.recipientName} в любом мессенджере
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">📋 Варианты встречи</p>
          <div className="space-y-2">
            {slots.map((slot, i) => (
              <div
                key={slot.id}
                className={cn(
                  "p-4 rounded-xl border",
                  card.chosenSlotId === slot.id
                    ? cn(theme.selectedBg, theme.selectedBorder, "shadow-sm")
                    : "border-slate-100 bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", theme.tag)}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {formatDateTime(slot.date, slot.time)}
                    </p>
                    <p className="text-slate-500 text-xs">{slot.place}</p>
                  </div>
                  {card.chosenSlotId === slot.id && (
                    <span className="ml-auto text-emerald-500 font-bold text-sm">✓ Выбрано</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">ℹ️ Информация об открытке</p>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Тема</dt>
              <dd className="font-medium text-slate-900 flex items-center gap-1">
                <span className={cn("w-3 h-3 rounded-full bg-gradient-to-r inline-block", theme.gradient)} />
                {theme.label}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">От кого</dt>
              <dd className="font-medium text-slate-900">{card.creatorName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Кому</dt>
              <dd className="font-medium text-slate-900">{card.recipientName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Вариантов</dt>
              <dd className="font-medium text-slate-900">{slots.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Создана</dt>
              <dd className="font-medium text-slate-900">
                {new Date(card.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 text-center">
          <Link
            href={`/card/${card.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-pink-500 transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Посмотреть открытку как получатель
          </Link>
        </div>
      </div>
    </div>
  );
}

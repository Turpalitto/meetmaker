"use client";

import { useState } from "react";
import Link from "next/link";
import { getTheme } from "@/lib/themes";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Card, Slot } from "@/db/schema";

export default function CardView({ card }: { card: Card }) {
  const theme = getTheme(card.theme);
  const slots = card.slots as Slot[];
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const alreadyAnswered = card.status !== "pending";

  async function handleAccept() {
    if (!selected) {
      setError("Выбери один из вариантов");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cards/${card.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chosenSlotId: selected, status: "accepted" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      setConfirmed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  async function handleDecline() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cards/${card.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "declined" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      setDeclined(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    const chosenSlot = slots.find((s) => s.id === selected);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Отлично!</h1>
            <p className="text-slate-500 mb-6">
              Ты подтвердил(а) встречу с <strong>{card.creatorName}</strong>
            </p>
            {chosenSlot && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 text-left">
                <p className="font-bold text-emerald-800 text-lg mb-1">
                  📅 {formatDateTime(chosenSlot.date, chosenSlot.time)}
                </p>
                <p className="text-emerald-600">📍 {chosenSlot.place}</p>
              </div>
            )}
            <p className="text-slate-400 text-sm">
              {card.creatorName} получит уведомление о твоём выборе
            </p>
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Создать свою открытку →
          </Link>
        </div>
      </div>
    );
  }

  if (declined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-6">😔</div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Жаль...</h1>
            <p className="text-slate-500 mb-6">
              Ты отклонил(а) приглашение. <strong>{card.creatorName}</strong> получит уведомление.
            </p>
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Создать свою открытку →
          </Link>
        </div>
      </div>
    );
  }

  if (alreadyAnswered) {
    const isAccepted = card.status === "accepted";
    const chosenSlot = slots.find((s) => s.id === card.chosenSlotId);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-6">{isAccepted ? "✅" : "❌"}</div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              {isAccepted ? "Встреча подтверждена!" : "Приглашение отклонено"}
            </h1>
            {isAccepted && chosenSlot && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left mt-4">
                <p className="font-bold text-emerald-800">{formatDateTime(chosenSlot.date, chosenSlot.time)}</p>
                <p className="text-emerald-600">{chosenSlot.place}</p>
              </div>
            )}
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-slate-600">
            Создать свою открытку →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br", theme.cardGradient)}>
      <div className={cn("fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br pointer-events-none", theme.gradient)} />
      <div className={cn("fixed bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-tr pointer-events-none", theme.gradient)} />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg">
          <div className={cn("rounded-t-3xl p-8 text-white bg-gradient-to-br shadow-xl", theme.gradient)}>
            <div className="flex items-start justify-between mb-4">
              <span className="text-6xl">{card.emoji}</span>
              <span className={cn("px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm")}>
                💌 MeetMaker
              </span>
            </div>
            <p className="text-white/70 text-sm mb-1">Привет, {card.recipientName}! 👋</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              Тебя приглашают на встречу!
            </h1>
            <p className="text-white/80 text-sm">от {card.creatorName}</p>
            {card.message && (
              <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-white/90 text-sm italic leading-relaxed">
                  &ldquo;{card.message}&rdquo;
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-b-3xl shadow-xl p-6 border border-white/80">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Выбери удобное время:
            </p>

            <div className="space-y-3 mb-6">
              {slots.map((slot, i) => (
                <button
                  key={slot.id}
                  onClick={() => setSelected(slot.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 group",
                    selected === slot.id
                      ? cn("border-2 shadow-md scale-[1.01]", theme.selectedBorder, theme.selectedBg)
                      : cn("border-slate-100 bg-slate-50", theme.hoverBg, "hover:border-slate-200 hover:shadow-sm")
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn("font-bold text-base", theme.text)}>
                        📅 {formatDateTime(slot.date, slot.time)}
                      </p>
                      <p className="text-slate-500 text-sm mt-0.5">
                        📍 {slot.place}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all",
                        selected === slot.id
                          ? cn("border-current bg-current", theme.accent)
                          : "border-slate-200"
                      )}
                    >
                      {selected === slot.id && (
                        <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className={cn("mt-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity", theme.accent)}>
                    Вариант {i + 1} из {slots.length}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                disabled={loading || !selected}
                className={cn(
                  "flex-1 py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all duration-200",
                  "hover:shadow-xl hover:scale-[1.02] active:scale-100",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
                  theme.buttonBg
                )}
              >
                {loading ? "⏳ Сохраняем..." : "✅ Подтвердить"}
              </button>
              <button
                onClick={handleDecline}
                disabled={loading}
                className="px-4 py-3.5 rounded-2xl font-semibold text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-slate-600 transition-all duration-200 disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            <p className="text-center text-xs text-slate-300 mt-4">
              Создано с помощью{" "}
              <Link href="/" className="text-slate-400 hover:text-slate-600">
                MeetMaker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

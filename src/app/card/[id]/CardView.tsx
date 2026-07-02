"use client";

import { useState } from "react";
import Link from "next/link";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { PostcardDecorations } from "@/components/PostcardDecorations";
import { getTheme, greetingForRecipient } from "@/lib/themes";
import { formatDateTime, downloadICS, cn } from "@/lib/utils";
import type { Card, Slot } from "@/db/schema";

type Phase = "intro" | "choose";

export default function CardView({ card }: { card: Card }) {
  const theme = getTheme(card.theme);
  const slots = card.slots as Slot[];
  const [phase, setPhase] = useState<Phase>("intro");
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const alreadyAnswered = card.status !== "pending";
  const greeting = greetingForRecipient(card.recipientName);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 relative overflow-hidden">
        <ConfettiBurst />
        <div className="max-w-md w-full text-center relative z-10">
          <div className="text-7xl mb-6">🎉</div>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
            <h1 className="font-postcard text-3xl font-bold text-slate-900 mb-3">
              Всё согласовано!
            </h1>
            <p className="text-slate-500 mb-6">
              {card.creatorName} получит твой выбор
            </p>
            {chosenSlot && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 text-left">
                <p className="font-bold text-emerald-800 text-lg mb-1">
                  📅 {formatDateTime(chosenSlot.date, chosenSlot.time)}
                </p>
                <p className="text-emerald-600">📍 {chosenSlot.place}</p>
              </div>
            )}
            {chosenSlot && (
              <button
                type="button"
                onClick={() =>
                  downloadICS(chosenSlot, `Встреча с ${card.creatorName}`)
                }
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors mb-3"
              >
                📅 Добавить в календарь
              </button>
            )}
          </div>
          <Link
            href="/"
            className="mt-6 inline-block text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
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
            <h1 className="font-postcard text-2xl font-bold text-slate-900 mb-3">
              Жаль...
            </h1>
            <p className="text-slate-500 mb-6">
              {card.creatorName} узнает, что сейчас не получится
            </p>
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-slate-600">
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
            <h1 className="font-postcard text-2xl font-bold text-slate-900 mb-3">
              {isAccepted ? "Встреча уже согласована" : "Приглашение отклонено"}
            </h1>
            {isAccepted && chosenSlot && (
              <>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left mt-4 mb-4">
                  <p className="font-bold text-emerald-800">
                    {formatDateTime(chosenSlot.date, chosenSlot.time)}
                  </p>
                  <p className="text-emerald-600">{chosenSlot.place}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    downloadICS(chosenSlot, `Встреча с ${card.creatorName}`)
                  }
                  className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-semibold"
                >
                  📅 Добавить в календарь
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className={cn("min-h-screen bg-gradient-to-br relative overflow-hidden", theme.cardGradient)}>
        <PostcardDecorations themeId={card.theme} />
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-lg">
            <div className={cn("rounded-3xl overflow-hidden shadow-2xl border border-white/60")}>
              <div className={cn("p-8 sm:p-10 text-white bg-gradient-to-br relative", theme.gradient)}>
                <span className="text-6xl mb-4 block animate-float">{card.emoji}</span>
                <p className="text-white/80 text-base mb-1 font-medium">{greeting}</p>
                <h1 className="font-postcard text-3xl sm:text-4xl font-bold mb-2 leading-tight">
                  {card.creatorName} приглашает тебя
                </h1>
                <p className="text-white/70 text-sm">{theme.tagline}</p>
                {card.message ? (
                  <blockquote className="postcard-note mt-5 text-white/95 text-sm text-left">
                    {card.message}
                  </blockquote>
                ) : null}
              </div>

              <div className="bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Варианты встречи
                </p>
                <div className="space-y-2 mb-6">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                    >
                      <p className="font-semibold text-slate-800">
                        📅 {formatDateTime(slot.date, slot.time)}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">📍 {slot.place}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-400 mb-4">
                  Ответь, когда будет удобно — без спешки
                </p>
                <button
                  type="button"
                  onClick={() => setPhase("choose")}
                  className={cn(
                    "w-full py-3.5 rounded-2xl font-bold text-white shadow-lg hover:scale-[1.02] transition-transform",
                    theme.buttonBg,
                  )}
                >
                  Выбрать вариант →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br", theme.cardGradient)}>
      <div className={cn("fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br pointer-events-none", theme.gradient)} />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg">
          <button
            type="button"
            onClick={() => setPhase("intro")}
            className="mb-4 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← К открытке
          </button>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-white/80">
            <div className={cn("p-6 text-white bg-gradient-to-br", theme.gradient)}>
              <p className="text-white/70 text-sm">{greeting}</p>
              <h1 className="font-postcard text-2xl font-bold">Когда удобно?</h1>
            </div>

            <div className="bg-white p-6">
              <div className="space-y-3 mb-6">
                {slots.map((slot, i) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelected(slot.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                      selected === slot.id
                        ? cn("shadow-md scale-[1.01]", theme.selectedBorder, theme.selectedBg)
                        : cn("border-slate-100 bg-slate-50", theme.hoverBg),
                    )}
                  >
                    <p className={cn("font-bold text-base", theme.text)}>
                      📅 {formatDateTime(slot.date, slot.time)}
                    </p>
                    <p className="text-slate-500 text-sm mt-0.5">📍 {slot.place}</p>
                    <p className={cn("text-xs mt-1 opacity-70", theme.accent)}>
                      Вариант {i + 1} из {slots.length}
                    </p>
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
                  type="button"
                  onClick={handleAccept}
                  disabled={loading || !selected}
                  className={cn(
                    "flex-1 py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    theme.buttonBg,
                  )}
                >
                  {loading ? "⏳ Сохраняем..." : "✅ Подтвердить"}
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  disabled={loading}
                  className="px-4 py-3.5 rounded-2xl font-semibold text-slate-400 border border-slate-200 hover:bg-slate-50"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { THEMES, EMOJIS, getTheme } from "@/lib/themes";
import type { Slot } from "@/db/schema";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

type Step = "info" | "slots" | "style" | "preview";

const STEPS: { id: Step; label: string; emoji: string }[] = [
  { id: "info", label: "Имена", emoji: "👤" },
  { id: "slots", label: "Варианты", emoji: "📅" },
  { id: "style", label: "Стиль", emoji: "🎨" },
  { id: "preview", label: "Превью", emoji: "👁️" },
];

const DEFAULT_SLOT = (): Slot => ({
  id: nanoid(6),
  date: "",
  time: "19:00",
  place: "",
});

export default function CreateWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [creatorName, setCreatorName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [slots, setSlots] = useState<Slot[]>([DEFAULT_SLOT()]);
  const [theme, setTheme] = useState("sunset");
  const [emoji, setEmoji] = useState("🌟");
  const [notifyEmail, setNotifyEmail] = useState("");

  const currentTheme = getTheme(theme);
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  function addSlot() {
    if (slots.length >= 5) return;
    setSlots([...slots, DEFAULT_SLOT()]);
  }

  function removeSlot(id: string) {
    if (slots.length <= 1) return;
    setSlots(slots.filter((s) => s.id !== id));
  }

  function updateSlot(id: string, field: keyof Slot, value: string) {
    setSlots(slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }

  function nextStep() {
    setError("");
    if (step === "info") {
      if (!creatorName.trim() || !recipientName.trim()) {
        setError("Введите имя создателя и получателя");
        return;
      }
      setStep("slots");
    } else if (step === "slots") {
      const valid = slots.every((s) => s.date && s.time && s.place.trim());
      if (!valid) {
        setError("Заполните дату, время и место для всех вариантов");
        return;
      }
      setStep("style");
    } else if (step === "style") {
      setStep("preview");
    }
  }

  function prevStep() {
    setError("");
    if (step === "slots") setStep("info");
    else if (step === "style") setStep("slots");
    else if (step === "preview") setStep("style");
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName: creatorName.trim(),
          recipientName: recipientName.trim(),
          message: message.trim(),
          slots,
          theme,
          emoji,
          notifyEmail: notifyEmail.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ошибка");
      router.push(`/status/${data.card.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка создания");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <nav className="glass-white border-b border-white/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <span className="text-2xl">💌</span>
            <span>MeetMaker</span>
          </Link>
          <span className="text-sm text-slate-500">Создание открытки</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  i <= stepIndex ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 shadow-sm",
                    i < stepIndex
                      ? "bg-gradient-to-br from-orange-400 to-pink-500 text-white scale-100"
                      : i === stepIndex
                      ? "bg-gradient-to-br from-orange-400 to-pink-500 text-white scale-110 shadow-md shadow-pink-300"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  )}
                >
                  {i < stepIndex ? "✓" : s.emoji}
                </div>
                <span className={cn("text-xs font-medium hidden sm:block", i === stepIndex ? "text-pink-600" : "text-slate-400")}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("h-0.5 w-12 sm:w-20 mx-2 rounded transition-all duration-500", i < stepIndex ? "bg-gradient-to-r from-orange-400 to-pink-500" : "bg-slate-200")} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-white/80">
          {step === "info" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">👤 Кто и кому?</h2>
              <p className="text-slate-500 mb-8">Укажи имена — они появятся на открытке</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Твоё имя *</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Например: Максим"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 placeholder:text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Имя получателя *</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Например: Аня"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 placeholder:text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Сообщение <span className="text-slate-400 font-normal">(необязательно)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Привет! Хочу пригласить тебя на встречу..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 placeholder:text-slate-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email для уведомления <span className="text-slate-400 font-normal">(необязательно)</span>
                  </label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>
          )}

          {step === "slots" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">📅 Варианты встречи</h2>
              <p className="text-slate-500 mb-8">Добавь от 1 до 5 вариантов — получатель выберет удобный</p>

              <div className="space-y-4">
                {slots.map((slot, i) => (
                  <div key={slot.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-700 text-sm">Вариант {i + 1}</span>
                      {slots.length > 1 && (
                        <button
                          onClick={() => removeSlot(slot.id)}
                          className="text-red-400 hover:text-red-600 transition-colors text-sm"
                        >
                          ✕ Удалить
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Дата *</label>
                        <input
                          type="date"
                          value={slot.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => updateSlot(slot.id, "date", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Время *</label>
                        <input
                          type="time"
                          value={slot.time}
                          onChange={(e) => updateSlot(slot.id, "time", e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Место *</label>
                      <input
                        type="text"
                        value={slot.place}
                        onChange={(e) => updateSlot(slot.id, "place", e.target.value)}
                        placeholder="Кафе, парк, кинотеатр..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition text-slate-900 text-sm placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                ))}

                {slots.length < 5 && (
                  <button
                    onClick={addSlot}
                    className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-pink-300 hover:text-pink-500 transition-all duration-200 font-medium text-sm"
                  >
                    + Добавить вариант ({slots.length}/5)
                  </button>
                )}
              </div>
            </div>
          )}

          {step === "style" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">🎨 Стиль открытки</h2>
              <p className="text-slate-500 mb-8">Выбери цветовую тему и эмодзи</p>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Цветовая тема</label>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        "relative p-4 rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                        theme === t.id ? "border-slate-900 scale-105 shadow-md" : "border-transparent hover:border-slate-200"
                      )}
                    >
                      <div className={cn("h-10 rounded-xl bg-gradient-to-r mb-2", t.gradient)} />
                      <span className="text-sm font-medium text-slate-700">{t.label}</span>
                      {theme === t.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Эмодзи открытки</label>
                <div className="grid grid-cols-8 gap-2">
                  {EMOJIS.map((em) => (
                    <button
                      key={em}
                      onClick={() => setEmoji(em)}
                      className={cn(
                        "w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all duration-150",
                        emoji === em
                          ? "bg-pink-100 border-2 border-pink-400 scale-110 shadow-sm"
                          : "hover:bg-slate-100 border-2 border-transparent"
                      )}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "preview" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">👁️ Предпросмотр</h2>
              <p className="text-slate-500 mb-6">Вот как будет выглядеть твоя открытка</p>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-6">
                <div className={cn("bg-gradient-to-br p-6 text-white", currentTheme.gradient)}>
                  <div className="text-4xl mb-3">{emoji}</div>
                  <p className="text-white/70 text-sm mb-1">Привет, {recipientName}! 👋</p>
                  <h3 className="text-xl font-bold mb-1">Приглашение на встречу</h3>
                  <p className="text-white/70 text-sm">от {creatorName}</p>
                  {message && <p className="mt-3 text-white/90 text-sm italic">&ldquo;{message}&rdquo;</p>}
                </div>
                <div className="bg-white p-5">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Выбери удобное время:</p>
                  {slots.map((slot) => (
                    <div key={slot.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 mb-2">
                      <p className="font-semibold text-slate-900 text-sm">
                        {slot.date ? new Date(slot.date + "T12:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "short" }) : "Дата не выбрана"} в {slot.time}
                      </p>
                      <p className="text-slate-500 text-xs">{slot.place || "Место не указано"}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">От:</span>
                  <span className="font-medium text-slate-900">{creatorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Кому:</span>
                  <span className="font-medium text-slate-900">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Вариантов:</span>
                  <span className="font-medium text-slate-900">{slots.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Тема:</span>
                  <span className="font-medium text-slate-900">{currentTheme.label}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {stepIndex > 0 && (
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                ← Назад
              </button>
            )}
            {step !== "preview" ? (
              <button
                onClick={nextStep}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Создаём..." : "🎉 Создать открытку"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

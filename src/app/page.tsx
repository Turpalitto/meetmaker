import Link from "next/link";
import { db } from "@/db";
import { cards } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let totalCards = 0;
  try {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(cards);
    totalCards = result[0]?.count ?? 0;
  } catch {
    // ignore
  }

  const features = [
    {
      emoji: "🎨",
      title: "Красивые темы",
      desc: "6 цветовых тем и 24 эмодзи — создай открытку в своём стиле",
    },
    {
      emoji: "📅",
      title: "Несколько вариантов",
      desc: "Предложи до 5 вариантов даты и места — получатель выбирает удобный",
    },
    {
      emoji: "🔗",
      title: "Поделись ссылкой",
      desc: "Просто отправь ссылку другу — никакой регистрации не нужно",
    },
    {
      emoji: "✅",
      title: "Следи за статусом",
      desc: "Узнай сразу, как только друг выберет вариант встречи",
    },
  ];

  const howItWorks = [
    { step: "1", title: "Создай открытку", desc: "Выбери тему, добавь варианты времени и мест" },
    { step: "2", title: "Отправь другу", desc: "Поделись уникальной ссылкой в любом мессенджере" },
    { step: "3", title: "Друг выбирает", desc: "Получатель выбирает удобный вариант одним нажатием" },
    { step: "4", title: "Встреча назначена!", desc: "Ты получаешь уведомление и видишь результат" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <span className="text-2xl">💌</span>
            <span>MeetMaker</span>
          </Link>
          <Link
            href="/create"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Создать открытку
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />

        {/* floating blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-400/25 rounded-full blur-3xl animate-float-delay-2" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8">
            <span>✨</span>
            <span>Уже создано {totalCards} открыток</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-xl">
            Приглашай на встречи
            <br />
            <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              красиво и просто
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Создай красивую интерактивную открытку, предложи варианты времени и мест —
            друг выберет удобный одним нажатием
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-200"
            >
              🎉 Создать открытку
            </Link>
            <a
              href="#how"
              className="px-8 py-4 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/20 transition-all duration-200"
            >
              Как это работает →
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs">прокрути вниз</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Почему MeetMaker?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Больше никаких скучных &ldquo;когда ты свободен?&rdquo; в переписке
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Как это работает</h2>
            <p className="text-slate-500 text-lg">Четыре простых шага до встречи</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xl flex items-center justify-center shadow-md">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-200"
            >
              💌 Создать первую открытку
            </Link>
          </div>
        </div>
      </section>

      {/* EXAMPLE CARD PREVIEW */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Выглядит вот так</h2>
          <p className="text-slate-500 text-lg mb-12">Открытки красивые на любом устройстве</p>

          <div className="relative mx-auto max-w-sm">
            {/* Card mockup */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/50">
              <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-8 text-white text-left">
                <div className="text-5xl mb-4">🌟</div>
                <p className="text-white/70 text-sm mb-1">Привет, Аня!</p>
                <h3 className="text-2xl font-bold mb-2">Приглашение на встречу</h3>
                <p className="text-white/80 text-sm">от Максима</p>
              </div>
              <div className="bg-white p-6 text-left">
                <p className="text-slate-500 text-sm mb-4">Выбери удобное время:</p>
                {[
                  { date: "15 января, пятница", time: "19:00", place: "Кофе Хауз на Арбате" },
                  { date: "16 января, суббота", time: "14:00", place: "Парк Горького" },
                  { date: "18 января, понедельник", time: "20:00", place: "Ресторан Буфет" },
                ].map((slot, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl mb-2 border ${i === 1 ? "border-pink-400 bg-pink-50" : "border-slate-100 bg-slate-50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{slot.date} в {slot.time}</p>
                        <p className="text-slate-500 text-xs">{slot.place}</p>
                      </div>
                      {i === 1 && <span className="text-pink-500 text-lg">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 glass-white px-3 py-1 rounded-full text-sm font-semibold text-pink-600 shadow-lg">
              💌 Новое!
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Готов назначить встречу?</h2>
          <p className="text-white/80 text-lg mb-8">
            Создай свою первую открытку прямо сейчас — это займёт меньше минуты
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-pink-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            🚀 Начать бесплатно
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 bg-slate-900 text-center text-slate-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">💌</span>
          <span className="font-semibold text-white">MeetMaker</span>
        </div>
        <p>Красивые приглашения на встречу</p>
      </footer>
    </div>
  );
}

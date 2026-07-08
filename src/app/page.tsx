import Link from "next/link";
import { MOOD_LIST } from "@/lib/themes";
import Reveal from "@/components/Reveal";
import { IconClock, IconPin, IconSparkle } from "@/components/Icons";

export default function HomePage() {
  return (
    <main className="mm-page">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <span className="mm-display text-xl" style={{ color: "var(--mm-ink)" }}>
          Meet<span style={{ color: "var(--mm-accent)" }}>Maker</span>
        </span>
        <Link href="/create" className="mm-text-button text-sm" style={{ color: "var(--mm-accent-strong)" }}>
          Создать открытку →
        </Link>
      </header>

      <section className="mx-auto max-w-3xl px-5 pt-10 pb-16 text-center sm:pt-16">
        <p className="mm-eyebrow mm-fade">Приглашение с душой</p>
        <h1 className="mm-display mm-rise mm-delay-1 mt-5 text-[clamp(2.6rem,10vw,5rem)]">
          Тёплое приглашение
          <br />
          <span style={{ color: "var(--mm-accent)" }}>вместо сухого сообщения</span>
        </h1>
        <p
          className="mm-rise mm-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--mm-ink-soft)" }}
        >
          Соберите красивую открытку-приглашение на свидание, кофе или прогулку.
          Отправьте ссылку — а близкий человек выберет удобное время в пару касаний.
        </p>
        <div className="mm-rise mm-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/create" className="mm-filled-button w-full sm:w-auto">
            Создать открытку <span className="mm-btn-arrow">→</span>
          </Link>
          <span className="text-sm" style={{ color: "var(--mm-ink-faint)" }}>
            Бесплатно · без регистрации
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-md px-5">
        <div className="mm-postcard mm-rise mm-delay-4" data-theme="coffee">
          <div className="mm-accent-bar" />
          <span className="mm-stamp" aria-hidden>
            ☕
          </span>
          <div className="p-8 pr-24">
            <p className="mm-eyebrow">Для тебя, Аня</p>
            <p className="mm-postcard-title mt-3">Выпьем кофе?</p>
            <p className="mm-serif-quote mt-4 text-lg" style={{ color: "var(--mm-ink-soft)" }}>
              «Давно не виделись. Нашёл уютное место с идеальным флэт-уайт —
              выбери, когда тебе удобно.»
            </p>
            <div className="mm-flourish my-5">
              <span className="mm-flourish-mark" aria-hidden>
                ◆
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="mm-chip">
                <IconClock className="h-3.5 w-3.5" /> Сб · 11:00
              </span>
              <span className="mm-chip">
                <IconClock className="h-3.5 w-3.5" /> Вс · 16:30
              </span>
              <span className="mm-chip">
                <IconPin className="h-3.5 w-3.5" /> Кофейня
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              t: "Личное, а не шаблон",
              d: "Записка от руки, имя получателя и настроение встречи — открытка ощущается как подарок.",
            },
            {
              t: "Выбор в пару касаний",
              d: "Предложите несколько слотов — получатель выберет удобный, без переписки и уточнений.",
            },
            {
              t: "Спокойный статус",
              d: "Следите за ответом на отдельной странице и добавляйте встречу в календарь одним нажатием.",
            },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 90}>
              <div className="mb-4 h-px w-10" style={{ background: "var(--mm-accent)" }} />
              <h3 className="mm-display text-xl">{b.t}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed" style={{ color: "var(--mm-ink-soft)" }}>
                {b.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <Reveal>
          <p className="mm-eyebrow text-center">Как это устроено</p>
          <h2 className="mm-display mt-3 text-center text-3xl">Три шага до встречи</h2>
        </Reveal>
        <div className="relative mt-12 grid gap-10 sm:grid-cols-3">
          <span
            className="absolute left-0 right-0 top-6 hidden h-px sm:block"
            style={{ background: "var(--mm-line-strong)" }}
            aria-hidden
          />
          {[
            { n: "01", t: "Соберите открытку", d: "Имена, тёплая записка и пара удобных вариантов времени." },
            { n: "02", t: "Отправьте ссылку", d: "В Telegram, WhatsApp или куда угодно — открытие займёт секунду." },
            { n: "03", t: "Получите ответ", d: "Статус обновится, а слот можно сразу добавить в календарь." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                <span
                  className="relative z-10 mb-4 grid h-12 w-12 place-items-center rounded-full text-sm font-semibold"
                  style={{
                    background: "var(--mm-surface)",
                    border: "1.5px solid var(--mm-accent)",
                    color: "var(--mm-accent-strong)",
                  }}
                >
                  {s.n}
                </span>
                <h3 className="mm-display text-lg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--mm-ink-soft)" }}>
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24">
        <Reveal>
          <p className="mm-eyebrow text-center">Три настроения</p>
          <h2 className="mm-display mt-3 text-center text-3xl">Под любой повод встретиться</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {MOOD_LIST.map((m, i) => (
            <Reveal key={m.key} delay={i * 80}>
              <div
                data-theme={m.key}
                className="mm-card flex h-full flex-col items-center gap-2 p-6 text-center transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "var(--mm-card-wash)" }}
              >
                <span className="text-3xl" aria-hidden>
                  {m.emoji}
                </span>
                <span className="mm-display text-lg">{m.label}</span>
                <span className="text-xs" style={{ color: "var(--mm-ink-soft)" }}>
                  {m.tagline}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <Reveal>
          <span className="mx-auto mb-4 flex justify-center" style={{ color: "var(--mm-accent)" }}>
            <IconSparkle className="h-5 w-5" />
          </span>
          <h2 className="mm-display text-[clamp(2rem,7vw,3rem)]">Пригласите красиво</h2>
          <div className="mt-8">
            <Link href="/create" className="mm-filled-button">
              Создать открытку <span className="mm-btn-arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="border-t py-8 text-center text-sm" style={{ color: "var(--mm-ink-faint)", borderColor: "var(--mm-line)" }}>
        MeetMaker · приглашение с душой
      </footer>
    </main>
  );
}

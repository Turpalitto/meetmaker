'use client';

import Link from 'next/link';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ThemeDecorations } from '@/components/ThemeDecorations';
import { THEME_CONFIG, THEME_ORDER } from '@/lib/themes';
import { Heart, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="scene-page scene-vignette relative min-h-screen w-full overflow-hidden" data-theme="romantic">
      <AuroraBackground theme="romantic" />
      <ThemeDecorations theme="romantic" intensity="bold" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ background: 'linear-gradient(135deg, var(--mm-gradient-from), var(--mm-gradient-to))' }}
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl">
              <Heart className="h-10 w-10 text-pink-300" strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
            </div>
          </div>
        </div>

        <p className="text-pink-200/60 text-sm tracking-[0.3em] uppercase mb-4 animate-in fade-in duration-700 delay-100 fill-mode-both">
          открытка-приглашение
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white text-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          MeetMaker
        </h1>

        <p className="text-lg sm:text-xl text-white/55 text-center max-w-sm mb-3 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250 fill-mode-both">
          Красиво пригласить на встречу —
          <br />
          <span className="text-pink-200/80">без неловких переписок</span>
        </p>

        <p className="text-white/35 text-sm text-center max-w-xs mb-10 animate-in fade-in duration-700 delay-350 fill-mode-both">
          Создай открытку за минуту. Он выберет дату, время и место сам 💕
        </p>

        <div className="flex gap-3 mb-10 animate-in fade-in duration-700 delay-400 fill-mode-both">
          {THEME_ORDER.map((id) => {
            const t = THEME_CONFIG[id];
            return (
              <div
                key={id}
                className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm min-w-[5.5rem]"
              >
                <span className="text-2xl">{t.emoji}</span>
                <span className="text-[11px] text-white/50">{t.labelRu}</span>
              </div>
            );
          })}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both w-full max-w-xs">
          <Link
            href="/create"
            className="pill-button pill-button-primary w-full flex items-center justify-center gap-2 text-base py-4"
          >
            <Sparkles className="h-5 w-5" />
            Создать приглашение
          </Link>
        </div>

        <p className="absolute bottom-8 text-white/25 text-xs text-center px-6 animate-in fade-in duration-1000 delay-700 fill-mode-both">
          Идеально для свиданий, кофе и уютных встреч
        </p>
      </div>
    </main>
  );
}

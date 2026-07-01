'use client';

import Link from 'next/link';
import { AuroraBackground } from '@/components/AuroraBackground';
import { THEME_CONFIG } from '@/lib/themes';
import { Sparkles } from 'lucide-react';
import type { ThemeType } from '@/types';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden" data-theme="minimal">
      <AuroraBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mb-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white text-center tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          MeetMaker
        </h1>

        <p className="text-lg sm:text-xl text-white/50 text-center max-w-md mb-10 font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          Самый красивый способ
          <br />
          договориться о встрече
        </p>

        <div className="flex gap-3 mb-10 animate-in fade-in duration-700 delay-400 fill-mode-both">
          {(Object.keys(THEME_CONFIG) as ThemeType[]).map((id) => {
            const t = THEME_CONFIG[id];
            return (
              <div
                key={id}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl bg-white/5 border border-white/10"
                title={t.label}
              >
                <span className="text-xl">{t.emoji}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-wide">{t.label}</span>
              </div>
            );
          })}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" strokeWidth={1.5} />
            Создать открытку
          </Link>
        </div>

        <p className="absolute bottom-8 text-white/20 text-sm font-light animate-in fade-in duration-1000 delay-700 fill-mode-both">
          вместо переписки «Когда тебе удобно?»
        </p>
      </div>
    </main>
  );
}

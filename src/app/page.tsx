'use client';

import { AuroraBackground } from '@/components/AuroraBackground';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
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

        <p className="text-lg sm:text-xl text-white/50 text-center max-w-md mb-12 font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          Самый красивый способ
          <br />
          договориться о встрече
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" strokeWidth={1.5} />
            Создать открытку
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        <p className="absolute bottom-8 text-white/20 text-sm font-light animate-in fade-in duration-1000 delay-700 fill-mode-both">
          вместо переписки «Когда тебе удобно?»
        </p>
      </div>
    </main>
  );
}

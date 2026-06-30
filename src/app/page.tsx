'use client';

import { AuroraBackground } from '@/components/AuroraBackground';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <AuroraBackground />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold text-white text-center tracking-tight mb-4"
        >
          MeetMaker
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-white/50 text-center max-w-md mb-12 font-light"
        >
          Самый красивый способ<br />договориться о встрече
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" strokeWidth={1.5} />
            Создать открытку
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 text-white/20 text-sm font-light"
        >
          вместо переписки «Когда тебе удобно?»
        </motion.p>
      </div>
    </main>
  );
}
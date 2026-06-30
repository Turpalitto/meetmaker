'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { ArrowRight, Coffee, Film, Footprints, Utensils } from 'lucide-react';

const suggestions = [
  { icon: Coffee, label: 'Кофе' },
  { icon: Utensils, label: 'Ужин' },
  { icon: Film, label: 'Кино' },
  { icon: Footprints, label: 'Прогулка' },
];

export function StepName() {
  const meetingTitle = useMeetingStore((s) => s.meetingTitle);
  const setMeetingTitle = useMeetingStore((s) => s.setMeetingTitle);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const [localTitle, setLocalTitle] = useState(meetingTitle);

  const canContinue = localTitle.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    setMeetingTitle(localTitle.trim());
    setCurrentStep(1);
  };

  const handleSuggestion = (label: string) => {
    setLocalTitle(label);
    setMeetingTitle(label);
    setTimeout(() => setCurrentStep(1), 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      {/* Big input field */}
      <div className="mb-8">
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
          placeholder="Например, Кофе"
          className="w-full bg-transparent text-4xl sm:text-5xl font-bold text-white placeholder-white/20 border-none outline-none text-center tracking-tight"
          autoFocus
        />
        <div className="h-0.5 bg-white/10 mt-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            animate={{ width: localTitle ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Suggestions */}
      {!localTitle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-white/30 text-sm text-center mb-4 font-light">Быстрый выбор</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {suggestions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleSuggestion(item.label)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: canContinue ? 1 : 0.3 }}
        className="flex justify-center"
      >
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-3.5 text-base font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Продолжить
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </motion.div>
    </motion.div>
  );
}
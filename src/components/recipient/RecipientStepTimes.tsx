'use client';

import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Clock, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecipientStepTimes() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const selectedTime = useMeetingStore((s) => s.selectedTime);
  const setSelectedTime = useMeetingStore((s) => s.setSelectedTime);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  if (!card || !selectedDate) return null;

  const dateOption = card.dates.find((d) => d.date === selectedDate);
  const times = dateOption?.times ?? [];

  const handleSelect = (time: string) => {
    setSelectedTime(time);
    setRecipientStep(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
        Во сколько?
      </h2>
      <p className="text-white/30 text-sm mb-8 font-light">
        {formatDate(selectedDate)}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {times.map((time, index) => {
          const isSelected = selectedTime === time;
          return (
            <motion.button
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => handleSelect(time)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Clock className="h-4 w-4" strokeWidth={1.5} />
              {time}
              {isSelected && <Check className="h-4 w-4" strokeWidth={3} />}
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => setRecipientStep(0)}
        className="mt-10 text-white/30 hover:text-white/60 text-sm font-medium transition-colors"
      >
        ← Назад к датам
      </button>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecipientStepDates() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const setSelectedDate = useMeetingStore((s) => s.setSelectedDate);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  if (!card) return null;

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    setRecipientStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
        Когда тебе удобно?
      </h2>
      <p className="text-white/30 text-sm mb-8 font-light">
        Выбери один из вариантов
      </p>

      <div className="space-y-3">
        {card.dates.map((d, index) => {
          const isSelected = selectedDate === d.date;
          return (
            <motion.button
              key={d.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => handleSelect(d.date)}
              className={`w-full date-card flex items-center gap-4 p-5 ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-indigo-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-lg">{formatDate(d.date)}</p>
                <p className="text-white/40 text-sm">
                  {d.times.length} вариантов времени
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'
              }`}>
                {isSelected && <Check className="h-full w-full text-white p-1" strokeWidth={3} />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function Check(props: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecipientStepDates() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const setSelectedDate = useMeetingStore((s) => s.setSelectedDate);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  if (!card) return null;

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold text-white mb-3">Когда тебе удобно?</h2>
      <p className="text-white/30 text-sm mb-8">Выбери один из вариантов</p>
      <div className="space-y-3">
        {card.dates.map((d) => (
          <button
            key={d.date}
            type="button"
            onClick={() => {
              setSelectedDate(d.date);
              setRecipientStep(1);
            }}
            className="w-full date-card flex items-center gap-4 p-5 text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-lg">{formatDate(d.date)}</p>
              <p className="text-white/40 text-sm">{d.times.length} вариантов времени</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecipientStepTimes() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const setSelectedTime = useMeetingStore((s) => s.setSelectedTime);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  if (!card || !selectedDate) return null;
  const times = card.dates.find((d) => d.date === selectedDate)?.times ?? [];

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold text-white mb-3">Во сколько?</h2>
      <p className="text-white/30 text-sm mb-8">{formatDate(selectedDate)}</p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {times.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => {
              setSelectedTime(time);
              setRecipientStep(2);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-indigo-500 hover:text-white"
          >
            <Clock className="h-4 w-4" />
            {time}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => setRecipientStep(0)} className="text-white/30 text-sm hover:text-white/60">
        ← Назад к датам
      </button>
    </div>
  );
}

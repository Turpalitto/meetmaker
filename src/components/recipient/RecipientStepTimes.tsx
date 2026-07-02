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
    <div className="w-full">
      <div className="ios-screen-header mb-6">
        <h2 className="ios-large-title">Во сколько?</h2>
        <p className="ios-footnote mt-2">{formatDate(selectedDate)}</p>
      </div>

      <div className="ios-group mb-6">
        <p className="ios-section-header">Время</p>
        <div className="ios-grouped-card divide-y divide-ios-separator">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                setSelectedTime(time);
                setRecipientStep(2);
              }}
              className="ios-cell-button"
            >
              <Clock className="h-5 w-5 text-theme shrink-0" strokeWidth={2} />
              <span className="ios-cell-title flex-1">{time}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRecipientStep(0)}
        className="ios-btn-plain mx-auto block"
      >
        Назад к датам
      </button>
    </div>
  );
}

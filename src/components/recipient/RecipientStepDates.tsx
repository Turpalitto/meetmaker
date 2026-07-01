'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function RecipientStepDates() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const setSelectedDate = useMeetingStore((s) => s.setSelectedDate);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  if (!card) return null;

  return (
    <div className="w-full pt-10">
      <div className="ios-screen-header mb-6">
        <h2 className="ios-large-title">Когда удобно?</h2>
        <p className="ios-footnote mt-2">Выбери один из вариантов</p>
      </div>

      <div className="ios-group">
        <p className="ios-section-header">Даты</p>
        <div className="ios-grouped-card divide-y divide-ios-separator">
          {card.dates.map((d) => (
            <button
              key={d.date}
              type="button"
              onClick={() => {
                setSelectedDate(d.date);
                setRecipientStep(1);
              }}
              className="ios-cell-button"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--mm-accent-soft)' }}
              >
                <Calendar className="h-5 w-5 text-theme" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="ios-cell-title">{formatDate(d.date)}</p>
                <p className="ios-cell-subtitle">{d.times.length} вариантов времени</p>
              </div>
              <ChevronRight className="h-5 w-5 ios-cell-chevron" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

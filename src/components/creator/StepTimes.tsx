'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
import { Clock, Plus, Check } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

const TIME_GROUPS = [
  { label: 'Утро', times: ['09:00', '10:00', '11:00', '12:00'] },
  { label: 'День', times: ['13:00', '14:00', '15:00', '16:00', '17:00'] },
  { label: 'Вечер', times: ['18:00', '19:00', '20:00', '21:00'] },
];

export function StepTimes() {
  const dates = useMeetingStore((s) => s.dates);
  const addTimeToDate = useMeetingStore((s) => s.addTimeToDate);
  const removeTimeFromDate = useMeetingStore((s) => s.removeTimeFromDate);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const [activeDate, setActiveDate] = useState(dates[0]?.date || '');
  const [customTime, setCustomTime] = useState('');

  const currentDateObj = dates.find((d) => d.date === activeDate);
  const allDatesHaveTimes = dates.every((d) => d.times.length > 0);
  const selectedCount = currentDateObj?.times.length ?? 0;

  const handleTimeToggle = (time: string) => {
    if (!activeDate) return;
    if (currentDateObj?.times.includes(time)) removeTimeFromDate(activeDate, time);
    else addTimeToDate(activeDate, time);
  };

  return (
    <div className="w-full max-w-md">
      <p className="mm-eyebrow mb-3">День</p>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {dates.map((d) => {
          const active = activeDate === d.date;
          return (
            <button
              key={d.date}
              type="button"
              onClick={() => setActiveDate(d.date)}
              className="mm-assist-chip"
              aria-pressed={active}
            >
              {formatDate(d.date).split(',')[0]}
              {d.times.length > 0 && <span className="opacity-70">({d.times.length})</span>}
            </button>
          );
        })}
      </div>

      {activeDate && (
        <>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="mm-eyebrow">
              Время · {formatDate(activeDate).split(',')[0]}
            </p>
            {selectedCount > 0 && (
              <span className="text-xs" style={{ color: 'var(--mm-accent)' }}>
                выбрано {selectedCount}
              </span>
            )}
          </div>

          <div className="mb-4 space-y-4">
            {TIME_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="ios-section-header">{group.label}</p>
                <div className="ios-grouped-card divide-y divide-ios-separator">
                  {group.times.map((time) => {
                    const isSelected = currentDateObj?.times.includes(time) || false;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleTimeToggle(time)}
                        className="ios-cell-button"
                        aria-pressed={isSelected}
                      >
                        <Clock className="h-4 w-4 shrink-0 text-theme" strokeWidth={2} />
                        <span className="ios-cell-title flex-1">{formatTime(time)}</span>
                        <span className="ios-cell-check" aria-hidden>
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="mm-eyebrow mb-2">Своё время</p>
          <div className="mm-card mb-4 flex items-center gap-2 px-3 py-2">
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="mm-input flex-1 !min-h-0 !border-0 !bg-transparent !py-2 !shadow-none"
            />
            <button
              type="button"
              onClick={() => {
                if (customTime && activeDate) {
                  addTimeToDate(activeDate, customTime);
                  setCustomTime('');
                }
              }}
              disabled={!customTime}
              className="ios-checkmark !h-8 !w-8 disabled:opacity-30"
              aria-label="Добавить время"
            >
              <Plus className="h-4 w-4" style={{ color: 'var(--mm-on-accent)' }} strokeWidth={2.5} />
            </button>
          </div>
        </>
      )}

      <p className="mm-eyebrow mb-3">Сводка</p>
      <div className="mm-card mb-6 divide-y overflow-hidden" style={{ borderColor: 'var(--mm-line)' }}>
        {dates.map((d) => (
          <div key={d.date} className="flex items-center gap-3 px-4 py-3">
            <span className="flex-1 text-sm" style={{ color: 'var(--mm-ink)' }}>
              {formatDate(d.date)}
            </span>
            <span
              className="text-sm"
              style={{ color: d.times.length > 0 ? 'var(--mm-accent)' : 'var(--mm-ink-soft)' }}
            >
              {d.times.length > 0 ? `${d.times.length} вариантов` : 'не выбрано'}
            </span>
          </div>
        ))}
      </div>

      <WizardActions
        onBack={() => setCurrentStep(1)}
        onContinue={() => setCurrentStep(3)}
        continueDisabled={!allDatesHaveTimes}
      />
    </div>
  );
}

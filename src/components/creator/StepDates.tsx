'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, getTodayDate, getNextWeekDates } from '@/lib/utils';
import { useMounted } from '@/hooks/useMounted';

const DAY_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export function StepDates() {
  const mounted = useMounted();
  const dates = useMeetingStore((s) => s.dates);
  const addDate = useMeetingStore((s) => s.addDate);
  const removeDate = useMeetingStore((s) => s.removeDate);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);

  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  if (!mounted) {
    return <div className="w-full max-w-sm min-h-[320px]" />;
  }

  const selectedDates = dates.map((d) => d.date);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const today = getTodayDate();
  const quickDates = getNextWeekDates(5);
  const leadingEmpty = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const handleDateClick = (dateStr: string) => {
    if (dateStr < today) return;
    if (selectedDates.includes(dateStr)) removeDate(dateStr);
    else addDate(dateStr);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  return (
    <div className="w-full max-w-sm">
      <p className="mm-eyebrow mb-3">Быстрый выбор</p>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {quickDates.map((d) => {
          const picked = selectedDates.includes(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => handleDateClick(d)}
              className="mm-assist-chip"
              aria-pressed={picked}
            >
              {formatDate(d).split(',')[0]}
            </button>
          );
        })}
      </div>

      <p className="mm-eyebrow mb-3">Календарь</p>
      <div className="mm-card mb-6 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="mm-icon-btn !px-2.5 !py-2"
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="mm-display text-lg">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            className="mm-icon-btn !px-2.5 !py-2"
            aria-label="Следующий месяц"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--mm-ink-faint)' }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: leadingEmpty }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isPast = dateStr < today;
            const isSelected = selectedDates.includes(dateStr);
            const isToday = dateStr === today;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => handleDateClick(dateStr)}
                disabled={isPast && !isToday}
                className="relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all"
                style={
                  isSelected
                    ? {
                        background: 'var(--mm-accent)',
                        color: 'var(--mm-on-accent)',
                        boxShadow: '0 4px 14px var(--mm-glow)',
                      }
                    : isPast && !isToday
                      ? { color: 'var(--mm-ink-faint)', opacity: 0.45, cursor: 'not-allowed' }
                      : isToday
                        ? {
                            color: 'var(--mm-accent-strong)',
                            background: 'var(--mm-container)',
                            border: '1px solid var(--mm-line-strong)',
                          }
                        : {
                            color: 'var(--mm-ink)',
                            background: 'transparent',
                          }
                }
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDates.length > 0 && (
        <div className="mb-4">
          <p className="mm-eyebrow mb-3">Выбрано</p>
          <div className="mm-card divide-y overflow-hidden" style={{ borderColor: 'var(--mm-line)' }}>
            {selectedDates.map((dateStr) => (
              <div key={dateStr} className="flex items-center gap-3 px-4 py-3">
                <Calendar className="h-5 w-5 shrink-0" style={{ color: 'var(--mm-accent)' }} strokeWidth={2} />
                <span className="flex-1 text-sm" style={{ color: 'var(--mm-ink)' }}>
                  {formatDate(dateStr)}
                </span>
                <button
                  type="button"
                  onClick={() => removeDate(dateStr)}
                  className="mm-text-button !min-h-0 !p-1"
                  style={{ color: 'var(--mm-ink-faint)' }}
                  aria-label="Удалить дату"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <WizardActions
        onBack={() => setCurrentStep(0)}
        onContinue={() => setCurrentStep(2)}
        continueDisabled={dates.length === 0}
      />
    </div>
  );
}

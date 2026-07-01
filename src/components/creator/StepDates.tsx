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
      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {quickDates.map((d) => {
          const picked = selectedDates.includes(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => handleDateClick(d)}
              className={`chip ${picked ? 'chip-accent' : ''}`}
            >
              {formatDate(d).split(',')[0]}
            </button>
          );
        })}
      </div>

      <div className="ios-group mb-6">
        <p className="ios-section-header">Календарь</p>
        <div className="ios-grouped-card calendar-panel text-white">
        <div className="flex items-center justify-between mb-5">
          <button type="button" onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 text-white/50 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-[17px]">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 text-white/50 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((day) => (
            <div key={day} className="text-center text-white/30 text-xs font-medium py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1 }, (_, i) => (
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
                className={`relative aspect-square rounded-2xl text-sm font-medium flex items-center justify-center transition-all ${
                  isSelected
                    ? 'text-white scale-105 shadow-lg'
                    : isPast && !isToday
                    ? 'text-white/15 cursor-not-allowed'
                    : 'text-white/70 hover:bg-white/10'
                }`}
                style={isSelected ? { background: 'var(--mm-accent)', boxShadow: '0 4px 16px var(--mm-accent-glow)' } : undefined}
              >
                {day}
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {selectedDates.length > 0 && (
        <div className="ios-group mb-4">
          <p className="ios-section-header">Выбрано</p>
          <div className="ios-grouped-card divide-y divide-ios-separator">
            {selectedDates.map((dateStr) => (
              <div key={dateStr} className="ios-cell-static">
                <Calendar className="h-5 w-5 text-theme shrink-0" strokeWidth={2} />
                <span className="ios-cell-title flex-1">{formatDate(dateStr)}</span>
                <button type="button" onClick={() => removeDate(dateStr)} className="ios-btn-plain !min-h-0 !p-1 text-white/40">
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

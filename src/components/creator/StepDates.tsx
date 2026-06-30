'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
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
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {quickDates.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => handleDateClick(d)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDates.includes(d)
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
            }`}
          >
            {formatDate(d).split(',')[0]}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-5 mb-8 text-white">
        <div className="flex items-center justify-between mb-5">
          <button type="button" onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 text-white/50">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-lg">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 text-white/50">
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
                className={`relative aspect-square rounded-2xl text-sm font-medium flex items-center justify-center ${
                  isSelected
                    ? 'bg-indigo-500 text-white'
                    : isPast && !isToday
                    ? 'text-white/15 cursor-not-allowed'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDates.length > 0 && (
        <div className="mb-8">
          <p className="text-white/30 text-sm text-center mb-3">Выбранные даты</p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedDates.map((dateStr) => (
              <div key={dateStr} className="date-card flex items-center gap-2 px-4 py-2.5">
                <Calendar className="h-4 w-4 text-indigo-400" strokeWidth={1.5} />
                <span className="text-white text-sm font-medium">{formatDate(dateStr)}</span>
                <button type="button" onClick={() => removeDate(dateStr)} className="p-1 rounded-full hover:bg-white/10 text-white/40">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setCurrentStep(0)} className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white/60">
          Назад
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          disabled={dates.length === 0}
          className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white border border-white/20 disabled:opacity-30"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

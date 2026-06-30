'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Plus, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, getTodayDate, getNextWeekDates } from '@/lib/utils';

const DAY_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export function StepDates() {
  const dates = useMeetingStore((s) => s.dates);
  const addDate = useMeetingStore((s) => s.addDate);
  const removeDate = useMeetingStore((s) => s.removeDate);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return now.getMonth();
  });
  const [currentYear, setCurrentYear] = useState(() => {
    const now = new Date();
    return now.getFullYear();
  });

  const selectedDates = dates.map((d) => d.date);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const today = getTodayDate();

  const handleDateClick = (dateStr: string) => {
    if (dateStr < today) return;
    if (selectedDates.includes(dateStr)) {
      removeDate(dateStr);
    } else {
      addDate(dateStr);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const canContinue = dates.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm"
    >
      {/* Quick suggestions */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {getNextWeekDates(5).map((d) => (
          <button
            key={d}
            onClick={() => handleDateClick(d)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedDates.includes(d)
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
            }`}
          >
            {formatDate(d).split(',')[0]}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="glass-card rounded-3xl p-5 mb-8">
        {/* Month header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-white font-semibold text-lg">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((day) => (
            <div key={day} className="text-center text-white/30 text-xs font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
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
                onClick={() => handleDateClick(dateStr)}
                disabled={isPast && !isToday}
                className={`relative aspect-square rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  isSelected
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : isPast && !isToday
                    ? 'text-white/15 cursor-not-allowed'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-indigo-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected dates */}
      {selectedDates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8"
        >
          <p className="text-white/30 text-sm text-center mb-3 font-light">
            Выбранные даты
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedDates.map((dateStr) => (
              <motion.div
                key={dateStr}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="date-card flex items-center gap-2 px-4 py-2.5"
              >
                <Calendar className="h-4 w-4 text-indigo-400" strokeWidth={1.5} />
                <span className="text-white text-sm font-medium">{formatDate(dateStr)}</span>
                <button
                  onClick={() => removeDate(dateStr)}
                  className="ml-1 p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(0)}
          className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Назад
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!canContinue}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-3 text-base font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Продолжить
        </button>
      </div>
    </motion.div>
  );
}
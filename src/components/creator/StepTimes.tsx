'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Clock, Plus, X, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const QUICK_TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00',
];

export function StepTimes() {
  const dates = useMeetingStore((s) => s.dates);
  const addTimeToDate = useMeetingStore((s) => s.addTimeToDate);
  const removeTimeFromDate = useMeetingStore((s) => s.removeTimeFromDate);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);

  const [activeDate, setActiveDate] = useState<string>(dates[0]?.date || '');
  const [customTime, setCustomTime] = useState('');

  const currentDateObj = dates.find((d) => d.date === activeDate);

  const handleTimeToggle = (time: string) => {
    if (!activeDate) return;
    const dateObj = dates.find((d) => d.date === activeDate);
    if (dateObj?.times.includes(time)) {
      removeTimeFromDate(activeDate, time);
    } else {
      addTimeToDate(activeDate, time);
    }
  };

  const handleAddCustomTime = () => {
    if (!customTime || !activeDate) return;
    addTimeToDate(activeDate, customTime);
    setCustomTime('');
  };

  const allDatesHaveTimes = dates.every((d) => d.times.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      {/* Date tabs */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {dates.map((d) => (
          <button
            key={d.date}
            onClick={() => setActiveDate(d.date)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeDate === d.date
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
            }`}
          >
            {formatDate(d.date).split(',')[0]}
            {d.times.length > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({d.times.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Quick times grid */}
      {activeDate && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white/30 text-sm text-center mb-4 font-light">
              Выберите время для {formatDate(activeDate).toLowerCase()}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {QUICK_TIMES.map((time) => {
                const isSelected = currentDateObj?.times.includes(time) || false;
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeToggle(time)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {time}
                    {isSelected && (
                      <Check className="inline-block ml-1.5 h-3.5 w-3.5" strokeWidth={3} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom time input */}
            <div className="flex items-center gap-2 justify-center mb-8">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" strokeWidth={1.5} />
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="premium-input pl-10 py-2.5 text-sm w-36"
                />
              </div>
              <button
                onClick={handleAddCustomTime}
                disabled={!customTime}
                className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/15 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Summary */}
      <div className="mb-8">
        {dates.map((d) => (
          <div key={d.date} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-white/60 text-sm">{formatDate(d.date)}</span>
            <span className="text-white/40 text-sm">{d.times.length > 0 ? `${d.times.length} вариантов` : 'не выбрано'}</span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Назад
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!allDatesHaveTimes}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-3 text-base font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Продолжить
        </button>
      </div>
    </motion.div>
  );
}
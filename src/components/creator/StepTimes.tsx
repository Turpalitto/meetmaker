'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Clock, Plus, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const QUICK_TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
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

  const handleTimeToggle = (time: string) => {
    if (!activeDate) return;
    if (currentDateObj?.times.includes(time)) removeTimeFromDate(activeDate, time);
    else addTimeToDate(activeDate, time);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {dates.map((d) => (
          <button
            key={d.date}
            type="button"
            onClick={() => setActiveDate(d.date)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeDate === d.date
                ? 'pill-button-primary !py-2.5 !px-5 scale-105'
                : 'bg-white/10 text-white/60 border border-white/15 hover:bg-white/12'
            }`}
          >
            {formatDate(d.date).split(',')[0]}
            {d.times.length > 0 && <span className="ml-1.5 text-xs">({d.times.length})</span>}
          </button>
        ))}
      </div>

      {activeDate && (
        <div className="mb-8">
          <p className="text-white/30 text-sm text-center mb-4">
            Выберите время для {formatDate(activeDate).toLowerCase()}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {QUICK_TIMES.map((time) => {
              const isSelected = currentDateObj?.times.includes(time) || false;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeToggle(time)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium ${
                    isSelected
                      ? 'pill-button-primary !py-2.5 !px-5 suggestion-pop'
                      : 'bg-white/10 text-white/60 border border-white/15 hover:bg-theme-soft hover:scale-105 transition-all suggestion-pop'
                  }`}
                >
                  {time}
                  {isSelected && <Check className="inline-block ml-1.5 h-3.5 w-3.5" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="premium-input pl-10 py-2.5 text-sm w-36"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (customTime && activeDate) {
                  addTimeToDate(activeDate, customTime);
                  setCustomTime('');
                }
              }}
              disabled={!customTime}
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white/70 disabled:opacity-30"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 space-y-2">
        {dates.map((d) => (
          <div key={d.date} className="flex justify-between py-2 border-b border-white/5 text-sm">
            <span className="text-white/60">{formatDate(d.date)}</span>
            <span className="text-white/40">{d.times.length > 0 ? `${d.times.length} вариантов` : 'не выбрано'}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setCurrentStep(1)} className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white/60">
          Назад
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          disabled={!allDatesHaveTimes}
          className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white border border-white/20 disabled:opacity-30"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

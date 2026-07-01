'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
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
      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {dates.map((d) => (
          <button
            key={d.date}
            type="button"
            onClick={() => setActiveDate(d.date)}
            className={`chip ${activeDate === d.date ? 'chip-accent' : ''}`}
          >
            {formatDate(d.date).split(',')[0]}
            {d.times.length > 0 && <span className="opacity-70">({d.times.length})</span>}
          </button>
        ))}
      </div>

      {activeDate && (
        <div className="ios-group mb-4">
          <p className="ios-section-header">Время · {formatDate(activeDate).split(',')[0]}</p>
          <div className="ios-grouped-card p-3 flex flex-wrap gap-2 justify-center">
            {QUICK_TIMES.map((time) => {
              const isSelected = currentDateObj?.times.includes(time) || false;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeToggle(time)}
                  className={`chip gap-1 ${isSelected ? 'chip-accent' : ''}`}
                >
                  {time}
                  {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
          <div className="ios-grouped-card flex items-center mt-2 pr-2">
            <Clock className="h-5 w-5 text-theme ml-3 shrink-0" strokeWidth={2} />
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="ios-input-field flex-1"
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
              className="ios-checkmark !w-8 !h-8 disabled:opacity-30"
            >
              <Plus className="h-4 w-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      <div className="ios-group mb-6">
        <p className="ios-section-header">Сводка</p>
        <div className="ios-grouped-card divide-y divide-ios-separator">
          {dates.map((d) => (
            <div key={d.date} className="ios-cell-static">
              <span className="ios-cell-title flex-1">{formatDate(d.date)}</span>
              <span className={d.times.length > 0 ? 'text-theme text-[15px]' : 'ios-cell-subtitle'}>
                {d.times.length > 0 ? `${d.times.length} вариантов` : 'не выбрано'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <WizardActions
        onBack={() => setCurrentStep(1)}
        onContinue={() => setCurrentStep(3)}
        continueDisabled={!allDatesHaveTimes}
      />
    </div>
  );
}

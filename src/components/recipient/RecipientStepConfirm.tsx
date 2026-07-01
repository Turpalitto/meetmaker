'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { submitRecipientChoice } from '@/lib/api';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, Loader2, MapPin, Pencil } from 'lucide-react';
import { StaggerItem } from '@/components/StepTransition';

export function RecipientStepConfirm() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const selectedTime = useMeetingStore((s) => s.selectedTime);
  const selectedPlace = useMeetingStore((s) => s.selectedPlace);
  const setRecipientChoice = useMeetingStore((s) => s.setRecipientChoice);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const [submitting, setSubmitting] = useState(false);

  if (!card || !selectedDate || !selectedTime) return null;

  const rows = [
    { icon: Calendar, label: formatDate(selectedDate) },
    { icon: Clock, label: formatTime(selectedTime) },
    ...(selectedPlace
      ? [{ icon: MapPin, label: selectedPlace.name }]
      : []),
  ];

  const handleConfirm = async () => {
    const choice = { date: selectedDate, time: selectedTime, place: selectedPlace };
    setSubmitting(true);
    try {
      const session = await submitRecipientChoice(card.id, choice);
      setRecipientChoice(session.recipientChoice ?? choice);
    } catch {
      setRecipientChoice(choice);
    } finally {
      setSubmitting(false);
      setRecipientStep(4);
    }
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold text-white mb-8">Всё верно?</h2>
      <div className="glass-card-dark rounded-3xl p-6 mb-6 text-left space-y-4">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <StaggerItem key={index} index={index}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-xl bg-theme-soft flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-theme" />
                </div>
                <span className="font-medium">{row.label}</span>
              </div>
            </StaggerItem>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setRecipientStep(2)}
        className="inline-flex items-center gap-1 text-white/35 text-sm mb-6 hover:text-white/60 transition-colors"
      >
        <Pencil className="h-3.5 w-3.5" />
        Изменить
      </button>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={submitting}
        className="pill-button pill-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Отправляем…
          </>
        ) : (
          'Подтвердить встречу'
        )}
      </button>
    </div>
  );
}

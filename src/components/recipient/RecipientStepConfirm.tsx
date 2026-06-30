'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { submitRecipientChoice } from '@/lib/api';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';

export function RecipientStepConfirm() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const selectedTime = useMeetingStore((s) => s.selectedTime);
  const selectedPlace = useMeetingStore((s) => s.selectedPlace);
  const setRecipientChoice = useMeetingStore((s) => s.setRecipientChoice);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const [submitting, setSubmitting] = useState(false);

  if (!card || !selectedDate || !selectedTime) return null;

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
      <div className="glass-card-dark rounded-3xl p-6 mb-8 text-left space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Calendar className="h-5 w-5 text-indigo-400" />
          {formatDate(selectedDate)}
        </div>
        <div className="flex items-center gap-3 text-white">
          <Clock className="h-5 w-5 text-indigo-400" />
          {formatTime(selectedTime)}
        </div>
        {selectedPlace && (
          <div className="flex items-center gap-3 text-white">
            <MapPin className="h-5 w-5 text-indigo-400" />
            {selectedPlace.name}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleConfirm}
        disabled={submitting}
        className="pill-button pill-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Отправляем…</> : 'Подтвердить встречу'}
      </button>
    </div>
  );
}

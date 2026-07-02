'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { submitRecipientChoice } from '@/lib/api';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, Loader2, MapPin } from 'lucide-react';

export function RecipientStepConfirm() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedDate = useMeetingStore((s) => s.selectedDate);
  const selectedTime = useMeetingStore((s) => s.selectedTime);
  const selectedPlace = useMeetingStore((s) => s.selectedPlace);
  const setRecipientChoice = useMeetingStore((s) => s.setRecipientChoice);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!card || !selectedDate || !selectedTime) return null;

  const rows = [
    { icon: Calendar, label: 'Дата', value: formatDate(selectedDate) },
    { icon: Clock, label: 'Время', value: formatTime(selectedTime) },
    ...(selectedPlace
      ? [{ icon: MapPin, label: 'Место', value: selectedPlace.name }]
      : []),
  ];

  const handleConfirm = async () => {
    const choice = { date: selectedDate, time: selectedTime, place: selectedPlace };
    setSubmitting(true);
    setError(null);
    try {
      const session = await submitRecipientChoice(card.id, choice);
      setRecipientChoice(session.recipientChoice ?? choice);
      setRecipientStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось отправить ответ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="ios-screen-header mb-5">
        <h2 className="ios-large-title">Всё верно?</h2>
        <p className="ios-footnote mt-2">Проверь детали встречи</p>
      </div>

      <div className="ios-grouped-card ios-detail-list mb-5">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <div key={index} className="detail-row">
              <div className="detail-row-icon">
                <Icon className="h-4 w-4 text-theme" strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="detail-label">{row.label}</p>
                <p className="detail-value">{row.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p
          className="mb-4 rounded-[var(--mm-r-sm)] px-4 py-3 text-sm"
          style={{ background: 'var(--mm-error-container)', color: 'var(--mm-error)' }}
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => setRecipientStep(2)}
        className="ios-btn-plain w-full justify-center mb-4"
      >
        Изменить
      </button>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={submitting}
        className="ios-btn-filled w-full gap-2 disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Отправляем…
          </>
        ) : (
          'Подтвердить'
        )}
      </button>
    </div>
  );
}

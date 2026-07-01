'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { submitRecipientChoice } from '@/lib/api';
import { formatDate, formatTime } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { PostcardFrame } from '@/components/PostcardFrame';
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

  const config = getThemeConfig(card.theme);

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
    <PostcardFrame theme={card.theme} ribbon size="md">
      <div className="text-center mb-6">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">
          {config.emoji} Проверь
        </p>
        <h2 className="text-3xl font-bold text-white">Всё верно?</h2>
      </div>

      <div className="space-y-3 mb-6">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <StaggerItem key={index} index={index}>
              <div className="detail-row">
                <div className="detail-row-icon">
                  <Icon className="h-5 w-5 text-theme" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wide">{row.label}</p>
                  <p className="text-white font-medium">{row.value}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setRecipientStep(2)}
        className="inline-flex items-center gap-1 text-white/35 text-sm mb-5 hover:text-white/60 transition-colors w-full justify-center"
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
    </PostcardFrame>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [error, setError] = useState<string | null>(null);

  if (!card || !selectedDate || !selectedTime) return null;

  const handleConfirm = async () => {
    const choice = {
      date: selectedDate,
      time: selectedTime,
      place: selectedPlace,
    };

    setSubmitting(true);
    setError(null);
    try {
      const session = await submitRecipientChoice(card.id, choice);
      setRecipientChoice(session.recipientChoice ?? choice);
      setRecipientStep(4);
    } catch (e) {
      setRecipientChoice(choice);
      setRecipientStep(4);
      if (e instanceof Error) setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
        Всё верно?
      </h2>
      <p className="text-white/30 text-sm mb-8 font-light">
        Проверь выбор перед отправкой
      </p>

      <div className="glass-card-dark rounded-3xl p-6 mb-8 text-left space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
          <span className="text-white font-medium">{formatDate(selectedDate)}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
          <span className="text-white font-medium">{formatTime(selectedTime)}</span>
        </div>
        {selectedPlace && (
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
            <span className="text-white font-medium">{selectedPlace.name}</span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-amber-400/80 text-sm mb-4">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        <button
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
        <button
          onClick={() => setRecipientStep(card.places.length > 0 ? 2 : 1)}
          disabled={submitting}
          className="text-white/30 hover:text-white/60 text-sm font-medium transition-colors"
        >
          ← Изменить
        </button>
      </div>
    </motion.div>
  );
}

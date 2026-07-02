'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import Confetti from '@/components/Confetti';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { IconCalendar, IconClock, IconPin } from '@/components/Icons';
import { useState } from 'react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);
  const [fireConfetti, setFireConfetti] = useState(true);

  if (!card || !recipientChoice) return null;

  const config = getThemeConfig(card.theme);

  return (
    <div className="relative w-full">
      <Confetti fire={fireConfetti} onEnd={() => setFireConfetti(false)} />

      <div className="mm-postcard mm-seal text-center">
        <div className="mm-accent-bar" />
        <div className="p-8 sm:p-10">
          <div
            className="relative mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full text-3xl"
            style={{
              background: 'var(--mm-container)',
              boxShadow: '0 0 0 8px color-mix(in srgb, var(--mm-accent) 10%, transparent)',
            }}
            aria-hidden
          >
            {config.emoji}
          </div>
          <p className="mm-eyebrow">Готово</p>
          <h2 className="mm-display mt-3 text-4xl">Встреча назначена</h2>

          <div className="mt-5 inline-flex flex-col items-center gap-1.5">
            <span className="mm-display text-2xl">{formatDate(recipientChoice.date)}</span>
            <span
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base"
              style={{ color: 'var(--mm-ink-soft)' }}
            >
              <span className="inline-flex items-center gap-1">
                <IconClock className="h-4 w-4" /> {formatTime(recipientChoice.time)}
              </span>
              {recipientChoice.place && (
                <span className="inline-flex items-center gap-1">
                  <IconPin className="h-4 w-4" /> {recipientChoice.place.name}
                </span>
              )}
            </span>
          </div>

          <p className="mt-4 text-sm" style={{ color: 'var(--mm-ink-faint)' }}>
            {card.title}
          </p>

          <button
            type="button"
            onClick={() => downloadICS(recipientChoice, card.title)}
            className="mm-filled-button mt-7 w-full gap-2"
          >
            <IconCalendar className="h-4 w-4" />
            Добавить в календарь
          </button>
        </div>
      </div>
    </div>
  );
}

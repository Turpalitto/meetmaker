'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { PostcardFrame } from '@/components/PostcardFrame';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { Calendar, Check, Download, MapPin, Clock } from 'lucide-react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);

  if (!card || !recipientChoice) return null;

  const config = getThemeConfig(card.theme);
  const appearance = card.appearance ?? 'light';

  return (
    <div className="relative w-full py-4">
      <ConfettiBurst theme={card.theme} />

      <PostcardFrame theme={card.theme} variant="elevated" appearance={appearance}>
        <div
          className="success-badge success-pop flex items-center justify-center mx-auto mb-5 md-celebrate-ring"
          style={{ backgroundColor: config.primaryContainer, color: config.onPrimaryContainer }}
        >
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </div>

        <div className="text-center mb-6 md-reveal md-reveal-d1">
          <h2 className="md-postcard-title mb-1">Всё согласовано {config.emoji}</h2>
          <p className="md-body-muted">{config.tagline}</p>
          <p className="md-list-subtitle mt-2">{card.title}</p>
        </div>

        <div className="md-elevated-card md-detail-list overflow-hidden p-0 mb-6 md-reveal md-reveal-d2">
          <div className="detail-row premium-detail">
            <div className="detail-row-icon">
              <Calendar className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="text-left flex-1">
              <p className="detail-label">Дата</p>
              <p className="detail-value">{formatDate(recipientChoice.date)}</p>
            </div>
          </div>

          <div className="detail-row premium-detail">
            <div className="detail-row-icon">
              <Clock className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="text-left flex-1">
              <p className="detail-label">Время</p>
              <p className="detail-value">{formatTime(recipientChoice.time)}</p>
            </div>
          </div>

          {recipientChoice.place && (
            <div className="detail-row premium-detail">
              <div className="detail-row-icon">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="detail-label">Место</p>
                <p className="detail-value">{recipientChoice.place.name}</p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => downloadICS(recipientChoice, card.title)}
          className="md-filled-button w-full py-2.5 gap-2 md-reveal md-reveal-d4"
        >
          <Download className="h-4 w-4" strokeWidth={2} />
          Добавить в календарь
        </button>
      </PostcardFrame>
    </div>
  );
}

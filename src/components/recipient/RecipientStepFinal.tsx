'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { PostcardFrame } from '@/components/PostcardFrame';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { Calendar, Check, Download, MapPin } from 'lucide-react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);

  if (!card || !recipientChoice) return null;

  const config = getThemeConfig(card.theme);

  return (
    <div className="relative w-full py-4">
      <ConfettiBurst theme={card.theme} />

      <PostcardFrame theme={card.theme} ribbon>
        <div className="success-badge success-pop">
          <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Готово! <span className="text-3xl">{config.emoji}</span>
          </h2>
          <p className="text-white/60 text-base">Твой выбор отправлен</p>
          <p className="text-white/35 text-sm mt-2">{config.tagline}</p>
        </div>

        <p className="text-center text-lg font-semibold text-white/80 mb-5">
          {card.title}
        </p>

        <div className="space-y-3 mb-8">
          <div className="detail-row animate-in fade-in slide-in-from-left-2 duration-400 fill-mode-both">
            <div className="detail-row-icon">
              <Calendar className="h-5 w-5 text-theme" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-xs uppercase tracking-wide">Дата</p>
              <p className="text-white font-medium">{formatDate(recipientChoice.date)}</p>
            </div>
          </div>

          <div
            className="detail-row animate-in fade-in slide-in-from-left-2 duration-400 fill-mode-both"
            style={{ animationDelay: '80ms' }}
          >
            <div className="detail-row-icon">
              <Clock className="h-5 w-5 text-theme" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-xs uppercase tracking-wide">Время</p>
              <p className="text-white font-medium">{formatTime(recipientChoice.time)}</p>
            </div>
          </div>

          {recipientChoice.place && (
            <div
              className="detail-row animate-in fade-in slide-in-from-left-2 duration-400 fill-mode-both"
              style={{ animationDelay: '160ms' }}
            >
              <div className="detail-row-icon">
                <MapPin className="h-5 w-5 text-theme" />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-xs uppercase tracking-wide">Место</p>
                <p className="text-white font-medium">{recipientChoice.place.name}</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-white/30 text-xs mb-5">
          Организатор увидит ответ на странице статуса
        </p>

        <button
          type="button"
          onClick={() => downloadICS(recipientChoice, card.title)}
          className="pill-button pill-button-primary w-full flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Добавить в календарь
        </button>
      </PostcardFrame>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

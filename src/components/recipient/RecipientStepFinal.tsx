'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { Calendar, Check, Download, MapPin } from 'lucide-react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);

  if (!card || !recipientChoice) return null;

  const config = getThemeConfig(card.theme);

  return (
    <div className="relative w-full text-center">
      <ConfettiBurst theme={card.theme} />

      <div className="success-pop w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
        <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">
        Готово! {config.emoji}
      </h2>
      <p className="text-white/40 mb-2">Твой выбор отправлен</p>
      <p className="text-white/25 text-sm mb-8">
        Организатор увидит ответ на странице статуса
      </p>

      <div className="glass-card-dark rounded-3xl p-6 mb-8 text-left space-y-3 theme-card-selected border animate-in fade-in duration-500 delay-200 fill-mode-both">
        <p className="text-white/50 text-sm">{card.title}</p>
        <div className="flex items-center gap-3 text-white">
          <Calendar className="h-5 w-5 text-theme shrink-0" />
          {formatDate(recipientChoice.date)}
        </div>
        <div className="flex items-center gap-3 text-white">
          <Clock className="h-5 w-5 text-theme shrink-0" />
          {formatTime(recipientChoice.time)}
        </div>
        {recipientChoice.place && (
          <div className="flex items-center gap-3 text-white">
            <MapPin className="h-5 w-5 text-theme shrink-0" />
            {recipientChoice.place.name}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => downloadICS(recipientChoice, card.title)}
        className="pill-button pill-button-secondary w-full flex items-center justify-center gap-2"
      >
        <Download className="h-4 w-4" />
        Добавить в календарь
      </button>
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

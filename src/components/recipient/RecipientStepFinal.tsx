'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { Calendar, Check, Download, MapPin } from 'lucide-react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);

  if (!card || !recipientChoice) return null;

  return (
    <div className="w-full text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-8">
        <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Готово!</h2>
      <p className="text-white/40 mb-8">Твой выбор отправлен</p>
      <div className="glass-card-dark rounded-3xl p-6 mb-8 text-left space-y-3">
        <p className="text-white/50 text-sm">{card.title}</p>
        <div className="flex items-center gap-3 text-white">
          <Calendar className="h-5 w-5 text-indigo-400" />
          {formatDate(recipientChoice.date)}
        </div>
        <div className="flex items-center gap-3 text-white">
          <Clock className="h-5 w-5 text-indigo-400" />
          {formatTime(recipientChoice.time)}
        </div>
        {recipientChoice.place && (
          <div className="flex items-center gap-3 text-white">
            <MapPin className="h-5 w-5 text-indigo-400" />
            {recipientChoice.place.name}
          </div>
        )}
      </div>
      <button type="button" onClick={() => downloadICS(recipientChoice, card.title)} className="pill-button pill-button-secondary w-full flex items-center justify-center gap-2">
        <Download className="h-4 w-4" />
        Добавить в календарь
      </button>
    </div>
  );
}

function Clock(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={props.className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Check, MapPin, Plus } from 'lucide-react';
import { StaggerItem } from '@/components/StepTransition';

export function RecipientStepPlaces() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const setSelectedPlace = useMeetingStore((s) => s.setSelectedPlace);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const [customMode, setCustomMode] = useState(false);
  const [localCustom, setLocalCustom] = useState('');

  if (!card) return null;

  const pick = (place: (typeof card.places)[0] | null) => {
    setSelectedPlace(place);
    setRecipientStep(3);
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-bold text-white mb-3">Где встретимся?</h2>
      <p className="text-white/30 text-sm mb-8">Выбери место или предложи своё</p>

      {card.places.length > 0 && (
        <div className="space-y-3 mb-6">
          {card.places.map((place, index) => (
            <StaggerItem key={place.id} index={index}>
              <button
                type="button"
                onClick={() => pick(place)}
                className="w-full date-card flex items-center gap-4 p-5 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-theme-soft flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-theme" />
                </div>
                <span className="text-white font-semibold text-lg flex-1 text-left">{place.name}</span>
                <Chevron />
              </button>
            </StaggerItem>
          ))}
        </div>
      )}

      {!customMode ? (
        <button
          type="button"
          onClick={() => setCustomMode(true)}
          className="dashed-custom-toggle w-full flex items-center justify-center gap-2 py-4 text-white/50 hover:text-white/80 mb-4"
        >
          <Plus className="h-4 w-4" />
          Своё место
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-4">
          <input
            type="text"
            value={localCustom}
            onChange={(e) => setLocalCustom(e.target.value)}
            placeholder="Напиши адрес или название"
            className="premium-input mb-3"
            autoFocus
          />
          <button
            type="button"
            onClick={() => localCustom.trim() && pick({ id: 'custom', name: localCustom.trim(), custom: true })}
            disabled={!localCustom.trim()}
            className="pill-button pill-button-primary w-full disabled:opacity-40"
          >
            <Check className="h-4 w-4 inline mr-1" />
            Продолжить
          </button>
        </div>
      )}

      {card.places.length === 0 && !customMode && (
        <button type="button" onClick={() => pick(null)} className="text-theme text-sm hover:opacity-80">
          Пропустить
        </button>
      )}

      <button
        type="button"
        onClick={() => setRecipientStep(1)}
        className="block mx-auto mt-6 text-white/30 text-sm hover:text-white/60 transition-colors"
      >
        ← Назад
      </button>
    </div>
  );
}

function Chevron() {
  return (
    <svg className="h-5 w-5 text-white/20 group-hover:text-theme transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

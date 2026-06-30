'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { MapPin } from 'lucide-react';

export function RecipientStepPlaces() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const setSelectedPlace = useMeetingStore((s) => s.setSelectedPlace);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
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
          {card.places.map((place) => (
            <button key={place.id} type="button" onClick={() => pick(place)} className="w-full date-card flex items-center gap-4 p-5 text-left">
              <MapPin className="h-6 w-6 text-indigo-400 shrink-0" />
              <span className="text-white font-semibold text-lg">{place.name}</span>
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        value={localCustom}
        onChange={(e) => setLocalCustom(e.target.value)}
        placeholder="Своё место"
        className="premium-input mb-3"
      />
      <button
        type="button"
        onClick={() => localCustom.trim() && pick({ id: 'custom', name: localCustom.trim(), custom: true })}
        disabled={!localCustom.trim()}
        className="pill-button pill-button-primary w-full mb-4 disabled:opacity-40"
      >
        Продолжить
      </button>
      {card.places.length === 0 && (
        <button type="button" onClick={() => pick(null)} className="text-indigo-400 text-sm">
          Пропустить
        </button>
      )}
      <button type="button" onClick={() => setRecipientStep(1)} className="block mx-auto mt-4 text-white/30 text-sm">
        ← Назад
      </button>
    </div>
  );
}

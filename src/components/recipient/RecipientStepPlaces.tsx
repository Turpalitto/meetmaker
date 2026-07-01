'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Check, MapPin, Plus, ChevronRight } from 'lucide-react';

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
    <div className="w-full pt-10">
      <div className="ios-screen-header mb-6">
        <h2 className="ios-large-title">Где встретимся?</h2>
        <p className="ios-footnote mt-2">Выбери место или предложи своё</p>
      </div>

      {card.places.length > 0 && (
        <div className="ios-group mb-4">
          <p className="ios-section-header">Места</p>
          <div className="ios-grouped-card divide-y divide-ios-separator">
            {card.places.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => pick(place)}
                className="ios-cell-button"
              >
                <MapPin className="h-5 w-5 text-theme shrink-0" strokeWidth={2} />
                <span className="ios-cell-title flex-1 text-left">{place.name}</span>
                <ChevronRight className="h-5 w-5 ios-cell-chevron" strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      )}

      {!customMode ? (
        <button
          type="button"
          onClick={() => setCustomMode(true)}
          className="ios-btn-gray w-full mb-4 gap-2"
        >
          <Plus className="h-4 w-4" />
          Своё место
        </button>
      ) : (
        <div className="ios-group mb-4">
          <p className="ios-section-header">Своё место</p>
          <div className="ios-grouped-card p-1 mb-3">
            <input
              type="text"
              value={localCustom}
              onChange={(e) => setLocalCustom(e.target.value)}
              placeholder="Адрес или название"
              className="ios-input-field"
              autoFocus
            />
          </div>
          <button
            type="button"
            onClick={() => localCustom.trim() && pick({ id: 'custom', name: localCustom.trim(), custom: true })}
            disabled={!localCustom.trim()}
            className="ios-btn-filled w-full gap-2 disabled:opacity-40"
          >
            <Check className="h-4 w-4" />
            Продолжить
          </button>
        </div>
      )}

      {card.places.length === 0 && !customMode && (
        <button type="button" onClick={() => pick(null)} className="ios-btn-plain mx-auto block mb-4">
          Пропустить
        </button>
      )}

      <button type="button" onClick={() => setRecipientStep(1)} className="ios-btn-plain mx-auto block">
        Назад
      </button>
    </div>
  );
}

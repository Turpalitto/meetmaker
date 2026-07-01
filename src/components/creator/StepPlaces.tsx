'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Plus, X, MapPin } from 'lucide-react';

const PLACE_SUGGESTIONS = [
  "Traveler's Coffee",
  'Додо Пицца',
  'Парк Победы',
  'Кинотеатр',
  'Дом',
];

export function StepPlaces() {
  const places = useMeetingStore((s) => s.places);
  const addPlace = useMeetingStore((s) => s.addPlace);
  const removePlace = useMeetingStore((s) => s.removePlace);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const currentPlaceInput = useMeetingStore((s) => s.currentPlaceInput);
  const setCurrentPlaceInput = useMeetingStore((s) => s.setCurrentPlaceInput);

  const handleAddPlace = (name: string) => {
    if (name.trim()) addPlace(name.trim());
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative mb-6">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
        <input
          type="text"
          value={currentPlaceInput}
          onChange={(e) => setCurrentPlaceInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && currentPlaceInput.trim()) {
              handleAddPlace(currentPlaceInput.trim());
            }
          }}
          placeholder="Введите место встречи..."
          className="premium-input pl-12 pr-12"
          autoFocus
        />
        {currentPlaceInput.trim() && (
          <button
            type="button"
            onClick={() => handleAddPlace(currentPlaceInput.trim())}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white"
            style={{ background: 'var(--mm-accent)' }}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {PLACE_SUGGESTIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleAddPlace(name)}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-theme-soft hover:scale-105 text-sm transition-all suggestion-pop"
          >
            + {name}
          </button>
        ))}
      </div>

      {places.length > 0 && (
        <div className="space-y-3 mb-8">
          {places.map((place) => (
            <div key={place.id} className="date-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-theme-soft flex items-center justify-center">
                <MapPin className="h-5 w-5 text-theme" />
              </div>
              <span className="flex-1 text-white font-medium">{place.name}</span>
              <button type="button" onClick={() => removePlace(place.id)} className="p-2 text-white/40 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setCurrentStep(2)} className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white/60">
          Назад
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          disabled={places.length === 0}
          className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white border border-white/20 disabled:opacity-30"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

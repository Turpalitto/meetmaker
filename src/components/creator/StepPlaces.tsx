'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
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
      <div className="ios-group mb-4">
        <p className="ios-section-header">Место</p>
        <div className="ios-grouped-card flex items-center pr-2">
          <MapPin className="h-5 w-5 text-theme ml-3 shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={currentPlaceInput}
            onChange={(e) => setCurrentPlaceInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentPlaceInput.trim()) {
                handleAddPlace(currentPlaceInput.trim());
              }
            }}
            placeholder="Введите место встречи"
            className="ios-input-field flex-1"
            autoFocus
          />
          {currentPlaceInput.trim() && (
            <button
              type="button"
              onClick={() => handleAddPlace(currentPlaceInput.trim())}
              className="ios-checkmark !w-8 !h-8"
            >
              <Plus className="h-4 w-4" style={{ color: 'var(--mm-on-accent)' }} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      <div className="ios-group mb-6">
        <p className="ios-section-header">Подсказки</p>
        <div className="ios-grouped-card divide-y divide-ios-separator">
          {PLACE_SUGGESTIONS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => handleAddPlace(name)}
              className="ios-cell-button"
            >
              <span className="ios-cell-title flex-1">{name}</span>
              <Plus className="h-4 w-4 text-theme" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>

      {places.length > 0 && (
        <div className="ios-group mb-6">
          <p className="ios-section-header">Добавлено</p>
          <div className="ios-grouped-card divide-y divide-ios-separator">
            {places.map((place) => (
              <div key={place.id} className="ios-cell-static">
                <MapPin className="h-5 w-5 text-theme shrink-0" strokeWidth={2} />
                <span className="ios-cell-title flex-1">{place.name}</span>
                <button type="button" onClick={() => removePlace(place.id)} className="mm-text-button !min-h-0 !p-1" style={{ color: 'var(--mm-ink-faint)' }}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <WizardActions
        onBack={() => setCurrentStep(2)}
        onContinue={() => setCurrentStep(4)}
        continueDisabled={places.length === 0}
      />
    </div>
  );
}

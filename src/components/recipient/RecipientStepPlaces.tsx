'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { MapPin, Check } from 'lucide-react';

export function RecipientStepPlaces() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const selectedPlace = useMeetingStore((s) => s.selectedPlace);
  const setSelectedPlace = useMeetingStore((s) => s.setSelectedPlace);
  const customPlaceMode = useMeetingStore((s) => s.customPlaceMode);
  const setCustomPlaceMode = useMeetingStore((s) => s.setCustomPlaceMode);
  const customPlaceName = useMeetingStore((s) => s.customPlaceName);
  const setCustomPlaceName = useMeetingStore((s) => s.setCustomPlaceName);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const [localCustom, setLocalCustom] = useState(customPlaceName);

  if (!card) return null;

  const places = card.places;

  const handleSelectPlace = (place: (typeof places)[0]) => {
    setSelectedPlace(place);
    setCustomPlaceMode(false);
    setRecipientStep(3);
  };

  const handleCustomContinue = () => {
    if (!localCustom.trim()) return;
    setCustomPlaceName(localCustom.trim());
    setSelectedPlace({
      id: 'custom',
      name: localCustom.trim(),
      custom: true,
    });
    setRecipientStep(3);
  };

  const skipPlaces = () => {
    setSelectedPlace(null);
    setRecipientStep(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
        Где встретимся?
      </h2>
      <p className="text-white/30 text-sm mb-8 font-light">
        Выбери место или предложи своё
      </p>

      {places.length > 0 && !customPlaceMode && (
        <div className="space-y-3 mb-6">
          {places.map((place, index) => {
            const isSelected = selectedPlace?.id === place.id;
            return (
              <motion.button
                key={place.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => handleSelectPlace(place)}
                className={`w-full date-card flex items-center gap-4 p-5 ${
                  isSelected ? 'selected' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-indigo-400" strokeWidth={1.5} />
                </div>
                <span className="flex-1 text-left text-white font-semibold text-lg">
                  {place.name}
                </span>
                {isSelected && (
                  <Check className="h-5 w-5 text-indigo-400" strokeWidth={3} />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {!customPlaceMode ? (
        <button
          onClick={() => setCustomPlaceMode(true)}
          className="w-full mb-4 rounded-2xl border border-dashed border-white/20 py-4 text-white/50 hover:text-white/80 hover:border-white/30 transition-colors text-sm"
        >
          + Своё место
        </button>
      ) : (
        <div className="mb-6">
          <input
            type="text"
            value={localCustom}
            onChange={(e) => setLocalCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomContinue()}
            placeholder="Например, у метро"
            className="premium-input mb-3 text-white bg-white/5 border-white/10 placeholder:text-white/25"
            autoFocus
          />
          <button
            onClick={handleCustomContinue}
            disabled={!localCustom.trim()}
            className="pill-button pill-button-primary w-full disabled:opacity-40"
          >
            Продолжить
          </button>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setRecipientStep(1)}
          className="text-white/30 hover:text-white/60 text-sm font-medium transition-colors"
        >
          ← Назад
        </button>
        {places.length === 0 && (
          <button
            onClick={skipPlaces}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            Пропустить
          </button>
        )}
      </div>
    </motion.div>
  );
}

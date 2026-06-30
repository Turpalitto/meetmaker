'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Plus, X, MapPin } from 'lucide-react';

const PLACE_SUGGESTIONS = [
  'Traveler\'s Coffee',
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
    if (name.trim()) {
      addPlace(name.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentPlaceInput.trim()) {
      handleAddPlace(currentPlaceInput.trim());
    }
  };

  const canContinue = places.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      {/* Input */}
      <div className="relative mb-6">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
        <input
          type="text"
          value={currentPlaceInput}
          onChange={(e) => setCurrentPlaceInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите место встречи..."
          className="premium-input pl-12 pr-12"
          autoFocus
        />
        {currentPlaceInput.trim() && (
          <button
            onClick={() => handleAddPlace(currentPlaceInput.trim())}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {PLACE_SUGGESTIONS.map((name) => (
          <button
            key={name}
            onClick={() => handleAddPlace(name)}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            + {name}
          </button>
        ))}
      </div>

      {/* Places list */}
      <AnimatePresence>
        {places.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 mb-8"
          >
            {places.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                className="date-card flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
                </div>
                <span className="flex-1 text-white font-medium text-base">{place.name}</span>
                <button
                  onClick={() => removePlace(place.id)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(2)}
          className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Назад
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          disabled={!canContinue}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-3 text-base font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Продолжить
        </button>
      </div>
    </motion.div>
  );
}
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { RecipientStepDates } from './RecipientStepDates';
import { RecipientStepTimes } from './RecipientStepTimes';
import { RecipientStepPlaces } from './RecipientStepPlaces';
import { RecipientStepConfirm } from './RecipientStepConfirm';
import { RecipientStepFinal } from './RecipientStepFinal';

export function RecipientFlow() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const recipientStep = useMeetingStore((s) => s.recipientStep);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);
  const resetRecipient = useMeetingStore((s) => s.resetRecipient);

  const card = currentSession?.card;
  if (!card) return null;

  const showIntro = recipientStep === -1;

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {/* Invitation card */}
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center max-w-md"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
                <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                {card.title}
              </h1>

              {/* Dates summary */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {card.dates.map((d) => (
                  <span
                    key={d.date}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
                  >
                    {new Date(d.date + 'T12:00:00').toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })}
                  </span>
                ))}
              </div>

              {/* Places summary */}
              {card.places.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {card.places.map((p) => (
                    <span
                      key={p.id}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
                    >
                      📍 {p.name}
                    </span>
                  ))}
                </div>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/30 text-sm mb-8"
              >
                Тебе приглашение. Выбери удобный вариант.
              </motion.p>

              <button
                onClick={() => setRecipientStep(0)}
                className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]"
              >
                Начать
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step indicator */}
        {recipientStep >= 0 && recipientStep < 4 && (
          <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-8 pb-4">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`step-dot ${
                      step < recipientStep ? 'completed' : ''
                    } ${step === recipientStep ? 'active' : ''}`}
                  />
                ))}
                <span className="text-white/30 text-sm font-medium ml-2">
                  {recipientStep + 1} / 4
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 0 - Choose Date */}
        {recipientStep === 0 && (
          <motion.div
            key="recipient-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <RecipientStepDates />
          </motion.div>
        )}

        {/* Step 1 - Choose Time */}
        {recipientStep === 1 && (
          <motion.div
            key="recipient-time"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <RecipientStepTimes />
          </motion.div>
        )}

        {/* Step 2 - Choose Place */}
        {recipientStep === 2 && (
          <motion.div
            key="recipient-place"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <RecipientStepPlaces />
          </motion.div>
        )}

        {/* Step 3 - Confirm */}
        {recipientStep === 3 && (
          <motion.div
            key="recipient-confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <RecipientStepConfirm />
          </motion.div>
        )}

        {/* Step 4 - Final */}
        {recipientStep >= 4 && (
          <motion.div
            key="recipient-final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <RecipientStepFinal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
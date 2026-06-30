'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Sparkles, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { RecipientStepDates } from './RecipientStepDates';
import { RecipientStepTimes } from './RecipientStepTimes';
import { RecipientStepPlaces } from './RecipientStepPlaces';
import { RecipientStepConfirm } from './RecipientStepConfirm';
import { RecipientStepFinal } from './RecipientStepFinal';

export function RecipientFlow() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const recipientStep = useMeetingStore((s) => s.recipientStep);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  const card = currentSession?.card;
  if (!card) return null;

  if (recipientStep === -1) {
    return (
      <div className="w-full max-w-md text-center py-12">
        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-8">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">{card.title}</h1>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {card.dates.map((d) => (
            <span key={d.date} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
              {formatDate(d.date)}
            </span>
          ))}
        </div>
        {card.places.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {card.places.map((p) => (
              <span key={p.id} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                📍 {p.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-white/30 text-sm mb-8">Тебе приглашение. Выбери удобный вариант.</p>
        <button
          type="button"
          onClick={() => setRecipientStep(0)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white border border-white/20"
        >
          Начать
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md py-24">
      {recipientStep >= 0 && recipientStep < 4 && (
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-8">
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className={`step-dot ${step < recipientStep ? 'completed' : ''} ${step === recipientStep ? 'active' : ''}`} />
            ))}
            <span className="text-white/50 text-sm ml-2">{recipientStep + 1} / 4</span>
          </div>
        </div>
      )}

      {recipientStep === 0 && <RecipientStepDates />}
      {recipientStep === 1 && <RecipientStepTimes />}
      {recipientStep === 2 && <RecipientStepPlaces />}
      {recipientStep === 3 && <RecipientStepConfirm />}
      {recipientStep >= 4 && <RecipientStepFinal />}
    </div>
  );
}

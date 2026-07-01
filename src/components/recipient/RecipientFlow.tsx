'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ArrowRight } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { ThemeHeroIcon } from '@/components/ThemeHeroIcon';
import { StaggerItem, StepTransition } from '@/components/StepTransition';
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

  const theme = card.theme;
  const config = getThemeConfig(theme);

  if (recipientStep === -1) {
    return (
      <div data-theme={theme} className="w-full">
      <StepTransition stepKey="intro" className="w-full max-w-md text-center py-12 mx-auto">
        <ThemeHeroIcon theme={theme} size="lg" celebrate className="mb-8" />

        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight animate-in fade-in duration-500 delay-100 fill-mode-both">
          {card.title}
        </h1>
        <p className="text-white/30 text-sm mb-6 animate-in fade-in duration-500 delay-200 fill-mode-both">
          {config.emoji} Тебе приглашение — выбери удобный вариант
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {card.dates.map((d, i) => (
            <StaggerItem key={d.date} index={i}>
              <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                {formatDateShort(d.date)}
              </span>
            </StaggerItem>
          ))}
        </div>

        {card.places.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {card.places.map((p, i) => (
              <StaggerItem key={p.id} index={i + card.dates.length}>
                <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
                  📍 {p.name}
                </span>
              </StaggerItem>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setRecipientStep(0)}
          className="group inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both"
        >
          Начать
          <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </StepTransition>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md py-24 mx-auto" data-theme={theme}>
      {recipientStep >= 0 && recipientStep < 4 && (
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-8">
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`step-dot ${step < recipientStep ? 'completed' : ''} ${step === recipientStep ? 'active' : ''}`}
              />
            ))}
            <span className="text-white/50 text-sm ml-2">{recipientStep + 1} / 4</span>
          </div>
        </div>
      )}

      {recipientStep === 0 && (
        <StepTransition stepKey="dates">
          <RecipientStepDates />
        </StepTransition>
      )}
      {recipientStep === 1 && (
        <StepTransition stepKey="times">
          <RecipientStepTimes />
        </StepTransition>
      )}
      {recipientStep === 2 && (
        <StepTransition stepKey="places">
          <RecipientStepPlaces />
        </StepTransition>
      )}
      {recipientStep === 3 && (
        <StepTransition stepKey="confirm">
          <RecipientStepConfirm />
        </StepTransition>
      )}
      {recipientStep >= 4 && (
        <StepTransition stepKey="final">
          <RecipientStepFinal />
        </StepTransition>
      )}
    </div>
  );
}

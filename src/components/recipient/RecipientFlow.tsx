'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ArrowRight } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import { getThemeConfig, themeGradientClass } from '@/lib/themes';
import { PostcardFrame } from '@/components/PostcardFrame';
import { StaggerItem, StepTransition } from '@/components/StepTransition';
import { RecipientStepDates } from './RecipientStepDates';
import { RecipientStepTimes } from './RecipientStepTimes';
import { RecipientStepPlaces } from './RecipientStepPlaces';
import { RecipientStepConfirm } from './RecipientStepConfirm';
import { RecipientStepFinal } from './RecipientStepFinal';
import { cn } from '@/lib/utils';

export function RecipientFlow() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const recipientStep = useMeetingStore((s) => s.recipientStep);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  const card = currentSession?.card;
  if (!card) return null;

  const theme = card.theme;
  const config = getThemeConfig(theme);
  const gradient = themeGradientClass(theme);

  if (recipientStep === -1) {
    return (
      <div data-theme={theme} className="w-full py-6">
        <StepTransition stepKey="intro" className="w-full max-w-md mx-auto">
          <PostcardFrame theme={theme} ribbon>
            <div className="text-center">
              <div
                className={cn(
                  'w-20 h-20 rounded-[1.75rem] bg-gradient-to-br flex items-center justify-center mx-auto mb-6 success-pop shadow-2xl',
                  gradient,
                )}
                style={{ boxShadow: '0 20px 50px var(--mm-accent-glow)' }}
              >
                <span className="text-4xl">{config.emoji}</span>
              </div>

              <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-3">
                Приглашение
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
                {card.title}
              </h1>

              <p className="text-white/45 text-sm mb-8">{config.tagline}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {card.dates.map((d, i) => (
                  <StaggerItem key={d.date} index={i}>
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/70 text-sm backdrop-blur-sm">
                      📅 {formatDateShort(d.date)}
                    </span>
                  </StaggerItem>
                ))}
              </div>

              {card.places.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {card.places.map((p, i) => (
                    <StaggerItem key={p.id} index={i + card.dates.length}>
                      <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/70 text-sm backdrop-blur-sm">
                        📍 {p.name}
                      </span>
                    </StaggerItem>
                  ))}
                </div>
              )}

              <p className="text-white/35 text-sm mb-8">
                Выбери удобный вариант — это займёт минуту
              </p>

              <button
                type="button"
                onClick={() => setRecipientStep(0)}
                className="pill-button pill-button-primary w-full flex items-center justify-center gap-2 text-base py-4"
              >
                Начать
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </PostcardFrame>
        </StepTransition>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md py-16 mx-auto" data-theme={theme}>
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

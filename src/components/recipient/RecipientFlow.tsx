'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { ArrowRight } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import { getThemeConfig, greetingForRecipient } from '@/lib/themes';
import { resolveCardAppearance } from '@/lib/appearance';
import { PostcardFrame } from '@/components/PostcardFrame';
import { PostcardDecorations } from '@/components/PostcardDecorations';
import { StepIndicator } from '@/components/creator/StepIndicator';
import { StaggerItem, StepTransition } from '@/components/StepTransition';
import { RecipientStepDates } from './RecipientStepDates';
import { RecipientStepTimes } from './RecipientStepTimes';
import { RecipientStepPlaces } from './RecipientStepPlaces';
import { RecipientStepConfirm } from './RecipientStepConfirm';
import { RecipientStepFinal } from './RecipientStepFinal';

const RECIPIENT_LABELS = ['Когда удобно?', 'Во сколько?', 'Где встретимся?', 'Всё верно?'];

export function RecipientFlow() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const recipientStep = useMeetingStore((s) => s.recipientStep);
  const setRecipientStep = useMeetingStore((s) => s.setRecipientStep);

  const card = currentSession?.card;
  if (!card) return null;

  const theme = card.theme;
  const config = getThemeConfig(theme);
  const appearance = resolveCardAppearance(card);
  const greeting = greetingForRecipient(card.recipientName);

  if (recipientStep === -1) {
    return (
      <div data-theme={theme} data-appearance={appearance} className="w-full relative">
        <PostcardDecorations theme={theme} />
        <StepTransition stepKey="intro" className="w-full max-w-md mx-auto relative z-10">
          <PostcardFrame theme={theme} variant="elevated" ribbon appearance={appearance}>
            <div
              className="md-icon-badge md-icon-float mx-auto mb-5"
              style={{ backgroundColor: config.primaryContainer, color: config.onPrimaryContainer }}
            >
              <span className="text-3xl">{config.emoji}</span>
            </div>

            <p className="md-postcard-greeting text-center mb-2 md-reveal">{greeting}</p>
            <h1 className="md-postcard-title text-center mb-3 md-reveal md-reveal-d1">{card.title}</h1>

            {card.personalNote ? (
              <blockquote className="postcard-note mb-6 md-reveal md-reveal-d2">
                {card.personalNote}
              </blockquote>
            ) : (
              <p className="md-body-muted text-center mb-6 md-reveal md-reveal-d2">
                {config.tagline}
              </p>
            )}

            <p className="md-overline text-center mb-3 md-reveal md-reveal-d3">Варианты</p>
            <div className="md-elevated-card divide-y divide-md-outline overflow-hidden p-0 mb-6">
              {card.dates.map((d, i) => (
                <StaggerItem key={d.date} index={i}>
                  <div className="md-list-item">
                    <span className="md-list-title flex-1">📅 {formatDateShort(d.date)}</span>
                    <span className="md-list-subtitle">{d.times.length} времени</span>
                  </div>
                </StaggerItem>
              ))}
              {card.places.map((p, i) => (
                <StaggerItem key={p.id} index={i + card.dates.length}>
                  <div className="md-list-item">
                    <span className="md-list-title flex-1">📍 {p.name}</span>
                  </div>
                </StaggerItem>
              ))}
            </div>

            <p className="md-label-small text-center mb-4 md-reveal md-reveal-d4">
              Ответь, когда будет удобно — без спешки
            </p>

            <button
              type="button"
              onClick={() => setRecipientStep(0)}
              className="md-filled-button w-full py-2.5 gap-2 md-reveal md-reveal-d5"
            >
              Выбрать вариант
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </PostcardFrame>
        </StepTransition>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-md py-12 mx-auto px-1"
      data-theme={theme}
      data-appearance={appearance}
    >
      {recipientStep >= 0 && recipientStep < 4 && (
        <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-5">
          <StepIndicator
            currentStep={recipientStep}
            totalSteps={4}
            labels={RECIPIENT_LABELS}
          />
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

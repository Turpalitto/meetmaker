'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { formatDateShort } from '@/lib/utils';
import { getThemeConfig, greetingForRecipient } from '@/lib/themes';
import { updateCardStatus } from '@/lib/api';
import { PostcardFrame } from '@/components/PostcardFrame';
import { StepIndicator } from '@/components/creator/StepIndicator';
import { StepTransition } from '@/components/StepTransition';
import { IconClock, IconPin } from '@/components/Icons';
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
  const setMeetingStatus = useMeetingStore((s) => s.setMeetingStatus);

  const card = currentSession?.card;
  if (!card) return null;

  const theme = card.theme;
  const config = getThemeConfig(theme);
  const greeting = greetingForRecipient(card.recipientName);

  const handleStartChoosing = async () => {
    setRecipientStep(0);
    if (currentSession?.status === 'created' || currentSession?.status === 'link_opened') {
      try {
        const session = await updateCardStatus(card.id, 'recipient_choosing');
        setMeetingStatus(session.status);
      } catch {
        setMeetingStatus('recipient_choosing');
      }
    }
  };

  if (recipientStep === -1) {
    return (
      <div data-theme={theme} className="w-full relative max-w-lg mx-auto">
        <StepTransition stepKey="intro" className="w-full">
          <PostcardFrame theme={theme} showStamp>
            <p className="mm-eyebrow mm-fade">
              {card.recipientName ? `Для тебя, ${card.recipientName}` : greeting}
            </p>
            <h1 className="mm-postcard-title mm-rise mm-delay-1 mt-4">{card.title}</h1>

            {card.personalNote ? (
              <p
                className="mm-serif-quote mm-rise mm-delay-2 mt-5 text-lg"
                style={{ color: 'var(--mm-ink-soft)' }}
              >
                «{card.personalNote}»
              </p>
            ) : (
              <p className="mm-rise mm-delay-2 mt-5 text-sm" style={{ color: 'var(--mm-ink-soft)' }}>
                {config.tagline}
              </p>
            )}

            <div className="mm-rise mm-delay-3 mm-flourish my-6">
              <span className="mm-flourish-mark" aria-hidden>
                ◆
              </span>
            </div>

            <div className="mm-rise mm-delay-3">
              <p className="mm-eyebrow mb-3">Варианты</p>
              <div className="flex flex-wrap gap-2">
                {card.dates.map((d) => (
                  <span key={d.date} className="mm-chip">
                    <IconClock className="h-3.5 w-3.5" />
                    {formatDateShort(d.date)}
                    {d.times.length > 0 && ` · ${d.times.length} времени`}
                  </span>
                ))}
                {card.places.map((p) => (
                  <span key={p.id} className="mm-chip">
                    <IconPin className="h-3.5 w-3.5" />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleStartChoosing()}
              className="mm-filled-button mm-rise mm-delay-4 mt-8 w-full"
            >
              Выбрать время
            </button>
          </PostcardFrame>
        </StepTransition>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl py-4 mx-auto px-1" data-theme={theme}>
      {recipientStep >= 0 && recipientStep < 4 && (
        <div className="mb-8">
          <StepIndicator
            currentStep={recipientStep}
            totalSteps={4}
            labels={RECIPIENT_LABELS}
          />
        </div>
      )}

      <div className="mm-card p-6">
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
    </div>
  );
}

'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { StepIndicator } from './StepIndicator';
import { StepTitle } from './StepTitle';
import { StepName } from './StepName';
import { StepDates } from './StepDates';
import { StepTimes } from './StepTimes';
import { StepPlaces } from './StepPlaces';
import { StepTheme } from './StepTheme';
import { StepReady } from './StepReady';
import { StepTransition } from '@/components/StepTransition';
import Link from 'next/link';
import type { ThemeType } from '@/types';

const TOTAL_STEPS = 5;

const stepTitles = [
  { title: 'Расскажи о встрече', subtitle: 'Название, обращение и пару тёплых слов' },
  { title: 'Когда тебе удобно?', subtitle: 'Предложи несколько дат — пусть выберет' },
  { title: 'Во сколько?', subtitle: 'Добавь варианты времени на каждый день' },
  { title: 'Где встретитесь?', subtitle: 'Любимые места или новые открытия' },
  { title: 'Какое настроение?', subtitle: 'Свидание, кофе или прогулка' },
];

export function CreatorWizard() {
  const currentStep = useMeetingStore((s) => s.currentStep);
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const isComplete = currentStep >= TOTAL_STEPS;

  const theme: ThemeType = selectedTheme;

  return (
    <div className="relative isolate min-h-screen" data-theme={theme}>
      <div className="mx-auto max-w-xl px-5 py-8">
        {!isComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="mm-text-button text-sm" style={{ color: 'var(--mm-ink-soft)' }}>
                ← На главную
              </Link>
              <span className="mm-eyebrow">
                Шаг {currentStep + 1} из {TOTAL_STEPS}
              </span>
            </div>
            <div className="mt-4">
              <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>
            <div className="mt-6">
              <StepTitle {...stepTitles[currentStep]} />
            </div>
          </div>
        )}

        <div className="mm-card p-6 mm-fade">
          {currentStep === 0 && (
            <StepTransition stepKey={0}>
              <StepName />
            </StepTransition>
          )}
          {currentStep === 1 && (
            <StepTransition stepKey={1}>
              <StepDates />
            </StepTransition>
          )}
          {currentStep === 2 && (
            <StepTransition stepKey={2}>
              <StepTimes />
            </StepTransition>
          )}
          {currentStep === 3 && (
            <StepTransition stepKey={3}>
              <StepPlaces />
            </StepTransition>
          )}
          {currentStep === 4 && (
            <StepTransition stepKey={4}>
              <StepTheme />
            </StepTransition>
          )}
          {isComplete && (
            <StepTransition stepKey="ready">
              <StepReady />
            </StepTransition>
          )}
        </div>
      </div>
    </div>
  );
}

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
import { StepChoiceAmbience } from '@/components/StepChoiceAmbience';
import type { ThemeType } from '@/types';

const TOTAL_STEPS = 5;

const stepTitles = [
  { title: 'О чём встреча?', subtitle: 'Кофе, прогулка, кино — как душе угодно' },
  { title: 'Когда удобно?', subtitle: 'Предложи несколько дат — пусть выберет' },
  { title: 'Во сколько?', subtitle: 'Добавь варианты времени на каждый день' },
  { title: 'Где встретитесь?', subtitle: 'Любимые места или новые открытия' },
  { title: 'Настроение открытки', subtitle: 'Какой вайб хочешь передать?' },
];

export function CreatorWizard() {
  const currentStep = useMeetingStore((s) => s.currentStep);
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const isComplete = currentStep >= TOTAL_STEPS;

  const theme: ThemeType = selectedTheme;

  return (
    <div className="relative isolate min-h-screen" data-theme={theme}>
      {!isComplete && (
        <div className="fixed top-0 left-0 right-0 z-[100] px-6 pt-8 pb-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>
      )}

      <div className="relative z-[50] min-h-screen">
        {currentStep === 0 && (
          <StepTransition stepKey={0} className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
            <StepChoiceAmbience step={0}>
              <StepTitle {...stepTitles[0]} />
              <StepName />
            </StepChoiceAmbience>
          </StepTransition>
        )}

        {currentStep === 1 && (
          <StepTransition stepKey={1} className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
            <StepChoiceAmbience step={1}>
              <StepTitle {...stepTitles[1]} />
              <StepDates />
            </StepChoiceAmbience>
          </StepTransition>
        )}

        {currentStep === 2 && (
          <StepTransition stepKey={2} className="min-h-screen flex flex-col items-center px-4 pt-32 pb-12">
            <StepChoiceAmbience step={2}>
              <StepTitle {...stepTitles[2]} />
              <StepTimes />
            </StepChoiceAmbience>
          </StepTransition>
        )}

        {currentStep === 3 && (
          <StepTransition stepKey={3} className="min-h-screen flex flex-col items-center px-4 pt-32 pb-12">
            <StepChoiceAmbience step={3}>
              <StepTitle {...stepTitles[3]} />
              <StepPlaces />
            </StepChoiceAmbience>
          </StepTransition>
        )}

        {currentStep === 4 && (
          <StepTransition stepKey={4} className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
            <StepChoiceAmbience step={4}>
              <StepTitle {...stepTitles[4]} />
              <StepTheme />
            </StepChoiceAmbience>
          </StepTransition>
        )}

        {isComplete && (
          <StepTransition stepKey="ready" className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <StepReady />
          </StepTransition>
        )}
      </div>
    </div>
  );
}

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

const TOTAL_STEPS = 5;

const stepTitles = [
  'Как назовем встречу?',
  'Добавь даты',
  'Добавь время',
  'Добавь места',
  'Выбери оформление',
];

export function CreatorWizard() {
  const currentStep = useMeetingStore((s) => s.currentStep);
  const isComplete = currentStep >= TOTAL_STEPS;

  return (
    <div className="relative isolate min-h-screen">
      {!isComplete && (
        <div className="fixed top-0 left-0 right-0 z-[100] px-6 pt-8 pb-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>
      )}

      <div className="relative z-[50] min-h-screen">
        {currentStep === 0 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
            <StepTitle title={stepTitles[0]} />
            <StepName />
          </div>
        )}

        {currentStep === 1 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
            <StepTitle title={stepTitles[1]} />
            <StepDates />
          </div>
        )}

        {currentStep === 2 && (
          <div className="min-h-screen flex flex-col items-center px-6 pt-32 pb-12">
            <StepTitle title={stepTitles[2]} />
            <StepTimes />
          </div>
        )}

        {currentStep === 3 && (
          <div className="min-h-screen flex flex-col items-center px-6 pt-32 pb-12">
            <StepTitle title={stepTitles[3]} />
            <StepPlaces />
          </div>
        )}

        {currentStep === 4 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
            <StepTitle title={stepTitles[4]} />
            <StepTheme />
          </div>
        )}

        {isComplete && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <StepReady />
          </div>
        )}
      </div>
    </div>
  );
}

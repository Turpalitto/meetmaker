'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

  const isComplete = currentStep > TOTAL_STEPS;

  return (
    <div className="relative min-h-screen">
      {!isComplete && (
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-8 pb-4">
          <div className="max-w-md mx-auto">
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <StepTitle title={stepTitles[0]} />
            <StepName />
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <StepTitle title={stepTitles[1]} />
            <StepDates />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center px-6 pt-32 pb-12"
          >
            <StepTitle title={stepTitles[2]} />
            <StepTimes />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center px-6 pt-32 pb-12"
          >
            <StepTitle title={stepTitles[3]} />
            <StepPlaces />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <StepTitle title={stepTitles[4]} />
            <StepTheme />
          </motion.div>
        )}

        {isComplete && (
          <motion.div
            key="step-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center px-6"
          >
            <StepReady />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
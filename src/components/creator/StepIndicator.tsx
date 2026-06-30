'use client';

import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          className={`step-dot ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}
          animate={{
            scale: i === currentStep ? 1 : 0.9,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
      <span className="text-white/30 text-sm font-medium ml-2">
        {currentStep + 1} / {totalSteps}
      </span>
    </div>
  );
}
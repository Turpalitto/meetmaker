'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step-dot ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}
        />
      ))}
      <span className="text-white/50 text-sm font-medium ml-2">
        {currentStep + 1} / {totalSteps}
      </span>
    </div>
  );
}

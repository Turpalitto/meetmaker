'use client';

const DEFAULT_LABELS = ['Идея', 'Дата', 'Время', 'Место', 'Стиль'];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  compact?: boolean;
}

/** M3 linear progress indicator */
export function StepIndicator({
  currentStep,
  totalSteps,
  labels = DEFAULT_LABELS,
}: StepIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const label = labels[currentStep] ?? '';

  return (
    <div className="step-indicator-shell w-full max-w-xs mx-auto">
      <div className="md-linear-progress" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
        <div className="md-linear-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="md-stepper-label">
        Шаг {currentStep + 1} из {totalSteps}
        {label && <> · {label}</>}
      </p>
    </div>
  );
}

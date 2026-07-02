'use client';

const DEFAULT_LABELS = ['Идея', 'Дата', 'Время', 'Место', 'Стиль'];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  compact?: boolean;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels = DEFAULT_LABELS,
}: StepIndicatorProps) {
  const label = labels[currentStep] ?? '';

  return (
    <div className="w-full">
      <div className="mm-step-track">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className="mm-step-dot"
            data-state={i < currentStep ? 'done' : i === currentStep ? 'active' : undefined}
          />
        ))}
      </div>
      {label && (
        <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--mm-ink-faint)' }}>
          {label}
        </p>
      )}
    </div>
  );
}

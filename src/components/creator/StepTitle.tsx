'use client';

interface StepTitleProps {
  title: string;
  subtitle?: string;
}

export function StepTitle({ title, subtitle }: StepTitleProps) {
  return (
    <div className="text-center mb-2">
      <h2 className="mm-display text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--mm-ink-soft)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

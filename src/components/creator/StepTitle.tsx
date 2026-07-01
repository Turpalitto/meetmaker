'use client';

interface StepTitleProps {
  title: string;
  subtitle?: string;
}

export function StepTitle({ title, subtitle }: StepTitleProps) {
  return (
    <div className="md-screen-header">
      <h2 className="md-headline-emphasis">{title}</h2>
      {subtitle && <p className="md-body-muted mt-2">{subtitle}</p>}
    </div>
  );
}

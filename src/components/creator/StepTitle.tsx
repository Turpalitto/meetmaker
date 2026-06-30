'use client';

interface StepTitleProps {
  title: string;
  subtitle?: string;
}

export function StepTitle({ title, subtitle }: StepTitleProps) {
  return (
    <div className="text-center mb-10 w-full max-w-md">
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/40 text-lg font-light mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
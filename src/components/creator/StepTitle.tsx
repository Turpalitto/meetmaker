'use client';

interface StepTitleProps {
  title: string;
  subtitle?: string;
}

export function StepTitle({ title, subtitle }: StepTitleProps) {
  return (
    <div className="text-center mb-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/40 text-base sm:text-lg font-light mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}

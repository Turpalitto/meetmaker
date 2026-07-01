'use client';

import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  theme?: 'minimal' | 'coffee' | 'romantic';
  className?: string;
}

/** M3 surface background with subtle primary tint */
export function AuroraBackground({ theme = 'romantic', className }: AuroraBackgroundProps) {
  return (
    <div className={cn('md-bg', `md-bg-${theme}`, className)} aria-hidden />
  );
}

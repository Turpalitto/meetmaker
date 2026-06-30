'use client';

import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  theme?: 'minimal' | 'coffee' | 'romantic';
  className?: string;
}

export function AuroraBackground({ theme = 'minimal', className }: AuroraBackgroundProps) {
  const themeClass = theme === 'coffee' ? 'aurora-bg-coffee' : theme === 'romantic' ? 'aurora-bg-romantic' : '';

  return (
    <div className={cn('aurora-bg', themeClass, className)}>
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
    </div>
  );
}
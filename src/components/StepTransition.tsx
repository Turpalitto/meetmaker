"use client";

import { cn } from "@/lib/utils";

interface StepTransitionProps {
  stepKey: string | number;
  children: React.ReactNode;
  className?: string;
}

/** CSS-only step entrance — safe for client-only flows (no opacity:0 stuck). */
export function StepTransition({
  stepKey,
  children,
  className,
}: StepTransitionProps) {
  return (
    <div
      key={stepKey}
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps {
  index: number;
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ index, children, className }: StaggerItemProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 duration-400 fill-mode-both",
        className,
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {children}
    </div>
  );
}

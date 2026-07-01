"use client";

import { cn } from "@/lib/utils";

interface StepTransitionProps {
  stepKey: string | number;
  children: React.ReactNode;
  className?: string;
}

/** M3 emphasized entrance — CSS only, no stuck opacity */
export function StepTransition({
  stepKey,
  children,
  className,
}: StepTransitionProps) {
  return (
    <div
      key={stepKey}
      className={cn("md-reveal", className)}
      style={{ animationDuration: "0.45s" }}
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
      className={cn("md-reveal", className)}
      style={{
        animationDelay: `${index * 60}ms`,
        animationDuration: "0.4s",
      }}
    >
      {children}
    </div>
  );
}

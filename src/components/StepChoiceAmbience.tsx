"use client";

/** iOS: no orbiting stickers — pass-through wrapper */
export function StepChoiceAmbience({
  children,
  className,
}: {
  step?: number;
  mode?: string;
  celebrate?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

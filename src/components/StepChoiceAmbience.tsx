"use client";

import { useMeetingStore } from "@/store/useMeetingStore";
import { getThemeConfig } from "@/lib/themes";
import { cn } from "@/lib/utils";

type CreatorStep = 0 | 1 | 2 | 3 | 4;

const STEP_ORBITS: Record<
  CreatorStep,
  { emoji: string; radius: string; duration: number; size: string }[]
> = {
  0: [
    { emoji: "☕", radius: "9.5rem", duration: 16, size: "text-3xl" },
    { emoji: "🎬", radius: "11rem", duration: 22, size: "text-2xl" },
    { emoji: "🌸", radius: "8rem", duration: 13, size: "text-3xl" },
    { emoji: "🕯️", radius: "10.5rem", duration: 19, size: "text-2xl" },
    { emoji: "💕", radius: "12rem", duration: 25, size: "text-4xl" },
    { emoji: "✨", radius: "7rem", duration: 11, size: "text-2xl" },
  ],
  1: [
    { emoji: "📅", radius: "10rem", duration: 15, size: "text-3xl" },
    { emoji: "🗓️", radius: "11.5rem", duration: 21, size: "text-2xl" },
    { emoji: "🌷", radius: "8.5rem", duration: 12, size: "text-3xl" },
    { emoji: "💐", radius: "12rem", duration: 24, size: "text-3xl" },
    { emoji: "✨", radius: "7.5rem", duration: 10, size: "text-2xl" },
    { emoji: "💕", radius: "9rem", duration: 18, size: "text-2xl" },
  ],
  2: [
    { emoji: "⏰", radius: "9rem", duration: 14, size: "text-3xl" },
    { emoji: "🕐", radius: "11rem", duration: 20, size: "text-2xl" },
    { emoji: "☕", radius: "8rem", duration: 12, size: "text-3xl" },
    { emoji: "🌙", radius: "12rem", duration: 26, size: "text-3xl" },
    { emoji: "✨", radius: "7rem", duration: 9, size: "text-2xl" },
    { emoji: "💫", radius: "10.5rem", duration: 17, size: "text-2xl" },
  ],
  3: [
    { emoji: "📍", radius: "9.5rem", duration: 15, size: "text-3xl" },
    { emoji: "☕", radius: "11rem", duration: 22, size: "text-3xl" },
    { emoji: "🌳", radius: "8rem", duration: 11, size: "text-2xl" },
    { emoji: "🎬", radius: "12rem", duration: 25, size: "text-2xl" },
    { emoji: "🏠", radius: "7.5rem", duration: 10, size: "text-2xl" },
    { emoji: "💕", radius: "10rem", duration: 18, size: "text-3xl" },
  ],
  4: [],
};

const CORNER_DRIFT = ["✨", "💫", "♡", "✦"];

interface StepChoiceAmbienceProps {
  step: CreatorStep;
  children: React.ReactNode;
  className?: string;
}

export function StepChoiceAmbience({
  step,
  children,
  className,
}: StepChoiceAmbienceProps) {
  const theme = useMeetingStore((s) => s.selectedTheme);
  const config = getThemeConfig(theme);

  const orbitItems =
    step === 4
      ? config.stickers.slice(0, 6).map((emoji, i) => ({
          emoji,
          radius: `${7.5 + i * 0.8}rem`,
          duration: 12 + i * 2,
          size: i % 2 === 0 ? "text-3xl" : "text-2xl",
        }))
      : STEP_ORBITS[step];

  return (
    <div className={cn("choice-stage relative w-full max-w-lg mx-auto", className)}>
      <div className="choice-pulse-ring" aria-hidden />
      <div className="choice-pulse-ring choice-pulse-ring-delayed" aria-hidden />

      <div className="choice-orbit-layer" aria-hidden>
        {orbitItems.map((item, i) => (
          <span
            key={`${step}-orbit-${i}`}
            className={cn("choice-orbit-item sticker-glow", item.size)}
            style={
              {
                "--orbit-r": item.radius,
                "--orbit-d": `${item.duration}s`,
                "--orbit-delay": `-${(i / orbitItems.length) * item.duration}s`,
              } as React.CSSProperties
            }
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {CORNER_DRIFT.map((emoji, i) => (
        <span
          key={`drift-${i}`}
          className={cn(
            "choice-drift sticker-glow absolute text-xl opacity-60 pointer-events-none select-none",
            i === 0 && "top-0 left-2",
            i === 1 && "top-4 right-0",
            i === 2 && "bottom-6 left-0",
            i === 3 && "bottom-0 right-4",
          )}
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          {step === 4 ? config.stickers[i % config.stickers.length] : emoji}
        </span>
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

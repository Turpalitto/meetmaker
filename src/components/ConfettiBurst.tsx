"use client";

import { useMemo } from "react";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface ConfettiBurstProps {
  theme: ThemeType;
  active?: boolean;
}

export function ConfettiBurst({ theme, active = true }: ConfettiBurstProps) {
  const config = getThemeConfig(theme);

  const particles = useMemo(() => {
    const shapes = [config.emoji, "●", "◆", "✦"];
    return Array.from({ length: 18 }, (_, i) => ({
      char: shapes[i % shapes.length],
      left: `${6 + ((i * 19) % 88)}%`,
      top: `${0 + ((i * 13) % 25)}%`,
      delay: `${i * 0.06}s`,
      size: i % 3 === 0 ? "text-2xl" : "text-sm",
      color: i % 4 === 1 ? "var(--mm-accent)" : undefined,
    }));
  }, [config.emoji]);

  if (!active) return null;

  return (
    <div className="confetti-burst pointer-events-none" aria-hidden>
      {particles.map((s, i) => (
        <span
          key={i}
          className={`absolute select-none ${s.size}`}
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            color: s.color,
            opacity: s.char === "●" ? 0.7 : 1,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}

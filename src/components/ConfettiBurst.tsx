"use client";

import { useMemo } from "react";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface ConfettiBurstProps {
  theme: ThemeType;
  active?: boolean;
}

export function ConfettiBurst({ theme, active = true }: ConfettiBurstProps) {
  const stickers = useMemo(() => {
    const pool = getThemeConfig(theme).stickers;
    return Array.from({ length: 12 }, (_, i) => ({
      emoji: pool[i % pool.length],
      left: `${8 + (i * 7) % 84}%`,
      delay: `${i * 0.12}s`,
    }));
  }, [theme]);

  if (!active) return null;

  return (
    <div className="confetti-burst" aria-hidden>
      {stickers.map((s, i) => (
        <span
          key={i}
          style={{ left: s.left, top: "10%", animationDelay: s.delay }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}

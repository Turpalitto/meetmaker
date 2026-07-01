"use client";

import { useMemo } from "react";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface ConfettiBurstProps {
  theme: ThemeType;
  active?: boolean;
}

export function ConfettiBurst({ theme, active = true }: ConfettiBurstProps) {
  const particles = useMemo(() => {
    const pool = getThemeConfig(theme).stickers;
    return Array.from({ length: 24 }, (_, i) => ({
      emoji: pool[i % pool.length],
      left: `${4 + ((i * 17) % 92)}%`,
      top: `${5 + ((i * 11) % 40)}%`,
      delay: `${i * 0.08}s`,
      size: i % 3 === 0 ? "text-3xl" : i % 3 === 1 ? "text-2xl" : "text-xl",
    }));
  }, [theme]);

  if (!active) return null;

  return (
    <div className="confetti-burst" aria-hidden>
      {particles.map((s, i) => (
        <span
          key={i}
          className={`sticker-glow ${s.size}`}
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}

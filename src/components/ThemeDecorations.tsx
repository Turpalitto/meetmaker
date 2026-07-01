"use client";

import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

const FLOATERS = [
  { top: "5%", left: "4%", size: "text-5xl sm:text-6xl", delay: "0s", rotate: "-12deg" },
  { top: "12%", right: "3%", size: "text-6xl sm:text-7xl", delay: "0.8s", rotate: "8deg" },
  { bottom: "18%", left: "2%", size: "text-4xl sm:text-5xl", delay: "1.6s", rotate: "6deg" },
  { bottom: "8%", right: "5%", size: "text-5xl sm:text-6xl", delay: "2.2s", rotate: "-8deg" },
  { top: "38%", left: "1%", size: "text-3xl sm:text-4xl", delay: "1.2s", rotate: "-4deg" },
  { top: "52%", right: "2%", size: "text-4xl sm:text-5xl", delay: "2.8s", rotate: "10deg" },
  { top: "72%", left: "8%", size: "text-3xl", delay: "3.4s", rotate: "5deg" },
  { top: "28%", right: "12%", size: "text-3xl sm:text-4xl", delay: "0.4s", rotate: "-6deg" },
];

interface ThemeDecorationsProps {
  theme: ThemeType;
  intensity?: "subtle" | "normal" | "bold";
}

export function ThemeDecorations({
  theme,
  intensity = "normal",
}: ThemeDecorationsProps) {
  const config = getThemeConfig(theme);
  const opacity =
    intensity === "subtle"
      ? "opacity-50"
      : intensity === "bold"
        ? "opacity-90"
        : "opacity-70";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      {/* Ambient glow orbs */}
      <div className="theme-ambient-orb theme-ambient-orb-1" />
      <div className="theme-ambient-orb theme-ambient-orb-2" />

      {FLOATERS.map((pos, i) => {
        const sticker = config.stickers[i % config.stickers.length];
        const style: React.CSSProperties = {
          animationDelay: pos.delay,
          transform: `rotate(${pos.rotate})`,
          ...(pos.top ? { top: pos.top } : {}),
          ...(pos.bottom ? { bottom: pos.bottom } : {}),
          ...(pos.left ? { left: pos.left } : {}),
          ...(pos.right ? { right: pos.right } : {}),
        };
        return (
          <span
            key={`${theme}-${i}`}
            className={`absolute sticker-float sticker-glow select-none ${pos.size} ${opacity}`}
            style={style}
          >
            {sticker}
          </span>
        );
      })}
    </div>
  );
}

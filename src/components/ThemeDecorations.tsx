"use client";

import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

const POSITIONS = [
  { top: "8%", left: "6%", size: "text-3xl", delay: "0s" },
  { top: "18%", right: "8%", size: "text-4xl", delay: "1.2s" },
  { bottom: "22%", left: "10%", size: "text-2xl", delay: "2.4s" },
  { bottom: "12%", right: "12%", size: "text-3xl", delay: "0.8s" },
  { top: "42%", left: "4%", size: "text-xl", delay: "1.8s" },
  { top: "55%", right: "5%", size: "text-2xl", delay: "3s" },
];

interface ThemeDecorationsProps {
  theme: ThemeType;
  intensity?: "subtle" | "normal";
}

export function ThemeDecorations({
  theme,
  intensity = "normal",
}: ThemeDecorationsProps) {
  const config = getThemeConfig(theme);
  const opacity = intensity === "subtle" ? "opacity-[0.12]" : "opacity-[0.22]";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {POSITIONS.map((pos, i) => {
        const sticker = config.stickers[i % config.stickers.length];
        const style: React.CSSProperties = {
          animationDelay: pos.delay,
          ...(pos.top ? { top: pos.top } : {}),
          ...(pos.bottom ? { bottom: pos.bottom } : {}),
          ...(pos.left ? { left: pos.left } : {}),
          ...(pos.right ? { right: pos.right } : {}),
        };
        return (
          <span
            key={`${theme}-${i}`}
            className={`absolute sticker-float select-none ${pos.size} ${opacity}`}
            style={style}
          >
            {sticker}
          </span>
        );
      })}
    </div>
  );
}

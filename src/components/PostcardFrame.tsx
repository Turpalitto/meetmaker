"use client";

import { cn } from "@/lib/utils";
import { getThemeConfig, themeGradientClass } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface PostcardFrameProps {
  theme: ThemeType;
  children: React.ReactNode;
  className?: string;
  /** Show decorative ribbon at top */
  ribbon?: boolean;
  size?: "md" | "lg";
}

export function PostcardFrame({
  theme,
  children,
  className,
  ribbon = true,
  size = "lg",
}: PostcardFrameProps) {
  const config = getThemeConfig(theme);
  const gradient = themeGradientClass(theme);

  return (
    <div
      className={cn(
        "postcard-frame relative w-full mx-auto",
        size === "lg" ? "max-w-md" : "max-w-sm",
        className,
      )}
    >
      {/* Gradient border glow */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br opacity-90 blur-[0.5px]",
          gradient,
        )}
      />
      <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br opacity-25 blur-2xl pointer-events-none" style={{ backgroundImage: `linear-gradient(135deg, var(--mm-gradient-from), var(--mm-gradient-to))` }} />

      {/* Corner stickers */}
      {config.decor.map((emoji, i) => (
        <span
          key={i}
          className={cn(
            "postcard-corner-sticker absolute text-3xl sm:text-4xl select-none pointer-events-none",
            i === 0 && "-top-3 -left-2 -rotate-12",
            i === 1 && "-top-2 -right-1 rotate-12",
            i === 2 && "-bottom-2 -left-1 rotate-6",
            i === 3 && "-bottom-3 -right-2 -rotate-6",
          )}
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          {emoji}
        </span>
      ))}

      <div className="postcard-inner relative rounded-[2rem] overflow-hidden">
        {ribbon && (
          <div className={cn("postcard-ribbon bg-gradient-to-r text-center py-2.5 px-4", gradient)}>
            <p className="text-white/90 text-xs font-medium tracking-[0.2em] uppercase">
              {config.ribbon}
            </p>
          </div>
        )}

        <div className="postcard-body relative px-6 py-8 sm:px-8 sm:py-10">
          {/* Subtle inner shine */}
          <div className="postcard-shine pointer-events-none" aria-hidden />
          {children}
        </div>
      </div>
    </div>
  );
}

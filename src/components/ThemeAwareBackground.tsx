"use client";

import { AuroraBackground } from "@/components/AuroraBackground";
import { ThemeDecorations } from "@/components/ThemeDecorations";
import { useMeetingStore } from "@/store/useMeetingStore";
import type { ThemeType } from "@/types";

interface ThemeAwareBackgroundProps {
  theme?: ThemeType;
  showDecorations?: boolean;
}

export function ThemeAwareBackground({
  theme: themeProp,
  showDecorations = true,
}: ThemeAwareBackgroundProps) {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const theme: ThemeType = themeProp ?? selectedTheme;

  return (
    <>
      <AuroraBackground theme={theme} className="-z-10" />
      {showDecorations && (
        <ThemeDecorations theme={theme} intensity="subtle" />
      )}
    </>
  );
}

"use client";

import { AuroraBackground } from "@/components/AuroraBackground";
import { ThemeDecorations } from "@/components/ThemeDecorations";
import { useMeetingStore } from "@/store/useMeetingStore";
import type { ThemeType } from "@/types";

interface ThemeAwareBackgroundProps {
  /** Override theme (recipient/status pages). */
  theme?: ThemeType;
  /** Show floating stickers from step 4 in creator flow. */
  showDecorations?: boolean;
}

export function ThemeAwareBackground({
  theme: themeProp,
  showDecorations = true,
}: ThemeAwareBackgroundProps) {
  const currentStep = useMeetingStore((s) => s.currentStep);
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const isComplete = currentStep >= 5;

  const theme: ThemeType =
    themeProp ?? (currentStep >= 4 || isComplete ? selectedTheme : "minimal");

  const decorationsOn =
    showDecorations && (themeProp != null || currentStep >= 4 || isComplete);

  return (
    <>
      <AuroraBackground theme={theme} className="-z-10" />
      {decorationsOn && (
        <ThemeDecorations
          theme={theme}
          intensity={themeProp ? "normal" : "subtle"}
        />
      )}
    </>
  );
}

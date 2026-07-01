"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardActionsProps {
  onBack?: () => void;
  onContinue?: () => void;
  backLabel?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
  showBack?: boolean;
  showContinue?: boolean;
  className?: string;
}

export function WizardActions({
  onBack,
  onContinue,
  backLabel = "Назад",
  continueLabel = "Продолжить",
  continueDisabled = false,
  showBack = true,
  showContinue = true,
  className,
}: WizardActionsProps) {
  return (
    <div className={cn("md-actions", className)}>
      {showBack && onBack && (
        <button type="button" onClick={onBack} className="md-text-button">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {backLabel}
        </button>
      )}
      {showContinue && onContinue && (
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className="md-filled-button flex-1 sm:flex-none sm:min-w-[10rem] gap-2 disabled:opacity-40"
        >
          {continueLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

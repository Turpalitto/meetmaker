'use client';

import { CreatorWizard } from "@/components/creator/CreatorWizard";
import { useMeetingStore } from "@/store/useMeetingStore";

export function CreatePageClient() {
  const theme = useMeetingStore((s) => s.selectedTheme);

  return (
    <main className="mm-page scene-page relative min-h-screen w-full" data-theme={theme}>
      <CreatorWizard />
    </main>
  );
}


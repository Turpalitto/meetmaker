'use client';

import dynamic from 'next/dynamic';
import { ThemeAwareBackground } from '@/components/ThemeAwareBackground';
import { useMeetingStore } from '@/store/useMeetingStore';

const CreatorWizard = dynamic(
  () =>
    import('@/components/creator/CreatorWizard').then((mod) => mod.CreatorWizard),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <p className="md-body-muted text-lg">Загрузка…</p>
      </div>
    ),
  },
);

export default function CreatePage() {
  const theme = useMeetingStore((s) => s.selectedTheme);
  const appearance = useMeetingStore((s) => s.cardAppearance);

  return (
    <main
      className="scene-page relative min-h-screen w-full"
      data-theme={theme}
      data-appearance={appearance}
    >
      <ThemeAwareBackground theme={theme} />
      <CreatorWizard />
    </main>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { ThemeAwareBackground } from '@/components/ThemeAwareBackground';

const CreatorWizard = dynamic(
  () =>
    import('@/components/creator/CreatorWizard').then((mod) => mod.CreatorWizard),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-lg animate-pulse">Загрузка…</p>
      </div>
    ),
  },
);

export default function CreatePage() {
  return (
    <main className="scene-page scene-vignette relative min-h-screen w-full" data-theme="romantic">
      <ThemeAwareBackground theme="romantic" />
      <CreatorWizard />
    </main>
  );
}

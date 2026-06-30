'use client';

import dynamic from 'next/dynamic';
import { AuroraBackground } from '@/components/AuroraBackground';

const CreatorWizard = dynamic(
  () =>
    import('@/components/creator/CreatorWizard').then((mod) => mod.CreatorWizard),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50 text-lg">Загрузка…</p>
      </div>
    ),
  },
);

export default function CreatePage() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <AuroraBackground className="-z-10" />
      <CreatorWizard />
    </main>
  );
}

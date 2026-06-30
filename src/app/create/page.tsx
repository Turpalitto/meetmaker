'use client';

import { AuroraBackground } from '@/components/AuroraBackground';
import { CreatorWizard } from '@/components/creator/CreatorWizard';
import { motion } from 'framer-motion';

export default function CreatePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <AuroraBackground />
      <div className="relative z-10 min-h-screen">
        <CreatorWizard />
      </div>
    </main>
  );
}
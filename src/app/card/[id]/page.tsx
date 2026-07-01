'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AuroraBackground } from '@/components/AuroraBackground';
import { ThemeDecorations } from '@/components/ThemeDecorations';
import { useMeetingStore } from '@/store/useMeetingStore';
import { fetchCard, markCardOpened } from '@/lib/api';

const RecipientFlow = dynamic(
  () => import('@/components/recipient/RecipientFlow').then((m) => m.RecipientFlow),
  { ssr: false, loading: () => <p className="text-white/40 text-lg">Загрузка…</p> },
);

export default function CardPage() {
  const params = useParams();
  const id = params?.id as string;
  const loadSession = useMeetingStore((s) => s.loadSession);
  const currentSession = useMeetingStore((s) => s.currentSession);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      try {
        const session = await fetchCard(id);
        if (cancelled) return;
        if (!session) {
          setNotFound(true);
          return;
        }
        loadSession(session);
        if (session.status === 'created') await markCardOpened(id);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id, loadSession]);

  const theme = currentSession?.card.theme || 'minimal';

  return (
    <main className="relative min-h-screen w-full bg-black" data-theme={theme}>
      <AuroraBackground theme={theme} className="-z-10" />
      <ThemeDecorations theme={theme} />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {loading && <p className="text-white/40 text-lg">Загрузка открытки…</p>}
        {!loading && notFound && <p className="text-white/40 text-lg">Открытка не найдена</p>}
        {!loading && currentSession && !notFound && <RecipientFlow />}
      </div>
    </main>
  );
}

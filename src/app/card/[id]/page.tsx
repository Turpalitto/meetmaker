'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AuroraBackground } from '@/components/AuroraBackground';
import { useMeetingStore } from '@/store/useMeetingStore';
import { fetchCard, markCardOpened } from '@/lib/api';
import { resolveCardAppearance } from '@/lib/appearance';

const RecipientFlow = dynamic(
  () => import('@/components/recipient/RecipientFlow').then((m) => m.RecipientFlow),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-md md-reveal">
        <div className="md-linear-progress mb-4">
          <div className="md-linear-progress-bar" style={{ width: '55%' }} />
        </div>
        <p className="md-body-muted text-center">Загрузка открытки…</p>
      </div>
    ),
  },
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

  const theme = currentSession?.card.theme || 'romantic';
  const appearance = resolveCardAppearance(currentSession?.card);

  return (
    <main
      className="scene-page relative min-h-screen w-full"
      data-theme={theme}
      data-appearance={appearance}
    >
      <AuroraBackground theme={theme} className="-z-10" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {loading && (
          <div className="w-full max-w-md md-reveal">
            <div className="md-linear-progress mb-4">
              <div className="md-linear-progress-bar" style={{ width: '45%' }} />
            </div>
            <p className="md-body-muted text-center">Загрузка открытки…</p>
          </div>
        )}
        {!loading && notFound && (
          <div className="md-filled-card p-6 max-w-sm w-full text-center md-card-enter">
            <p className="md-body-muted">Открытка не найдена</p>
          </div>
        )}
        {!loading && currentSession && !notFound && <RecipientFlow />}
      </div>
    </main>
  );
}

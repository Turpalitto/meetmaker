'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { RecipientFlow } from '@/components/recipient/RecipientFlow';
import { useMeetingStore } from '@/store/useMeetingStore';
import { fetchCard, markCardOpened } from '@/lib/api';

export default function CardPage() {
  const params = useParams();
  const id = params?.id as string;
  const loadSession = useMeetingStore((s) => s.loadSession);
  const currentSession = useMeetingStore((s) => s.currentSession);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoadError(null);
      setNotFound(false);
      try {
        const session = await fetchCard(id);
        if (cancelled) return;
        if (!session) {
          setNotFound(true);
          return;
        }
        loadSession(session);
        if (session.status === 'created') {
          void markCardOpened(id);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : 'Не удалось загрузить открытку',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id, loadSession]);

  const theme = currentSession?.card.theme || 'romantic';

  return (
    <main className="mm-page scene-page relative min-h-screen w-full" data-theme={theme}>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {loading && (
          <div className="w-full max-w-md mm-rise">
            <div className="md-linear-progress mb-4">
              <div className="md-linear-progress-bar" style={{ width: '45%' }} />
            </div>
            <p className="md-body-muted text-center">Загрузка открытки…</p>
          </div>
        )}
        {!loading && notFound && (
          <div className="mm-card p-6 max-w-sm w-full text-center mm-rise">
            <p className="md-body-muted">Открытка не найдена</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--mm-ink-faint)' }}>
              Ссылка устарела или открытка ещё не была сохранена. Создайте новую.
            </p>
            <Link href="/create" className="mm-filled-button mt-5 inline-flex">
              Создать открытку
            </Link>
          </div>
        )}
        {!loading && loadError && (
          <div className="mm-card p-6 max-w-sm w-full text-center mm-rise">
            <p style={{ color: 'var(--mm-error)' }}>{loadError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mm-ghost-button mt-4"
            >
              Повторить
            </button>
          </div>
        )}
        {!loading && currentSession && !notFound && !loadError && <RecipientFlow />}
      </div>
    </main>
  );
}

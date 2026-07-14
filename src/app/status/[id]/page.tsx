'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchCard, updateCardStatus } from '@/lib/api';
import { choiceToLabel, generateShareUrl } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { useCardRealtime } from '@/hooks/useCardRealtime';
import type { MeetingSession, MeetingStatus } from '@/types';
import { IconCheck, IconCopy, IconTelegram, IconWhatsapp } from '@/components/Icons';

const STATUS_STEPS: { key: MeetingStatus; label: string; desc: string }[] = [
  { key: 'created', label: 'Открытка создана', desc: 'Ссылка готова к отправке' },
  { key: 'link_opened', label: 'Приглашение открыто', desc: 'Получатель увидел открытку' },
  { key: 'recipient_choosing', label: 'Ждём ответ', desc: 'Ожидаем выбор удобного времени' },
  { key: 'response_received', label: 'Выбор получен', desc: 'Получатель ответил' },
  { key: 'confirmed', label: 'Встреча согласована', desc: 'Всё готово к встрече' },
];

function statusIndex(status: MeetingStatus): number {
  const order: MeetingStatus[] = [
    'created',
    'link_opened',
    'recipient_choosing',
    'response_received',
    'confirmed',
  ];
  return order.indexOf(status);
}

export default function StatusPage() {
  const params = useParams();
  const id = params?.id as string;
  const [session, setSession] = useState<MeetingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const shareUrl = useMemo(() => (id ? generateShareUrl(id) : ''), [id]);

  const handleRealtimeUpdate = useCallback((updated: MeetingSession) => {
    setSession(updated);
  }, []);

  const { active: realtimeActive, connected: realtimeConnected } = useCardRealtime(
    id,
    handleRealtimeUpdate,
  );

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const data = await fetchCard(id);
        setSession(data);
      } finally {
        setLoading(false);
      }
    }

    load();

    const pollInterval = realtimeActive ? 30000 : 5000;
    const interval = setInterval(load, pollInterval);
    return () => clearInterval(interval);
  }, [id, session?.status, realtimeActive]);

  const theme = session?.card.theme ?? 'romantic';
  const config = getThemeConfig(theme);
  const currentIdx = session ? statusIndex(session.status) : -1;
  const recipientResponded = session ? currentIdx >= statusIndex('response_received') : false;
  const confirmed = session?.status === 'confirmed';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleConfirmMeeting() {
    if (!id) return;
    setConfirming(true);
    try {
      const updated = await updateCardStatus(id, 'confirmed');
      setSession(updated);
    } catch {
      // polling will sync eventually
    } finally {
      setConfirming(false);
    }
  }

  const shareText = session
    ? `${session.card.title} — приглашение: ${shareUrl}`
    : shareUrl;

  return (
    <main className="mm-page scene-page relative min-h-screen w-full" data-theme={theme}>
      <div className="relative z-10 min-h-screen px-5 py-10 max-w-lg mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="mm-text-button text-sm" style={{ color: 'var(--mm-ink-soft)' }}>
            ← MeetMaker
          </Link>
          <div className="flex items-center gap-2">
            {realtimeConnected && (
              <span
                className="mm-chip"
                style={{ fontSize: '0.7rem', opacity: 0.7 }}
                title="Realtime-подключение активно"
              >
                live
              </span>
            )}
            {session && (
              <span className={`mm-chip ${recipientResponded ? 'mm-badge-success' : 'mm-badge-pending'}`}>
                {confirmed ? 'Встреча согласована' : recipientResponded ? 'Есть ответ' : 'Ждём ответ'}
              </span>
            )}
          </div>
        </div>

        {loading && (
          <div className="mm-rise">
            <div className="md-linear-progress mb-6">
              <div className="md-linear-progress-bar" style={{ width: '40%' }} />
            </div>
            <p className="md-body-muted text-center">Загрузка статуса…</p>
          </div>
        )}

        {!loading && !session && (
          <div className="mm-card p-6 text-center mm-rise">
            <p className="md-body-muted">Открытка не найдена</p>
          </div>
        )}

        {session && (
          <>
            <div className="mm-card p-7 mm-rise mb-5">
              <p className="mm-eyebrow">
                {config.emoji} Открытка для {session.card.recipientName || 'получателя'}
              </p>
              <h1 className="mm-display mt-3 text-3xl">
                {confirmed ? 'Встреча согласована' : recipientResponded ? 'Встреча назначена' : session.card.title}
              </h1>

              <div className="mt-7 space-y-0">
                {STATUS_STEPS.map((step, index) => {
                  const done = index <= currentIdx;
                  const pending = index === currentIdx + 1 || (index === currentIdx && !recipientResponded);
                  const last = index === STATUS_STEPS.length - 1;
                  return (
                    <div key={step.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className="mm-node"
                          data-state={done ? 'done' : pending ? 'pending' : undefined}
                        />
                        {!last && (
                          <span
                            className="my-1 w-px flex-1"
                            style={{ background: done ? 'var(--mm-accent)' : 'var(--mm-line-strong)' }}
                          />
                        )}
                      </div>
                      <div className={last ? 'pb-0' : 'pb-6'}>
                        <p className="mm-display text-base">{step.label}</p>
                        <p className="mt-0.5 text-sm" style={{ color: 'var(--mm-ink-soft)' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {session.recipientChoice && (
                <div
                  className="mt-6 rounded-[var(--mm-r-md)] p-5"
                  style={{ background: 'var(--mm-container)' }}
                >
                  <p className="mm-eyebrow" style={{ color: 'var(--mm-on-container)' }}>
                    Выбор получателя
                  </p>
                  <p className="mm-display mt-2 text-lg" style={{ color: 'var(--mm-on-container)' }}>
                    {choiceToLabel(session.recipientChoice)}
                  </p>
                  {recipientResponded && !confirmed && (
                    <button
                      type="button"
                      onClick={handleConfirmMeeting}
                      disabled={confirming}
                      className="mm-filled-button mt-4 w-full disabled:opacity-50"
                    >
                      {confirming ? 'Подтверждаем…' : 'Подтвердить встречу'}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="mm-card p-6 mm-rise mm-delay-1">
              <p className="mm-label">Ссылка на открытку</p>
              <div className="flex flex-col gap-2 sm:flex-row mt-2">
                <input className="mm-input" readOnly value={shareUrl} onFocus={(e) => e.target.select()} />
                <button type="button" className="mm-icon-btn shrink-0 justify-center sm:w-auto" onClick={copyLink}>
                  {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              </div>

              {!recipientResponded && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    className="mm-share-btn"
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(session.card.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconTelegram /> Telegram
                  </a>
                  <a
                    className="mm-share-btn"
                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWhatsapp /> WhatsApp
                  </a>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href={`/card/${session.card.id}`}
                  className="mm-text-button text-sm"
                  style={{ color: 'var(--mm-accent-strong)' }}
                >
                  Посмотреть открытку глазами получателя →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AuroraBackground } from '@/components/AuroraBackground';
import { PostcardFrame } from '@/components/PostcardFrame';
import { fetchCard } from '@/lib/api';
import { resolveCardAppearance } from '@/lib/appearance';
import { choiceToLabel, formatDateShort } from '@/lib/utils';
import type { MeetingSession, MeetingStatus } from '@/types';
import {
  ArrowLeft,
  Check,
  Clock,
  Link2,
  MessageSquare,
  Sparkles,
  UserCheck,
} from 'lucide-react';

const STATUS_STEPS: {
  key: MeetingStatus;
  label: string;
  icon: typeof Sparkles;
}[] = [
  { key: 'created', label: 'Открытка готова', icon: Sparkles },
  { key: 'link_opened', label: 'Приглашение открыто', icon: Link2 },
  { key: 'recipient_choosing', label: 'Ждём ответ', icon: Clock },
  { key: 'response_received', label: 'Выбор получен', icon: MessageSquare },
  { key: 'confirmed', label: 'Встреча согласована', icon: UserCheck },
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
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const theme = session?.card.theme ?? 'romantic';
  const appearance = resolveCardAppearance(session?.card);
  const currentIdx = session ? statusIndex(session.status) : -1;

  return (
    <main
      className="scene-page relative min-h-screen w-full overflow-hidden"
      data-theme={theme}
      data-appearance={appearance}
    >
      <AuroraBackground theme={theme} />

      <div className="relative z-10 min-h-screen px-5 py-10 max-w-lg mx-auto">
        <Link href="/" className="md-text-button mb-6 md-reveal">
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>

        {loading && (
          <div className="md-reveal">
            <div className="md-linear-progress mb-6">
              <div className="md-linear-progress-bar" style={{ width: '40%' }} />
            </div>
            <p className="md-body-muted text-center">Загрузка статуса…</p>
          </div>
        )}

        {!loading && !session && (
          <PostcardFrame theme="minimal" variant="filled" size="md">
            <p className="md-body-muted text-center md-reveal">Открытка не найдена</p>
          </PostcardFrame>
        )}

        {session && (
          <>
            <div className="mb-8 md-reveal">
              <p className="md-overline mb-1">Статус встречи</p>
              <h1 className="md-headline-emphasis">{session.card.title}</h1>
            </div>

            <PostcardFrame theme={theme} variant="elevated" ribbon appearance={appearance} className="mb-6">
              <div className="space-y-0">
                {STATUS_STEPS.map((step, index) => {
                  const done = index <= currentIdx;
                  const active = index === currentIdx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.key}
                      className="flex gap-4 md-reveal"
                      style={{ animationDelay: `${120 + index * 80}ms` }}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`md-status-node ${done ? 'md-status-node--done' : ''} ${active ? 'md-status-node--active' : ''}`}
                        >
                          {done ? (
                            <Check className="h-5 w-5" strokeWidth={2.5} />
                          ) : (
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          )}
                        </div>
                        {index < STATUS_STEPS.length - 1 && (
                          <div
                            className={`md-status-connector ${index < currentIdx ? 'md-status-connector--done' : ''}`}
                          />
                        )}
                      </div>
                      <div className={`pb-5 pt-1.5 flex-1 ${active ? '' : 'opacity-70'}`}>
                        <p className={`md-list-title ${active ? '!text-[#e6e0e9]' : ''}`}>
                          {step.label}
                        </p>
                        {active && index < STATUS_STEPS.length - 1 && (
                          <p className="md-list-subtitle mt-0.5">Сейчас здесь</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </PostcardFrame>

            {session.recipientChoice && (
              <PostcardFrame theme={theme} variant="filled" size="md" className="mb-6">
                <p className="md-overline mb-2 md-reveal">Выбор получателя</p>
                <p className="md-list-title md-reveal md-reveal-d1">
                  {choiceToLabel(session.recipientChoice)}
                </p>
                <p className="md-list-subtitle mt-1 md-reveal md-reveal-d2">
                  {formatDateShort(session.recipientChoice.date)}
                </p>
              </PostcardFrame>
            )}

            <Link
              href={`/card/${session.card.id}`}
              className="md-filled-button w-full py-3 text-center md-reveal md-reveal-d4"
            >
              Открыть открытку
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

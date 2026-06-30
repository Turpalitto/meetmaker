'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/AuroraBackground';
import { fetchCard } from '@/lib/api';
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
  { key: 'created', label: 'Открытка создана', icon: Sparkles },
  { key: 'link_opened', label: 'Ссылка открыта', icon: Link2 },
  { key: 'recipient_choosing', label: 'Получатель выбирает', icon: Clock },
  { key: 'response_received', label: 'Ответ получен', icon: MessageSquare },
  { key: 'confirmed', label: 'Встреча подтверждена', icon: UserCheck },
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

  const theme = session?.card.theme ?? 'minimal';
  const currentIdx = session ? statusIndex(session.status) : -1;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <AuroraBackground theme={theme} />
      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/30 hover:text-white/60 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            На главную
          </Link>

          {loading && (
            <p className="text-white/40 text-center">Загрузка статуса…</p>
          )}

          {!loading && !session && (
            <p className="text-white/40 text-center">Открытка не найдена</p>
          )}

          {session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                {session.card.title}
              </h1>
              <p className="text-white/40 text-sm mb-8">
                Статус встречи
              </p>

              <div className="glass-card-dark rounded-3xl p-6 mb-8">
                <div className="space-y-0">
                  {STATUS_STEPS.map((step, index) => {
                    const done = index <= currentIdx;
                    const active = index === currentIdx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                              done
                                ? 'bg-indigo-500 border-indigo-500 text-white'
                                : 'border-white/15 text-white/25'
                            }`}
                          >
                            {done ? (
                              <Check className="h-5 w-5" strokeWidth={2.5} />
                            ) : (
                              <Icon className="h-4 w-4" strokeWidth={1.5} />
                            )}
                          </div>
                          {index < STATUS_STEPS.length - 1 && (
                            <div
                              className={`w-0.5 h-8 my-1 ${
                                index < currentIdx
                                  ? 'bg-indigo-500'
                                  : 'bg-white/10'
                              }`}
                            />
                          )}
                        </div>
                        <div className={`pb-6 ${active ? '' : 'opacity-60'}`}>
                          <p
                            className={`font-medium ${
                              active ? 'text-white' : 'text-white/60'
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {session.recipientChoice && (
                <div className="glass-card-dark rounded-3xl p-6 mb-8">
                  <p className="text-white/40 text-sm mb-2">Выбор получателя</p>
                  <p className="text-white text-lg font-semibold">
                    {choiceToLabel(session.recipientChoice)}
                  </p>
                  <p className="text-white/30 text-xs mt-2">
                    {formatDateShort(session.recipientChoice.date)}
                  </p>
                </div>
              )}

              <Link
                href={`/card/${session.card.id}`}
                className="pill-button pill-button-primary w-full flex items-center justify-center"
              >
                Открыть открытку
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { AuroraBackground } from '@/components/AuroraBackground';
import { THEME_CONFIG, THEME_ORDER } from '@/lib/themes';
import { CalendarHeart } from 'lucide-react';

export default function HomePage() {
  return (
    <main
      className="scene-page relative min-h-screen w-full overflow-hidden"
      data-theme="romantic"
      data-appearance="light"
    >
      <AuroraBackground theme="romantic" />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-10 max-w-lg mx-auto">
        <div className="flex-1 flex flex-col justify-center">
          <div className="md-icon-badge mb-6 md-reveal">
            <CalendarHeart className="h-9 w-9" strokeWidth={2} />
          </div>

          <h1 className="md-postcard-title text-center mb-2 md-reveal md-reveal-d1">
            MeetMaker
          </h1>
          <p className="md-body-muted text-center mb-10 max-w-sm mx-auto md-reveal md-reveal-d2">
            Красивая открытка-приглашение с душой — получатель сам выберет дату, время и место.
          </p>

          <div className="md-section mb-8 md-reveal md-reveal-d3">
            <p className="md-overline">Настроения</p>
            <div className="md-elevated-card divide-y divide-md-outline overflow-hidden p-0">
              {THEME_ORDER.map((id, index) => {
                const t = THEME_CONFIG[id];
                return (
                  <div
                    key={id}
                    className="md-list-item md-reveal"
                    style={{ animationDelay: `${320 + index * 70}ms` }}
                  >
                    <span
                      className="md-swatch"
                      style={{ backgroundColor: t.primaryContainer, color: t.onPrimaryContainer }}
                    >
                      <span className="text-lg">{t.emoji}</span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="md-list-title">{t.labelRu}</p>
                      <p className="md-list-subtitle">{t.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link href="/create" className="md-filled-button w-full py-3 text-center md-reveal md-reveal-d5">
            Создать открытку
          </Link>
        </div>

        <p className="md-label-small text-center mt-8 md-reveal md-reveal-d6">
          Свидания · кофе · прогулки
        </p>
      </div>
    </main>
  );
}

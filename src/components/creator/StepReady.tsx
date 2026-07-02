'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import Confetti from '@/components/Confetti';
import { generateShareUrl } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { IconCheck, IconCopy } from '@/components/Icons';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';

export function StepReady() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const resetCreator = useMeetingStore((s) => s.resetCreator);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(true);

  if (!currentSession) return null;

  const { card } = currentSession;
  const theme = card.theme;
  const config = getThemeConfig(theme);
  const shareUrl = generateShareUrl(card.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MeetMaker: ${card.title}`,
          text: `Давай встретимся! ${card.title}`,
          url: shareUrl,
        });
      } catch {
        /* cancelled */
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative w-full" data-theme={theme}>
      <Confetti fire={fireConfetti} onEnd={() => setFireConfetti(false)} />

      <div className="mm-postcard mm-seal text-center">
        <div className="mm-accent-bar" />
        <span className="mm-stamp" aria-hidden>
          {config.emoji}
        </span>
        <div className="p-7 pr-20 sm:pr-24">
          <p className="mm-eyebrow">Готово</p>
          <h2 className="mm-postcard-title mt-3">Открытка создана</h2>
          <p className="mt-2 text-lg mm-display">{card.title}</p>

          {card.personalNote && (
            <p className="mm-serif-quote mt-4 text-base text-left" style={{ color: 'var(--mm-ink-soft)' }}>
              «{card.personalNote}»
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input className="mm-input text-sm" readOnly value={shareUrl} onFocus={(e) => e.target.select()} />
            <button type="button" className="mm-icon-btn shrink-0 justify-center" onClick={handleCopy}>
              {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
              {copied ? 'Скопировано' : 'Копировать'}
            </button>
          </div>

          <button type="button" onClick={handleCopy} className="mm-filled-button mt-4 w-full">
            {copied ? 'Ссылка скопирована ✓' : 'Копировать ссылку'}
          </button>

          <div className="mt-3 flex gap-2">
            <button type="button" onClick={handleShare} className="mm-ghost-button flex-1">
              Поделиться
            </button>
            <button type="button" onClick={() => setShowQR(!showQR)} className="mm-ghost-button flex-1">
              QR-код
            </button>
          </div>

          {showQR && (
            <div className="mt-5 flex justify-center">
              <div className="mm-card p-4 inline-flex">
                <QRCodeSVG value={shareUrl} size={148} />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--mm-line)' }}>
            <button type="button" onClick={resetCreator} className="mm-text-button text-sm" style={{ color: 'var(--mm-ink-soft)' }}>
              ← Новая открытка
            </button>
            <Link href={`/status/${card.id}`} className="mm-text-button text-sm" style={{ color: 'var(--mm-accent-strong)' }}>
              Статус встречи →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

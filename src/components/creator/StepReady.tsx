'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { ThemeHeroIcon } from '@/components/ThemeHeroIcon';
import { Copy, Check, Share2, QrCode, ArrowLeft, ExternalLink } from 'lucide-react';
import { generateShareUrl } from '@/lib/utils';
import { getThemeConfig } from '@/lib/themes';
import { QRCodeSVG } from 'qrcode.react';

export function StepReady() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const resetCreator = useMeetingStore((s) => s.resetCreator);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

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
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MeetMaker: ${card.title}`,
          text: `Давай встретимся! ${config.emoji} ${card.title}`,
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
    <div className="relative w-full max-w-md text-center">
      <ConfettiBurst theme={theme} />

      <ThemeHeroIcon theme={theme} size="xl" celebrate className="mb-8" />

      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="shimmer-text">Открытка готова!</span> {config.emoji}
      </h2>
      <p className="text-white/40 text-lg mb-8">{card.title}</p>

      <div className="glass-card rounded-3xl p-6 mb-8 theme-card-selected border animate-in zoom-in-95 duration-500 delay-150 fill-mode-both">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {card.dates.map((d) => (
            <span key={d.date} className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs">
              {new Date(d.date + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
            </span>
          ))}
        </div>
        {card.places.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {card.places.map((p) => (
              <span key={p.id} className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs">
                📍 {p.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-3 mb-6 border border-white/10 animate-in fade-in duration-500 delay-300 fill-mode-both">
        <div className="flex-1 truncate text-white/40 text-sm font-mono">{shareUrl}</div>
        <button type="button" onClick={handleCopy} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-white/70" />}
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        <button type="button" onClick={handleCopy} className="pill-button pill-button-primary">
          {copied ? 'Скопировано ✓' : 'Копировать'}
        </button>
        <button type="button" onClick={handleShare} className="pill-button pill-button-secondary">
          <Share2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setShowQR(!showQR)} className="pill-button pill-button-secondary">
          <QrCode className="h-4 w-4" />
        </button>
      </div>

      {showQR && (
        <div className="flex justify-center mb-8 animate-in zoom-in-95 duration-300">
          <div className="bg-white p-4 rounded-2xl shadow-2xl">
            <QRCodeSVG value={shareUrl} size={160} />
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button type="button" onClick={resetCreator} className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Создать новую
        </button>
        <a href={`/status/${card.id}`} className="text-theme hover:opacity-80 text-sm flex items-center gap-1 transition-opacity">
          Статус встречи
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

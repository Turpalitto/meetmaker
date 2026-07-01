'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { ConfettiBurst } from '@/components/ConfettiBurst';
import { PostcardFrame } from '@/components/PostcardFrame';
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
  const appearance = card.appearance ?? 'light';
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
    <div className="relative w-full max-w-md">
      <ConfettiBurst theme={theme} />

      <PostcardFrame theme={theme} variant="elevated" appearance={appearance}>
        <div className="text-center relative">
          <div className="md-reveal">
            <ThemeHeroIcon theme={theme} size="lg" celebrate className="mb-5 md-celebrate-ring" />
          </div>

          <h2 className="md-postcard-title mb-1 md-reveal md-reveal-d1">
            Готово {config.emoji}
          </h2>
          <p className="md-body-muted mb-2 md-reveal md-reveal-d2">{card.title}</p>
          {card.personalNote && (
            <p className="postcard-note text-left mb-4 md-reveal md-reveal-d2">{card.personalNote}</p>
          )}

          <div className="flex flex-wrap gap-2 justify-center mb-6 md-reveal md-reveal-d3">
            {card.dates.map((d, i) => (
              <span key={d.date} className="md-assist-chip" style={{ animationDelay: `${i * 50}ms` }}>
                📅 {new Date(d.date + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </span>
            ))}
            {card.places.map((p, i) => (
              <span key={p.id} className="md-assist-chip">
                📍 {p.name}
              </span>
            ))}
          </div>

          <div className="md-filled-card flex items-center gap-2 px-3 py-2.5 mb-5 text-left md-reveal md-reveal-d4">
            <div className="flex-1 truncate md-label-small !text-[13px] !text-[#cac4d0]">{shareUrl}</div>
            <button type="button" onClick={handleCopy} className="md-outlined-button !min-h-9 !min-w-9 !p-2">
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="md-filled-button w-full py-2.5 mb-3 md-reveal md-reveal-d5"
          >
            {copied ? 'Скопировано ✓' : 'Копировать ссылку'}
          </button>

          <div className="flex gap-2 mb-4 md-reveal md-reveal-d5">
            <button type="button" onClick={handleShare} className="md-tonal-button flex-1 py-2">
              <Share2 className="h-4 w-4" />
              Поделиться
            </button>
            <button type="button" onClick={() => setShowQR(!showQR)} className="md-tonal-button flex-1 py-2">
              <QrCode className="h-4 w-4" />
              QR-код
            </button>
          </div>

          {showQR && (
            <div className="flex justify-center mb-5 animate-in zoom-in-95 duration-300">
              <div className="md-filled-card p-4 rounded-2xl inline-flex md-elevation-3">
                <QRCodeSVG value={shareUrl} size={148} />
              </div>
            </div>
          )}

          <div className="flex justify-center gap-2 pt-4 border-t border-md-outline md-reveal md-reveal-d6">
            <button type="button" onClick={resetCreator} className="md-text-button">
              <ArrowLeft className="h-4 w-4" />
              Новое
            </button>
            <a href={`/status/${card.id}`} className="md-text-button">
              Статус
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </PostcardFrame>
    </div>
  );
}

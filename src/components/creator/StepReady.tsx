'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Copy, Check, Share2, QrCode, Sparkles, ArrowLeft, ExternalLink } from 'lucide-react';
import { generateShareUrl } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

export function StepReady() {
  const currentSession = useMeetingStore((s) => s.currentSession);
  const resetCreator = useMeetingStore((s) => s.resetCreator);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!currentSession) return null;

  const shareUrl = generateShareUrl(currentSession.card.id);

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
          title: `MeetMaker: ${currentSession.card.title}`,
          text: `Давай встретимся! Я создал открытку: ${currentSession.card.title}`,
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
    <div className="w-full max-w-md text-center">
      <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-8">
        <Sparkles className="h-12 w-12 text-white" strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Открытка готова!</h2>
      <p className="text-white/40 text-lg mb-8">{currentSession.card.title}</p>

      <div className="glass-card rounded-3xl p-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {currentSession.card.dates.map((d) => (
            <span key={d.date} className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs">
              {new Date(d.date + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
            </span>
          ))}
        </div>
        {currentSession.card.places.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {currentSession.card.places.map((p) => (
              <span key={p.id} className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs">{p.name}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-3 mb-6 border border-white/10">
        <div className="flex-1 truncate text-white/40 text-sm font-mono">{shareUrl}</div>
        <button type="button" onClick={handleCopy} className="p-2.5 rounded-xl bg-white/10">
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-white/70" />}
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        <button type="button" onClick={handleCopy} className="pill-button pill-button-primary">
          {copied ? 'Скопировано' : 'Копировать'}
        </button>
        <button type="button" onClick={handleShare} className="pill-button pill-button-secondary">
          <Share2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setShowQR(!showQR)} className="pill-button pill-button-secondary">
          <QrCode className="h-4 w-4" />
        </button>
      </div>

      {showQR && (
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-2xl">
            <QRCodeSVG value={shareUrl} size={160} />
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button type="button" onClick={resetCreator} className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Создать новую
        </button>
        <a href={`/status/${currentSession.card.id}`} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
          Статус встречи
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

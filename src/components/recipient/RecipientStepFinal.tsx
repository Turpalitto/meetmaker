'use client';

import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { downloadICS, formatDate, formatTime } from '@/lib/utils';
import { Calendar, Check, Download, MapPin } from 'lucide-react';

export function RecipientStepFinal() {
  const card = useMeetingStore((s) => s.currentSession?.card);
  const recipientChoice = useMeetingStore((s) => s.recipientChoice);

  if (!card || !recipientChoice) return null;

  const handleDownload = () => {
    downloadICS(recipientChoice, card.title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
      className="w-full max-w-sm text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
      >
        <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
      </motion.div>

      <h2 className="text-3xl font-bold text-white mb-2">Готово!</h2>
      <p className="text-white/40 text-lg font-light mb-8">
        Твой выбор отправлен
      </p>

      <div className="glass-card-dark rounded-3xl p-6 mb-8 text-left space-y-3">
        <p className="text-white/50 text-sm mb-2">{card.title}</p>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
          <span className="text-white">{formatDate(recipientChoice.date)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 font-mono text-sm w-5 text-center">⏰</span>
          <span className="text-white">{formatTime(recipientChoice.time)}</span>
        </div>
        {recipientChoice.place && (
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
            <span className="text-white">{recipientChoice.place.name}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleDownload}
        className="pill-button pill-button-secondary w-full flex items-center justify-center gap-2 mb-4"
      >
        <Download className="h-4 w-4" strokeWidth={1.5} />
        Добавить в календарь
      </button>

      <p className="text-white/20 text-xs">
        Организатор получит уведомление о твоём выборе
      </p>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useMeetingStore } from '@/store/useMeetingStore';
import { Check, Sparkles, Heart, Coffee } from 'lucide-react';
import type { ThemeType } from '@/types';

const themes: { id: ThemeType; label: string; icon: typeof Sparkles; description: string; gradient: string }[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    icon: Sparkles,
    description: 'Чистый, современный стиль',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'coffee',
    label: 'Coffee',
    icon: Coffee,
    description: 'Тёплая, уютная атмосфера',
    gradient: 'from-amber-600 to-orange-500',
  },
  {
    id: 'romantic',
    label: 'Romantic',
    icon: Heart,
    description: 'Нежный, романтичный стиль',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export function StepTheme() {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const setSelectedTheme = useMeetingStore((s) => s.setSelectedTheme);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const updateSessionFromCard = useMeetingStore((s) => s.updateSessionFromCard);
  const isSaving = useMeetingStore((s) => s.isSaving);

  const handleConfirm = async () => {
    await updateSessionFromCard();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="space-y-4 mb-10">
        {themes.map((theme, index) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.id;

          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => setSelectedTheme(theme.id)}
              className={`relative w-full text-left p-5 rounded-3xl border transition-all duration-300 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{theme.label}</h3>
                  <p className="text-white/40 text-sm font-light">{theme.description}</p>
                </div>
                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(3)}
          className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Назад
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSaving}
          className="group relative inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-8 py-3 text-base font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? 'Сохраняем…' : 'Создать открытку'}
          <Sparkles className="h-4 w-4 text-indigo-400" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}
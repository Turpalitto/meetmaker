'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { Check, Sparkles, Heart, Coffee } from 'lucide-react';
import type { ThemeType } from '@/types';

const themes: {
  id: ThemeType;
  label: string;
  icon: typeof Sparkles;
  description: string;
  gradient: string;
}[] = [
  { id: 'minimal', label: 'Minimal', icon: Sparkles, description: 'Чистый, современный стиль', gradient: 'from-indigo-500 to-purple-500' },
  { id: 'coffee', label: 'Coffee', icon: Coffee, description: 'Тёплая, уютная атмосфера', gradient: 'from-amber-600 to-orange-500' },
  { id: 'romantic', label: 'Romantic', icon: Heart, description: 'Нежный, романтичный стиль', gradient: 'from-pink-500 to-rose-500' },
];

export function StepTheme() {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const setSelectedTheme = useMeetingStore((s) => s.setSelectedTheme);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const updateSessionFromCard = useMeetingStore((s) => s.updateSessionFromCard);
  const isSaving = useMeetingStore((s) => s.isSaving);

  return (
    <div className="w-full max-w-md">
      <div className="space-y-4 mb-10">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedTheme(theme.id)}
              className={`relative w-full text-left p-5 rounded-3xl border ${
                isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{theme.label}</h3>
                  <p className="text-white/40 text-sm">{theme.description}</p>
                </div>
                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setCurrentStep(3)} className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white/60">
          Назад
        </button>
        <button
          type="button"
          onClick={() => updateSessionFromCard()}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white border border-white/20 disabled:opacity-50"
        >
          {isSaving ? 'Сохраняем…' : 'Создать открытку'}
          <Sparkles className="h-4 w-4 text-indigo-400" />
        </button>
      </div>
    </div>
  );
}

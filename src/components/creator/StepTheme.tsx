'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { THEME_CONFIG } from '@/lib/themes';
import { Check, Sparkles } from 'lucide-react';
import type { ThemeType } from '@/types';

export function StepTheme() {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const setSelectedTheme = useMeetingStore((s) => s.setSelectedTheme);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const updateSessionFromCard = useMeetingStore((s) => s.updateSessionFromCard);
  const isSaving = useMeetingStore((s) => s.isSaving);

  return (
    <div className="w-full max-w-md">
      <div className="space-y-4 mb-10">
        {(Object.keys(THEME_CONFIG) as ThemeType[]).map((id, index) => {
          const theme = THEME_CONFIG[id];
          const Icon = theme.icon;
          const isSelected = selectedTheme === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedTheme(id)}
              className={`theme-preview-card relative w-full text-left p-5 rounded-3xl border animate-in fade-in slide-in-from-bottom-2 duration-400 fill-mode-both ${
                isSelected
                  ? 'theme-card-selected theme-glow-ring'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold text-lg">{theme.label}</h3>
                    <span className="text-lg">{theme.emoji}</span>
                  </div>
                  <p className="text-white/40 text-sm">{theme.description}</p>
                  <div className="flex gap-1.5 mt-2">
                    {theme.stickers.slice(0, 4).map((s) => (
                      <span key={s} className="text-sm opacity-70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {isSelected && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--mm-accent)' }}
                  >
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 animate-in fade-in duration-500 delay-300 fill-mode-both">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-white/60 hover:bg-white/10 transition-colors"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={() => updateSessionFromCard()}
          disabled={isSaving}
          className="pill-button pill-button-primary inline-flex items-center gap-2 px-8 disabled:opacity-50"
        >
          {isSaving ? 'Сохраняем…' : 'Создать открытку'}
          <Sparkles className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

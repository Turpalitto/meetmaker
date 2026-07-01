'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
import { THEME_CONFIG, THEME_ORDER } from '@/lib/themes';
import type { CardAppearance } from '@/types';
import { Check, Moon, Sun } from 'lucide-react';

const APPEARANCE_OPTIONS: {
  id: CardAppearance;
  label: string;
  icon: typeof Sun;
}[] = [
  { id: 'light', label: 'Светлая', icon: Sun },
  { id: 'dark', label: 'Тёмная', icon: Moon },
];

export function StepTheme() {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const cardAppearance = useMeetingStore((s) => s.cardAppearance);
  const setSelectedTheme = useMeetingStore((s) => s.setSelectedTheme);
  const setCardAppearance = useMeetingStore((s) => s.setCardAppearance);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const updateSessionFromCard = useMeetingStore((s) => s.updateSessionFromCard);
  const isSaving = useMeetingStore((s) => s.isSaving);

  return (
    <div className="w-full max-w-md">
      <div className="md-section mb-6">
        <p className="md-overline">Настроение</p>
        <div className="md-elevated-card divide-y divide-md-outline overflow-hidden p-0">
          {THEME_ORDER.map((id) => {
            const theme = THEME_CONFIG[id];
            const Icon = theme.icon;
            const isSelected = selectedTheme === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedTheme(id)}
                className="md-list-item-interactive w-full"
              >
                <span
                  className="md-swatch"
                  style={{ backgroundColor: theme.primaryContainer, color: theme.onPrimaryContainer }}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="flex-1 min-w-0 text-left">
                  <p className="md-list-title">
                    {theme.labelRu} {theme.emoji}
                  </p>
                  <p className="md-list-subtitle">{theme.description}</p>
                </div>
                {isSelected ? (
                  <span className="md-check-icon">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="md-section mb-6 md-reveal md-reveal-d2">
        <p className="md-overline">Оформление открытки</p>
        <div className="flex gap-2">
          {APPEARANCE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = cardAppearance === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCardAppearance(opt.id)}
                className={`md-assist-chip flex-1 justify-center py-2.5 ${active ? 'md-assist-chip--selected' : ''}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <WizardActions
        onBack={() => setCurrentStep(3)}
        onContinue={() => updateSessionFromCard()}
        continueLabel={isSaving ? 'Сохраняем…' : 'Отправить приглашение'}
        continueDisabled={isSaving}
      />
    </div>
  );
}

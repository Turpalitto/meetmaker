'use client';

import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
import { THEME_CONFIG, THEME_ORDER } from '@/lib/themes';
import { IconCheck } from '@/components/Icons';

export function StepTheme() {
  const selectedTheme = useMeetingStore((s) => s.selectedTheme);
  const setSelectedTheme = useMeetingStore((s) => s.setSelectedTheme);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);
  const updateSessionFromCard = useMeetingStore((s) => s.updateSessionFromCard);
  const isSaving = useMeetingStore((s) => s.isSaving);
  const saveError = useMeetingStore((s) => s.saveError);

  return (
    <div className="w-full">
      <p className="mm-eyebrow mb-4">Настроение встречи</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {THEME_ORDER.map((id) => {
          const theme = THEME_CONFIG[id];
          const isSelected = selectedTheme === id;
          return (
            <button
              key={id}
              type="button"
              data-theme={id}
              aria-pressed={isSelected}
              onClick={() => setSelectedTheme(id)}
              className="mm-slot relative flex flex-col items-center gap-2 py-6 text-center"
              style={{ background: 'var(--mm-card-wash)' }}
            >
              {isSelected && (
                <span
                  className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full"
                  style={{ background: 'var(--mm-accent)', color: 'var(--mm-on-accent)' }}
                  aria-hidden
                >
                  <IconCheck className="h-3 w-3" />
                </span>
              )}
              <span className="text-3xl" aria-hidden>
                {theme.emoji}
              </span>
              <span className="mm-display text-lg">{theme.labelRu}</span>
              <span className="text-xs" style={{ color: 'var(--mm-ink-soft)' }}>
                {theme.description}
              </span>
            </button>
          );
        })}
      </div>

      {saveError && (
        <p
          className="mt-4 rounded-[var(--mm-r-sm)] px-4 py-3 text-sm"
          style={{ background: 'var(--mm-error-container)', color: 'var(--mm-error)' }}
          role="alert"
        >
          {saveError}
        </p>
      )}

      <WizardActions
        onBack={() => setCurrentStep(3)}
        onContinue={() => updateSessionFromCard()}
        continueLabel={isSaving ? 'Сохраняем…' : 'Создать открытку'}
        continueDisabled={isSaving}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useMeetingStore } from '@/store/useMeetingStore';
import { WizardActions } from '@/components/WizardActions';
import { Coffee, Film, Footprints, Utensils } from 'lucide-react';

const suggestions = [
  { icon: Coffee, label: 'Кофе с тобой' },
  { icon: Utensils, label: 'Ужин вдвоём' },
  { icon: Film, label: 'Кино' },
  { icon: Footprints, label: 'Прогулка' },
];

export function StepName() {
  const meetingTitle = useMeetingStore((s) => s.meetingTitle);
  const recipientName = useMeetingStore((s) => s.recipientName);
  const personalNote = useMeetingStore((s) => s.personalNote);
  const setMeetingTitle = useMeetingStore((s) => s.setMeetingTitle);
  const setRecipientName = useMeetingStore((s) => s.setRecipientName);
  const setPersonalNote = useMeetingStore((s) => s.setPersonalNote);
  const setCurrentStep = useMeetingStore((s) => s.setCurrentStep);

  const [localTitle, setLocalTitle] = useState(meetingTitle);
  const [localName, setLocalName] = useState(recipientName);
  const [localNote, setLocalNote] = useState(personalNote);

  const canContinue = localTitle.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    setMeetingTitle(localTitle.trim());
    setRecipientName(localName.trim());
    setPersonalNote(localNote.trim());
    setCurrentStep(1);
  };

  const handleSuggestion = (label: string) => {
    setLocalTitle(label);
    setMeetingTitle(label);
    setTimeout(() => setCurrentStep(1), 200);
  };

  return (
    <div className="w-full max-w-md">
      <div className="md-section mb-5">
        <p className="md-overline">О чём встреча</p>
        <div className="md-filled-card px-4 py-3">
          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
            placeholder="Например, Кофе с тобой"
            className="postcard-input-hero w-full"
            autoFocus
          />
        </div>
      </div>

      <div className="md-section mb-5 md-reveal md-reveal-d1">
        <p className="md-overline">Как обратиться?</p>
        <div className="md-filled-card px-4 py-3">
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Имя получателя — необязательно"
            className="postcard-input w-full"
          />
        </div>
        <p className="md-label-small mt-2 px-1">Появится в приветствии: «Привет, Катя!»</p>
      </div>

      <div className="md-section mb-6 md-reveal md-reveal-d2">
        <p className="md-overline">Короткая записка</p>
        <div className="md-filled-card px-4 py-3">
          <textarea
            value={localNote}
            onChange={(e) => setLocalNote(e.target.value)}
            placeholder="Давно хотела с тобой погулять…"
            rows={3}
            maxLength={200}
            className="postcard-textarea w-full resize-none"
          />
        </div>
        <p className="md-label-small mt-2 px-1 text-right">{localNote.length}/200</p>
      </div>

      {!localTitle && (
        <div className="md-section mb-4 md-reveal md-reveal-d3">
          <p className="md-overline">Или выбери готовое</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSuggestion(item.label)}
                  className="md-assist-chip gap-1.5"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <WizardActions
        showBack={false}
        onContinue={handleContinue}
        continueDisabled={!canContinue}
        continueLabel="Дальше"
      />
    </div>
  );
}

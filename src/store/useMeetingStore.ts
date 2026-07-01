import { create } from "zustand";
import { saveCard } from "@/lib/api";
import type {
  StoreState,
  MeetingCard,
  MeetingSession,
  RecipientChoice,
  Place,
  CardAppearance,
} from "@/types";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export const useMeetingStore = create<StoreState>((set, get) => ({
  currentStep: 0,
  meetingTitle: "",
  dates: [],
  currentPlaceInput: "",
  places: [],
  selectedTheme: "romantic",
  recipientName: "",
  personalNote: "",
  cardAppearance: "light",

  recipientStep: -1,
  selectedDate: null,
  selectedTime: null,
  selectedPlace: null,
  customPlaceMode: false,
  customPlaceName: "",

  meetingStatus: "created",
  recipientChoice: null,
  currentSession: null,
  isSaving: false,

  setCurrentStep: (step) => set({ currentStep: step }),
  setMeetingTitle: (title) => set({ meetingTitle: title }),

  addDate: (dateStr) => {
    const { dates } = get();
    if (dates.some((d) => d.date === dateStr)) return;
    set({ dates: [...dates, { date: dateStr, times: [] }] });
  },

  removeDate: (dateStr) => {
    const { dates } = get();
    set({ dates: dates.filter((d) => d.date !== dateStr) });
  },

  addTimeToDate: (dateStr, time) => {
    const { dates } = get();
    set({
      dates: dates.map((d) =>
        d.date === dateStr
          ? {
              ...d,
              times: d.times.includes(time)
                ? d.times
                : [...d.times, time].sort(),
            }
          : d,
      ),
    });
  },

  removeTimeFromDate: (dateStr, time) => {
    const { dates } = get();
    set({
      dates: dates
        .filter((d) => d.date !== dateStr || d.times.length > 1)
        .map((d) =>
          d.date === dateStr
            ? { ...d, times: d.times.filter((t) => t !== time) }
            : d,
        ),
    });
  },

  setCurrentPlaceInput: (input) => set({ currentPlaceInput: input }),

  addPlace: (name) => {
    const { places } = get();
    if (places.some((p) => p.name.toLowerCase() === name.toLowerCase())) return;
    const newPlace: Place = { id: generateId(), name };
    set({ places: [...places, newPlace], currentPlaceInput: "" });
  },

  removePlace: (id) => {
    const { places } = get();
    set({ places: places.filter((p) => p.id !== id) });
  },

  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  setRecipientName: (name) => set({ recipientName: name }),
  setPersonalNote: (note) => set({ personalNote: note }),
  setCardAppearance: (appearance) => set({ cardAppearance: appearance }),

  resetCreator: () =>
    set({
      currentStep: 0,
      meetingTitle: "",
      dates: [],
      currentPlaceInput: "",
      places: [],
      selectedTheme: "romantic",
      recipientName: "",
      personalNote: "",
      cardAppearance: "light",
    }),

  setRecipientStep: (step) => set({ recipientStep: step }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setCustomPlaceMode: (mode) => set({ customPlaceMode: mode }),
  setCustomPlaceName: (name) => set({ customPlaceName: name }),

  resetRecipient: () =>
    set({
      recipientStep: -1,
      selectedDate: null,
      selectedTime: null,
      selectedPlace: null,
      customPlaceMode: false,
      customPlaceName: "",
    }),

  setCurrentSession: (session) => set({ currentSession: session }),

  setMeetingStatus: (status) => {
    set({ meetingStatus: status });
    const { currentSession } = get();
    if (currentSession) {
      set({ currentSession: { ...currentSession, status } });
    }
  },

  setRecipientChoice: (choice) => {
    set({ recipientChoice: choice });
    const { currentSession } = get();
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          recipientChoice: choice,
          status: "response_received",
        },
        meetingStatus: "response_received",
      });
    }
  },

  updateSessionFromCard: async () => {
    const {
      meetingTitle,
      dates,
      places,
      selectedTheme,
      recipientName,
      personalNote,
      cardAppearance,
    } = get();
    const card: MeetingCard = {
      id: generateId(),
      title: meetingTitle,
      dates,
      places,
      theme: selectedTheme,
      createdAt: new Date().toISOString(),
      recipientName: recipientName.trim() || undefined,
      personalNote: personalNote.trim() || undefined,
      appearance: cardAppearance,
    };

    set({ isSaving: true });
    try {
      const session = await saveCard(card);
      set({
        currentSession: session,
        meetingStatus: session.status,
        currentStep: 5,
        isSaving: false,
      });
    } catch {
      const session: MeetingSession = { card, status: "created" };
      set({
        currentSession: session,
        meetingStatus: "created",
        currentStep: 5,
        isSaving: false,
      });
    }
  },

  loadSession: (session) => {
    set({
      currentSession: session,
      meetingStatus: session.status,
      recipientChoice: session.recipientChoice ?? null,
      recipientStep: -1,
      selectedDate: null,
      selectedTime: null,
      selectedPlace: null,
    });
  },
}));

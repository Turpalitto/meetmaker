export interface DateTimeOption {
  date: string; // ISO date string YYYY-MM-DD
  times: string[]; // HH:mm format
}

export interface Place {
  id: string;
  name: string;
  custom?: boolean;
}

export type ThemeType = 'minimal' | 'coffee' | 'romantic';

export type CardAppearance = 'light' | 'dark';

export interface MeetingCard {
  id: string;
  title: string;
  dates: DateTimeOption[];
  places: Place[];
  theme: ThemeType;
  createdAt: string;
  /** How to greet the recipient, e.g. "Катя" */
  recipientName?: string;
  /** Short personal message on the postcard */
  personalNote?: string;
  /** Light romantic postcard vs dark premium */
  appearance?: CardAppearance;
}

export type MeetingStatus =
  | 'created'
  | 'link_opened'
  | 'recipient_choosing'
  | 'response_received'
  | 'confirmed';

export interface RecipientChoice {
  date: string;
  time: string;
  place: Place | null;
}

export interface MeetingSession {
  card: MeetingCard;
  status: MeetingStatus;
  recipientChoice?: RecipientChoice;
  senderEmail?: string;
}

export interface StoreState {
  // Creator flow
  currentStep: number;
  meetingTitle: string;
  dates: DateTimeOption[];
  currentPlaceInput: string;
  places: Place[];
  selectedTheme: ThemeType;
  recipientName: string;
  personalNote: string;
  cardAppearance: CardAppearance;

  // Recipient flow
  recipientStep: number;
  selectedDate: string | null;
  selectedTime: string | null;
  selectedPlace: Place | null;
  customPlaceMode: boolean;
  customPlaceName: string;

  // Sender view
  meetingStatus: MeetingStatus;
  recipientChoice: RecipientChoice | null;

  // Created session
  currentSession: MeetingSession | null;
  isSaving: boolean;

  // Actions - Creator
  setCurrentStep: (step: number) => void;
  setMeetingTitle: (title: string) => void;
  addDate: (date: string) => void;
  removeDate: (date: string) => void;
  addTimeToDate: (date: string, time: string) => void;
  removeTimeFromDate: (date: string, time: string) => void;
  setCurrentPlaceInput: (input: string) => void;
  addPlace: (name: string) => void;
  removePlace: (id: string) => void;
  setSelectedTheme: (theme: ThemeType) => void;
  setRecipientName: (name: string) => void;
  setPersonalNote: (note: string) => void;
  setCardAppearance: (appearance: CardAppearance) => void;
  resetCreator: () => void;

  // Actions - Recipient
  setRecipientStep: (step: number) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setSelectedPlace: (place: Place | null) => void;
  setCustomPlaceMode: (mode: boolean) => void;
  setCustomPlaceName: (name: string) => void;
  resetRecipient: () => void;

  // Actions - Session
  setCurrentSession: (session: MeetingSession | null) => void;
  setMeetingStatus: (status: MeetingStatus) => void;
  setRecipientChoice: (choice: RecipientChoice) => void;
  updateSessionFromCard: () => Promise<void>;
  loadSession: (session: MeetingSession) => void;
}
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export type Slot = {
  id: string;
  date: string;      // ISO date string YYYY-MM-DD
  time: string;      // HH:mm
  place: string;
};

export type CardStatus = "pending" | "accepted" | "declined";

export const cards = pgTable("cards", {
  id: text("id").primaryKey(),
  creatorName: text("creator_name").notNull(),
  recipientName: text("recipient_name").notNull(),
  message: text("message").notNull().default(""),
  slots: jsonb("slots").$type<Slot[]>().notNull().default([]),
  chosenSlotId: text("chosen_slot_id"),
  status: text("status").$type<CardStatus>().notNull().default("pending"),
  theme: text("theme").notNull().default("sunset"),
  emoji: text("emoji").notNull().default("🌟"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  notifyEmail: text("notify_email"),
  isPublic: boolean("is_public").notNull().default(false),
});

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;

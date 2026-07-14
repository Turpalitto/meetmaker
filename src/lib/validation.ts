import { z } from "zod";

export const MeetingStatusSchema = z.enum([
  "created",
  "link_opened",
  "recipient_choosing",
  "response_received",
  "confirmed",
]);

export const PlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  custom: z.boolean().optional(),
});

export const RecipientChoiceSchema = z.object({
  date: z.string(),
  time: z.string(),
  place: PlaceSchema.nullable(),
});

export const PatchBodySchema = z.object({
  status: MeetingStatusSchema.optional(),
  recipientChoice: RecipientChoiceSchema.optional(),
});

export const DateTimeOptionSchema = z.object({
  date: z.string(),
  times: z.array(z.string()),
});

export const MeetingCardSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  dates: z.array(DateTimeOptionSchema),
  places: z.array(PlaceSchema),
  theme: z.enum(["minimal", "coffee", "romantic"]),
  createdAt: z.string(),
  recipientName: z.string().optional(),
  personalNote: z.string().optional(),
  appearance: z.enum(["light", "dark"]).optional(),
});

export const PostBodySchema = z.object({
  card: MeetingCardSchema,
});

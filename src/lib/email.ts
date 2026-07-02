import type { Slot } from "@/db/schema";
import { formatDateTime } from "@/lib/utils";

interface ChoiceEmailParams {
  to: string;
  creatorName: string;
  recipientName: string;
  slot: Slot;
  cardUrl: string;
}

export async function sendChoiceNotification(
  params: ChoiceEmailParams,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping notification");
    return false;
  }

  const from =
    process.env.EMAIL_FROM ?? "MeetMaker <onboarding@resend.dev>";
  const when = formatDateTime(params.slot.date, params.slot.time);

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <p style="font-size:28px;margin:0 0 16px">💌</p>
      <h1 style="font-size:22px;color:#1e293b;margin:0 0 8px">Встреча согласована!</h1>
      <p style="color:#64748b;line-height:1.5">
        <strong>${params.recipientName}</strong> выбрал(а) удобное время для встречи с тобой.
      </p>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:16px;margin:20px 0">
        <p style="margin:0 0 4px;font-weight:600;color:#166534">📅 ${when}</p>
        <p style="margin:0;color:#15803d">📍 ${params.slot.place}</p>
      </div>
      <a href="${params.cardUrl}" style="display:inline-block;background:linear-gradient(90deg,#fb923c,#ec4899);color:#fff;text-decoration:none;padding:12px 24px;border-radius:12px;font-weight:600">
        Открыть открытку
      </a>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">MeetMaker — красивые приглашения на встречу</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: `${params.recipientName} выбрал(а) время встречи 💌`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[email] Resend error:", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

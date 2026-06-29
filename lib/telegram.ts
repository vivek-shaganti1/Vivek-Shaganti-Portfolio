export interface TelegramNotificationPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  linkedinUrl?: string;
  country: string;
  budget?: string;
  hiringTimeline?: string;
  recruitmentType: string;
  referrer?: string;
  resumeViewed?: boolean;
  resumeDownloaded?: boolean;
  ip?: string;
  browser?: string;
  os?: string;
  device?: string;
}

function escapeHTML(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramNotification(payload: TelegramNotificationPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[TELEGRAM BOT] Telegram Send Started - Failed: Tokens not configured in environment. Skipping notification. Payload:", payload);
    return false;
  }

  const messageText = `
━━━━━━━━━━━━━━
🚀 <b>NEW RECRUITER LEAD</b>
━━━━━━━━━━━━━━
👤 <b>Name:</b> ${escapeHTML(payload.name)}
🏢 <b>Company:</b> ${escapeHTML(payload.company)}
📧 <b>Email:</b> ${escapeHTML(payload.email)}
📱 <b>Phone:</b> ${escapeHTML(payload.phone || "N/A")}
🌍 <b>Country:</b> ${escapeHTML(payload.country || "N/A")}
💼 <b>Role:</b> ${escapeHTML(payload.recruitmentType || "N/A")}
📅 <b>Hiring Timeline:</b> ${escapeHTML(payload.hiringTimeline || "N/A")}
💰 <b>Budget:</b> ${escapeHTML(payload.budget || "N/A")}
🔗 <b>LinkedIn:</b> ${payload.linkedinUrl ? `<a href="${escapeHTML(payload.linkedinUrl)}">${escapeHTML(payload.linkedinUrl)}</a>` : "N/A"}
📝 <b>Subject:</b> ${escapeHTML(payload.subject || "N/A")}
💬 <b>Message:</b> ${escapeHTML(payload.message || "N/A")}
━━━━━━━━━━━━━━
🕒 <b>Time:</b> ${escapeHTML(new Date().toLocaleString())}
🌐 <b>Visitor IP:</b> ${escapeHTML(payload.ip || "Unknown")}
📍 <b>Device:</b> ${escapeHTML(payload.device || "Unknown")}
📱 <b>Browser:</b> ${escapeHTML(payload.browser || "Unknown")}
━━━━━━━━━━━━━━
Portfolio Visitor
`.trim();

  console.log("[TELEGRAM BOT] Telegram Send Started: Dispatching payload notification.");

  let attempt = 1;
  const maxAttempts = 2;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
      parse_mode: "HTML"
    })
  };

  while (attempt <= maxAttempts) {
    try {
      const response = await fetch(url, options);
      console.log(`[TELEGRAM BOT] Telegram Response: status code ${response.status}`);

      if (response.ok) {
        console.log("[TELEGRAM BOT] Notification Delivered: Message successfully dispatched to Telegram.");
        return true;
      }

      const errText = await response.text();
      console.error(`[TELEGRAM BOT ERROR] Telegram Error: status code ${response.status}. Details:`, errText);

      // Retry only on server side 5xx status codes
      if (response.status >= 500 && attempt < maxAttempts) {
        console.warn(`[TELEGRAM BOT] Retry Attempt: 5xx response received. Retrying...`);
        attempt++;
        continue;
      }
      
      return false;
    } catch (err) {
      console.error(`[TELEGRAM BOT EXCEPTION] Telegram Error: Attempt ${attempt} failed. Exception:`, err);
      if (attempt < maxAttempts) {
        console.warn(`[TELEGRAM BOT] Retry Attempt: Exception caught. Retrying...`);
        attempt++;
        continue;
      }
      return false;
    }
  }

  return false;
}

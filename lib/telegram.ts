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
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface TelegramResult {
  success: boolean;
  reason?: string;
  errorDetails?: any;
}

export async function sendTelegramNotification(payload: TelegramNotificationPayload): Promise<TelegramResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[TELEGRAM PIPELINE] Incoming recruiter request received.");
  console.log(`[TELEGRAM PIPELINE] Environment variables loaded - Bot Token exists: ${botToken ? "✅" : "❌"}, Chat ID exists: ${chatId ? "✅" : "❌"}`);

  if (!botToken) {
    return { success: false, reason: "Missing Bot Token" };
  }
  if (!chatId) {
    return { success: false, reason: "Missing Chat ID" };
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

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  let attempt = 1;
  const maxAttempts = 3;
  let delay = 1000; // start with 1s delay

  while (attempt <= maxAttempts) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout constraint

    console.log(`[TELEGRAM PIPELINE] Sending Telegram request... (Attempt ${attempt}/${maxAttempts})`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML"
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log(`[TELEGRAM PIPELINE] Telegram status: ${response.status}`);

      const bodyText = await response.text();
      console.log(`[TELEGRAM PIPELINE] Telegram body:`, bodyText);

      let data: any = {};
      try {
        data = JSON.parse(bodyText);
      } catch (jsonErr) {
        console.error("[TELEGRAM PIPELINE] Failed to parse Telegram JSON response:", jsonErr);
      }

      if (response.ok && data.ok) {
        console.log("[TELEGRAM PIPELINE] Final API response: Notification Delivered successfully.");
        return { success: true };
      }

      // Map specific error reasons returned from Telegram API
      let errorReason = "Telegram API rejected request";
      const desc = (data.description || "").toLowerCase();

      if (response.status === 401) {
        errorReason = "Unauthorized Bot";
      } else if (response.status === 403 || desc.includes("block")) {
        errorReason = "Bot blocked";
      } else if (desc.includes("chat not found")) {
        errorReason = "Chat Not Found";
      } else if (desc.includes("entities") || desc.includes("parse")) {
        errorReason = "Invalid Parse Mode";
      } else if (response.status === 429) {
        errorReason = "Rate Limited";
      }

      // Check if we should retry (429 or 5xx)
      const shouldRetryStatus = response.status === 429 || (response.status >= 500 && response.status <= 504);
      if (shouldRetryStatus && attempt < maxAttempts) {
        console.warn(`[TELEGRAM PIPELINE] Retrying in ${delay}ms due to status ${response.status}: ${errorReason}`);
        await sleep(delay);
        delay *= 2; // exponential backoff multiplier
        attempt++;
        continue;
      }

      return {
        success: false,
        reason: errorReason,
        errorDetails: {
          statusCode: response.status,
          description: data.description,
          errorCode: data.error_code
        }
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      
      const isTimeout = err.name === "AbortError";
      const errorReason = isTimeout ? "Network Timeout" : "Connection Exception";
      console.error(`[TELEGRAM PIPELINE] Telegram Exception:`, err);

      // Retry on network errors or timeouts
      if (attempt < maxAttempts) {
        console.warn(`[TELEGRAM PIPELINE] Retrying in ${delay}ms due to exception...`);
        await sleep(delay);
        delay *= 2;
        attempt++;
        continue;
      }

      return {
        success: false,
        reason: errorReason,
        errorDetails: { message: err.message }
      };
    }
  }

  return { success: false, reason: "Max retries exhausted" };
}

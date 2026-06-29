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

  // Mask token for log printing safety
  const maskedToken = botToken.substring(0, 8) + "..." + botToken.substring(botToken.length - 4);
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const loggedUrl = `https://api.telegram.org/bot${maskedToken}/sendMessage`;
  
  let attempt = 1;
  const maxAttempts = 3;
  let delay = 1000;

  while (attempt <= maxAttempts) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // Step 4: Print trace details
    console.log("Sending Telegram message...");
    console.log(loggedUrl);

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
      console.log(response.status);

      const telegram = await response.json();
      console.log(telegram);

      if (response.ok && telegram.ok) {
        return { success: true };
      }

      // Step 5: If telegram returns ok: false, throw specific API error details
      if (telegram && telegram.ok === false) {
        throw new Error(`Telegram Error ${telegram.error_code}: ${telegram.description}`);
      }

      throw new Error(`HTTP Error ${response.status}`);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error(`Telegram Exception (Attempt ${attempt}/${maxAttempts}):`, err);

      // Check if we should retry (transient or network errors)
      const isTimeout = err.name === "AbortError";
      const isTransient = err.message && (err.message.includes("429") || err.message.includes("500") || err.message.includes("502") || err.message.includes("503") || err.message.includes("504"));
      
      if ((isTimeout || isTransient) && attempt < maxAttempts) {
        console.warn(`[TELEGRAM RETRY] Delaying ${delay}ms before next retry...`);
        await sleep(delay);
        delay *= 2;
        attempt++;
        continue;
      }

      let mappedReason = "Telegram API rejected request";
      const errMsg = err.message || "";
      
      if (errMsg.includes("401")) mappedReason = "Unauthorized Bot";
      else if (errMsg.includes("403") || errMsg.toLowerCase().includes("block")) mappedReason = "Bot blocked";
      else if (errMsg.toLowerCase().includes("chat not found") || errMsg.includes("400")) mappedReason = "Chat Not Found";
      else if (errMsg.toLowerCase().includes("entities") || errMsg.toLowerCase().includes("parse")) mappedReason = "Invalid Parse Mode";
      else if (isTimeout) mappedReason = "Network Timeout";

      return {
        success: false,
        reason: mappedReason,
        errorDetails: { message: errMsg }
      };
    }
  }

  return { success: false, reason: "Max retries exhausted" };
}

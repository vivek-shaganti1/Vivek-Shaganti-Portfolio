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

export async function sendTelegramNotification(payload: TelegramNotificationPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[TELEGRAM BOT] Tokens not configured in environment. Skipping notification. Logged payload:", payload);
    return false;
  }

  const messageText = `
🚨 *New Recruiter Contact*

👤 *Name:* ${payload.name}
🏢 *Company:* ${payload.company}
📧 *Email:* ${payload.email}
📱 *Phone:* ${payload.phone || "N/A"}
📝 *Subject:* ${payload.subject}
💬 *Message:* ${payload.message}
🔗 *LinkedIn:* ${payload.linkedinUrl || "N/A"}
🌍 *Country:* ${payload.country || "N/A"}
💼 *Recruitment Type:* ${payload.recruitmentType}
💰 *Budget:* ${payload.budget || "N/A"}
⏳ *Hiring Timeline:* ${payload.hiringTimeline || "N/A"}
🌐 *Referrer:* ${payload.referrer || "Direct"}
📄 *Resume Viewed:* ${payload.resumeViewed ? "Yes" : "No"}
📥 *Resume Downloaded:* ${payload.resumeDownloaded ? "Yes" : "No"}

🌍 *Visitor IP:* ${payload.ip || "Unknown"}
💻 *Browser:* ${payload.browser || "Unknown"}
⚙️ *OS:* ${payload.os || "Unknown"}
📱 *Device:* ${payload.device || "Unknown"}
🕒 *Time:* ${new Date().toLocaleString()}
`.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[TELEGRAM BOT ERROR] Failed to send message:", errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[TELEGRAM BOT EXCEPTION] Failed to dispatch post request:", err);
    return false;
  }
}

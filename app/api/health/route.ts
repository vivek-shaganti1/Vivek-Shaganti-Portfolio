import { NextResponse } from "next/server";

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  let telegramReachable = false;
  try {
    const res = await fetch("https://api.telegram.org", { method: "HEAD", next: { revalidate: 60 } });
    telegramReachable = res.ok || res.status === 404; // 404/405 means DNS is live and reachable
  } catch (e) {
    console.error("[HEALTH CHECK] Telegram host unreachable:", e);
  }

  return NextResponse.json({
    status: "Server Running",
    botTokenLoaded: botToken ? "Loaded ✅" : "Missing ❌",
    chatIdLoaded: chatId ? "Loaded ✅" : "Missing ❌",
    telegramReachable: telegramReachable ? "Reachable ✅" : "Unreachable ❌",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
    version: "v4.3"
  });
}

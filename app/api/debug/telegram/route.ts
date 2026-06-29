import { NextResponse } from "next/server";

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({
      success: false,
      reason: "Missing environment variables",
      details: { botToken: !!botToken, chatId: !!chatId }
    }, { status: 500 });
  }

  const startTime = Date.now();
  try {
    // 1. Verify Bot Token
    const getMeRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    if (!getMeRes.ok) {
      const errText = await getMeRes.text();
      return NextResponse.json({
        success: false,
        botWorking: "Failed",
        reason: "Unauthorized Bot - Invalid Bot Token",
        error: errText
      }, { status: 401 });
    }
    const getMeData = await getMeRes.json();

    // 2. Verify Chat ID connection by sending diagnostic test message
    const testMsg = `⚡ <b>TELEGRAM DIAGNOSTIC AUDIT</b>\n\n• Bot: @${getMeData.result?.username}\n• Status: Integration is fully operational.`;
    const sendRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMsg,
        parse_mode: "HTML"
      })
    });

    const latency = Date.now() - startTime;

    if (!sendRes.ok) {
      const errText = await sendRes.text();
      let reason = "Telegram API rejected request";
      try {
        const parsed = JSON.parse(errText);
        if (parsed.description && parsed.description.toLowerCase().includes("chat not found")) {
          reason = "Chat Not Found";
        } else if (parsed.description && parsed.description.toLowerCase().includes("block")) {
          reason = "Bot blocked";
        }
      } catch (e) {}

      return NextResponse.json({
        success: false,
        botWorking: "Bot Active",
        chatReachable: "Failed",
        reason,
        error: errText
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      botWorking: "Bot Working",
      chatReachable: "Chat Reachable",
      messageSent: "Message Sent",
      botName: getMeData.result?.username,
      latency: `${latency}ms`
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      reason: "Network Timeout or Connectivity Exception",
      error: err.message
    }, { status: 500 });
  }
}

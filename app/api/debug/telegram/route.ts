import { NextResponse } from "next/server";

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({
      success: false,
      reason: "Missing environment variables",
      details: { botToken: !!botToken, chatId: !!chatId }
    }, { status: 400 });
  }

  const startTime = Date.now();
  try {
    // 1. Verify Bot Connection
    const getMeRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    if (!getMeRes.ok) {
      return NextResponse.json({
        success: false,
        reason: "Invalid Bot Token",
        statusCode: getMeRes.status
      }, { status: 400 });
    }
    const getMeData = await getMeRes.json();

    // 2. Verify Chat ID connection by sending diagnostic HTML template message
    const testMsg = `⚡ <b>TELEGRAM DIAGNOSTIC AUDIT</b>\n\n• Bot Username: @${getMeData.result?.username}\n• Connectivity: Active\n• Status: Ready`;
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
      return NextResponse.json({
        success: false,
        reason: "Chat ID verification failed",
        error: errText
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      botConnected: true,
      botName: getMeData.result?.username,
      chatFound: true,
      tokenValid: true,
      latency: `${latency}ms`,
      status: "Ready"
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      reason: "Connection Exception",
      error: err.message
    }, { status: 500 });
  }
}

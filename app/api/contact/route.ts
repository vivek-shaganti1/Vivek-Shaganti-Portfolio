import { NextRequest, NextResponse } from "next/server";
import { insertRecruiter, insertEvent } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/telegram";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    
    // Rate Limiting (5 submissions per 15 minutes)
    const now = Date.now();
    const limitInfo = rateLimitMap.get(ip);
    
    if (limitInfo && now < limitInfo.resetAt) {
      if (limitInfo.count >= 5) {
        return NextResponse.json(
          { success: false, reason: "Too many contact submissions. Please cooldown for 15 minutes." },
          { status: 429 }
        );
      }
      limitInfo.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    }

    // Step 2: Log incoming body and validate fields
    const body = await req.json();
    console.log("Incoming recruiter payload:", body);

    if (!body) {
      return NextResponse.json({ success: false, reason: "Invalid payload" }, { status: 400 });
    }
    if (!body.name) {
      return NextResponse.json({ success: false, reason: "Name is missing" }, { status: 400 });
    }
    if (!body.email) {
      return NextResponse.json({ success: false, reason: "Email is missing" }, { status: 400 });
    }
    if (!body.company) {
      return NextResponse.json({ success: false, reason: "Company is missing" }, { status: 400 });
    }
    if (!body.subject) {
      return NextResponse.json({ success: false, reason: "Subject is missing" }, { status: 400 });
    }
    if (!body.message) {
      return NextResponse.json({ success: false, reason: "Message is empty" }, { status: 400 });
    }

    // Step 3: Log bot environment status check
    console.log({
      hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID,
      tokenLength: process.env.TELEGRAM_BOT_TOKEN?.length
    });

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ success: false, error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
    }
    if (!process.env.TELEGRAM_CHAT_ID) {
      return NextResponse.json({ success: false, error: "Missing TELEGRAM_CHAT_ID" }, { status: 500 });
    }

    // Sanitize strings
    const sanitize = (val: string) => (val || "").trim().replace(/[<>]/g, "");
    const sanitizedPayload = {
      name: sanitize(body.name),
      company: sanitize(body.company),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      subject: sanitize(body.subject),
      message: sanitize(body.message),
      linkedinUrl: sanitize(body.linkedinUrl),
      country: sanitize(body.country || "Unknown"),
      budget: sanitize(body.budget),
      hiringTimeline: sanitize(body.hiringTimeline),
      recruitmentType: sanitize(body.recruitmentType || "General"),
      referrer: sanitize(body.referrer || "Direct")
    };

    const browser = parseBrowser(userAgent);
    const os = parseOS(userAgent);
    const device = parseDevice(userAgent);

    const submission = {
      ...sanitizedPayload,
      ip,
      browser,
      os,
      device,
      status: "pending",
      notes: ""
    };

    // 1. Save to Database
    const saved = await insertRecruiter(submission as any);

    // 2. Dispatch Telegram Notification
    const res = await sendTelegramNotification(saved);

    // 3. Log event
    await insertEvent({
      type: "contact_submit",
      metadata: { company: saved.company, recruitmentType: saved.recruitmentType, telegramSent: res.success },
      ip
    });

    if (res.success) {
      return NextResponse.json({ success: true, data: saved });
    } else {
      return NextResponse.json({
        success: false,
        reason: res.reason || "Telegram API rejected request",
        details: res.errorDetails,
        data: saved
      }, { status: 400 });
    }
  } catch (error: any) {
    // Step 1: Wrap entire route error catch handler
    console.error("API contact submission failure:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

function parseBrowser(ua: string): string {
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown Browser";
}

function parseOS(ua: string): string {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Macintosh")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown OS";
}

function parseDevice(ua: string): string {
  if (ua.includes("Mobi") || ua.includes("Android")) return "Mobile";
  if (ua.includes("Tablet") || ua.includes("iPad")) return "Tablet";
  return "Desktop";
}

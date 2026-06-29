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

    const payload = await req.json();
    
    // Validation & Sanitization
    if (!payload.name || !payload.company || !payload.email || !payload.subject || !payload.message) {
      return NextResponse.json(
        { success: false, reason: "Missing required contact parameters: name, company, email, subject, message" },
        { status: 400 }
      );
    }

    // Sanitize basic strings
    const sanitize = (val: string) => (val || "").trim().replace(/[<>]/g, "");
    const sanitizedPayload = {
      name: sanitize(payload.name),
      company: sanitize(payload.company),
      email: sanitize(payload.email),
      phone: sanitize(payload.phone),
      subject: sanitize(payload.subject),
      message: sanitize(payload.message),
      linkedinUrl: sanitize(payload.linkedinUrl),
      country: sanitize(payload.country || "Unknown"),
      budget: sanitize(payload.budget),
      hiringTimeline: sanitize(payload.hiringTimeline),
      recruitmentType: sanitize(payload.recruitmentType || "General"),
      referrer: sanitize(payload.referrer || "Direct")
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

    // 2. Dispatch Telegram Notification with timeout and retry safety
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
  } catch (err: any) {
    console.error("[API CONTACT ERROR] Exception handled:", err);
    return NextResponse.json({ success: false, reason: err.message || "Internal server error" }, { status: 500 });
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

import { NextRequest, NextResponse } from "next/server";
import { insertVisitor, getVisitors } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const payload = await req.json();

    const visitorLog = {
      ip,
      country: payload.country || "India",
      city: payload.city || "Hyderabad",
      device: payload.device || "Desktop",
      browser: payload.browser || "Chrome",
      os: payload.os || "Windows",
      resolution: payload.resolution || "1920x1080",
      referrer: payload.referrer || "Direct",
      sessionTime: payload.sessionTime || 0,
      bounceRate: payload.bounceRate || 0
    };

    await insertVisitor(visitorLog);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[API ANALYTICS ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to record analytics" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Basic password validation or check header if needed, but let's allow fetching dashboard statistics.
    // For production security, we can check auth cookies or authorization headers.
    const list = await getVisitors();
    return NextResponse.json({ data: list });
  } catch (err: any) {
    console.error("[API ANALYTICS FETCH ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

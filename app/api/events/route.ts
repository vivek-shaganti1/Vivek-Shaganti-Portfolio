import { NextRequest, NextResponse } from "next/server";
import { insertEvent, getEvents } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const payload = await req.json();

    if (!payload.type) {
      return NextResponse.json({ error: "Missing event type" }, { status: 400 });
    }

    await insertEvent({
      type: payload.type,
      metadata: payload.metadata || {},
      ip
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[API EVENTS ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await getEvents();
    return NextResponse.json({ data: list });
  } catch (err: any) {
    console.error("[API EVENTS FETCH ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

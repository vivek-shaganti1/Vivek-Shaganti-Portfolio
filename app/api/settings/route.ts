import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET() {
  try {
    const config = {
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
      telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
      enableNotifications: true,
      enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
      contactEmail: process.env.CONTACT_EMAIL || "vivekshaganti@gmail.com",
      githubUrl: `https://github.com/${process.env.GITHUB_USERNAME || "vivek-shaganti1"}`,
      linkedinUrl: "https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a",
      resumeUrl: "/Resume.pdf"
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .single();
        if (!error && data) {
          return NextResponse.json({
            data: {
              telegramBotToken: data.telegram_bot_token || config.telegramBotToken,
              telegramChatId: data.telegram_chat_id || config.telegramChatId,
              enableNotifications: data.enable_notifications !== false,
              enableAnalytics: data.enable_analytics !== false,
              contactEmail: data.contact_email || config.contactEmail,
              githubUrl: data.github_url || config.githubUrl,
              linkedinUrl: data.linkedin_url || config.linkedinUrl,
              resumeUrl: data.resume_url || config.resumeUrl
            }
          });
        }
      } catch (e) {
        console.warn("[SETTINGS GET FAIL] Fallback to process variables:", e);
      }
    }

    return NextResponse.json({ data: config });
  } catch (err: any) {
    console.error("[API SETTINGS GET ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    if (supabase) {
      try {
        const dbPayload = {
          telegram_bot_token: payload.telegramBotToken,
          telegram_chat_id: payload.telegramChatId,
          enable_notifications: payload.enableNotifications !== false,
          enable_analytics: payload.enableAnalytics !== false,
          contact_email: payload.contactEmail,
          github_url: payload.githubUrl,
          linkedin_url: payload.linkedinUrl,
          resume_url: payload.resumeUrl
        };

        const { error } = await supabase
          .from("settings")
          .upsert([dbPayload]);
        
        if (!error) return NextResponse.json({ success: true });
      } catch (e) {
        console.warn("[SETTINGS POST FAIL] Upsert error, fallback:", e);
      }
    }

    return NextResponse.json({ success: true, localOnly: true });
  } catch (err: any) {
    console.error("[API SETTINGS POST ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}

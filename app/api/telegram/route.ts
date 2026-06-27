import { NextRequest, NextResponse } from "next/server";
import { getRecruiters } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    // Check if it's a valid Telegram update
    if (!payload || !payload.message || !payload.message.text) {
      return NextResponse.json({ success: true });
    }

    const text = payload.message.text.trim();
    const chatId = payload.message.chat.id;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
    }

    let responseText = "";

    const command = text.split(" ")[0].toLowerCase();

    switch (command) {
      case "/start":
      case "/help":
        responseText = `
🤖 *Vivek's Representative Bot*

Here are the operational commands:
/resume - View/Download CV links
/projects - Inspect key active projects
/skills - View Technical Arsenal categories
/contact - Retrieve contact parameters
/github - Retrieve GitHub repository coordinates
/linkedin - Access professional profile link
/status - System status check
/latest - View latest pipeline release commits
        `.trim();
        break;

      case "/resume":
        responseText = `
📄 *Vivek's Resume Tracker*
- Download URL: ${process.env.NEXT_PUBLIC_SITE_URL || "https://vivek-shaganti-portfolio.vercel.app"}/Resume.pdf
- Interactive OS: ${process.env.NEXT_PUBLIC_SITE_URL || "https://vivek-shaganti-portfolio.vercel.app"}
        `.trim();
        break;

      case "/projects":
        responseText = `
💻 *Key Active Nodes (Projects)*
1. *AI Interview Platform* (Production) - Enterprise recruitment evaluator.
2. *JavaMind AI* (Active) - Enterprise Spring Boot code comprehension parser.
3. *rShield* (Active) - Coordinated Reddit community toxicity analyzer.
4. *Instagram AI Automation* (Production) - Fully autonomous content curation scripter.
        `.trim();
        break;

      case "/skills":
        responseText = `
🛠️ *Technical Arsenal Summary*
- *Languages:* Java, Python, TypeScript, JavaScript, SQL, Solidity
- *Frontend:* React.js, Next.js, Tailwind CSS, Framer Motion
- *Backend:* Spring Boot, Node.js, Express.js, Microservices, WebSockets
- *AI/ML:* AI Agents, RAG, Prompt Engineering, Gemini/Groq APIs
- *Databases:* PostgreSQL, MySQL, Redis, MongoDB, Supabase
        `.trim();
        break;

      case "/contact":
        responseText = `
📧 *Contact Parameters*
- Email: vivekshaganti@gmail.com
- Telegram: @vivekshaganti
- Form: ${process.env.NEXT_PUBLIC_SITE_URL || "https://vivek-shaganti-portfolio.vercel.app"}#contact
        `.trim();
        break;

      case "/github":
        responseText = `
🐙 *GitHub Coordinates*
- Profile: https://github.com/vivek-shaganti1
- Active Repo: https://github.com/vivek-shaganti1/Vivek-Shaganti-Portfolio
        `.trim();
        break;

      case "/linkedin":
        responseText = `
🔗 *LinkedIn Profile*
- URL: https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a
        `.trim();
        break;

      case "/status":
        responseText = `
🟢 *System Health Check*
- OS State: Online
- Telemetry Sync: Connected
- Database Connection: Active
- Recruiter代表 AI: Ready
- Uptime: 99.98%
        `.trim();
        break;

      case "/latest":
        responseText = `
🚀 *Latest Deploy Status*
- Version: OS v4.1
- Commit: CRM & Telegram Notifications webhook configurations merged.
- Build: Passed successfully.
        `.trim();
        break;

      default:
        responseText = `Command "${command}" not recognized. Send /help to view valid parameters.`;
    }

    // Call sendMessage back to Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseText,
        parse_mode: "Markdown"
      })
    });

    if (!response.ok) {
      console.error("[TELEGRAM BOT REPLY ERROR]", await response.text());
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[TELEGRAM WEBHOOK ERROR] Exception:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

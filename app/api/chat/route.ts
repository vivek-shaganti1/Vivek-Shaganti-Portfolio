import { Groq } from "groq-sdk";
import { portfolioContext } from "@/lib/chatbot-context";

export async function POST(req: Request) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || "mock-groq-key-for-build-checks",
    });

    const { messages } = await req.json();

    const systemPrompt = `You are an AI recruiter assistant for Vivek Goud Shaganti.
Your purpose is to answer recruiter questions about Vivek based ONLY on the provided resume and portfolio information.

Rules:
- Be extremely professional, confident, and polite.
- Speak in the third person as Vivek's dedicated AI representative.
- Keep answers concise, clear, and recruiter-friendly.
- Never invent fake experience, awards, projects, or credentials.
- If information is not available in the context, politely state: "I don't have that specific information in my records, but you can contact Vivek directly to discuss this."
- Highlight relevant technologies, strengths, and achievements when appropriate.
- Always encourage recruiters to contact Vivek for opportunities (email: vivekshaganti@gmail.com).
- Never break character or refer to yourself as a general AI or mention Groq.

Knowledge Base:
${portfolioContext}`;

    // Request a streaming chat completion
    const chatCompletionStream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      stream: true,
    });

    // Create a ReadableStream to pipe stream chunks directly to the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of chatCompletionStream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Groq Chat API Error:", error);
    return new Response(JSON.stringify({ error: error?.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

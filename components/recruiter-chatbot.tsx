"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Send, X, FileText, Sparkles, 
  Linkedin, Github, Mail, ShieldAlert, Mic, 
  Terminal, ShieldCheck, Download, Code, Layers 
} from "lucide-react";
import { sfx } from "@/lib/audio";
import { cn } from "@/lib/utils";
import CurvedVLogo from "./curved-v-logo";

interface Message {
  role: "user" | "assistant";
  content: string;
  isProjectTag?: boolean;
}

interface ProjectDetail {
  title: string;
  category: string;
  tech: string[];
  description: string;
  challenges: string;
  link: string;
}

const PROJECTS_DATABASE: Record<string, ProjectDetail> = {
  "rshield-ai": {
    title: "rShield-ai",
    category: "AI & Web3",
    tech: ["React 19", "Tailwind CSS", "Devvit", "Redis", "Hono"],
    description: "An AI-powered real-time moderation intelligence platform built natively for Reddit. Predicts hostility momentum, brigade events, and toxicity density using a live Threat Engine.",
    challenges: "Handling Reddit's rate limits and processing high-throughput toxicity scores under sub-100ms latency triggers.",
    link: "https://github.com/vivek-shaganti1/rshield"
  },
  "javamind-ai": {
    title: "JavaMind-AI (AntiGravity)",
    category: "Developer Tooling",
    tech: ["Spring Boot", "React 18", "ChromaDB", "Anthropic Claude", "Spring Security"],
    description: "A surgical AI agent built for Java developers. Understands entire Spring Boot codebases, detects architectural anti-patterns (God Classes, circular dependencies), and automatically generates JUnit 5 tests.",
    challenges: "Building an AST-parser to trace complex class hierarchies and map dependency graphs accurately for vector embeddings.",
    link: "https://github.com/vivek-shaganti1/JavaMind-AI-agent"
  },
  "instagram-automation": {
    title: "Instagram AI News Automation",
    category: "Automation",
    tech: ["Python", "Gemini API", "Imagen 3", "macOS LaunchAgent", "Pillow"],
    description: "Fully autonomous system that researches AI news, curates top stories, designs a multi-slide carousel using Imagen 3 backgrounds, and publishes daily to Instagram.",
    challenges: "Ensuring stable visual typography placement dynamically on generated backgrounds and configuring launch agents to bypass sleep states.",
    link: "https://github.com/vivek-shaganti1/Instagram-automation"
  },
  "vivekx-ecommerce": {
    title: "Full Stack E-Commerce Platform",
    category: "Web App",
    tech: ["React.js", "Spring Boot", "MySQL", "Hibernate/JPA", "JWT Auth"],
    description: "A secure e-commerce storefront. Implemented shopping cart mechanics, checkout flows, order management, database persistence with Hibernate, and administrative workflows.",
    challenges: "Configuring secure JWT lifecycle tokens and managing relational state transactions under database concurrency.",
    link: "https://github.com/vivek-shaganti1/vivekx-ecommerce"
  }
};

export default function RecruiterChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootOutput, setBootOutput] = useState<string[]>([]);
  
  const [mode, setMode] = useState<"chat" | "terminal">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Vivek's AI recruiter assistant 👋\n\nYou can ask me questions or type command codes like /help, /skills, /projects, or /hire to decrypt candidate metrics.\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/Vivek Goud Shaganti CV.pdf");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Command Terminal States
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalPrompt, setTerminalPrompt] = useState("VIVEK_OS> ");

  // Project Modal State
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectDetail | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Track Analytics
  const trackInteraction = (action: string, category?: string) => {
    try {
      const dataStr = localStorage.getItem("portfolio_recruiter_analytics");
      const data = dataStr ? JSON.parse(dataStr) : {
        interactions: 0,
        downloads: 0,
        questions: {},
        categoryViews: {}
      };
      
      if (action === "download") {
        data.downloads += 1;
      } else if (action === "interaction") {
        data.interactions += 1;
      } else if (action === "question") {
        if (category) {
          data.questions[category] = (data.questions[category] || 0) + 1;
        }
      }
      localStorage.setItem("portfolio_recruiter_analytics", JSON.stringify(data));
      window.dispatchEvent(new Event("analytics_updated"));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const savedResume = localStorage.getItem("portfolio_resume_base64");
    if (savedResume) {
      setResumeUrl(savedResume);
    }
    const handleStorage = () => {
      const updatedResume = localStorage.getItem("portfolio_resume_base64");
      if (updatedResume) {
        setResumeUrl(updatedResume);
      } else {
        setResumeUrl("/Vivek Goud Shaganti CV.pdf");
      }
    };
    window.addEventListener("storage", handleStorage);
    
    const handleTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("recruiter-chat-trigger", handleTrigger);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("recruiter-chat-trigger", handleTrigger);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, messages, isLoading]);

  // Terminal mode focus helper
  useEffect(() => {
    if (isOpen && mode === "terminal") {
      terminalInputRef.current?.focus();
    }
  }, [isOpen, mode]);

  // Sound play on open
  const handleOpenClick = () => {
    if (!isOpen) {
      sfx.playClick();
      if (!isBooted) {
        setIsBooting(true);
        setBootOutput([]);
        const lines = [
          "CONNECTING TO PORT 3000...",
          "SECURE CHANNEL ESTABLISHED.",
          "LOADING VIVEK RESUME MATRIX...",
          "COMPILING PROJECT DOMAINS...",
          "INITIALIZING GROQ DECRYPT ENGINE...",
          "SYSTEM ONLINE. ACCESS GRANTED."
        ];
        
        lines.forEach((line, idx) => {
          setTimeout(() => {
            sfx.playTick();
            setBootOutput((prev) => [...prev, `> ${line}`]);
            if (idx === lines.length - 1) {
              setTimeout(() => {
                sfx.playBoot();
                setIsBooting(false);
                setIsBooted(true);
                setIsOpen(true);
              }, 400);
            }
          }, (idx + 1) * 350);
        });
      } else {
        setIsOpen(true);
      }
    } else {
      sfx.playClick();
      setIsOpen(false);
    }
  };

  // Speech Recognition hook
  const startSpeechRecognition = () => {
    sfx.playClick();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage("Speech recognition not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (e: any) => {
      const trans = e.results[0][0].transcript;
      setInput(trans);
      setIsListening(false);
    };

    rec.onerror = () => {
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading || isStreaming) return;

    setErrorMessage(null);
    trackInteraction("interaction");

    // Check command routing
    if (text.startsWith("/")) {
      const cmd = text.trim().toLowerCase();
      let reply = "";
      
      switch (cmd) {
        case "/help":
          reply = "Available command nodes:\n- /about : Summary of Vivek\n- /skills : Tech stack & arsenal\n- /projects : Core projects\n- /experience : Journeys & intern roles\n- /contact : Email & social handles\n- /resume : Download CV PDF\n- /hire : Summary of capabilities";
          break;
        case "/about":
          reply = "Vivek Goud Shaganti is a Computer Science undergraduate (BTech CSE, 3rd Year) with a CGPA of 9.21. Passionate about building intelligent, scalable systems, decentralization, and developer tooling. Experienced with Spring Boot, React, and automated AI workflows.";
          break;
        case "/skills":
          reply = "Vivek's Tech Stack:\n- Programming Languages: Java, Python, JavaScript, TypeScript, SQL, C, C++\n- Frontend Engineering: React.js, Next.js, Tailwind CSS, TypeScript, Framer Motion, ShadCN UI\n- Backend Engineering: Spring Boot, Node.js, Express.js, REST APIs, JWT Auth, WebSockets\n- Databases & Storage: MySQL, PostgreSQL, MongoDB, Redis, Supabase, NeonDB, Drizzle\n- Artificial Intelligence: Generative AI, LLMs, AI Agents, Prompt Engineering, RAG, Gemini, Groq\n- Cloud & DevOps: Azure, Vercel, Render, Docker, GitHub Actions, CI/CD\n- APIs & Integrations: REST APIs, Webhooks, Telegram API, GitHub API\n- Data & Analytics: Pandas, NumPy, Plotly, Qlik Sense, Machine Learning\n- Developer Tools: Git, GitHub, VS Code, IntelliJ, Postman, pnpm\n- Blockchain: Solidity, Smart Contracts, Web3 Fundamentals";
          break;
        case "/projects":
          reply = "Key Projects:\n- AI Interview Platform (Production)\n- JavaMind AI (Active)\n- rShield (Active)\n- Instagram AI Automation (Production)\n- Trading AI (Research)\n- RAN Fitness (Production)\n- Portfolio OS (Production)\n- Full Stack E-Commerce (Production)\n- Sticker Ordering Platform (Production)\n- AI Interview Prep (Research)\n- Job Applier AI (Research)\n- Jarvis AI (Active)\n- VSystem Automation (Active)\n- Productivity Task Manager (Archived)";
          break;
        case "/experience":
          reply = "Journey nodes:\n- PwC Launchpad Participant (2025)\n- Python Development Intern @ Cognifyz Technologies (Apr 2025 - May 2025)\n- Vice President @ Blockchain Club AU (2024 - Present)\n- Team Lead @ LiteraZe Society (2023 - Present)";
          break;
        case "/contact":
          reply = "Contact links:\n- Email: vivekshaganti@gmail.com\n- LinkedIn: linkedin.com/in/vivek-goud-shaganti-01111b28a\n- GitHub: github.com/vivek-shaganti1";
          break;
        case "/resume":
          trackInteraction("download");
          reply = "Downloading Vivek's CV PDF. Check your downloads.";
          const link = document.createElement("a");
          link.href = resumeUrl;
          link.download = "Vivek Goud Shaganti CV.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case "/hire":
          reply = "Why hire Vivek?\n- Excellent academic standing (9.21 CGPA).\n- Practical builder with complex projects (AI agents, Reddit integrations).\n- VP & Team Lead leadership experience.\n- Highly adaptive to modern tech stacks (React, Next.js, Groq API).";
          break;
        default:
          reply = `Command node "${cmd}" not recognized. Type /help to view list.`;
      }

      setMessages((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: reply }
      ]);
      setInput("");
      sfx.playSuccess();
      return;
    }

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Append session context history
      const messageHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messageHistory, { role: "user", content: text }]
        }),
      });

      if (!response.ok) {
        throw new Error("Recruiter AI Terminal temporarily offline. Retrying secure connection...");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Stream reader instantiation failed.");
      }

      setIsLoading(false);
      setIsStreaming(true);

      const assistantMessageIndex = messages.length + 1;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      let done = false;
      let streamContent = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          streamContent += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            if (updated[assistantMessageIndex]) {
              updated[assistantMessageIndex] = {
                ...updated[assistantMessageIndex],
                content: streamContent,
              };
            }
            return updated;
          });
        }
      }
      sfx.playSuccess();
    } catch (error: any) {
      console.error("Chat error:", error);
      setErrorMessage(error?.message || "Recruiter AI Terminal temporarily offline. Retrying secure connection...");
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleChipClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const chips = [
    { label: "⚡ Top Skills", prompt: "/skills" },
    { label: "🚀 Best Project", prompt: "/projects" },
    { label: "💼 Why Hire", prompt: "/hire" },
    { label: "📞 Contact", prompt: "/contact" }
  ];

  // Helper to parse message text and return inline badges for matching projects
  const renderMessageContent = (content: string) => {
    const tokens = content.split(/(\s+)/);
    return tokens.map((token, i) => {
      const normalized = token.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      if (PROJECTS_DATABASE[normalized]) {
        const proj = PROJECTS_DATABASE[normalized];
        return (
          <button
            key={i}
            onClick={() => {
              sfx.playClick();
              setActiveProjectModal(proj);
            }}
            className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-zinc-950 border border-[#CCFF00]/40 text-[#CCFF00] hover:bg-[#CCFF00]/10 text-[10px] font-mono transition-all font-bold"
          >
            <Code className="h-3 w-3" />
            {proj.title}
          </button>
        );
      }
      return token;
    });
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER BUTTON */}
      <motion.button
        onClick={handleOpenClick}
        className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 rounded-full px-5 py-3 bg-zinc-950/80 border border-[#CCFF00]/40 text-[#CCFF00] hover:text-white shadow-[#CCFF00]/10 hover:shadow-[#CCFF00]/25 transition-all duration-300 backdrop-blur-md active:scale-95 group font-mono font-bold text-xs"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          boxShadow: "0 0 15px rgba(204, 255, 0, 0.15)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
        </span>
        <MessageSquare className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="hidden sm:inline">Ask AI Recruiter</span>
      </motion.button>

      {/* BOOT SEQUENCE OVERLAY */}
      <AnimatePresence>
        {isBooting && (
          <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-start justify-center p-8 sm:p-24 font-mono text-xs text-[#CCFF00] space-y-2 select-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-30 z-50" />
            <div className="space-y-1">
              {bootOutput.map((out, idx) => (
                <div key={idx} className="animate-pulse-subtle">{out}</div>
              ))}
              <div className="inline-block w-1.5 h-3 bg-[#CCFF00] ml-0.5 animate-pulse" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW INTERFACE */}
      <AnimatePresence>
        {isOpen && !isBooting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[9990] w-[90vw] sm:w-[420px] h-[600px] bg-zinc-950/95 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(204, 255, 0, 0.05)",
            }}
          >
            {/* Scanline terminal screen overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40 z-50" />

            {/* Window Header */}
            <div className="p-4 border-b border-zinc-900 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CurvedVLogo className="h-4 w-4" glow={false} />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                    GROQ SYSTEM COMMAND DECK
                  </span>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest">
                    SYSTEM SECURED • ONLINE
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sfx.playClick();
                    setMode(mode === "chat" ? "terminal" : "chat");
                  }}
                  className="text-[9px] border border-zinc-800 rounded px-2 py-0.5 text-zinc-400 hover:text-white hover:border-[#CCFF00]/40 transition-colors uppercase"
                >
                  {mode === "chat" ? "Terminal" : "GUI Chat"}
                </button>
                <button
                  onClick={() => {
                    sfx.playClick();
                    setIsOpen(false);
                  }}
                  className="text-zinc-500 hover:text-white transition-colors p-1 hover:bg-zinc-900 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat History Messages (GUI mode) */}
            {mode === "chat" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs whitespace-pre-wrap leading-relaxed relative ${
                        m.role === "user"
                          ? "bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-white rounded-br-none"
                          : "bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 rounded-bl-none"
                      }`}
                    >
                      {m.role === "assistant" && (
                        <div className="flex items-center gap-1 mb-1 text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                          <Sparkles className="h-3 w-3 text-[#CCFF00]" />
                          SYSTEM_AGENT
                        </div>
                      )}
                      {m.role === "assistant" ? renderMessageContent(m.content) : m.content}
                      {m.role === "assistant" && isStreaming && idx === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-3 bg-[#CCFF00] ml-0.5 animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 rounded-xl rounded-bl-none px-4 py-3 text-xs space-y-1">
                      <div className="flex items-center gap-1 text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                        <Sparkles className="h-3 w-3 text-[#CCFF00]" />
                        ANALYST ACTIVE
                      </div>
                      <div className="text-[10px] text-zinc-500 animate-pulse uppercase tracking-widest pl-1">
                        &gt; ANALYZING RECRUITER QUERY...
                      </div>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="flex justify-center p-2">
                    <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-3 text-[10px] text-red-400 flex items-center gap-2 max-w-[90%]">
                      <ShieldAlert className="h-4 w-4 shrink-0 text-red-500 animate-pulse" />
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Terminal CLI mode */}
            {mode === "terminal" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2 text-[10px] scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
                <div className="text-zinc-500">VIVEK_OS CANDIDATE DECRYPT SHELL • TYPE 'help' FOR LIST</div>
                {messages.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-zinc-500">
                      {m.role === "user" ? "USER> " : "SYSTEM> "}
                    </div>
                    <div className={m.role === "user" ? "text-white font-bold" : "text-[#CCFF00]"}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-zinc-500 animate-pulse pl-1">&gt; ANALYZING DECRYPT STREAM...</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Quick Suggestion Action Chips */}
            <div className="p-3 border-t border-zinc-900 bg-black/20 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sfx.playClick();
                      handleChipClick(chip.prompt);
                    }}
                    className="text-[9px] font-bold text-zinc-400 border border-zinc-900 hover:border-zinc-800 hover:text-white bg-zinc-950/40 rounded px-2.5 py-1 transition-all cursor-pointer active:scale-95"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter CTA Actions */}
            <div className="px-4 py-3 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
                <span>INTERESTED IN WORKING WITH VIVEK?</span>
                <span className="text-[#CCFF00] animate-pulse">CONNECT</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                <a
                  href={resumeUrl}
                  download
                  onClick={() => trackInteraction("download")}
                  className="flex flex-col items-center justify-center gap-1 rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-2 text-zinc-400 hover:text-white transition-all text-center cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span className="text-[7px] tracking-wider mt-0.5">RESUME</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-1 rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-2 text-zinc-400 hover:text-[#0077B5] transition-all text-center cursor-pointer"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span className="text-[7px] tracking-wider mt-0.5">LINKEDIN</span>
                </a>
                <a
                  href="https://github.com/vivek-shaganti1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-1 rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-2 text-zinc-400 hover:text-white transition-all text-center cursor-pointer"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span className="text-[7px] tracking-wider mt-0.5">GITHUB</span>
                </a>
                <a
                  href="mailto:vivekshaganti@gmail.com"
                  className="flex flex-col items-center justify-center gap-1 rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-2 text-zinc-400 hover:text-[#EA4335] transition-all text-center cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="text-[7px] tracking-wider mt-0.5">EMAIL</span>
                </a>
              </div>
            </div>

            {/* Input Submission Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2 items-center"
            >
              <input
                type="text"
                ref={terminalInputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "terminal" ? "Type command help, skills..." : "Ask a question or type code..."}
                className="flex-1 bg-zinc-900/60 border border-zinc-850 rounded px-3 py-1.5 text-xs text-white placeholder:text-zinc-650 focus:outline-none focus:border-[#CCFF00]/40"
              />
              <button
                type="button"
                onClick={startSpeechRecognition}
                className={cn(
                  "p-1.5 rounded border border-zinc-850 transition-all active:scale-95 cursor-pointer",
                  isListening 
                    ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse" 
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                )}
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
              <button
                type="submit"
                className="p-1.5 rounded bg-[#CCFF00] hover:bg-[#8dfa00] text-black transition-colors active:scale-95 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS AI MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 font-mono text-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#09090b]/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-6 relative space-y-4"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#CCFF00]" />
              
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pl-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-[#CCFF00]" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    PROJECT ARCHITECTURE INSPECT
                  </span>
                </div>
                <button
                  onClick={() => {
                    sfx.playClick();
                    setActiveProjectModal(null);
                  }}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 pl-2 text-zinc-300">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase">TITLE</h4>
                  <p className="text-white font-bold text-sm">{activeProjectModal.title}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase">CATEGORY</h4>
                  <p className="text-white">{activeProjectModal.category}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase">TECH STACK</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeProjectModal.tech.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase">ARCHITECTURE SUMMARY</h4>
                  <p className="leading-relaxed">{activeProjectModal.description}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase">KEY CHALLENGES SOLVED</h4>
                  <p className="leading-relaxed text-zinc-400">{activeProjectModal.challenges}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-900">
                <button
                  onClick={() => {
                    sfx.playClick();
                    setActiveProjectModal(null);
                  }}
                  className="px-4 py-2 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white rounded"
                >
                  CLOSE
                </button>
                <a
                  href={activeProjectModal.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playClick()}
                  className="px-4 py-2 bg-[#CCFF00] hover:bg-[#8dfa00] text-black rounded text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  SOURCE_CODE
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

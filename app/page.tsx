"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Award, 
  BookOpen, 
  Briefcase, 
  Shield, 
  Code, 
  Flame, 
  CheckCircle, 
  X,
  FileText,
  Terminal as TerminalIcon,
  ChevronRight,
  User,
  Activity,
  Layers,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightHover } from "@/components/ui/spotlight-hover";

const PROFILE_DATA = {
  name: "Vivek Goud Shaganti",
  title: "Full Stack Engineer & Blockchain Developer",
  email: "vivekshaganti@gmail.com",
  linkedin: "https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a",
  github: "https://github.com/vivek-shaganti1",
  bio: "Computer Science undergraduate (BTech CSE, 3rd Year) with a CGPA of 9.21. Passionate about building intelligent, scalable systems, decentralization, and developer tooling. Experienced with Spring Boot, React, and automated AI workflows.",
  education: {
    institution: "Anurag University, Hyderabad",
    degree: "Bachelor of Technology in Computer Science Engineering",
    duration: "2023 - Present",
    grade: "CGPA: 9.21 / 10"
  },
  skills: {
    languages: ["Java", "Python", "JavaScript", "C", "SQL", "HTML5/CSS3"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    backend: ["Spring Boot", "Node.js", "Express", "REST APIs", "JWT Auth"],
    databases: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    blockchain: ["Decentralized Systems", "Smart Contracts", "Web3 Fundamentals"],
    tools: ["Git", "Postman", "Docker", "Agile Methodologies", "VS Code"]
  },
  experience: [
    {
      role: "Python Development Intern",
      company: "Cognifyz Technologies",
      duration: "Apr 2025 - May 2025",
      description: "Worked on Python-based tasks and real-world mini-projects, improving debugging, problem-solving, and collaborative development skills."
    },
    {
      role: "Vice President",
      company: "Blockchain Club, Anurag University",
      duration: "2024 - Present",
      description: "Coordinated domain activities, managed national-level hackathons (TechHack #4), and guided technical execution and smart contract concepts."
    },
    {
      role: "Team Lead",
      company: "LiteraZe Society",
      duration: "2023 - Present",
      description: "Led student teams and successfully managed academic, technical, and community outreach initiatives."
    }
  ],
  achievements: [
    "Best User Experience Award — TECHHACK #3",
    "2nd Place — Spark Ideathon 2K25",
    "1st Position — Agriculture Domain, ECO-INSIGHTS TOUR",
    "Approved Patent — AI-Based Virtual Professor System"
  ],
  certifications: [
    "Data Structures & Algorithms — Smart Interviews",
    "Operating Systems — NPTEL",
    "Graph Theory Programming Camp — AlgoUniversity",
    "Enterprise-Grade AI — IBM",
    "Generative AI for Data Visualization — Coursera",
    "Artificial Intelligence Training — Acmegrade"
  ],
  projects: [
    {
      id: "1",
      title: "rShield-ai",
      category: "AI & Web3",
      tech: ["React 19", "Tailwind CSS", "Devvit", "Redis", "Hono"],
      description: "An AI-powered real-time moderation intelligence platform built natively for Reddit. Predicts hostility momentum, brigade events, and toxicity density using a live Threat Engine, providing moderators with locking/slow-mode actions.",
      link: "https://github.com/vivek-shaganti1/rshield",
      liveLink: "https://www.reddit.com/r/rshield_dev/comments/1toftxa/rshield/"
    },
    {
      id: "2",
      title: "JavaMind-AI (AntiGravity)",
      category: "Developer Tooling",
      tech: ["Spring Boot", "React 18", "ChromaDB", "Anthropic Claude", "Spring Security"],
      description: "A surgical AI agent built for Java developers. Understands entire Spring Boot codebases, detects architectural anti-patterns (God Classes, circular dependencies), and automatically generates comprehensive JUnit 5 tests.",
      link: "https://github.com/vivek-shaganti1/JavaMind-AI-agent",
      liveLink: "https://github.com/vivek-shaganti1/JavaMind-AI-agent"
    },
    {
      id: "3",
      title: "Instagram AI News Automation",
      category: "Automation",
      tech: ["Python", "Gemini API", "Imagen 3", "macOS LaunchAgent", "Pillow"],
      description: "Fully autonomous system that researches AI news, curates the top stories, designs a multi-slide carousel using Imagen 3 backgrounds (Attio-inspired aesthetic), and publishes daily to Instagram.",
      link: "https://github.com/vivek-shaganti1/Instagram-automation",
      liveLink: "https://github.com/vivek-shaganti1/Instagram-automation"
    },
    {
      id: "4",
      title: "Full Stack E-Commerce Platform",
      category: "Web App",
      tech: ["React.js", "Spring Boot", "MySQL", "Hibernate/JPA", "JWT Auth"],
      description: "A secure e-commerce storefront. Implemented full shopping cart mechanics, checkout flows, order management, database persistence with Hibernate, and administrative workflows.",
      link: "https://github.com/vivek-shaganti1/vivekx-ecommerce",
      liveLink: "https://github.com/vivek-shaganti1/vivekx-ecommerce"
    },
    {
      id: "5",
      title: "Productivity Task Management App",
      category: "Hackathon Win",
      tech: ["React.js", "Node.js", "Calendar Integration", "Tailwind CSS"],
      description: "Developed during a 36-hour national-level hackathon. Designed with clean UI/UX and smooth client interactions. Awarded 'Best User Experience' at TECHHACK #3.",
      link: "#",
      liveLink: "#"
    }
  ],
  stats: [
    { label: "CGPA", value: "9.21" },
    { label: "Hackathons", value: "4+" },
    { label: "Projects Built", value: "8+" },
    { label: "Club VP Roles", value: "1" }
  ]
};

type ThemeMode = "volt" | "amber" | "chrome";

export default function Home() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("volt");
  const [activeTab, setActiveTab] = useState("all");
  
  // Custom interactive terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "System Initialized. Welcome to Vivek's Command Interface.",
    "Type 'help' to see list of operational commands."
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Mouse cursor coordinate state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands: about, skills, projects, clear, stats";
        break;
      case "about":
        response = `Profile: ${PROFILE_DATA.name} | ${PROFILE_DATA.title}. Bio: ${PROFILE_DATA.bio}`;
        break;
      case "skills":
        response = `Arsenal: Languages: ${PROFILE_DATA.skills.languages.join(", ")}; Frontend: ${PROFILE_DATA.skills.frontend.join(", ")}; Backend: ${PROFILE_DATA.skills.backend.join(", ")}`;
        break;
      case "projects":
        response = `Active Nodes: ${PROFILE_DATA.projects.map(p => p.title).join(" | ")}`;
        break;
      case "stats":
        response = `Metrics: CGPA: 9.21, Hackathons: 4+, System Projects: 8+, VP Blockchain Club: 1`;
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for instructions.`;
    }

    setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  const themeColors = {
    volt: {
      primary: "text-[#CCFF00]",
      border: "border-[#CCFF00]/30",
      borderHover: "hover:border-[#CCFF00]/60",
      bg: "bg-[#CCFF00]/10",
      glow: "shadow-[#CCFF00]/10",
      accentGrad: "from-[#CCFF00] via-[#8dfa00] to-emerald-400",
      lineColor: "#CCFF00"
    },
    amber: {
      primary: "text-[#FFDE21]",
      border: "border-[#FFDE21]/30",
      borderHover: "hover:border-[#FFDE21]/60",
      bg: "bg-[#FFDE21]/10",
      glow: "shadow-[#FFDE21]/10",
      accentGrad: "from-[#FFDE21] via-orange-400 to-red-500",
      lineColor: "#FFDE21"
    },
    chrome: {
      primary: "text-sky-400",
      border: "border-sky-400/30",
      borderHover: "hover:border-sky-400/60",
      bg: "bg-sky-400/10",
      glow: "shadow-sky-400/10",
      accentGrad: "from-white via-sky-300 to-indigo-400",
      lineColor: "#38bdf8"
    }
  };

  const currentTheme = themeColors[themeMode];
  const categories = ["all", "AI & Web3", "Developer Tooling", "Automation", "Web App"];
  const filteredProjects = activeTab === "all" ? PROFILE_DATA.projects : PROFILE_DATA.projects.filter(p => p.category === activeTab);

  return (
    <div className={cn(
      "relative min-h-screen bg-[#050507] text-[#e4e4e7] selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-500",
      themeMode
    )}>
      
      {/* Premium Glow Spotlights & Floating Interactive Cursor Particle */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 blur-md z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />

      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-zinc-900/5 blur-[130px] pointer-events-none" />
      <div className={cn(
        "absolute top-[20%] right-10 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 opacity-10",
        themeMode === "volt" && "bg-[#CCFF00]",
        themeMode === "amber" && "bg-[#FFDE21]",
        themeMode === "chrome" && "bg-sky-500"
      )} />

      {/* FLOATING HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900/60 bg-[#050507]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 md:px-8">
          
          {/* Logo "V" style */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-xl border bg-black/60 shadow-lg transition-all duration-500",
              currentTheme.border,
              currentTheme.glow
            )}>
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 20 L50 85 L90 20" 
                  stroke="currentColor" 
                  strokeWidth="15" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={cn("transition-colors duration-500", currentTheme.primary)}
                />
              </svg>
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-400 group-hover:text-white transition-colors">
              VIVEK.SHAGANTI
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#spline-hero" className="hover:text-white transition-colors">3D Model</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Color switcher panel */}
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-900 p-1 rounded-full">
              <button 
                onClick={() => setThemeMode("volt")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "volt" ? "bg-[#CCFF00] text-black scale-110" : "text-zinc-600 hover:text-white")}
                title="Volt Green Theme"
              >
                V
              </button>
              <button 
                onClick={() => setThemeMode("amber")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "amber" ? "bg-[#FFDE21] text-black scale-110" : "text-zinc-600 hover:text-white")}
                title="Amber Theme"
              >
                A
              </button>
              <button 
                onClick={() => setThemeMode("chrome")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "chrome" ? "bg-sky-400 text-black scale-110" : "text-zinc-600 hover:text-white")}
                title="Ice Blue Theme"
              >
                C
              </button>
            </div>

            {/* Resume PDF download shortcut */}
            <a 
              href="/Vivek Goud Shaganti CV.pdf" 
              download
              className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-zinc-950 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8 space-y-24 md:space-y-36 relative z-10">

        {/* 3D INTERACTIVE ROBOT HERO SECTION */}
        <section id="spline-hero" className="relative w-full rounded-2xl border border-zinc-900 bg-black/60 overflow-hidden shadow-2xl">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(255,255,255,0.06)" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-6 z-10 relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 border border-zinc-850 px-3 py-1 text-[10px] text-zinc-400 w-fit font-mono tracking-widest uppercase">
                <Sparkles className={cn("h-3.5 w-3.5", currentTheme.primary)} />
                Operational System Command Interface
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white font-mono leading-none">
                  {PROFILE_DATA.name}
                </h1>
                <p className={cn("text-sm md:text-base font-bold font-mono tracking-widest uppercase", currentTheme.primary)}>
                  {PROFILE_DATA.title}
                </p>
              </div>

              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-lg font-mono">
                BTech Computer Science undergraduate specializing in backend core, React frontend architectures, automated AI nodes, and blockchain smart contracts.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border bg-zinc-950/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-300",
                    currentTheme.borderHover
                  )}
                >
                  <Linkedin className="h-4 w-4" />
                  Connect
                </a>
                <a 
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border bg-zinc-950/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-300",
                    currentTheme.borderHover
                  )}
                >
                  <Github className="h-4 w-4" />
                  Code Repos
                </a>
              </div>
            </div>

            {/* Right Interactive 3D Spline Scene */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-zinc-900 bg-zinc-950/20">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full absolute inset-0"
              />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/10 animate-pulse pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SYSTEM STATS METRICS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PROFILE_DATA.stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-xl border border-zinc-900 bg-[#09090b]/40 p-6 text-center backdrop-blur-md relative overflow-hidden group hover:border-zinc-800 transition-all"
            >
              <span className={cn("block text-2xl md:text-4xl font-black font-mono tracking-tight", currentTheme.primary)}>
                {stat.value}
              </span>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* PROFILE/BIO SUMMARY SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-mono tracking-wider text-white">
              [SYSTEM_SUMMARY]
            </h2>
            
            <Perspective className="max-w-none">
              <div className="bg-[#0b0b0d]/70 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-mono">
                  {PROFILE_DATA.bio}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Highlight color="green">Anurag University</Highlight>
                  <Highlight color="purple">CGPA 9.21</Highlight>
                  <Highlight color="red">Java & Spring Boot</Highlight>
                </div>
              </div>
            </Perspective>
          </div>

          {/* CPU Visualizer */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-zinc-900 bg-[#09090b]/40 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
              <CpuArchitecture 
                className="h-[250px] w-full"
                text="V-SHIELD"
              />
              <div className="text-center pt-4">
                <span className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase">
                  Telemetry Engine System Connected
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS ARSENAL */}
        <section id="skills" className="space-y-8">
          <div className="flex flex-col gap-2">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Hardware & Software Layers
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-mono tracking-tight text-white">
              Technical Arsenal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(PROFILE_DATA.skills).map(([category, items]) => (
              <div 
                key={category}
                className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-2">
                  <h3 className="capitalize font-mono font-bold text-white text-sm">
                    {category}
                  </h3>
                  <Code className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE HACKER COMMAND TERMINAL */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Sandbox Console Interface
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white">
              Command Terminal
            </h2>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-black p-6 font-mono text-xs md:text-sm text-zinc-300 shadow-2xl relative overflow-hidden">
            <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>

            <div className="h-40 overflow-y-auto space-y-2 pr-2">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-zinc-900 flex items-center gap-2">
              <ChevronRight className={cn("h-4 w-4 shrink-0", currentTheme.primary)} />
              <input 
                type="text" 
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                placeholder="Type command (help, stats, about)..."
                className="w-full bg-transparent border-none outline-none text-white font-mono placeholder-zinc-700 text-xs md:text-sm"
              />
            </form>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
                Telemetry Repositories
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-mono tracking-tight text-white">
                Projects Command Panel
              </h2>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-1 border border-zinc-900 bg-black/60 p-1 rounded-lg">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "px-3 py-1 text-[10px] uppercase font-bold rounded tracking-wider transition-all",
                    activeTab === cat 
                      ? "bg-zinc-900 text-white" 
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "group relative flex flex-col justify-between h-full rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md transition-all duration-300",
                  currentTheme.borderHover
                )}
              >
                {/* Spotlight hover effect */}
                <SpotlightHover size={150} className="from-zinc-800/10 via-zinc-700/10 to-transparent" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <span className={cn("px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-zinc-900 border border-zinc-800 rounded-md", currentTheme.primary)}>
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.link && project.link !== "#" && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-500 hover:text-white p-1"
                          title="View Repository Source"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveLink && project.liveLink !== "#" && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-500 hover:text-white p-1"
                          title="Open Live Preview"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-mono text-white tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900/60 mt-4 relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK TIMELINE */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work experience */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
              [LOGGED_EXPERIENCE]
            </h2>

            <div className="relative border-l border-zinc-900 pl-6 space-y-8 ml-2">
              {PROFILE_DATA.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  <span className={cn(
                    "absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border bg-zinc-950",
                    currentTheme.border
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full bg-white", themeMode === "volt" && "bg-[#CCFF00]", themeMode === "amber" && "bg-[#FFDE21]", themeMode === "chrome" && "bg-sky-400")} />
                  </span>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] font-bold text-zinc-600">
                      {exp.duration}
                    </span>
                    <h3 className="font-mono font-bold text-white text-sm md:text-base">
                      {exp.role} — <span className={currentTheme.primary}>{exp.company}</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
              [ACADEMICS]
            </h2>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                  <BookOpen className="h-5 w-5 text-zinc-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-xs md:text-sm font-mono">
                    {PROFILE_DATA.education.institution}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {PROFILE_DATA.education.degree}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {PROFILE_DATA.education.duration}
                  </p>
                  <span className={cn(
                    "inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-mono border",
                    currentTheme.primary,
                    currentTheme.border
                  )}>
                    {PROFILE_DATA.education.grade}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS & CERTIFICATIONS */}
        <section id="achievements" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
              <Flame className="h-5 w-5 text-pink-500" />
              <h3 className="font-mono font-bold text-lg text-white">
                Achievements & Awards
              </h3>
            </div>
            <ul className="space-y-3.5">
              {PROFILE_DATA.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                  <CheckCircle className="h-4 w-4 shrink-0 text-pink-500 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
              <Shield className="h-5 w-5 text-purple-500" />
              <h3 className="font-mono font-bold text-lg text-white">
                Professional Certifications
              </h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFILE_DATA.certifications.map((cert, idx) => (
                <li 
                  key={idx} 
                  className="flex items-center gap-2 rounded bg-zinc-900/40 border border-zinc-800/80 p-2.5 text-xs text-zinc-300 hover:border-zinc-700/80 transition-colors font-mono"
                >
                  <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="line-clamp-2">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-black mt-24 py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} Vivek Goud Shaganti. Operational command interface.
          </div>
          <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-mono">
            <span>Next.js Turbopack Core</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </footer>

    </div>
  );
}

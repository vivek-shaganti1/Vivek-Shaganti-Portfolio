"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  ExternalLink, 
  Sparkles, 
  Award, 
  BookOpen, 
  Briefcase, 
  Shield, 
  Code, 
  Flame, 
  Cpu, 
  CheckCircle, 
  X,
  Layers,
  Heart,
  Palette,
  Lock,
  Unlock,
  KeyRound,
  Send,
  Loader2,
  Trash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightHover } from "@/components/ui/spotlight-hover";

const INITIAL_PROFILE = {
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
  ]
};

type ThemeMode = "volt" | "amber" | "chrome";

export default function Home() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditMode, setIsEditMode] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("volt");
  const [activeTab, setActiveTab] = useState("all");
  
  // Customizer OTP Verification State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Advanced customization panel state
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminTab, setAdminTab] = useState<"summary" | "skills" | "experience" | "academics" | "projects">("summary");
  
  // Editing individual item models
  const [editingProject, setEditingProject] = useState<any>(null);

  // Load profile & auth state on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("vivek_portfolio_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error(e);
      }
    }
    const savedAuth = sessionStorage.getItem("vivek_portfolio_authorized");
    if (savedAuth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const saveProfile = (newProfile: typeof INITIAL_PROFILE) => {
    setProfile(newProfile);
    localStorage.setItem("vivek_portfolio_profile", JSON.stringify(newProfile));
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "vivekshaganti@gmail.com" })
      });
      if (res.ok) {
        setOtpSent(true);
      } else {
        const err = await res.json();
        setOtpError(err.error || "Failed to trigger OTP.");
      }
    } catch (e) {
      setOtpError("Network connection error.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpInput })
      });
      if (res.ok) {
        setIsAuthorized(true);
        sessionStorage.setItem("vivek_portfolio_authorized", "true");
        setIsEditMode(true);
        setShowOtpModal(false);
        setShowAdminPanel(true); // Open edit dashboard automatically!
      } else {
        const err = await res.json();
        setOtpError(err.error || "Invalid OTP entered.");
      }
    } catch (e) {
      setOtpError("Validation process failed.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCustomizeClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setShowAdminPanel(false);
    } else if (isAuthorized) {
      setIsEditMode(true);
      setShowAdminPanel(true);
    } else {
      setShowOtpModal(true);
    }
  };

  // Add Project
  const handleAddProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: "New Simulation Node",
      category: "AI & Web3",
      tech: ["Next.js", "TypeScript"],
      description: "Interactive simulation node demonstrating hardware execution acceleration.",
      link: "https://github.com/vivek-shaganti1",
      liveLink: "https://github.com/vivek-shaganti1"
    };
    const updated = {
      ...profile,
      projects: [newProj, ...profile.projects]
    };
    saveProfile(updated);
    setEditingProject(newProj);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this project?")) {
      const updated = {
        ...profile,
        projects: profile.projects.filter(p => p.id !== id)
      };
      saveProfile(updated);
      if (editingProject?.id === id) setEditingProject(null);
    }
  };

  // Skill Editor Helpers
  const handleSkillChange = (category: string, value: string) => {
    const arr = value.split(",").map(s => s.trim()).filter(Boolean);
    saveProfile({
      ...profile,
      skills: {
        ...profile.skills,
        [category]: arr
      }
    });
  };

  // Experience Editor Helpers
  const handleAddExperience = () => {
    const newExp = {
      role: "New Role",
      company: "New Company",
      duration: "Duration",
      description: "Describe details of your responsibilities and achievements."
    };
    saveProfile({
      ...profile,
      experience: [...profile.experience, newExp]
    });
  };

  const handleEditExperience = (index: number, field: string, value: string) => {
    const list = [...profile.experience];
    list[index] = { ...list[index], [field]: value };
    saveProfile({
      ...profile,
      experience: list
    });
  };

  const handleDeleteExperience = (index: number) => {
    saveProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index)
    });
  };

  // Theme styling configurations
  const themeColors = {
    volt: {
      primary: "text-[#CCFF00]",
      border: "border-[#CCFF00]/30",
      borderHover: "hover:border-[#CCFF00]/60",
      bg: "bg-[#CCFF00]/10",
      glow: "shadow-[#CCFF00]/10",
      accentGrad: "from-[#CCFF00] via-[#8dfa00] to-emerald-400",
      highlight: "volt",
      lineColor: "#CCFF00"
    },
    amber: {
      primary: "text-[#FFDE21]",
      border: "border-[#FFDE21]/30",
      borderHover: "hover:border-[#FFDE21]/60",
      bg: "bg-[#FFDE21]/10",
      glow: "shadow-[#FFDE21]/10",
      accentGrad: "from-[#FFDE21] via-orange-400 to-red-500",
      highlight: "red",
      lineColor: "#FFDE21"
    },
    chrome: {
      primary: "text-sky-400",
      border: "border-sky-400/30",
      borderHover: "hover:border-sky-400/60",
      bg: "bg-sky-400/10",
      glow: "shadow-sky-400/10",
      accentGrad: "from-white via-sky-300 to-indigo-400",
      highlight: "purple",
      lineColor: "#38bdf8"
    }
  };

  const currentTheme = themeColors[themeMode];
  const categories = ["all", "AI & Web3", "Developer Tooling", "Automation", "Web App"];
  const filteredProjects = activeTab === "all" ? profile.projects : profile.projects.filter(p => p.category === activeTab);

  return (
    <div className={cn(
      "relative min-h-screen bg-[#060608] text-[#e4e4e7] selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-500",
      themeMode
    )}>
      
      {/* Dynamic Ambient Background Sparkles & Liquid Filters */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-zinc-900/10 blur-[130px] pointer-events-none" />
      <div className={cn(
        "absolute top-[20%] right-10 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 opacity-15",
        themeMode === "volt" && "bg-[#CCFF00]",
        themeMode === "amber" && "bg-[#FFDE21]",
        themeMode === "chrome" && "bg-sky-500"
      )} />

      {/* FLOATING HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-[#060608]/90 backdrop-blur-md">
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
            <a href="#spline-hero" className="hover:text-white transition-colors">3D View</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme switcher */}
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-900 p-1 rounded-full">
              <button 
                onClick={() => setThemeMode("volt")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "volt" ? "bg-[#CCFF00] text-black scale-110" : "text-zinc-600 hover:text-white")}
              >
                V
              </button>
              <button 
                onClick={() => setThemeMode("amber")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "amber" ? "bg-[#FFDE21] text-black scale-110" : "text-zinc-600 hover:text-white")}
              >
                A
              </button>
              <button 
                onClick={() => setThemeMode("chrome")} 
                className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all", themeMode === "chrome" ? "bg-sky-400 text-black scale-110" : "text-zinc-600 hover:text-white")}
              >
                C
              </button>
            </div>

            {/* Customize Mode Lock toggle */}
            <button 
              onClick={handleCustomizeClick}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all duration-300",
                isEditMode 
                  ? "bg-red-600 text-white" 
                  : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
              )}
            >
              {isEditMode ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {isEditMode ? "Lock Panel" : "Customize"}
            </button>

            {isEditMode && (
              <button 
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-full p-2"
                title="Toggle Dashboard Editor"
              >
                <Layers className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8 space-y-24 md:space-y-36 relative z-10">

        {/* 3D INTERACTIVE HERO ELEMENT */}
        <section id="spline-hero" className="relative w-full rounded-2xl border border-zinc-900 bg-black/60 overflow-hidden shadow-2xl">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(255,255,255,0.06)" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-6 z-10 relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 border border-zinc-850 px-3 py-1 text-[10px] text-zinc-400 w-fit font-mono tracking-widest uppercase">
                <Sparkles className={cn("h-3.5 w-3.5", currentTheme.primary)} />
                System Core Live Preview
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white font-mono leading-none">
                  {profile.name}
                </h1>
                <p className={cn("text-sm md:text-base font-bold font-mono tracking-widest uppercase", currentTheme.primary)}>
                  {profile.title}
                </p>
              </div>

              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-lg font-mono">
                Ingesting direct telemetry from your workspace. Fully customizable live portfolio tracking experience. Interactive 3D robotic model loading modules to visualize structural hardware processes.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href={profile.linkedin}
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
                  href={profile.github}
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
              {/* Scan holographic visual overlay */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/20 animate-bounce pointer-events-none" />
            </div>
          </div>
        </section>

        {/* BIO SUMMARY SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-mono tracking-wider text-white">
              [SYSTEM_SUMMARY]
            </h2>
            
            <Perspective className="max-w-none">
              <div className="bg-[#0b0b0d]/70 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-mono">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Highlight color="green">Anurag University</Highlight>
                  <Highlight color="purple">CGPA 9.21</Highlight>
                  <Highlight color="red">Java & Spring Boot</Highlight>
                </div>
              </div>
            </Perspective>
          </div>

          {/* Fixed CPU Visualizer */}
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

        {/* SKILLS SECTION */}
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
            {Object.entries(profile.skills).map(([category, items]) => (
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
                {/* Spotlight hover effect inside card */}
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
              {profile.experience.map((exp, idx) => (
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
                    {profile.education.institution}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {profile.education.degree}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {profile.education.duration}
                  </p>
                  <span className={cn(
                    "inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-mono border",
                    currentTheme.primary,
                    currentTheme.border
                  )}>
                    {profile.education.grade}
                  </span>
                </div>
              </div>
            </div>
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

      {/* SECURITY OTP AUTH MODAL */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#0c0c0e] p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  setShowOtpModal(false);
                  setOtpSent(false);
                  setOtpInput("");
                  setOtpError("");
                }}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={cn("h-12 w-12 rounded-full border flex items-center justify-center bg-zinc-950", currentTheme.border)}>
                  <KeyRound className={cn("h-5 w-5", currentTheme.primary)} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">Security Validation</h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">
                    Authenticating access to customize vivekshaganti@gmail.com profile configuration.
                  </p>
                </div>

                {!otpSent ? (
                  <button 
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                    className="w-full py-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-white hover:bg-zinc-850 flex items-center justify-center gap-2"
                  >
                    {otpLoading && <Loader2 className="h-3 w-3 animate-spin" />}
                    SEND_OTP_KEY
                  </button>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="w-full space-y-3 pt-2">
                    <input 
                      type="text"
                      value={otpInput}
                      onChange={e => setOtpInput(e.target.value)}
                      placeholder="Enter 6-digit OTP code"
                      maxLength={6}
                      className={cn(
                        "w-full bg-zinc-950 border rounded px-3 py-2 text-sm text-center text-white tracking-widest font-mono focus:outline-none focus:ring-1",
                        otpError ? "border-red-500 focus:ring-red-500" : "border-zinc-800 focus:ring-purple-500"
                      )}
                      required
                    />
                    {otpError && (
                      <span className="text-[10px] text-red-500 font-mono block">
                        {otpError}
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      OTP has been outputted to terminal console and written in .otp.txt file.
                    </span>
                    <button 
                      type="submit"
                      disabled={otpLoading}
                      className="w-full py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-white hover:bg-zinc-850 flex items-center justify-center gap-2"
                    >
                      {otpLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      VERIFY_KEY
                    </button>
                  </form>
                )}

                {otpError && !otpSent && (
                  <span className="text-xs text-red-500 font-mono">{otpError}</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL CUSTOMIZATION ADMIN DRAWER PANEL */}
      <AnimatePresence>
        {isEditMode && showAdminPanel && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#0a0a0c] border-l border-zinc-900 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className={cn("h-4 w-4", currentTheme.primary)} />
                <h3 className="text-sm font-bold font-mono text-white">Operational Customizer</h3>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-zinc-900 px-6 overflow-x-auto text-[10px] font-mono font-bold gap-2">
              {(["summary", "skills", "experience", "academics", "projects"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setAdminTab(tab)}
                  className={cn(
                    "py-3 border-b-2 transition-colors uppercase whitespace-nowrap",
                    adminTab === tab ? "border-[#CCFF00] text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: Summary/Bio */}
              {adminTab === "summary" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={e => saveProfile({...profile, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Professional Title</label>
                    <input 
                      type="text" 
                      value={profile.title}
                      onChange={e => saveProfile({...profile, title: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Summary (Bio)</label>
                    <textarea 
                      value={profile.bio}
                      onChange={e => saveProfile({...profile, bio: e.target.value})}
                      rows={6}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Technical Skills */}
              {adminTab === "skills" && (
                <div className="space-y-4">
                  <p className="text-[10px] font-mono text-zinc-500">Edit skills as comma-separated values.</p>
                  {Object.keys(profile.skills).map((cat) => (
                    <div key={cat}>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">{cat}</label>
                      <input 
                        type="text"
                        value={(profile.skills as any)[cat].join(", ")}
                        onChange={e => handleSkillChange(cat, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Experience */}
              {adminTab === "experience" && (
                <div className="space-y-6">
                  <button 
                    onClick={handleAddExperience}
                    className="w-full py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-white rounded hover:bg-zinc-850"
                  >
                    ADD_NEW_WORK_NODE
                  </button>

                  <div className="space-y-6 divide-y divide-zinc-900">
                    {profile.experience.map((exp, idx) => (
                      <div key={idx} className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-500">Work Node #{idx+1}</span>
                          <button 
                            onClick={() => handleDeleteExperience(idx)}
                            className="text-red-500 hover:text-red-400 text-xs"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="Role"
                            value={exp.role}
                            onChange={e => handleEditExperience(idx, "role", e.target.value)}
                            className="bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                          />
                          <input 
                            type="text" 
                            placeholder="Company"
                            value={exp.company}
                            onChange={e => handleEditExperience(idx, "company", e.target.value)}
                            className="bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                          />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Duration"
                          value={exp.duration}
                          onChange={e => handleEditExperience(idx, "duration", e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                        />
                        <textarea 
                          placeholder="Description"
                          value={exp.description}
                          onChange={e => handleEditExperience(idx, "description", e.target.value)}
                          rows={3}
                          className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Academics */}
              {adminTab === "academics" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Institution</label>
                    <input 
                      type="text" 
                      value={profile.education.institution}
                      onChange={e => saveProfile({
                        ...profile,
                        education: { ...profile.education, institution: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Degree Title</label>
                    <input 
                      type="text" 
                      value={profile.education.degree}
                      onChange={e => saveProfile({
                        ...profile,
                        education: { ...profile.education, degree: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={profile.education.duration}
                        onChange={e => saveProfile({
                          ...profile,
                          education: { ...profile.education, duration: e.target.value }
                        })}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">GPA / Score</label>
                      <input 
                        type="text" 
                        value={profile.education.grade}
                        onChange={e => saveProfile({
                          ...profile,
                          education: { ...profile.education, grade: e.target.value }
                        })}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Projects */}
              {adminTab === "projects" && (
                <div className="space-y-4">
                  <button 
                    onClick={handleAddProject}
                    className="w-full py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-white rounded hover:bg-zinc-850"
                  >
                    ADD_NEW_PROJECT_NODE
                  </button>

                  <div className="space-y-6 divide-y divide-zinc-900 pt-4">
                    {profile.projects.map((proj) => (
                      <div key={proj.id} className="pt-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <input 
                            type="text" 
                            value={proj.title}
                            onChange={e => {
                              const updated = profile.projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p);
                              saveProfile({ ...profile, projects: updated });
                            }}
                            className="bg-transparent border-b border-zinc-800 text-sm font-bold font-mono text-white focus:outline-none focus:border-purple-500"
                          />
                          <button 
                            onClick={(e) => handleDeleteProject(proj.id, e)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-mono text-zinc-650 uppercase">Category</label>
                            <input 
                              type="text" 
                              value={proj.category}
                              onChange={e => {
                                const updated = profile.projects.map(p => p.id === proj.id ? { ...p, category: e.target.value } : p);
                                saveProfile({ ...profile, projects: updated });
                              }}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[11px] text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono text-zinc-650 uppercase">Repo Source Link</label>
                            <input 
                              type="text" 
                              value={proj.link}
                              onChange={e => {
                                const updated = profile.projects.map(p => p.id === proj.id ? { ...p, link: e.target.value } : p);
                                saveProfile({ ...profile, projects: updated });
                              }}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[11px] text-white font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono text-zinc-650 uppercase">Live Deployed URL</label>
                          <input 
                            type="text" 
                            value={proj.liveLink}
                            onChange={e => {
                              const updated = profile.projects.map(p => p.id === proj.id ? { ...p, liveLink: e.target.value } : p);
                              saveProfile({ ...profile, projects: updated });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[11px] text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono text-zinc-650 uppercase">Description</label>
                          <textarea 
                            value={proj.description}
                            onChange={e => {
                              const updated = profile.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p);
                              saveProfile({ ...profile, projects: updated });
                            }}
                            rows={2}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[11px] text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono text-zinc-650 uppercase">Technologies (Comma separated)</label>
                          <input 
                            type="text" 
                            value={proj.tech.join(", ")}
                            onChange={e => {
                              const techArr = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                              const updated = profile.projects.map(p => p.id === proj.id ? { ...p, tech: techArr } : p);
                              saveProfile({ ...profile, projects: updated });
                            }}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[11px] text-white font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer buttons */}
            <div className="p-6 border-t border-zinc-900 flex justify-end gap-2 bg-[#09090b]">
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="px-4 py-2 border border-zinc-800 text-[10px] font-mono font-bold text-white rounded hover:bg-zinc-900"
              >
                CLOSE_PANEL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

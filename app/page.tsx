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
  ChevronRight,
  Edit3,
  Unlock,
  Lock,
  Layers,
  Heart,
  Save,
  Plus,
  Trash,
  Trash2,
  KeyRound,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightHover } from "@/components/ui/spotlight-hover";
import ResumeUploadModal from "@/components/resume-upload-modal";

const INITIAL_PROFILE = {
  name: "Vivek Goud Shaganti",
  title: "Full Stack Engineer & AI Automation Developer",
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
    languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C", "C++", "HTML5", "CSS3"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "ShadCN UI", "Vite", "Responsive UI", "App Router"],
    backend: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "JWT Authentication", "Hibernate/JPA", "Microservices", "WebSockets", "Server Actions"],
    artificialIntelligence: ["Generative AI", "LLMs", "AI Agents", "Multi-Agent Systems", "Prompt Engineering", "RAG", "Gemini API", "Groq API", "OpenAI API", "NVIDIA NIM", "Judge0", "Scikit-Learn", "Semantic Search"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Supabase", "NeonDB", "Prisma ORM", "Drizzle ORM"],
    cloudDevOps: ["Microsoft Azure", "Vercel", "Render", "Docker", "CI/CD", "GitHub Actions", "Linux", "Cloudinary", "Nginx"],
    developerTools: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman", "npm", "pnpm", "FFmpeg", "Figma"],
    apisIntegrations: ["Gemini API", "Groq API", "OpenAI API", "Telegram Bot API", "GitHub API", "Cloudinary API", "Judge0 API", "REST APIs", "Webhooks"],
    dataAnalytics: ["Pandas", "NumPy", "Plotly", "Machine Learning", "Predictive Analytics", "Data Visualization", "Qlik Sense"],
    blockchain: ["Web3 Fundamentals", "Smart Contracts", "Solidity", "Decentralized Systems"]
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
      role: "PwC Launchpad Participant",
      company: "PwC India",
      duration: "2025",
      description: "Selected for PwC Launchpad program, gaining hands-on exposure to enterprise solutions, business consulting methodologies, and technology strategy frameworks."
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
      title: "AI Interview Platform",
      category: "AI",
      categories: ["Featured", "AI", "Full Stack", "AI Agents"],
      isFeatured: true,
      status: "Production",
      completionDate: "June 2026",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Groq", "Gemini", "Judge0", "PostgreSQL", "Drizzle ORM", "Redis", "JWT", "AI Agents"],
      description: "Enterprise AI recruitment platform conducting technical and behavioral interviews, evaluating candidates using LLMs, executing coding assessments, analytics, and generating hiring reports.",
      link: "#",
      liveLink: "https://interviewai-os.vercel.app/",
      stars: 12,
      forks: 4
    },
    {
      id: "2",
      title: "JavaMind AI",
      category: "Developer Tools",
      categories: ["Featured", "Developer Tools", "AI", "AI Agents"],
      isFeatured: true,
      status: "Active",
      completionDate: "May 2026",
      tech: ["Spring Boot", "React", "TypeScript", "ChromaDB", "Anthropic Claude", "Gemini", "Spring Security"],
      description: "Enterprise-grade AI code intelligence platform for Java developers. Understands complete Spring Boot codebases, detects architectural anti-patterns, and recommends refactoring.",
      link: "https://github.com/vivek-shaganti1/JavaMind-AI-agent",
      liveLink: "https://github.com/vivek-shaganti1/JavaMind-AI-agent",
      stars: 28,
      forks: 8
    },
    {
      id: "3",
      title: "rShield",
      category: "AI & Web3",
      categories: ["Featured", "AI", "AI Agents", "Open Source"],
      isFeatured: true,
      status: "Active",
      completionDate: "April 2026",
      tech: ["React 19", "Tailwind CSS", "Devvit", "Redis", "Hono", "TypeScript", "AI Agents"],
      description: "AI-powered Reddit community intelligence platform predicting toxicity escalation, coordinated attacks, raid detection, and moderation insights using intelligent AI agents.",
      link: "https://github.com/vivek-shaganti1/rshield",
      liveLink: "https://www.reddit.com/r/rshield_dev/comments/1toftxa/rshield/",
      stars: 45,
      forks: 11
    },
    {
      id: "4",
      title: "Portfolio OS",
      category: "Web Apps",
      categories: ["Featured", "Web Apps", "Open Source"],
      isFeatured: true,
      status: "Production",
      completionDate: "May 2026",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "Groq API"],
      description: "Interactive operating-system-inspired developer portfolio with terminal interface, AI recruiter assistant, recruiter mode, and dynamic project filtering.",
      link: "https://github.com/vivek-shaganti1/Vivek-Shaganti-Portfolio",
      liveLink: "https://vivek-shaganti-portfolio.vercel.app/",
      stars: 18,
      forks: 3
    },
    {
      id: "5",
      title: "Instagram AI Automation",
      category: "Automation",
      categories: ["Featured", "Automation"],
      isFeatured: true,
      status: "Production",
      completionDate: "March 2026",
      tech: ["Python", "Gemini API", "Imagen", "Pillow", "Automation", "LaunchAgent", "FFmpeg"],
      description: "Fully autonomous AI content automation platform researching trending AI news, curating stories, designing carousel graphics, and publishing daily to Instagram.",
      link: "https://github.com/vivek-shaganti1/Instagram-automation",
      liveLink: "https://instagram-automation-phi.vercel.app/",
      stars: 32,
      forks: 9
    },
    {
      id: "6",
      title: "Trading AI",
      category: "AI",
      categories: ["AI"],
      isFeatured: false,
      status: "Research",
      completionDate: "November 2025",
      tech: ["Python", "Pandas", "Trading APIs", "Machine Learning"],
      description: "Algorithmic trading assistant capable of market analysis, strategy execution, risk management, portfolio monitoring, paper trading, and broker API integration.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "7",
      title: "RAN Fitness",
      category: "Web Apps",
      categories: ["Web Apps"],
      isFeatured: false,
      status: "Production",
      completionDate: "February 2026",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Supabase", "Telegram Bot API", "Gemini API"],
      description: "Premium gym management website featuring animated UI, AI fitness coach, admin dashboard, Telegram notifications, booking workflows, and Supabase integration.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "8",
      title: "Full Stack E-Commerce",
      category: "Full Stack",
      categories: ["Full Stack", "Web Apps"],
      isFeatured: false,
      status: "Production",
      completionDate: "January 2026",
      tech: ["React.js", "Spring Boot", "MySQL", "Hibernate/JPA", "JWT Auth"],
      description: "Production-ready e-commerce platform built with Spring Boot and React featuring JWT authentication, shopping cart, product catalog, checkout, and MySQL persistence.",
      link: "https://github.com/vivek-shaganti1/vivekx-ecommerce",
      liveLink: "https://github.com/vivek-shaganti1/vivekx-ecommerce",
      stars: 15,
      forks: 5
    },
    {
      id: "9",
      title: "Productivity Task Manager",
      category: "Hackathons",
      categories: ["Hackathons"],
      isFeatured: false,
      status: "Archived",
      completionDate: "June 2025",
      tech: ["React.js", "Node.js", "Calendar Integration", "Tailwind CSS"],
      description: "Developed during a 36-hour national-level hackathon. Designed with clean UI/UX and smooth client interactions. Awarded 'Best User Experience' at TECHHACK #3.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "10",
      title: "Sticker Ordering Platform",
      category: "Full Stack",
      categories: ["Full Stack", "Web Apps"],
      isFeatured: false,
      status: "Production",
      completionDate: "December 2025",
      tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind CSS"],
      description: "A high-performance full stack e-commerce web application specializing in custom stickers with visual customization tools, real-time pricing, and checkout.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "11",
      title: "AI Interview Prep",
      category: "AI",
      categories: ["AI"],
      isFeatured: false,
      status: "Research",
      completionDate: "September 2025",
      tech: ["Next.js", "React", "Tailwind CSS", "Gemini API", "SpeechRecognition", "Judge0"],
      description: "Intelligent software engineer preparation tool featuring interactive voice interviews, dynamic coding tests, automated feedback, and performance tracking.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "12",
      title: "Job Applier AI",
      category: "Automation",
      categories: ["Automation", "AI Agents"],
      isFeatured: false,
      status: "Research",
      completionDate: "October 2025",
      tech: ["Python", "Automation", "Playwright", "LLMs", "Gemini", "Browser Automation"],
      description: "AI-powered autonomous job application assistant scanning job portals, optimizing resumes, filling applications intelligently, and tracking history.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "13",
      title: "Jarvis AI",
      category: "AI",
      categories: ["AI", "AI Agents"],
      isFeatured: false,
      status: "Active",
      completionDate: "August 2025",
      tech: ["Python", "Reasoning", "Workflow Automation", "LLMs"],
      description: "Personal AI assistant capable of reasoning, workflow orchestration, desktop interaction, tool execution, and automation pipelines.",
      link: "#",
      liveLink: "#"
    },
    {
      id: "14",
      title: "VSystem Automation",
      category: "Automation",
      categories: ["Automation"],
      isFeatured: false,
      status: "Active",
      completionDate: "July 2025",
      tech: ["Python", "Automation", "OS Automation", "Scheduling"],
      description: "Desktop workflow automation platform integrating AI agents, system automation, file operations, scheduling, and browser automation.",
      link: "#",
      liveLink: "#"
    }
  ],
  stats: [
    { label: "CGPA", value: "9.21" },
    { label: "Hackathons", value: "4+" },
    { label: "Projects Built", value: "14" },
    { label: "Club VP Roles", value: "1" }
  ]
};

const skillCategoryLabels: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  artificialIntelligence: "Artificial Intelligence",
  databases: "Databases",
  cloudDevOps: "Cloud & DevOps",
  developerTools: "Developer Tools",
  apisIntegrations: "APIs & Integrations",
  dataAnalytics: "Data & Analytics",
  blockchain: "Blockchain"
};

type ThemeMode = "volt" | "amber" | "chrome";

export default function Home() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditMode, setIsEditMode] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("volt");
  const [activeTab, setActiveTab] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  
  // Customizer Password Protection State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Advanced customization panel state
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminTab, setAdminTab] = useState<"summary" | "skills" | "experience" | "academics" | "projects" | "analytics">("summary");
  
  // Editing individual item models
  const [editingProject, setEditingProject] = useState<any>(null);

  // Command Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "System Initialized. Welcome to Vivek's Command Interface.",
    "Type 'help' to see list of operational commands."
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Mouse Coordinate State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Dynamic Resume States
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isResumeUploadModalOpen, setIsResumeUploadModalOpen] = useState(false);
  const [resumeUpdatedAt, setResumeUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Recruiter Analytics Sync
  const [analyticsData, setAnalyticsData] = useState<{
    interactions: number;
    downloads: number;
    questions: Record<string, number>;
  }>({ interactions: 0, downloads: 0, questions: {} });

  useEffect(() => {
    const loadAnalytics = () => {
      const dataStr = localStorage.getItem("portfolio_recruiter_analytics");
      if (dataStr) {
        try {
          setAnalyticsData(JSON.parse(dataStr));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadAnalytics();
    window.addEventListener("analytics_updated", loadAnalytics);
    return () => window.removeEventListener("analytics_updated", loadAnalytics);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("vivek_portfolio_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error(e);
      }
    }
    const savedAuth = sessionStorage.getItem("portfolio_edit_auth");
    if (savedAuth === "true") {
      setIsAuthorized(true);
    }
    const savedResume = localStorage.getItem("portfolio_resume_base64");
    if (savedResume) {
      setResumeBase64(savedResume);
    }
    const savedResumeTime = localStorage.getItem("portfolio_resume_updated_at");
    if (savedResumeTime) {
      setResumeUpdatedAt(savedResumeTime);
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const saveProfile = (newProfile: typeof INITIAL_PROFILE) => {
    setProfile(newProfile);
    localStorage.setItem("vivek_portfolio_profile", JSON.stringify(newProfile));
  };

  const handleCustomizeClick = () => {
    console.log("[CUSTOMIZER] handleCustomizeClick called. isEditMode:", isEditMode, "isAuthorized:", isAuthorized);
    if (isEditMode) {
      console.log("[CUSTOMIZER] Locking console.");
      setIsEditMode(false);
      setShowAdminPanel(false);
    } else {
      if (isAuthorized) {
        console.log("[CUSTOMIZER] Already authorized. Opening customizer.");
        setIsEditMode(true);
        setShowAdminPanel(true);
      } else {
        console.log("[CUSTOMIZER] Not authorized. Opening password modal.");
        setShowPasswordModal(true);
        setPasswordInput("");
        setPasswordError(false);
      }
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setToast({ message: "Only PDF files are allowed", type: "error" });
      return;
    }

    setUploadProgress(10);
    const reader = new FileReader();

    // Mock progress loading effect
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 20;
      });
    }, 100);

    reader.onload = (event) => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const base64String = event.target?.result as string;
      if (base64String) {
        localStorage.setItem("portfolio_resume_base64", base64String);
        setResumeBase64(base64String);
        window.dispatchEvent(new Event("storage"));
        setToast({ message: "Resume updated successfully!", type: "success" });
        console.log("[CUSTOMIZER] Resume PDF uploaded successfully.");
      } else {
        setToast({ message: "Failed to read PDF file", type: "error" });
      }

      setTimeout(() => {
        setUploadProgress(null);
      }, 1000);
    };

    reader.onerror = () => {
      clearInterval(progressInterval);
      setUploadProgress(null);
      setToast({ message: "Failed to upload resume", type: "error" });
    };

    reader.readAsDataURL(file);
  };

  const handleResumeDelete = () => {
    localStorage.removeItem("portfolio_resume_base64");
    localStorage.removeItem("portfolio_resume_updated_at");
    setResumeBase64(null);
    setResumeUpdatedAt(null);
    window.dispatchEvent(new Event("storage"));
    setToast({ message: "Custom resume deleted. Reverted to default.", type: "success" });
    console.log("[CUSTOMIZER] Custom resume PDF deleted. Reverted to static CV.");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands: about, skills, projects, stats, clear";
        break;
      case "about":
        response = `Profile: ${profile.name} | ${profile.title}. Bio: ${profile.bio}`;
        break;
      case "skills":
        response = `Arsenal: Languages: ${profile.skills.languages.join(", ")}; Frontend: ${profile.skills.frontend.join(", ")}; Backend: ${profile.skills.backend.join(", ")}`;
        break;
      case "projects":
        response = `Active Nodes: ${profile.projects.map(p => p.title).join(" | ")}`;
        break;
      case "stats":
        response = `Metrics: CGPA: 9.21, Hackathons: 4+, System Projects: ${profile.projects.length}, VP Blockchain Club: 1`;
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

  const handleAddProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: "New Custom Project",
      category: "AI",
      categories: ["AI"],
      isFeatured: false,
      status: "Active",
      completionDate: "2026",
      tech: ["React", "TypeScript"],
      description: "Hacker operational simulation layer running on Vercel serverless functions.",
      link: "https://github.com/vivek-shaganti1",
      liveLink: "https://github.com/vivek-shaganti1",
      stars: 0,
      forks: 0
    };
    saveProfile({
      ...profile,
      projects: [newProj, ...profile.projects]
    });
    setEditingProject(newProj);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this project?")) {
      saveProfile({
        ...profile,
        projects: profile.projects.filter(p => p.id !== id)
      });
      if (editingProject?.id === id) setEditingProject(null);
    }
  };

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
  const categories = ["all", "Featured", "AI", "Automation", "Developer Tools", "Full Stack", "Web Apps", "AI Agents", "Hackathons", "Open Source"];
  const filteredProjects = profile.projects
    .filter(p => {
      if (activeTab === "all") return true;
      if (activeTab === "Featured") return p.isFeatured;
      return p.categories?.includes(activeTab) || p.category === activeTab;
    })
    .filter(p => {
      if (!projectSearch) return true;
      const q = projectSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q) ||
             p.tech.some(t => t.toLowerCase().includes(q));
    });

  return (
    <div className={cn(
      "relative min-h-screen bg-[#050507] text-[#e4e4e7] selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-500",
      themeMode
    )}>
      
      {/* Interactive Cursor Particle */}
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
            <a href="#spline-hero" className="hover:text-white transition-colors">3D View</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Color switcher */}
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
            {/* Dynamic Resume Link & Dropdown Component */}
            <div className="relative">
              {isEditMode ? (
                <>
                  <button
                    onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                    className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-zinc-950 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer select-none"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Resume ⚙️
                  </button>

                  <AnimatePresence>
                    {isResumeDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-[#0a0a0c]/95 border border-zinc-800 rounded-lg shadow-xl py-1 z-[9990] font-mono text-[10px] font-bold"
                        style={{
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                        }}
                      >
                        <a
                          href={resumeBase64 || "/Vivek Goud Shaganti CV.pdf"}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setIsResumeDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors w-full text-left"
                        >
                          View Resume
                        </a>
                        <button
                          onClick={() => {
                            setIsResumeUploadModalOpen(true);
                            setIsResumeDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors w-full text-left font-bold"
                        >
                          Upload New Resume
                        </button>
                        {resumeBase64 && (
                          <>
                            <button
                              onClick={() => {
                                setIsResumeUploadModalOpen(true);
                                setIsResumeDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors w-full text-left font-bold"
                            >
                              Replace Resume
                            </button>
                            <button
                              onClick={() => {
                                handleResumeDelete();
                                setIsResumeDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-zinc-900 transition-colors w-full text-left border-t border-zinc-900"
                            >
                              Delete Resume
                            </button>
                          </>
                        )}
                        {resumeUpdatedAt && (
                          <div className="px-4 py-1.5 text-[7px] text-zinc-650 border-t border-zinc-900 uppercase tracking-widest font-normal">
                            Updated: {resumeUpdatedAt}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <a
                  href={resumeBase64 || "/Vivek Goud Shaganti CV.pdf"}
                  download
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-zinc-950 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
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
                  {profile.name}
                </h1>
                <p className={cn("text-sm md:text-base font-bold font-mono tracking-widest uppercase", currentTheme.primary)}>
                  {profile.title}
                </p>
              </div>

              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-lg font-mono">
                BTech Computer Science undergraduate specializing in backend core, React frontend architectures, automated AI nodes, and blockchain smart contracts.
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
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/10 animate-pulse pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SYSTEM STATS METRICS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {profile.stats ? (
            profile.stats.map((stat, index) => (
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
            ))
          ) : (
            INITIAL_PROFILE.stats.map((stat, index) => (
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
            ))
          )}
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
            {Object.entries(profile.skills).map(([category, items]) => (
              <div 
                key={category}
                className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full hover:border-zinc-800 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-2">
                    <h3 className="font-mono font-bold text-white text-sm tracking-wide">
                      {skillCategoryLabels[category] || category}
                    </h3>
                    <Code className="h-4 w-4 text-zinc-650" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
                Telemetry Repositories
              </span>
              <h2 className="text-2xl md:text-4xl font-bold font-mono tracking-tight text-white">
                Projects Command Panel
              </h2>
            </div>
            
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex items-center bg-black/60 border border-zinc-900 rounded-lg px-3 py-1.5 focus-within:border-zinc-700 transition-colors">
                <Search className="h-3.5 w-3.5 text-zinc-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search projects by name, description, or tech..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white font-mono placeholder-zinc-700 w-full md:w-56"
                />
                {projectSearch && (
                  <button onClick={() => setProjectSearch("")} className="text-zinc-500 hover:text-white ml-2 text-xs">
                    ✕
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1 border border-zinc-900 bg-black/60 p-1 rounded-lg">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                      "px-2.5 py-1 text-[9px] md:text-[10px] uppercase font-bold rounded tracking-wider transition-all",
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
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={cn(
                  "group relative flex flex-col justify-between h-full rounded-xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md transition-all duration-300",
                  project.isFeatured ? "border-zinc-800 shadow-[0_0_20px_rgba(255,255,255,0.02)]" : "",
                  currentTheme.borderHover
                )}
              >
                {/* Spotlight hover effect */}
                <SpotlightHover size={150} className="from-zinc-800/10 via-zinc-700/10 to-transparent" />

                {/* Featured Ribbon / Corner Glow */}
                {project.isFeatured && (
                  <div className="absolute -top-px -left-px rounded-tl-xl rounded-br-lg bg-white/5 border-t border-l border-zinc-800 px-2.5 py-0.5 text-[8px] uppercase tracking-widest font-mono text-zinc-300 z-20">
                    FEATURED SYSTEM
                  </div>
                )}

                <div className="space-y-4 relative z-10 pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className={cn("px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-zinc-900 border border-zinc-800 rounded-md", currentTheme.primary)}>
                        {project.category}
                      </span>
                      {project.status && (
                        <span className={cn(
                          "px-1.5 py-0.5 text-[8px] font-mono rounded border uppercase",
                          project.status === "Production" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                          project.status === "Active" && "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse",
                          project.status === "Research" && "bg-sky-500/10 text-sky-400 border-sky-500/20",
                          project.status === "Archived" && "bg-zinc-900/50 text-zinc-500 border-zinc-800"
                        )}>
                          ● {project.status}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {project.stars !== undefined && (
                        <span className="flex items-center gap-0.5 text-[9px] text-zinc-500 font-mono">
                          ★ {project.stars}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-1.5">
                        {project.link && project.link !== "#" && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-white p-1 transition-colors"
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
                            className="text-zinc-500 hover:text-white p-1 transition-colors"
                            title="Open Live Preview"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold font-mono text-white tracking-wide">
                        {project.title}
                      </h3>
                      {project.completionDate && (
                        <span className="text-[9px] text-zinc-650 font-mono tracking-wider">
                          [{project.completionDate.toUpperCase()}]
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-450 leading-relaxed font-mono line-clamp-3 group-hover:text-zinc-300 transition-colors">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900/60 mt-4 relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-500 transition-all hover:scale-105 hover:border-zinc-700 hover:text-zinc-350 cursor-default"
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

        {/* Decorative divider before footer */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mt-16" />

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
                <h3 className="text-sm font-bold font-mono text-white">System Param Customizer</h3>
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
              {(["summary", "skills", "experience", "academics", "projects", "analytics"] as const).map(tab => (
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
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">{skillCategoryLabels[cat] || cat}</label>
                      <textarea 
                        value={(profile.skills as any)[cat].join(", ")}
                        onChange={e => handleSkillChange(cat, e.target.value)}
                        rows={2}
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

              {/* Tab 6: Recruiter Analytics */}
              {adminTab === "analytics" && (
                <div className="space-y-6 font-mono text-zinc-300">
                  <div className="border border-zinc-900 bg-zinc-950/40 rounded-lg p-4 space-y-4">
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-zinc-900 pb-2">
                      SYSTEM ANALYTICS REPORT
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded">
                        <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">TOTAL AI QUERIES</span>
                        <span className="text-xl font-bold text-white mt-1 block">{analyticsData.interactions}</span>
                      </div>
                      
                      <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded">
                        <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">RESUME DOWNLOADS</span>
                        <span className="text-xl font-bold text-white mt-1 block">{analyticsData.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-zinc-900 bg-zinc-950/40 rounded-lg p-4 space-y-2">
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-zinc-900 pb-2">
                      DIAGNOSTIC EVENT COUNTS
                    </h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-[10px]">
                      <div className="flex justify-between py-1 border-b border-zinc-950">
                        <span className="text-zinc-500">Recruiter Chat Opens</span>
                        <span className="text-white">{analyticsData.interactions > 0 ? "RECORDED" : "INITIALIZED"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-950">
                        <span className="text-zinc-500">Resume Cache State</span>
                        <span className="text-white">{resumeBase64 ? "CUSTOM_PDF" : "DEFAULT_FALLBACK"}</span>
                      </div>
                    </div>
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

        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-sm bg-[#09090b]/95 border border-zinc-800/80 rounded-lg overflow-hidden shadow-2xl p-5 space-y-4 font-mono relative"
            >
              {/* Decorative side accent */}
              <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                themeMode === "volt" && "bg-[#CCFF00]",
                themeMode === "amber" && "bg-[#FFDE21]",
                themeMode === "chrome" && "bg-sky-400"
              )} />
              
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 pl-2">
                <div className="flex items-center gap-2">
                  <Lock className={cn("h-4 w-4", currentTheme.primary)} />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    SECURE CONSOLE DECRYPT
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError(false);
                    setPasswordInput("");
                  }}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                console.log("[CUSTOMIZER] Password submit attempted.");
                if (passwordInput === "vivek2006") {
                  console.log("[CUSTOMIZER] Password accepted!");
                  setIsAuthorized(true);
                  sessionStorage.setItem("portfolio_edit_auth", "true");
                  console.log("[CUSTOMIZER] Editor opened.");
                  setIsEditMode(true);
                  setShowAdminPanel(true);
                  setShowPasswordModal(false);
                  setPasswordError(false);
                  setPasswordInput("");
                } else {
                  console.log("[CUSTOMIZER] Password rejected.");
                  setPasswordError(true);
                }
              }} className="space-y-4 pl-2">
                <div className="space-y-2">
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-wider">
                    AUTHORIZED SIGNATURE REQUIRED
                  </label>
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(false);
                    }}
                    placeholder="ENTER PASSWORD"
                    className={cn(
                      "w-full bg-zinc-950/80 border rounded p-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-opacity-50",
                      passwordError 
                        ? "border-red-500/50 focus:ring-red-500 focus:border-red-500" 
                        : "border-zinc-800/80 focus:ring-zinc-700 focus:border-zinc-700"
                    )}
                  />
                  {passwordError && (
                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider animate-pulse">
                      AUTHENTICATION FAULT: DECRYPTION FAILS
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError(false);
                      setPasswordInput("");
                    }}
                    className="px-3 py-1.5 border border-zinc-800 text-[9px] font-bold text-zinc-400 hover:text-white rounded transition-colors"
                  >
                    ABORT
                  </button>
                  <button
                    type="submit"
                    className={cn(
                      "px-4 py-1.5 text-[9px] font-bold text-black rounded transition-colors uppercase tracking-widest",
                      themeMode === "volt" && "bg-[#CCFF00] hover:bg-[#8dfa00]",
                      themeMode === "amber" && "bg-[#FFDE21] hover:bg-yellow-400",
                      themeMode === "chrome" && "bg-sky-400 hover:bg-sky-500"
                    )}
                  >
                    ACCESS
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACCESS TERMINAL BUTTON - ALWAYS VISIBLE */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex gap-2">
        <button
          onClick={() => {
            console.log("[CUSTOMIZER] Customizer button clicked. isEditMode:", isEditMode, "isAuthorized:", isAuthorized);
            handleCustomizeClick();
          }}
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 backdrop-blur-md border shadow-lg cursor-pointer select-none whitespace-nowrap active:scale-95",
            isEditMode
              ? "bg-red-500/25 hover:bg-red-500/40 border-red-500/40 text-red-400 shadow-red-500/20"
              : themeMode === "volt"
                ? "bg-zinc-950/70 border-[#CCFF00]/40 text-[#CCFF00] hover:bg-zinc-900/80 shadow-[#CCFF00]/10 hover:shadow-[#CCFF00]/20"
                : themeMode === "amber"
                  ? "bg-zinc-950/70 border-[#FFDE21]/40 text-[#FFDE21] hover:bg-zinc-900/80 shadow-[#FFDE21]/10 hover:shadow-[#FFDE21]/20"
                  : "bg-zinc-950/70 border-sky-400/40 text-sky-450 text-sky-400 hover:bg-zinc-900/80 shadow-sky-400/10 hover:shadow-sky-400/20"
          )}
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {isEditMode ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
          <span>{isEditMode ? "LOCK CONSOLE" : "CUSTOMIZER TERMINAL"}</span>
        </button>

        {isEditMode && (
          <button
            onClick={() => {
              console.log("[CUSTOMIZER] Toggle drawer clicked. Current state:", showAdminPanel);
              setShowAdminPanel(!showAdminPanel);
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[10px] md:text-xs font-mono font-bold tracking-wider transition-all duration-300 backdrop-blur-md border shadow-lg cursor-pointer select-none whitespace-nowrap active:scale-95",
              themeMode === "volt"
                ? "bg-zinc-950/70 border-[#CCFF00]/40 text-white hover:bg-zinc-900/80"
                : themeMode === "amber"
                  ? "bg-zinc-950/70 border-[#FFDE21]/40 text-white hover:bg-zinc-900/80"
                  : "bg-zinc-950/70 border-sky-400/40 text-white hover:bg-zinc-900/80"
            )}
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>DRAWER</span>
          </button>
        )}
      </div>

      {/* Upload Progress Overlay */}
      <AnimatePresence>
        {uploadProgress !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center font-mono gap-4"
          >
            <div className="w-64 space-y-2 text-center">
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                UPLOADING RESUME PDF...
              </span>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                <motion.div 
                  className={cn(
                    "h-full rounded-full",
                    themeMode === "volt" && "bg-[#CCFF00]",
                    themeMode === "amber" && "bg-[#FFDE21]",
                    themeMode === "chrome" && "bg-sky-400"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest">
                {uploadProgress}% COMPLETE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={cn(
              "fixed top-6 right-6 z-[10000] px-4 py-2.5 rounded-lg border shadow-xl flex items-center gap-2 font-mono text-xs font-bold",
              toast.type === "success" 
                ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-400" 
                : "bg-red-950/90 border-red-500/50 text-red-400"
            )}
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                toast.type === "success" ? "bg-emerald-400" : "bg-red-400"
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
              )}></span>
            </span>
            <span>{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="ml-2 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeUploadModal
        isOpen={isResumeUploadModalOpen}
        onClose={() => setIsResumeUploadModalOpen(false)}
        onUploadSuccess={(base64, timestamp) => {
          setResumeBase64(base64);
          setResumeUpdatedAt(timestamp);
          setToast({ message: "Resume uploaded successfully!", type: "success" });
          window.dispatchEvent(new Event("storage"));
        }}
        themeMode={themeMode}
      />

    </div>
  );
}

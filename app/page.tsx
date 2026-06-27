"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Search,
  Database,
  Cloud,
  Terminal,
  LineChart,
  Cpu,
  Link2,
  Calendar,
  Globe,
  Star,
  Activity,
  ArrowRight,
  Check,
  Send,
  Bell,
  Users,
  Settings as SettingsIcon,
  Phone,
  DollarSign,
  Clock,
  BriefcaseBusiness
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Perspective, Highlight } from "@/components/ui/perspective-highlight";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightHover } from "@/components/ui/spotlight-hover";
import RobotCompanion from "@/components/robot-companion";
import RecruiterChatbot from "@/components/recruiter-chatbot";
import ResumeUploadModal from "@/components/resume-upload-modal";
import CurvedVLogo from "@/components/curved-v-logo";

const INITIAL_PROFILE = {
  schemaVersion: 6,
  avatar: "",
  name: "Vivek Goud Shaganti",
  title: "Full Stack Engineer & AI Automation Developer",
  email: "vivekshaganti@gmail.com",
  linkedin: "https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a",
  github: "https://github.com/vivek-shaganti1",
  telegram: "https://t.me/vivekshaganti",
  bio: "Computer Science undergraduate (BTech CSE, 3rd Year) with a CGPA of 9.21. Passionate about building intelligent, scalable systems, AI automation, decentralization, and developer tooling. Experienced with Spring Boot, React, and automated AI workflows.",
  education: {
    institution: "Anurag University, Hyderabad",
    degree: "Bachelor of Technology in Computer Science Engineering",
    duration: "2023 - Present",
    grade: "CGPA: 9.21 / 10"
  },
  skills: {
    programmingLanguages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C", "C++", "HTML5", "CSS3"],
    frontendEngineering: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "ShadCN UI", "Responsive UI Design", "Vite", "App Router", "React Hooks"],
    backendEngineering: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "JWT Authentication", "Hibernate/JPA", "Microservices", "Server Actions", "WebSockets", "Authentication", "API Architecture"],
    aiMachineLearning: ["Generative AI", "Large Language Models (LLMs)", "AI Agents", "Multi-Agent Systems", "Prompt Engineering", "RAG", "Semantic Search", "Function Calling", "Tool Calling", "AI Workflows", "Gemini API", "OpenAI API", "Groq API", "NVIDIA NIM", "Judge0", "Scikit-Learn", "Pandas", "NumPy", "Predictive Analytics", "Vector Search"],
    databasesStorage: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Supabase", "NeonDB", "Prisma ORM", "Drizzle ORM", "Database Design", "SQL Optimization"],
    cloudDevOps: ["Microsoft Azure", "Vercel", "Render", "Docker", "GitHub Actions", "CI/CD", "Linux", "Cloudinary", "Environment Variables", "Deployment Pipelines", "Production Builds"],
    developerTools: ["Git", "GitHub", "GitHub Actions", "VS Code", "IntelliJ IDEA", "Postman", "npm", "pnpm", "FFmpeg", "Figma", "Chrome DevTools"],
    apisIntegrations: ["REST APIs", "Webhooks", "Telegram Bot API", "GitHub API", "Cloudinary API", "Judge0 API", "Gemini API", "OpenAI API", "OAuth", "JSON", "Axios", "Fetch API"],
    dataEngineeringAnalytics: ["Pandas", "NumPy", "Plotly", "Qlik Sense", "Data Visualization", "Machine Learning", "Predictive Analytics", "Data Processing", "ETL Concepts"],
    blockchain: ["Solidity", "Smart Contracts", "Web3 Fundamentals", "Decentralized Systems", "Ethereum Basics"]
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
    { title: "Best User Experience Award", subtitle: "TECHHACK #3", metric: "Winner" },
    { title: "2nd Place Award", subtitle: "Spark Ideathon 2K25", metric: "Runner-Up" },
    { title: "1st Position Award", subtitle: "Agriculture ECO-INSIGHTS", metric: "Domain Winner" },
    { title: "Approved Patent", subtitle: "Virtual Professor System", metric: "Published" }
  ],
  certifications: [
    { title: "Data Structures & Algorithms", provider: "Smart Interviews", date: "2024", id: "SI-DSA-89", skills: "DSA, Java, Competitive Coding" },
    { title: "Operating Systems", provider: "NPTEL", date: "2024", id: "NPTEL-CS-02", skills: "Process Management, Virtual Memory, UNIX" },
    { title: "Graph Theory Programming Camp", provider: "AlgoUniversity", date: "2024", id: "AU-GT-402", skills: "Dynamic Programming, Graphs, Networks" },
    { title: "Enterprise-Grade AI", provider: "IBM", date: "2025", id: "IBM-AI-2045", skills: "Enterprise Architectures, Vector Stores" },
    { title: "Generative AI for Data Visualization", provider: "Coursera", date: "2025", id: "COURSERA-AI-DV", skills: "Python, Plotly, LLMs" },
    { title: "Artificial Intelligence Training", provider: "Acmegrade", date: "2024", id: "ACM-AI-112", skills: "Machine Learning, Analytics" }
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
      forks: 4,
      version: "1.0.0",
      users: "150+ Candidates",
      problem: "Traditional technical interviewing is resource-heavy, subjective, and slow to scale, leading to hiring fatigue.",
      solution: "Built a fully autonomous AI recruiter that conducts real-time coding interviews in a sandboxed execution runtime and performs behavioral LLM heuristics.",
      architecture: "Next.js App Router frontend integrated with a sandboxed microservice running Judge0 API for secure remote code execution. Redis handles state queues.",
      codeHighlight: "const response = await groq.chat.completions.create({\n  messages: [{ role: 'system', content: PROMPT }],\n  model: 'llama-3.3-70b-versatile'\n});",
      lessonsLearned: "Designing real-time websocket states with high concurrent code execution requires robust rate-limiting and connection management.",
      futureImprovements: "Support for custom multi-agent grading schemas and visual canvas whiteboards for system design interviews."
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
      forks: 8,
      version: "0.9.5",
      users: "40+ Devs",
      problem: "Spring Boot repositories contain boilerplate configurations, complex annotations, and abstract dependencies that are difficult for static LLMs to evaluate.",
      solution: "Engineered an AST parser that maps codebase relationships into ChromaDB, creating high-fidelity context packages for refactoring suggestions.",
      architecture: "Java AST Engine + ChromaDB Vector Index. React frontend communicates with Java endpoints via server-sent events for live code telemetry.",
      codeHighlight: "CompilationUnit cu = StaticJavaParser.parse(new File(path));\ncu.findAll(ClassOrInterfaceDeclaration.class).forEach(decl -> { ... });",
      lessonsLearned: "Creating high-fidelity vector contexts for deep codebases requires parsing specific syntax hierarchies rather than doing raw text line chunking.",
      futureImprovements: "Integrate automatic local git branch generation to stage code fixes automatically."
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
      forks: 11,
      version: "1.2.0",
      users: "5 subreddits",
      problem: "Reddit subreddits experience sudden coordinated attacks, toxicity spikes, and spam raids that human moderators cannot review fast enough.",
      solution: "Utilized Reddit Devvit SDK to deploy custom hooks that pipe comment streams into low-latency AI classification blocks running on Hono.",
      architecture: "Devvit hooks intercept events. Redis caches rolling sentiment statistics. Hono coordinates agent warnings and automated moderator flags.",
      codeHighlight: "const toxicity = await analyzeSentiment(comment.body);\nif (toxicity > THRESHOLD) { await reddit.remove(comment.id); }",
      lessonsLearned: "Asynchronous webhook thresholds must be strictly optimized to prevent API delays under heavy thread loads.",
      futureImprovements: "Deploy dynamic graph models representing account coordination vectors to flag bot sub-farms."
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
      forks: 3,
      version: "3.0.0",
      users: "800+ Views",
      problem: "Standard portfolios are flat and passive, failing to engage hiring representatives or demonstrate builder capabilities visually.",
      solution: "Created a comprehensive terminal simulation integrated with interactive Canvas physics diagrams, global search palettes, and LLM chat telemetry.",
      architecture: "Next.js static engine + custom Client Storage migration schemas. Framer Motion handles transition animations.",
      codeHighlight: "useEffect(() => {\n  const migration = runSchemaMigration(savedProfile);\n  setProfile(migration);\n}, []);",
      lessonsLearned: "Dynamic server-client hydration checks are critical to prevent layout shifting on terminal window mounts.",
      futureImprovements: "Full multi-session terminal terminal state sync using Supabase PostgreSQL databases."
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
      forks: 9,
      version: "2.1.0",
      users: "1,200+ Followers",
      problem: "Creating daily educational tech graphics requires hours of research, design, layout compiling, and social posting operations.",
      solution: "Engineered a Python workflow agent that scrapes daily RSS feeds, writes summarized scripts, styles canvas carousels, and deploys automatic Instagram uploads.",
      architecture: "Python schedule workers + Pillow template renderers + Gemini LLM scripting. Publishing is triggered automatically via cron task hooks.",
      codeHighlight: "img = Image.new('RGB', (1080, 1350), color='#060608')\ndraw = ImageDraw.Draw(img)\ndraw.text((50, 50), news_title, font=font)",
      lessonsLearned: "Standardizing text-wrapping algorithms inside/outside dynamic image boundaries is essential to prevent overflow.",
      futureImprovements: "Add automatic video generation (Reels) using local FFmpeg compilation pipelines."
    }
  ],
  blogs: [
    {
      id: "1",
      title: "Building Multi-Agent Systems with Groq & Gemini",
      category: "AI",
      date: "June 2026",
      readingTime: "5 min read",
      summary: "An in-depth exploration of orchestrating collaborative AI agents for complex task execution using high-throughput Groq llama models and Gemini context windows.",
      tags: ["AI", "AI Agents", "System Design"],
      content: "### Orchestrating Collaborative Agents\n\nIn modern Generative AI engineering, single prompt-response architectures are being replaced by multi-agent workflows. Using **Groq (Llama-3.3-70b-versatile)** for low-latency reasoning and **Gemini API** for high-context data ingestion allows us to build powerful system supervisors.\n\n```typescript\nimport { Groq } from \"groq-sdk\";\n\nconst groq = new Groq({ apiKey: process.env.GROQ_API_KEY });\n\nasync function getAgentResponse(prompt: string) {\n  const chatCompletion = await groq.chat.completions.create({\n    messages: [{ role: \"user\", content: prompt }],\n    model: \"llama-3.3-70b-versatile\",\n  });\n  return chatCompletion.choices[0].message.content;\n}\n```\n\n#### Key Takeaways:\n1. **Low Latency**: Groq achieves sub-100ms first-token responses.\n2. **Context Routing**: Route broad analytical scans to Gemini.\n3. **Structured Schemas**: Use JSON mode to guarantee tool calls."
    },
    {
      id: "2",
      title: "Enterprise Code Refactoring with Spring Boot and ASTs",
      category: "System Design",
      date: "May 2026",
      readingTime: "8 min read",
      summary: "How we leveraged Abstract Syntax Tree (AST) parsing and LLMs to create an autonomous code assistant that suggests refactoring paths in Spring Boot microservices.",
      tags: ["Java", "System Design", "Spring Boot"],
      content: "### Modern Java Code Intelligence\n\nStatic analysis tools (like SonarQube) tell you *what* is wrong, but fail to write the fix. By building **JavaMind AI**, we set out to construct an AST-aware refactoring agent.\n\n#### Architectural Pipeline:\n- **Parser**: Parse Java files using parser hooks into an AST.\n- **Context Sync**: Translate class relationships into a local vector database.\n- **LLM Refactoring**: Prompt LLMs with specific AST diff snippets to guarantee compilation safety.\n\n```java\n@RestController\n@RequestMapping(\"/api/v1/refactor\")\npublic class RefactorController {\n    @PostMapping\n    public ResponseEntity<String> suggestFix(@RequestBody CodeSnippet snippet) {\n        // AI refactor logic\n        return ResponseEntity.ok(\"Refactored AST structure\");\n    }\n}\n```\n\nBy coupling AST verification with sandboxed compilation, our agent guarantees zero syntax breakage."
    }
  ],
  timeline: [
    { year: "2025", type: "Experience", title: "PwC Launchpad Participant", subtitle: "PwC India", details: "Exposure to enterprise solutions, tech strategy, and consulting frameworks." },
    { year: "2025", type: "Experience", title: "Python Development Intern", subtitle: "Cognifyz Technologies", details: "Developed Python backend automation scripts and mini automation pipelines." },
    { year: "2024", type: "Leadership", title: "Vice President", subtitle: "Blockchain Club AU", details: "Managed domain activities and coordinated TechHack #4 national hackathon." },
    { year: "2025", type: "Achievement", title: "Approved Patent", subtitle: "AI-Based Virtual Professor System", details: "Designed reasoning loops for autonomous lecture synthesizers." },
    { year: "2025", type: "Achievement", title: "2nd Place — Spark Ideathon 2K25", subtitle: "Ideathon Panel", details: "Pitched automated testing runner pipelines." },
    { year: "2023", type: "Education", title: "B.Tech in Computer Science Engineering", subtitle: "Anurag University", details: "Completed foundational coursework in databases, OS, and software engineering. Current CGPA: 9.21." }
  ],
  stats: [
    { label: "Projects Built", value: "14+" },
    { label: "AI Applications", value: "8+" },
    { label: "Hackathons Won", value: "5+" },
    { label: "Approved Patent", value: "1" },
    { label: "PwC Launchpad", value: "Active" },
    { label: "CGPA Score", value: "9.21" },
    { label: "TOEFL Score", value: "98" },
    { label: "JEE Main percentile", value: "88.92" }
  ]
};

const skillCategoryLabels: Record<string, string> = {
  programmingLanguages: "Programming Languages",
  frontendEngineering: "Frontend Engineering",
  backendEngineering: "Backend Engineering",
  aiMachineLearning: "Artificial Intelligence & Machine Learning",
  databasesStorage: "Databases & Storage",
  cloudDevOps: "Cloud & DevOps",
  developerTools: "Developer Tools",
  apisIntegrations: "APIs & Integrations",
  dataEngineeringAnalytics: "Data Engineering & Analytics",
  blockchain: "Blockchain"
};

const skillCategoryIcons: Record<string, React.ComponentType<any>> = {
  programmingLanguages: Code,
  frontendEngineering: Layers,
  backendEngineering: Cpu,
  aiMachineLearning: Sparkles,
  databasesStorage: Database,
  cloudDevOps: Cloud,
  developerTools: Terminal,
  apisIntegrations: Link2,
  dataEngineeringAnalytics: LineChart,
  blockchain: Shield
};

type ThemeMode = "volt" | "amber" | "chrome";

interface Node {
  id: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  desc: string;
  exp: string;
  projects: string[];
}

interface Link {
  source: string;
  target: string;
}

const GRAPH_NODES: Node[] = [
  { id: "Python", category: "programmingLanguages", x: 100, y: 100, vx: 0, vy: 0, size: 10, color: "#4584b6", desc: "Vivek's core language for machine learning workflows and AI scripting.", exp: "3+ Years", projects: ["Instagram AI Automation", "Trading AI", "Job Applier AI"] },
  { id: "Java", category: "programmingLanguages", x: 150, y: 120, vx: 0, vy: 0, size: 10, color: "#f89820", desc: "Core language for enterprise systems, Spring Boot backend microservices.", exp: "3+ Years", projects: ["JavaMind AI", "Full Stack E-Commerce"] },
  { id: "TypeScript", category: "programmingLanguages", x: 180, y: 80, vx: 0, vy: 0, size: 9, color: "#3178c6", desc: "For building secure, robust frontend components and API endpoints.", exp: "2.5 Years", projects: ["AI Interview Platform", "Portfolio OS", "rShield"] },
  { id: "React.js", category: "frontendEngineering", x: 220, y: 150, vx: 0, vy: 0, size: 9, color: "#61dbfb", desc: "Wired with modular hooks and atomic state managers for highly interactive views.", exp: "2.5 Years", projects: ["AI Interview Platform", "rShield"] },
  { id: "Next.js", category: "frontendEngineering", x: 260, y: 160, vx: 0, vy: 0, size: 11, color: "#ffffff", desc: "Dynamic SSR app framework supporting server actions and optimized headers.", exp: "2 Years", projects: ["AI Interview Platform", "Portfolio OS"] },
  { id: "Tailwind CSS", category: "frontendEngineering", x: 280, y: 110, vx: 0, vy: 0, size: 8, color: "#38bdf8", desc: "Utility-first layouts with smooth breakpoints and responsive grid settings.", exp: "3 Years", projects: ["Portfolio OS", "rShield"] },
  { id: "Spring Boot", category: "backendEngineering", x: 120, y: 200, vx: 0, vy: 0, size: 11, color: "#6db33f", desc: "Primary frameworks for enterprise secure transactional backends.", exp: "2+ Years", projects: ["JavaMind AI", "Full Stack E-Commerce"] },
  { id: "Node.js", category: "backendEngineering", x: 180, y: 220, vx: 0, vy: 0, size: 8, color: "#68a063", desc: "Asynchronous backend loops, micro-server scripts, and webhook orchestrations.", exp: "2 Years", projects: ["Sticker Ordering Platform"] },
  { id: "Express.js", category: "backendEngineering", x: 210, y: 250, vx: 0, vy: 0, size: 7, color: "#828282", desc: "Routing pipelines and middleware architectures handling request endpoints.", exp: "2 Years", projects: ["Sticker Ordering Platform"] },
  { id: "AI Agents", category: "aiMachineLearning", x: 350, y: 100, vx: 0, vy: 0, size: 12, color: "#CCFF00", desc: "Autonomous agent execution loops coordinating API calls and tool logic.", exp: "2 Years", projects: ["AI Interview Platform", "rShield", "Jarvis AI"] },
  { id: "Gemini API", category: "aiMachineLearning", x: 390, y: 120, vx: 0, vy: 0, size: 10, color: "#4285f4", desc: "Multimodal analysis, context ingestion, and complex logical schema queries.", exp: "2 Years", projects: ["AI Interview Platform", "JavaMind AI", "Instagram AI Automation"] },
  { id: "Groq API", category: "aiMachineLearning", x: 420, y: 80, vx: 0, vy: 0, size: 10, color: "#ff8c00", desc: "Sub-100ms low-latency Llama reasoning calls for conversational interfaces.", exp: "1 Year", projects: ["AI Interview Platform", "Portfolio OS"] },
  { id: "RAG", category: "aiMachineLearning", x: 380, y: 160, vx: 0, vy: 0, size: 9, color: "#9c27b0", desc: "Retrieval-Augmented Generation context syncing using local vector databases.", exp: "1.5 Years", projects: ["AI Interview Platform", "JavaMind AI"] },
  { id: "PostgreSQL", category: "databasesStorage", x: 100, y: 300, vx: 0, vy: 0, size: 9, color: "#336791", desc: "Relational database core hosting client records and transaction blocks.", exp: "2 Years", projects: ["AI Interview Platform"] },
  { id: "Redis", category: "databasesStorage", x: 150, y: 320, vx: 0, vy: 0, size: 8, color: "#d82c20", desc: "Fast caching, memory pipelines, and user telemetry rate-limit filters.", exp: "1.5 Years", projects: ["AI Interview Platform", "rShield"] },
  { id: "Supabase", category: "databasesStorage", x: 180, y: 340, vx: 0, vy: 0, size: 8, color: "#3ecf8e", desc: "Hosting authentication hooks and backend storage variables.", exp: "1.5 Years", projects: ["RAN Fitness"] },
  { id: "Docker", category: "cloudDevOps", x: 300, y: 300, vx: 0, vy: 0, size: 9, color: "#0db7ed", desc: "Container wrapping to guarantee isolated compile execution cycles.", exp: "1.5 Years", projects: ["AI Interview Platform"] },
  { id: "Vercel", category: "cloudDevOps", x: 340, y: 320, vx: 0, vy: 0, size: 8, color: "#ffffff", desc: "Static and serverless production builds with automatic deploy monitors.", exp: "2 Years", projects: ["Portfolio OS", "RAN Fitness"] },
  { id: "GitHub Actions", category: "cloudDevOps", x: 370, y: 345, vx: 0, vy: 0, size: 8, color: "#2088ff", desc: "CI/CD automated trigger scripts testing code compiling and lint constraints.", exp: "1.5 Years", projects: ["Portfolio OS"] },
  { id: "Solidity", category: "blockchain", x: 450, y: 250, vx: 0, vy: 0, size: 9, color: "#aa67ff", desc: "Smart contracts coding layer handling transactions on EVM chains.", exp: "1 Year", projects: ["Blockchain Club AU"] }
];

const GRAPH_LINKS: Link[] = [
  { source: "Python", target: "AI Agents" },
  { source: "Java", target: "Spring Boot" },
  { source: "TypeScript", target: "React.js" },
  { source: "React.js", target: "Next.js" },
  { source: "Next.js", target: "Tailwind CSS" },
  { source: "Spring Boot", target: "PostgreSQL" },
  { source: "Node.js", target: "Express.js" },
  { source: "AI Agents", target: "Gemini API" },
  { source: "AI Agents", target: "Groq API" },
  { source: "AI Agents", target: "RAG" },
  { source: "RAG", target: "PostgreSQL" },
  { source: "PostgreSQL", target: "Supabase" },
  { source: "Docker", target: "GitHub Actions" },
  { source: "Vercel", target: "GitHub Actions" },
  { source: "AI Agents", target: "Docker" }
];

export function KnowledgeGraph({ themeMode, onNodeSelect }: { themeMode: ThemeMode; onNodeSelect: (node: Node) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(JSON.parse(JSON.stringify(GRAPH_NODES)));
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDraggingCanvas = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    const updatePhysics = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      GRAPH_LINKS.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const restLength = 100;
          const k = 0.003;
          const force = (dist - restLength) * k;
          
          if (!draggedNode || sourceNode.id !== draggedNode.id) {
            sourceNode.vx += (dx / dist) * force;
            sourceNode.vy += (dy / dist) * force;
          }
          if (!draggedNode || targetNode.id !== draggedNode.id) {
            targetNode.vx -= (dx / dist) * force;
            targetNode.vy -= (dy / dist) * force;
          }
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 80;
          if (dist < minDist) {
            const force = (minDist - dist) * 0.03;
            n1.vx -= (dx / dist) * force;
            n1.vy -= (dy / dist) * force;
            n2.vx += (dx / dist) * force;
            n2.vy += (dy / dist) * force;
          }
        }
      }

      nodes.forEach(node => {
        if (draggedNode && node.id === draggedNode.id) return;
        
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * 0.0005;
        node.vy += dy * 0.0005;

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.88;
        node.vy *= 0.88;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(panX + canvas.width / 2, panY + canvas.height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      GRAPH_LINKS.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = "rgba(63, 63, 70, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
          
          const time = Date.now() * 0.001;
          const progress = (time % 2) / 2;
          const px = sourceNode.x + (targetNode.x - sourceNode.x) * progress;
          const py = sourceNode.y + (targetNode.y - sourceNode.y) * progress;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = themeMode === "volt" ? "#CCFF00" : themeMode === "amber" ? "#FFDE21" : "#38bdf8";
          ctx.shadowBlur = 6;
          ctx.shadowColor = ctx.fillStyle as string;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      nodes.forEach(node => {
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (isHovered ? 3 : 0), 0, Math.PI * 2);
        
        ctx.fillStyle = node.color;
        ctx.shadowBlur = isHovered ? 15 : 4;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (isHovered ? 4 : 2), 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = isHovered ? "#ffffff" : "#a1a1aa";
        ctx.font = `bold ${isHovered ? 11 : 9}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(node.id, node.x, node.y - node.size - 6);
      });

      ctx.restore();
    };

    const renderLoop = () => {
      updatePhysics();
      draw();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, hoveredNode, draggedNode, panX, panY, zoom, themeMode]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight || 400;
        
        const newNodes = [...nodes];
        newNodes.forEach(node => {
          if (node.x === 0 && node.y === 0) {
            node.x = canvas.width / 2 + (Math.random() - 0.5) * 150;
            node.y = canvas.height / 2 + (Math.random() - 0.5) * 150;
          }
        });
        setNodes(newNodes);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCanvasMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const x = (mouseX - (panX + canvas.width / 2)) / zoom + canvas.width / 2;
    const y = (mouseY - (panY + canvas.height / 2)) / zoom + canvas.height / 2;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasMousePos(e);
    const clicked = nodes.find(node => {
      const dist = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return dist <= node.size + 10;
    });

    if (clicked) {
      setDraggedNode(clicked);
    } else {
      isDraggingCanvas.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasMousePos(e);
    
    if (draggedNode) {
      const updatedNodes = nodes.map(n => {
        if (n.id === draggedNode.id) {
          n.x = x;
          n.y = y;
          n.vx = 0;
          n.vy = 0;
        }
        return n;
      });
      setNodes(updatedNodes);
    } else if (isDraggingCanvas.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPanX(prev => prev + dx);
      setPanY(prev => prev + dy);
      dragStart.current = { x: e.clientX, y: e.clientY };
    } else {
      const hover = nodes.find(node => {
        const dist = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
        return dist <= node.size + 8;
      });
      setHoveredNode(hover || null);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNode) {
      onNodeSelect(draggedNode);
      setDraggedNode(null);
    }
    isDraggingCanvas.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = 1.05;
    if (e.deltaY < 0) {
      setZoom(z => Math.min(z * zoomFactor, 2.5));
    } else {
      setZoom(z => Math.max(z / zoomFactor, 0.4));
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing select-none bg-black/40">
      <canvas 
        ref={canvasRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full block"
      />
      <div className="absolute bottom-3 left-3 flex flex-col gap-1 text-[9px] font-mono text-zinc-600 bg-zinc-950/80 border border-zinc-900 px-2.5 py-1.5 rounded select-none pointer-events-none">
        <span>INTERACTIVE CORE MAP</span>
        <span>• DRAG NODES TO APPLY PHYSICS</span>
        <span>• PINCH/WHEEL TO ZOOM / DRAG SPACE TO PAN</span>
      </div>
    </div>
  );
}


interface ImmersiveBackgroundProps {
  resolvedTheme: "dark" | "light";
  mousePos: { x: number; y: number };
}

function ImmersiveBackground({ resolvedTheme, mousePos }: ImmersiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = resolvedTheme === "light" 
          ? `rgba(99, 102, 241, ${this.alpha})`
          : `rgba(204, 255, 0, ${this.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle());
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        const dxMouse = mousePos.x - particles[i].x;
        const dyMouse = mousePos.y - particles[i].y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = resolvedTheme === "light"
            ? `rgba(168, 85, 247, ${0.12 * (1 - distMouse / 180)})`
            : `rgba(204, 255, 0, ${0.12 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = resolvedTheme === "light"
              ? `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`
              : `rgba(255, 255, 255, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, mousePos]);
  
  const fragments = ["AI", "LLM", "React", "Spring", "Node", "Docker", "GPT", "RAG", "Python", "SQL", "Cloud", "API"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Perspective Grid */}
      <div 
        className={cn(
          "absolute inset-0 opacity-[0.03] transition-all duration-1000",
          resolvedTheme === "light" ? "bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
        )}
        style={{
          backgroundSize: "60px 60px",
          transform: `perspective(500px) rotateX(60deg) translateY(${(mousePos.y * -0.01) - 40}px) translateX(${mousePos.x * -0.01}px)`,
          transformOrigin: "top center",
          transition: "transform 0.1s ease-out"
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full filter blur-[140px] opacity-10 animate-pulse transition-all duration-300 pointer-events-none"
        style={{
          background: resolvedTheme === "light" ? "radial-gradient(circle, #a855f7 0%, transparent 70%)" : "radial-gradient(circle, #CCFF00 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
        }}
      />
      
      {/* GPU Canvas Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      
      {/* Floating fragments */}
      {fragments.map((word, idx) => (
        <span 
          key={word}
          className="absolute text-[8px] font-bold font-mono tracking-widest text-zinc-650 opacity-[0.06] select-none uppercase hidden md:inline-block"
          style={{
            left: `${10 + (idx * 7)}%`,
            top: `${20 + (Math.sin(idx) * 40)}%`
          }}
        >
          {word}
        </span>
      ))}
      
      {/* Scanline cyberpunk grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-25" />
    </div>
  );
}


const isValidUrl = (url: string) => {
  if (!url) return true;
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
};

export default function Home() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditMode, setIsEditMode] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("volt");
  // Dynamic Scroll Handler for shrinking header
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Setting Handler
  const [themeSetting, setThemeSetting] = useState<"dark" | "light" | "auto">("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (themeSetting === "auto") {
      const match = window.matchMedia("(prefers-color-scheme: light)");
      setResolvedTheme(match.matches ? "light" : "dark");
      const listener = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? "light" : "dark");
      };
      match.addEventListener("change", listener);
      return () => match.removeEventListener("change", listener);
    } else {
      setResolvedTheme(themeSetting);
    }
  }, [themeSetting]);

  // Live status rotation
  const statusItems = [
    "🟢 Available for Opportunities",
    "🚀 PwC Launchpad Participant",
    "🤖 Building Intelligent AI Systems",
    "📚 BTech CSE (CGPA: 9.21)"
  ];
  const [statusIdx, setStatusIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % statusItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Segmented navigation active items
  const navItems = [
    { label: "Core", id: "spline-hero" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Graph", id: "knowledge-graph" },
    { label: "Timeline", id: "timeline" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Analytics", id: "analytics" },
    { label: "Blogs", id: "blogs" },
    { label: "Contact", id: "contact" }
  ];
  
  // Track active section on scroll
  const [activeSection, setActiveSection] = useState("spline-hero");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminTab, setAdminTab] = useState<"summary" | "skills" | "experience" | "projects" | "blogs" | "timeline" | "certifications" | "crm" | "analytics" | "settings" | "resume">("summary");
  
  const [editingProject, setEditingProject] = useState<any>(null);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const [commandQuery, setCommandQuery] = useState("");

  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "System Initialized. Welcome to Vivek's Command Interface.",
    "Type 'help' to see list of operational commands."
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isResumeUploadModalOpen, setIsResumeUploadModalOpen] = useState(false);
  const [resumeUpdatedAt, setResumeUpdatedAt] = useState<string | null>(null);
  const [resumeHistory, setResumeHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("portfolio_resume_history");
    if (savedHistory) {
      try {
        setResumeHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // CRM & Analytics & Settings States
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [crmSearch, setCrmSearch] = useState("");
  const [crmTypeFilter, setCrmTypeFilter] = useState("all");
  const [crmStatusFilter, setCrmStatusFilter] = useState("all");
  const [liveVisitorCount, setLiveVisitorCount] = useState(3);
  
  const [settings, setSettings] = useState({
    telegramBotToken: "",
    telegramChatId: "",
    enableNotifications: true,
    enableAnalytics: true,
    contactEmail: "vivekshaganti@gmail.com",
    githubUrl: "https://github.com/vivek-shaganti1",
    linkedinUrl: "https://www.linkedin.com/in/vivek-goud-shaganti-01111b28a",
    resumeUrl: "/Resume.pdf"
  });

  // Expanded Contact Form fields
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    linkedinUrl: "",
    country: "India",
    budget: "",
    hiringTimeline: "Immediate",
    recruitmentType: "Full Time" as const,
    referrer: "LinkedIn"
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const themes = {
    volt: {
      primary: "text-[#CCFF00]",
      bg: "bg-[#CCFF00]",
      border: "border-[#CCFF00]",
      borderHover: "hover:border-[#CCFF00]/50",
      accent: "#CCFF00",
      glow: "shadow-[#CCFF00]/10",
      gradient: "from-[#CCFF00]/10 via-[#CCFF00]/5 to-transparent",
      text: "text-white"
    },
    amber: {
      primary: "text-[#FFDE21]",
      bg: "bg-[#FFDE21]",
      border: "border-[#FFDE21]",
      borderHover: "hover:border-[#FFDE21]/50",
      accent: "#FFDE21",
      glow: "shadow-[#FFDE21]/10",
      gradient: "from-[#FFDE21]/10 via-[#FFDE21]/5 to-transparent",
      text: "text-white"
    },
    chrome: {
      primary: "text-sky-400",
      bg: "bg-sky-400",
      border: "border-sky-400",
      borderHover: "hover:border-sky-400/50",
      accent: "#38bdf8",
      glow: "shadow-sky-400/10",
      gradient: "from-sky-400/10 via-sky-400/5 to-transparent",
      text: "text-white"
    }
  };

  const currentTheme = themes[themeMode];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [analyticsData, setAnalyticsData] = useState<{
    interactions: number;
    downloads: number;
    questions: Record<string, number>;
  }>({ interactions: 0, downloads: 0, questions: {} });

  const trackInteraction = async (type: "click" | "download" | "chat") => {
    const updated = {
      ...analyticsData,
      interactions: analyticsData.interactions + 1,
      downloads: type === "download" ? analyticsData.downloads + 1 : analyticsData.downloads
    };
    setAnalyticsData(updated);
    localStorage.setItem("portfolio_recruiter_analytics", JSON.stringify(updated));
    window.dispatchEvent(new Event("analytics_updated"));

    // Pipe telemetry events to backend
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: `${type}_action`, metadata: { path: window.location.pathname } })
      });
    } catch (e) {
      console.warn("Telemetry reporting skipped:", e);
    }
  };

  const logPageLoadTelemetry = async () => {
    try {
      const ua = navigator.userAgent;
      const width = window.screen.width;
      const height = window.screen.height;

      // Extract basic geo mock details or referrers
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device: width < 768 ? "Mobile" : "Desktop",
          browser: ua.includes("Chrome") ? "Chrome" : ua.includes("Safari") ? "Safari" : "Firefox",
          os: ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "macOS" : "Linux",
          resolution: `${width}x${height}`,
          referrer: document.referrer || "Direct",
          country: "India",
          city: "Hyderabad"
        })
      });
    } catch (e) {
      console.warn("Analytics telemetry failed to dispatch:", e);
    }
  };

  const fetchCRMData = async () => {
    try {
      const rRes = await fetch("/api/recruiters");
      const rData = await rRes.json();
      if (rData.data) setRecruiters(rData.data);

      const vRes = await fetch("/api/analytics");
      const vData = await vRes.json();
      if (vData.data) setVisitors(vData.data);

      const eRes = await fetch("/api/events");
      const eData = await eRes.json();
      if (eData.data) setEvents(eData.data);
    } catch (e) {
      console.warn("Failed to fetch serverless data streams:", e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.data) setSettings(data.data);
    } catch (e) {
      console.warn("Failed to load settings configuration:", e);
    }
  };

  // Live updates simulator
  useEffect(() => {
    logPageLoadTelemetry();
    fetchCRMData();
    fetchSettings();

    const interval = setInterval(() => {
      // Refresh event activities
      fetchCRMData();
      setLiveVisitorCount(Math.floor(Math.random() * 5) + 2);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setToast({ message: "Configuration parameters updated securely.", type: "success" });
      } else {
        throw new Error();
      }
    } catch (e) {
      setToast({ message: "Failed to persist configuration settings.", type: "error" });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          referrer: document.referrer || "Direct",
          resumeViewed: true,
          resumeDownloaded: analyticsData.downloads > 0
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Submission failed");
      }

      setToast({ message: "Contact request dispatched successfully via Telegram!", type: "success" });
      // Reset form
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        linkedinUrl: "",
        country: "India",
        budget: "",
        hiringTimeline: "Immediate",
        recruitmentType: "Full Time",
        referrer: "LinkedIn"
      });
      // Refresh feed
      fetchCRMData();
    } catch (err: any) {
      setToast({ message: err.message || "Failed to deliver contact request.", type: "error" });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const updateRecruiterCRM = async (id: string, status: "pending" | "contacted" | "scheduled", notes: string) => {
    try {
      const res = await fetch("/api/recruiters", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, notes })
      });
      if (res.ok) {
        setToast({ message: "Status updated.", type: "success" });
        fetchCRMData();
      }
    } catch (e) {
      setToast({ message: "Failed to update recruiter status.", type: "error" });
    }
  };

  const deleteRecruiterCRM = async (id: string) => {
    if (!window.confirm("Delete this recruiter log?")) return;
    try {
      const res = await fetch(`/api/recruiters?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ message: "Recruiter log removed.", type: "success" });
        fetchCRMData();
      }
    } catch (e) {
      setToast({ message: "Failed to delete recruiter log.", type: "error" });
    }
  };

  const exportCRMToCSV = () => {
    const headers = ["Name", "Company", "Email", "Phone", "Subject", "Recruitment Type", "Country", "Budget", "Timeline", "Status", "Notes", "Created At"];
    const rows = recruiters.map(r => [
      r.name, r.company, r.email, r.phone, r.subject, r.recruitmentType, r.country, r.budget || "", r.hiringTimeline || "", r.status, r.notes || "", r.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `recruiter_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  useEffect(() => {
    const savedProfile = localStorage.getItem("vivek_portfolio_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (!parsed.schemaVersion || parsed.schemaVersion < 6) {
          console.warn("[PROFILE MIGRATION] Migrating customizer settings to new schema v6.");
          const migratedProfile = {
            ...INITIAL_PROFILE,
            ...parsed,
            schemaVersion: 6
          };
          localStorage.setItem("vivek_portfolio_profile", JSON.stringify(migratedProfile));
          setProfile(migratedProfile);
        } else {
          setProfile(parsed);
        }
      } catch (e) {
        console.error(e);
        localStorage.setItem("vivek_portfolio_profile", JSON.stringify(INITIAL_PROFILE));
        setProfile(INITIAL_PROFILE);
      }
    } else {
      localStorage.setItem("vivek_portfolio_profile", JSON.stringify(INITIAL_PROFILE));
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
    if (isEditMode) {
      setIsEditMode(false);
      setShowAdminPanel(false);
    } else {
      if (isAuthorized) {
        setIsEditMode(true);
        setShowAdminPanel(true);
      } else {
        setShowPasswordModal(true);
      }
    }
  };

  const filteredRecruiters = useMemo(() => {
    return recruiters.filter(r => {
      const matchesSearch = 
        r.name.toLowerCase().includes(crmSearch.toLowerCase()) ||
        r.company.toLowerCase().includes(crmSearch.toLowerCase()) ||
        r.email.toLowerCase().includes(crmSearch.toLowerCase()) ||
        r.message.toLowerCase().includes(crmSearch.toLowerCase());
      
      const matchesType = crmTypeFilter === "all" || r.recruitmentType === crmTypeFilter;
      const matchesStatus = crmStatusFilter === "all" || r.status === crmStatusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [recruiters, crmSearch, crmTypeFilter, crmStatusFilter]);

  const activityTimeline = useMemo(() => {
    if (events.length === 0) {
      return [
        { date: "June 2026", status: "RELEASE", text: "Deployed AI Interview Platform v1.0.0 for behavioral assessments.", badge: "Next.js", link: "https://interviewai-os.vercel.app/" },
        { date: "May 2026", status: "COMMIT", text: "Merged JavaMind AST parser architecture module in dev.", badge: "Spring Boot", link: "https://github.com/vivek-shaganti1/JavaMind-AI-agent" },
        { date: "May 2026", status: "MILESTONE", text: "Upgraded Portfolio interface into visual AI Operating System v3.0.", badge: "React 19", link: "#" },
        { date: "April 2026", status: "ALERT", text: "rShield Reddit agent threat engine configured for production.", badge: "AI Agents", link: "https://github.com/vivek-shaganti1/rshield" },
        { date: "March 2026", status: "RELEASE", text: "Successfully completed automated content generator cron jobs.", badge: "Python", link: "https://instagram-automation-phi.vercel.app/" }
      ];
    }
    return events.slice(0, 8).map(e => {
      let status = "MILESTONE";
      let text = `User action logged: ${e.type}`;
      if (e.type === "contact_submit") {
        status = "ALERT";
        text = `New contact submission received from ${e.metadata?.company || "anonymous"}`;
      } else if (e.type === "download_action") {
        status = "RELEASE";
        text = `Resume PDF downloaded from referrer source.`;
      } else if (e.type === "click_action") {
        status = "COMMIT";
        text = `Knowledge Graph telemetry node selected.`;
      }
      return {
        date: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "Just now",
        status,
        text,
        badge: e.type,
        link: "#"
      };
    });
  }, [events]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("all");
    profile.projects.forEach(p => {
      if (p.categories) {
        p.categories.forEach(c => cats.add(c.toLowerCase()));
      } else if (p.category) {
        cats.add(p.category.toLowerCase());
      }
    });
    return Array.from(cats);
  }, [profile.projects]);

  const filteredProjects = useMemo(() => {
    return profile.projects.filter(project => {
      const matchSearch = 
        project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        project.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
      
      if (activeTab === "all") return matchSearch;
      
      const matchTab = project.categories
        ? project.categories.some(c => c.toLowerCase() === activeTab.toLowerCase())
        : project.category?.toLowerCase() === activeTab.toLowerCase();
      
      return matchSearch && matchTab;
    });
  }, [profile.projects, projectSearch, activeTab]);

  const globalSearchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    const results: any[] = [];
    
    profile.projects.forEach(p => {
      if (p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.tech.some(t => t.toLowerCase().includes(query))) {
        results.push({ type: "project", title: p.title, subtitle: p.category, item: p });
      }
    });

    Object.entries(profile.skills).forEach(([cat, list]) => {
      const match = list.filter(s => s.toLowerCase().includes(query));
      if (match.length > 0) {
        results.push({ type: "skill", title: match.join(", "), subtitle: skillCategoryLabels[cat] || cat });
      }
    });

    profile.blogs?.forEach(b => {
      if (b.title.toLowerCase().includes(query) || b.summary.toLowerCase().includes(query)) {
        results.push({ type: "blog", title: b.title, subtitle: b.category, item: b });
      }
    });

    return results;
  }, [profile, searchQuery]);

  const filteredCommandItems = useMemo(() => {
    const list = [
      { name: "View Projects Showcase", action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); setCommandPaletteOpen(false); } },
      { name: "Inspect Skills Matrix", action: () => { document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }); setCommandPaletteOpen(false); } },
      { name: "Interactive Timeline", action: () => { document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }); setCommandPaletteOpen(false); } },
      { name: "Read Developer Blogs", action: () => { document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" }); setCommandPaletteOpen(false); } },
      { name: "Access Contact Panel", action: () => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); setCommandPaletteOpen(false); } },
      { name: "Toggle Theme: Volt", action: () => { setThemeMode("volt"); setCommandPaletteOpen(false); } },
      { name: "Toggle Theme: Amber", action: () => { setThemeMode("amber"); setCommandPaletteOpen(false); } },
      { name: "Toggle Theme: Chrome", action: () => { setThemeMode("chrome"); setCommandPaletteOpen(false); } },
      { name: "Download Resume PDF", action: () => {
        const link = document.createElement("a");
        link.href = "/Resume.pdf";
        link.download = "Vivek_Goud_Shaganti_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setCommandPaletteOpen(false);
      } }
    ];
    if (!commandQuery) return list;
    return list.filter(item => item.name.toLowerCase().includes(commandQuery.toLowerCase()));
  }, [commandQuery]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim().toLowerCase();
    if (!input) return;

    let response = "";
    const parts = input.split(" ");
    const cmd = parts[0];

    switch (cmd) {
      case "help":
        response = "Available commands: about, skills, projects, stats, clear";
        break;
      case "about":
        response = `Profile: ${profile.name} | ${profile.title}. Bio: ${profile.bio}`;
        break;
      case "skills":
        response = `Arsenal: Languages: ${profile.skills.programmingLanguages.join(", ")}; Frontend: ${profile.skills.frontendEngineering.join(", ")}; Backend: ${profile.skills.backendEngineering.join(", ")}`;
        break;
      case "projects":
        response = `Active Nodes: ${profile.projects.map(p => p.title).join(" | ")}`;
        break;
      case "stats":
        response = `Metrics: CGPA: 9.21, Projects: 14, Hackathons: 5+, System Patent: 1`;
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        response = `Command "${cmd}" not recognized. Type "help" to list instructions.`;
    }

    setTerminalHistory(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  const handleResumeAction = (action: string) => {
    setIsResumeDropdownOpen(false);
    trackInteraction("download");
    
    if (action === "view" || action === "download") {
      const link = document.createElement("a");
      link.href = resumeBase64 || "/Resume.pdf";
      link.download = "Vivek_Goud_Shaganti_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action === "replace" || action === "upload") {
      setIsResumeUploadModalOpen(true);
    } else if (action === "delete") {
      setResumeBase64(null);
      setResumeUpdatedAt(null);
      localStorage.removeItem("portfolio_resume_base64");
      localStorage.removeItem("portfolio_resume_updated_at");
      setToast({ message: "Resume deleted successfully.", type: "success" });
    }
  };

  // SVG Chart analytics helper values
  const visitorChartData = useMemo(() => {
    const counts = [12, 19, 3, 5, 2, 3, 9];
    if (visitors.length > 0) {
      // Simulate weekly spread based on actual visitor count
      const len = visitors.length;
      return [
        Math.floor(len * 0.15),
        Math.floor(len * 0.12),
        Math.floor(len * 0.08),
        Math.floor(len * 0.22),
        Math.floor(len * 0.10),
        Math.floor(len * 0.18),
        Math.floor(len * 0.15)
      ];
    }
    return counts;
  }, [visitors]);

  return (
    <div className={cn("min-h-screen bg-[#060608] text-zinc-300 font-mono relative overflow-hidden flex flex-col justify-between theme-light-wrapper", resolvedTheme === "light" && "theme-light")}>
      {/* DYNAMIC LIGHT MODE OVERRIDES */}
      {resolvedTheme === "light" && (
        <style dangerouslySetInnerHTML={{ __html: `
          .theme-light-wrapper {
            background-color: #fafafa !important;
            color: #18181b !important;
          }
          .theme-light-wrapper .bg-zinc-955,
          .theme-light-wrapper .bg-zinc-955\\/40,
          .theme-light-wrapper .bg-zinc-955\\/80,
          .theme-light-wrapper .bg-zinc-955\\/60,
          .theme-light-wrapper .bg-zinc-950\\/40,
          .theme-light-wrapper .bg-zinc-955\\/40,
          .theme-light-wrapper .bg-zinc-950\\/60,
          .theme-light-wrapper .bg-[#0a0a0c],
          .theme-light-wrapper .bg-[#09090b],
          .theme-light-wrapper .bg-[#09090b]\\/40 {
            background-color: rgba(255, 255, 255, 0.75) !important;
            backdrop-filter: blur(20px) !important;
            border-color: rgba(0, 0, 0, 0.08) !important;
          }
          .theme-light-wrapper .border-zinc-900,
          .theme-light-wrapper .border-zinc-850,
          .theme-light-wrapper .border-zinc-800 {
            border-color: rgba(0, 0, 0, 0.08) !important;
          }
          .theme-light-wrapper .text-zinc-300,
          .theme-light-wrapper .text-zinc-400,
          .theme-light-wrapper .text-zinc-450 {
            color: #27272a !important;
          }
          .theme-light-wrapper .text-zinc-550,
          .theme-light-wrapper .text-zinc-500,
          .theme-light-wrapper .text-zinc-555,
          .theme-light-wrapper .text-zinc-650 {
            color: #71717a !important;
          }
          .theme-light-wrapper .text-white {
            color: #09090b !important;
          }
          .theme-light-wrapper .bg-black {
            background-color: #ffffff !important;
          }
          .theme-light-wrapper pre,
          .theme-light-wrapper code {
            background-color: #f4f4f5 !important;
            color: #09090b !important;
          }
        `}} />
      )}

      
      <ImmersiveBackground resolvedTheme={resolvedTheme} mousePos={mousePosition} />
      
      <div 
        className="fixed w-[280px] h-[280px] rounded-full pointer-events-none z-30 blur-[120px] opacity-15 transition-transform duration-75 mix-blend-screen hidden lg:block"
        style={{
          background: currentTheme.accent,
          left: `${mousePosition.x - 140}px`,
          top: `${mousePosition.y - 140}px`,
        }}
      />

      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-[#060608]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 font-black tracking-widest text-white text-xs md:text-sm group">
              <div className="relative w-8 h-8 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 active:scale-95">
                <CurvedVLogo className="w-6 h-6 animate-pulse" />
              </div>
              <span>V-OS v4.1</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-4 text-[10px] tracking-wider uppercase font-bold text-zinc-400">
              <a href="#spline-hero" className="hover:text-white transition-colors">Core</a>
              <a href="#skills" className="hover:text-white transition-colors">Arsenal</a>
              <a href="#projects" className="hover:text-white transition-colors">Nodes</a>
              <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
              <a href="#blogs" className="hover:text-white transition-colors">Blogs</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center bg-zinc-955 border border-zinc-900 rounded-lg px-2.5 py-1 focus-within:border-zinc-800">
              <Search className="h-3 w-3 text-zinc-500 mr-2" />
              <input
                type="text"
                placeholder="Global Search... (⌘K)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] text-white font-mono placeholder-zinc-700 w-32 focus:w-44 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white ml-1 text-[10px]">✕</button>
              )}
            </div>

            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="px-2.5 py-1 text-[9px] border border-zinc-805 bg-zinc-900/60 rounded text-zinc-400 hover:text-white active:scale-95 transition-all font-mono"
            >
              ⌘K
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-wider border transition-all active:scale-95",
                  isEditMode 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                    : "bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700"
                )}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>RESUME</span>
                <ChevronRight className="h-3 w-3 rotate-90" />
              </button>

              <AnimatePresence>
                {isResumeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-44 rounded-lg border border-zinc-900 bg-zinc-955 p-1 shadow-2xl z-50 text-[10px] font-mono"
                  >
                    <button onClick={() => handleResumeAction("view")} className="w-full text-left px-3 py-2 rounded text-zinc-300 hover:bg-zinc-900 hover:text-white">
                      View Resume
                    </button>
                    <button onClick={() => handleResumeAction("upload")} className="w-full text-left px-3 py-2 rounded text-zinc-300 hover:bg-zinc-900 hover:text-white">
                      Upload New Resume
                    </button>
                    {resumeBase64 && (
                      <>
                        <button onClick={() => handleResumeAction("replace")} className="w-full text-left px-3 py-2 rounded text-zinc-300 hover:bg-zinc-900 hover:text-white">
                          Replace Resume
                        </button>
                        <button onClick={() => handleResumeAction("delete")} className="w-full text-left px-3 py-2 rounded text-red-400 hover:bg-red-950/20">
                          Delete Resume
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-40 relative">
          <div className="absolute top-1 left-4 right-4 bg-zinc-950 border border-zinc-900 rounded-xl p-4 shadow-2xl space-y-3 max-h-[300px] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Search results ({globalSearchResults.length})</span>
              <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white text-xs">✕ Close</button>
            </div>
            {globalSearchResults.length === 0 ? (
              <p className="text-xs text-zinc-650 font-mono py-2">No matching nodes found. Check parameters.</p>
            ) : (
              <div className="space-y-2">
                {globalSearchResults.map((res, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      if (res.type === "project") setSelectedProject(res.item);
                      if (res.type === "blog") setSelectedBlog(res.item);
                      setSearchQuery("");
                    }}
                    className="p-2.5 rounded border border-zinc-900 hover:bg-zinc-900/60 hover:border-zinc-800 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider bg-zinc-900 text-zinc-500 border border-zinc-850 px-1 py-0.5 rounded mr-2">
                        {res.type}
                      </span>
                      <span className="text-xs text-white font-bold font-mono">{res.title}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">{res.subtitle}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1 w-full space-y-12 relative z-10">
        
        <section id="spline-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          
          <div id="about" className="lg:col-span-3 rounded-2xl border border-zinc-900 bg-zinc-955/40 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden h-full">
            <div className="space-y-6">
              <div className="relative w-24 h-24 mx-auto group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CCFF00] via-cyan-400 to-[#FFDE21] animate-spin opacity-40 blur-sm pointer-events-none duration-500" />
                <div className="w-full h-full rounded-full border border-zinc-850 bg-black flex items-center justify-center overflow-hidden relative z-10">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white text-xs font-bold select-none text-center">
                      <UserIcon className="h-10 w-10 text-zinc-500 mx-auto" />
                    </div>
                  )}
                </div>
                <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-black"></span>
                </span>
              </div>

              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20 text-[8px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse mx-auto">
                  Available for Internships
                </div>
                <h1 className="text-lg font-black font-mono text-white tracking-wide">{profile.name}</h1>
                <p className={cn("text-[9px] font-bold uppercase tracking-wider", currentTheme.primary)}>
                  AI Engineer | Builder
                </p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-mono px-2">
                  Building automated systems and microservices interfaces.
                </p>
              </div>

              <div className="border-t border-zinc-900 pt-4 space-y-2">
                <span className="text-[8px] text-zinc-650 font-bold uppercase tracking-widest block mb-2">TELEMETRY SCORECARD</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {profile.stats?.map((st, i) => (
                    <div key={i} className="border border-zinc-900 p-2 rounded bg-zinc-955/60 text-center font-mono">
                      <span className="block text-white font-bold">{st.value}</span>
                      <span className="text-[8px] text-zinc-500 block truncate">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-4 flex flex-col gap-2">
              <a 
                href={`mailto:${profile.email}`}
                className={cn(
                  "w-full text-center py-2 rounded text-[10px] font-bold tracking-widest uppercase border transition-all duration-300 hover:scale-[1.02] active:scale-95",
                  themeMode === "volt" ? "bg-[#CCFF00] border-[#CCFF00] text-black hover:bg-[#8dfa00]" :
                  themeMode === "amber" ? "bg-[#FFDE21] border-[#FFDE21] text-black hover:bg-yellow-400" :
                  "bg-sky-400 border-sky-400 text-black hover:bg-sky-500"
                )}
              >
                Connect Terminal
              </a>

              <div className="flex items-center justify-center gap-4 text-zinc-550 pt-1">
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub"><Github className="h-4 w-4" /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                <a href={profile.telegram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Telegram"><Send className="h-4 w-4" /></a>
              </div>
            </div>
          </div>

          <div id="knowledge-graph" className="lg:col-span-6 rounded-2xl border border-zinc-900 bg-[#09090b]/40 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full group">
            <div className="p-4 border-b border-zinc-900 bg-black/40 flex items-center justify-between z-20 relative">
              <span className="text-[10px] font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
                <Activity className={cn("h-3.5 w-3.5", currentTheme.primary)} />
                Knowledge Graph Telemetry
              </span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest">
                Nodes: {GRAPH_NODES.length} | Links: {GRAPH_LINKS.length}
              </span>
            </div>

            <div className="flex-1 w-full h-[400px] lg:h-full relative overflow-hidden">
              <KnowledgeGraph 
                themeMode={themeMode}
                onNodeSelect={(node) => {
                  setSelectedNode(node);
                  trackInteraction("click");
                }}
              />
            </div>
          </div>

          <div id="about" className="lg:col-span-3 rounded-2xl border border-zinc-900 bg-zinc-955/40 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden h-full">
            <div className="space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-3">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block border-b border-zinc-900 pb-2 flex items-center gap-1">
                  <Bell className="h-3 w-3 animate-bounce" />
                  Live Activity Feed
                </span>
                
                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
                  {activityTimeline.map((act, i) => (
                    <div key={i} className="border border-zinc-900 p-2.5 rounded bg-zinc-955/60 font-mono space-y-1.5 hover:border-zinc-800 transition-colors">
                      <div className="flex justify-between items-center text-[8px] font-mono">
                        <span className="text-zinc-500 font-bold">{act.date}</span>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded font-bold uppercase text-[7px] border",
                          act.status === "RELEASE" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                          act.status === "COMMIT" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                          act.status === "MILESTONE" && "bg-sky-500/10 text-sky-400 border-sky-500/20",
                          act.status === "ALERT" && "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          {act.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-300 font-mono leading-relaxed line-clamp-2">{act.text}</p>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[8px] text-zinc-650 bg-zinc-900 px-1 py-0.2 rounded">{act.badge}</span>
                        {act.link !== "#" && (
                          <a href={act.link} target="_blank" rel="noreferrer" className="text-[8px] text-zinc-400 hover:text-white flex items-center gap-0.5">
                            Inspect <ArrowRight className="h-2 w-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-900 pt-4 space-y-3">
                <span className="text-[8px] text-zinc-650 font-bold uppercase tracking-widest block">TELEGRAM MODULE</span>
                <div className="p-2.5 border border-zinc-900 bg-zinc-955/80 rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white font-bold font-mono">@VivekRecruiterBot</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[8px] text-zinc-500 leading-relaxed font-mono">
                    Ask coding questions, receive updates, and access resume details via Telegram.
                  </p>
                  <a 
                    href="https://t.me/vivekshaganti"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "w-full text-center block py-1 rounded text-[8px] font-bold tracking-widest uppercase border",
                      themeMode === "volt" ? "bg-zinc-900 hover:border-[#CCFF00] text-[#CCFF00]" :
                      themeMode === "amber" ? "bg-zinc-900 hover:border-[#FFDE21] text-[#FFDE21]" :
                      "bg-zinc-900 hover:border-sky-400 text-sky-400"
                    )}
                  >
                    Launch Telegram Bot
                  </a>
                </div>
              </div>

            </div>
          </div>

        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Operational Metrics
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
              Engineering Analytics Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">TELEMETRY ACCESS</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">{visitors.length > 0 ? visitors.length : 2412}</span>
              <span className="text-emerald-500 text-[8px] font-bold block mt-1">+12% THIS SESSION</span>
            </div>
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">COMMITS INDEX</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">1,824</span>
              <span className="text-zinc-555 text-[8px] font-bold block mt-1">DAILY PUSH ACTIVE</span>
            </div>
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">ACTIVE REPOSITORIES</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">42</span>
              <span className="text-zinc-555 text-[8px] font-bold block mt-1">GITHUB SYNC ACTIVE</span>
            </div>
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">AI APPLICATIONS</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">8</span>
              <span className="text-emerald-500 text-[8px] font-bold block mt-1">3 PRODUCTION DEPLOYS</span>
            </div>
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">RECRUITER HIRE CLICKS</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">{analyticsData.interactions}</span>
              <span className="text-zinc-555 text-[8px] font-bold block mt-1">TELEMETRY CLICKS</span>
            </div>
            <div className="border border-zinc-900 bg-zinc-955/60 p-4 rounded-xl relative overflow-hidden">
              <span className="text-zinc-600 font-mono text-[8px] block uppercase tracking-widest">RESUME DOWNLOADS</span>
              <span className="text-white text-xl md:text-2xl font-black font-mono block mt-1">{analyticsData.downloads}</span>
              <span className="text-emerald-500 text-[8px] font-bold block mt-1">ACTIVE RUNNER</span>
            </div>
          </div>
        </section>

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
            {Object.entries(profile.skills).map(([category, items]) => {
              const IconComp = skillCategoryIcons[category] || Code;
              return (
                <div 
                  key={category}
                  className="rounded-xl border border-zinc-900 bg-zinc-955/40 p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full hover:border-zinc-850 transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-2">
                      <div className="flex items-center gap-2">
                        <IconComp className={cn("h-4 w-4", currentTheme.primary)} />
                        <h3 className="font-mono font-bold text-white text-sm tracking-wide">
                          {skillCategoryLabels[category] || category}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-555 bg-zinc-900/60 border border-zinc-850 px-1.5 py-0.5 rounded">
                        {items.length}
                      </span>
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
              );
            })}
          </div>
        </section>

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
            <div className="absolute top-2 right-4 flex items-center gap-1.5 opacity-55">
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
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex items-center bg-black/60 border border-zinc-900 rounded-lg px-3 py-1.5 focus-within:border-zinc-700 transition-colors">
                <Search className="h-3.5 w-3.5 text-zinc-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search projects by name or tech..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: any) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "group relative flex flex-col justify-between h-full rounded-xl border border-zinc-900 bg-zinc-955/40 p-6 backdrop-blur-md transition-all duration-300 cursor-pointer",
                  project.isFeatured ? "border-zinc-800 shadow-[0_0_20px_rgba(255,255,255,0.02)]" : "",
                  currentTheme.borderHover
                )}
              >
                <SpotlightHover size={150} className="from-zinc-800/10 via-zinc-700/10 to-transparent" />

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

<div className="pt-6 border-t border-zinc-900/60 mt-4 relative z-10 flex justify-between items-center flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((t: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[8px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-500">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.showGithub !== false && (project.githubUrl || project.link) && (
                      <a href={project.githubUrl || project.link} target="_blank" rel="noreferrer" className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                        GitHub
                      </a>
                    )}
                    {project.showLive !== false && (project.liveUrl || project.liveLink) && (
                      <a href={project.liveUrl || project.liveLink} target="_blank" rel="noreferrer" className={cn("px-2 py-1 rounded text-black text-[8px] font-bold uppercase tracking-wider flex items-center gap-0.5", currentTheme.bg)}>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="timeline" className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Chronological Path
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
              Interactive Engineering Roadmap
            </h2>
          </div>

          <div className="relative border-l border-zinc-900 pl-6 space-y-8 max-w-3xl mx-auto">
            {profile.timeline?.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-zinc-955 border border-zinc-800 flex items-center justify-center group-hover:border-white transition-colors">
                  <div className={cn("w-2 h-2 rounded-full", currentTheme.bg)} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-mono font-bold text-xs", currentTheme.primary)}>[{item.year}]</span>
                    <span className="text-[8px] uppercase tracking-widest bg-zinc-900 border border-zinc-850 text-zinc-500 px-1.5 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-mono">{item.title}</h3>
                  <p className="text-xs text-zinc-555 font-mono">{item.subtitle}</p>
                  <p className="text-xs text-zinc-450 font-mono leading-relaxed max-w-2xl">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blogs" className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Engineering Ledger
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
              Developer Log & System Design Notebooks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.blogs?.map((blog) => (
              <div 
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="p-6 rounded-xl border border-zinc-900 bg-zinc-955/30 hover:border-zinc-850 hover:bg-zinc-955/60 transition-all cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span>{blog.date}</span>
                    <span>{blog.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-[#CCFF00]">{blog.title}</h3>
                  <p className="text-xs text-zinc-450 leading-relaxed font-mono line-clamp-3">{blog.summary}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-900/60">
                  <div className="flex gap-1.5">
                    {blog.tags.map((t: string, i: number) => (
                      <span key={i} className="text-[8px] font-mono text-zinc-650 bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <span className={cn("text-[9px] font-bold uppercase tracking-widest flex items-center gap-0.5", currentTheme.primary)}>
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Credential Ledger
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
              Professional Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.certifications?.map((cert, index) => (
              <div 
                key={index} 
                className="h-36 [perspective:1000px] group relative"
              >
                <div className="w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                  
                  <div className="w-full h-full absolute inset-0 bg-zinc-955/80 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between [backface-visibility:hidden] z-20">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <Award className={cn("h-5 w-5", currentTheme.primary)} />
                        <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">{cert.date}</span>
                      </div>
                      <h3 className="text-xs font-bold text-white font-mono tracking-wide line-clamp-2">{cert.title}</h3>
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block text-right">Hover to flip</span>
                  </div>

                  <div className="w-full h-full absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] z-10">
                    <div className="space-y-2 text-[10px] font-mono text-zinc-400">
                      <div>
                        <span className="text-zinc-600 block text-[8px] uppercase">Authority</span>
                        <span className="text-white font-bold">{cert.provider}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block text-[8px] uppercase">Skills Verified</span>
                        <span className="text-zinc-300">{cert.skills}</span>
                      </div>
                    </div>
                    <span className="text-[8px] text-zinc-600 font-mono">ID: {cert.id}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Competitions Wall
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
              Hackathons & Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {profile.achievements?.map((ach, idx) => (
              <div key={idx} className="border border-zinc-900 bg-zinc-955/60 p-6 rounded-xl space-y-4 hover:border-zinc-800 transition-colors">
                <div className="flex justify-between items-start">
                  <Award className={cn("h-6 w-6", currentTheme.primary)} />
                  <span className={cn("text-[9px] font-bold uppercase font-mono px-2 py-0.5 rounded border", currentTheme.primary, currentTheme.border)}>
                    {ach.metric}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono">{ach.title}</h3>
                  <p className="text-[10px] text-zinc-555 font-mono mt-1">{ach.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="space-y-8 pt-8 border-t border-zinc-900">
          <div className="flex flex-col gap-1 text-center max-w-xl mx-auto">
            <span className={cn("font-mono text-xs uppercase tracking-widest", currentTheme.primary)}>
              Recruiter CRM Gateway
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-white tracking-tight">
              Establish System Interface
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Complete parameters to dispatch instant notifications directly to Vivek's Telegram bot logs.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="max-w-3xl mx-auto bg-zinc-955/30 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
            <SpotlightHover size={300} className="from-zinc-800/10 via-zinc-900/5 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Company Name *</label>
                <input
                  type="text"
                  required
                  value={contactForm.company}
                  onChange={e => setContactForm({ ...contactForm, company: e.target.value })}
                  placeholder="e.g. Microsoft"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. contact@company.com"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Phone Number</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="e.g. +91 99999 99999"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={contactForm.linkedinUrl}
                  onChange={e => setContactForm({ ...contactForm, linkedinUrl: e.target.value })}
                  placeholder="e.g. https://linkedin.com/in/username"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Country *</label>
                <input
                  type="text"
                  required
                  value={contactForm.country}
                  onChange={e => setContactForm({ ...contactForm, country: e.target.value })}
                  placeholder="e.g. United States"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Recruitment Type *</label>
                <select
                  value={contactForm.recruitmentType}
                  onChange={e => setContactForm({ ...contactForm, recruitmentType: e.target.value as any })}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white outline-none focus:border-zinc-700 transition-colors"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Hiring Timeline</label>
                <select
                  value={contactForm.hiringTimeline}
                  onChange={e => setContactForm({ ...contactForm, hiringTimeline: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white outline-none focus:border-zinc-700 transition-colors"
                >
                  <option value="Immediate">Immediate (&lt; 2 weeks)</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Subject *</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="e.g. Technical Interview Schedule"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Budget (Optional)</label>
                <input
                  type="text"
                  value={contactForm.budget}
                  onChange={e => setContactForm({ ...contactForm, budget: e.target.value })}
                  placeholder="e.g. $100k-$120k / yr"
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Message Details *</label>
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Include roles details and scheduling constraints..."
                className="w-full bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 outline-none focus:border-zinc-700 transition-colors"
              />
            </div>

            <div className="flex justify-between items-center pt-2 relative z-10">
              <span className="text-[9px] text-zinc-555 font-mono">Rate limited to 5 requests per 15 minutes.</span>
              <button
                type="submit"
                disabled={isSubmittingContact}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-xs font-bold font-mono tracking-widest uppercase text-black active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50",
                  themeMode === "volt" && "bg-[#CCFF00] hover:bg-[#8dfa00]",
                  themeMode === "amber" && "bg-[#FFDE21] hover:bg-yellow-400",
                  themeMode === "chrome" && "bg-sky-400 hover:bg-sky-500"
                )}
              >
                {isSubmittingContact ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>DISPATCH LEAD</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

      </main>

      <footer className="border-t border-zinc-900 bg-[#060608] py-8 text-center text-xs text-zinc-650 font-mono mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Vivek Goud Shaganti. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span>Powered by Next.js & Volt Theme Engine</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a0c] border border-zinc-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] font-mono"
            >
              <div className="p-4 border-b border-zinc-900 bg-black flex justify-between items-center">
                <span className="text-[10px] text-zinc-555 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Terminal className={cn("h-4 w-4", currentTheme.primary)} />
                  System Application: {selectedProject.title}
                </span>
                <button onClick={() => setSelectedProject(null)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs md:text-sm">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={cn("px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border bg-zinc-900", currentTheme.primary, currentTheme.border)}>
                    {selectedProject.category}
                  </span>
                  <span className="text-[10px] text-zinc-505 font-bold">Ver: {selectedProject.version || "1.0.0"}</span>
                  <span className="text-[10px] text-zinc-505 font-bold">Reach: {selectedProject.users || "Sandbox"}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] text-zinc-650 font-bold uppercase tracking-widest block">Overview</span>
                  <p className="text-zinc-300 leading-relaxed font-mono">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-zinc-900 bg-zinc-955/60 rounded-xl space-y-1.5">
                    <span className="text-[8px] text-red-400 font-bold uppercase tracking-widest block">The Problem</span>
                    <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">{selectedProject.problem || "Legacy infrastructure is manual and slow."}</p>
                  </div>
                  <div className="p-4 border border-zinc-900 bg-zinc-955/60 rounded-xl space-y-1.5">
                    <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest block">The AI Solution</span>
                    <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">{selectedProject.solution || "Deploy intelligent pipelines to automate responses."}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] text-zinc-650 font-bold uppercase tracking-widest block">Architecture Blueprint</span>
                  <p className="text-zinc-400 font-mono leading-relaxed text-[11px] bg-zinc-950 p-3 rounded border border-zinc-900">
                    {selectedProject.architecture || "MERN Stack connected via REST API pipelines."}
                  </p>
                </div>

                {selectedProject.codeHighlight && (
                  <div className="space-y-2">
                    <span className="text-[9px] text-zinc-650 font-bold uppercase tracking-widest block">Code Highlight (AST / API Endpoint)</span>
                    <pre className="bg-black/90 p-4 rounded-lg overflow-x-auto text-[10px] text-[#CCFF00] border border-zinc-900 font-mono">
                      <code>{selectedProject.codeHighlight}</code>
                    </pre>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono">
                  <div className="space-y-1">
                    <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest block">Lessons Learned</span>
                    <p className="text-zinc-400 leading-relaxed">{selectedProject.lessonsLearned || "None recorded."}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest block">Future Roadmap</span>
                    <p className="text-zinc-400 leading-relaxed">{selectedProject.futureImprovements || "None recorded."}</p>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4 flex gap-3">
                  {selectedProject.link && selectedProject.link !== "#" && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-white rounded text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <Github className="h-4 w-4" /> View Repo
                    </a>
                  )}
                  {selectedProject.liveLink && selectedProject.liveLink !== "#" && (
                    <a 
                      href={selectedProject.liveLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className={cn(
                        "px-4 py-2 rounded text-black text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1.5",
                        themeMode === "volt" && "bg-[#CCFF00] hover:bg-[#8dfa00]",
                        themeMode === "amber" && "bg-[#FFDE21] hover:bg-yellow-400",
                        themeMode === "chrome" && "bg-[#38bdf8] hover:bg-[#38bdf8]"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" /> Launch App
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0c] border-l border-zinc-900 shadow-2xl z-50 flex flex-col justify-between font-mono"
          >
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
              <span className="text-[10px] text-zinc-555 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Code className={cn("h-4 w-4", currentTheme.primary)} />
                Technology Dossier
              </span>
              <button onClick={() => setSelectedNode(null)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <span className="text-[8px] text-zinc-650 block uppercase">Skill Node</span>
                <h2 className="text-lg font-black text-white">{selectedNode.id}</h2>
                <span className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded mt-1 inline-block">
                  {selectedNode.exp}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-[8px] text-zinc-650 block uppercase tracking-widest">Capability Parameters</span>
                <p className="text-zinc-350 leading-relaxed font-mono">{selectedNode.desc}</p>
              </div>

              {selectedNode.projects && selectedNode.projects.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[8px] text-zinc-650 block uppercase tracking-widest">Active System Nodes</span>
                  <div className="space-y-2">
                    {selectedNode.projects.map((proj, idx) => (
                      <div key={idx} className="p-2 border border-zinc-900 rounded bg-zinc-955/60 text-[10px] text-white font-mono flex items-center gap-1.5">
                        <Check className={cn("h-3.5 w-3.5", currentTheme.primary)} />
                        {proj}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-zinc-900">
              <button 
                onClick={() => setSelectedNode(null)}
                className="w-full text-center py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a0c] border border-zinc-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] font-mono"
            >
              <div className="p-4 border-b border-zinc-900 bg-black flex justify-between items-center">
                <span className="text-[10px] text-zinc-555 font-bold uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-zinc-500" />
                  Engineering Ledger Log
                </span>
                <button onClick={() => setSelectedBlog(null)} className="text-zinc-500 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs md:text-sm">
                <div className="space-y-2">
                  <span className={cn("text-[9px] font-bold uppercase tracking-widest", currentTheme.primary)}>{selectedBlog.category}</span>
                  <h2 className="text-lg md:text-2xl font-black text-white font-mono leading-snug">{selectedBlog.title}</h2>
                  <span className="text-[9px] text-zinc-500 font-mono block">Published: {selectedBlog.date} • {selectedBlog.readingTime}</span>
                </div>

                <div className="border-t border-zinc-900 pt-4 text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedBlog.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setCommandPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-zinc-955 border border-zinc-900 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl font-mono"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-3.5 border-b border-zinc-900 flex items-center bg-black">
                <Terminal className="h-4 w-4 text-zinc-500 mr-2 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a navigation command or action..."
                  value={commandQuery}
                  onChange={e => setCommandQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white font-mono placeholder-zinc-700 w-full"
                />
              </div>

              <div className="p-2 max-h-[250px] overflow-y-auto space-y-1">
                {filteredCommandItems.length === 0 ? (
                  <p className="text-[10px] text-zinc-650 p-2">No command matches found.</p>
                ) : (
                  filteredCommandItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full text-left p-2 rounded text-[11px] text-zinc-450 hover:text-white hover:bg-zinc-900 transition-colors font-mono flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditMode && showAdminPanel && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#0a0a0c] border-l border-zinc-900 shadow-2xl z-50 flex flex-col justify-between"
          >
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className={cn("h-4 w-4", currentTheme.primary)} />
                <h3 className="text-sm font-bold font-mono text-white">System Param Customizer (v4.1)</h3>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex border-b border-zinc-900 px-6 overflow-x-auto text-[10px] font-mono font-bold gap-2 bg-black/40">
              {(["summary", "skills", "experience", "projects", "blogs", "timeline", "crm", "analytics", "settings", "resume"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setAdminTab(tab)}
                  className={cn(
                    "py-3 border-b-2 transition-colors uppercase whitespace-nowrap px-1",
                    adminTab === tab ? "border-[#CCFF00] text-white" : "border-transparent text-zinc-550 hover:text-zinc-350"
                  )}
                >
                  {tab === "crm" ? "CRM Leads" : tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {adminTab === "summary" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-550 uppercase mb-1.5">Profile Picture (Avatar)</label>
                    <div className="flex items-center gap-3">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Avatar Preview" className="w-10 h-10 rounded-full border border-zinc-800 object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full border border-zinc-800 bg-black flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-zinc-500" />
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (!file.type.startsWith("image/")) {
                              setToast({ message: "Payload Validation Fault: file must be PNG, JPG, JPEG, or WEBP.", type: "error" });
                              return;
                            }
                            if (file.size > 5 * 1024 * 1024) {
                              setToast({ message: "Payload Validation Fault: image size exceeds 5 MB constraint.", type: "error" });
                              return;
                            }
                            try {
                              setUploadProgress(25);
                              const formData = new FormData();
                              formData.append("file", file);
                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formData,
                              });
                              setUploadProgress(75);
                              const data = await res.json();
                              setUploadProgress(100);
                              setTimeout(() => setUploadProgress(null), 400);
                              if (data.secure_url) {
                                saveProfile({ ...profile, avatar: data.secure_url });
                                setToast({ message: "Profile picture saved to Cloudinary.", type: "success" });
                              } else {
                                setToast({ message: `Upload Fault: ${data.error || "failed"}`, type: "error" });
                              }
                            } catch (err: any) {
                              setUploadProgress(null);
                              setToast({ message: `Network Fault: ${err.message || "upload failed"}`, type: "error" });
                            }
                          }
                        }}
                        className="hidden"
                        id="avatar-upload-input"
                      />
                      <label 
                        htmlFor="avatar-upload-input"
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-850 rounded hover:border-zinc-750 text-[10px] text-white font-bold cursor-pointer transition-colors"
                      >
                        Upload Photo
                      </label>
                      {profile.avatar && (
                        <button
                          type="button"
                          onClick={() => {
                            saveProfile({ ...profile, avatar: "" });
                            setToast({ message: "Profile picture removed.", type: "success" });
                          }}
                          className="px-3 py-1.5 bg-red-955/20 border border-red-900/30 rounded text-[10px] text-red-400 font-bold hover:bg-red-955/40 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-550 uppercase mb-1">Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={e => saveProfile({...profile, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-550 uppercase mb-1">Professional Title</label>
                    <input 
                      type="text" 
                      value={profile.title}
                      onChange={e => saveProfile({...profile, title: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-550 uppercase mb-1">Summary (Bio)</label>
                    <textarea 
                      value={profile.bio}
                      onChange={e => saveProfile({...profile, bio: e.target.value})}
                      rows={6}
                      className="w-full bg-zinc-955 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {adminTab === "skills" && (
                <div className="space-y-4">
                  <span className="text-[9px] text-zinc-500 uppercase font-mono block">Edit skill categories (comma-separated lists)</span>
                  {Object.entries(profile.skills).map(([category, items]) => (
                    <div key={category} className="space-y-1">
                      <label className="block text-[9px] font-mono text-white uppercase font-bold">
                        {skillCategoryLabels[category] || category}
                      </label>
                      <textarea 
                        value={items.join(", ")}
                        onChange={e => {
                          const newList = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
                          const newSkills = { ...profile.skills, [category]: newList };
                          saveProfile({ ...profile, skills: newSkills });
                        }}
                        rows={2}
                        className="w-full bg-zinc-955 border border-zinc-900 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  ))}
                </div>
              )}

              {adminTab === "experience" && (
                <div className="space-y-6">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 border border-zinc-900 bg-zinc-950/60 rounded-lg space-y-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white font-mono">Position #{idx + 1}</span>
                        <button 
                          onClick={() => {
                            const newExp = profile.experience.filter((_, i) => i !== idx);
                            saveProfile({ ...profile, experience: newExp });
                          }}
                          className="text-red-500 hover:text-red-400 text-[10px] uppercase font-bold"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] text-zinc-555 uppercase">Role</label>
                          <input 
                            type="text" 
                            value={exp.role} 
                            onChange={e => {
                              const newExp = [...profile.experience];
                              newExp[idx].role = e.target.value;
                              saveProfile({ ...profile, experience: newExp });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-zinc-555 uppercase">Company</label>
                          <input 
                            type="text" 
                            value={exp.company} 
                            onChange={e => {
                              const newExp = [...profile.experience];
                              newExp[idx].company = e.target.value;
                              saveProfile({ ...profile, experience: newExp });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] text-zinc-555 uppercase">Duration</label>
                        <input 
                          type="text" 
                          value={exp.duration} 
                          onChange={e => {
                            const newExp = [...profile.experience];
                            newExp[idx].duration = e.target.value;
                            saveProfile({ ...profile, experience: newExp });
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] text-zinc-555 uppercase">Description</label>
                        <textarea 
                          value={exp.description} 
                          onChange={e => {
                            const newExp = [...profile.experience];
                            newExp[idx].description = e.target.value;
                            saveProfile({ ...profile, experience: newExp });
                          }}
                          rows={3}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const newExp = [...profile.experience, { role: "New Role", company: "Company Name", duration: "2026 - Present", description: "Role descriptions." }];
                      saveProfile({ ...profile, experience: newExp });
                    }}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold text-white uppercase rounded border border-zinc-800"
                  >
                    + Add Position
                  </button>
                </div>
              )}

              {adminTab === "projects" && (
                <div className="space-y-6">
                  {editingProject ? (
                    <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                        <span className="text-[10px] font-bold text-white">Editing Project ID: {editingProject.id}</span>
                        <button onClick={() => setEditingProject(null)} className="text-zinc-500 hover:text-white text-[10px]">✕ Back</button>
                      </div>
                      
                      <div>
                        <label className="block text-[8px] text-zinc-555 uppercase">Title</label>
                        <input 
                          type="text" 
                          value={editingProject.title}
                          onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] text-zinc-555 uppercase">Description</label>
                        <textarea 
                          value={editingProject.description}
                          onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                          rows={3}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] text-zinc-555 uppercase">Status</label>
                          <select 
                            value={editingProject.status}
                            onChange={e => setEditingProject({ ...editingProject, status: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                          >
                            <option value="Production">Production</option>
                            <option value="Active">Active</option>
                            <option value="Research">Research</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] text-zinc-555 uppercase">Category</label>
                          <input 
                            type="text" 
                            value={editingProject.category}
                            onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] text-zinc-555 uppercase">Technologies (comma-separated)</label>
                        <input 
                          type="text" 
                          value={editingProject.tech.join(", ")}
                          onChange={e => setEditingProject({ ...editingProject, tech: e.target.value.split(",").map(t => t.trim()) })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>

                      {/* PROJECT LINKS SECTION */}
                      <div className="border-t border-zinc-900 pt-4 space-y-3">
                        <span className="text-[9px] text-zinc-555 font-bold uppercase tracking-widest block font-bold text-white">Project Links (CMS v4.3)</span>
                        
                        <div className="space-y-1">
                          <label className="block text-[8px] text-zinc-555 uppercase">GitHub Repository URL</label>
                          <input 
                            type="text" 
                            value={editingProject.githubUrl || ""}
                            onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[8px] text-zinc-555 uppercase">Live Website URL</label>
                          <input 
                            type="text" 
                            value={editingProject.liveUrl || ""}
                            onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            placeholder="https://app.vercel.app"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[8px] text-zinc-555 uppercase">Demo Video URL</label>
                          <input 
                            type="text" 
                            value={editingProject.demoVideo || ""}
                            onChange={e => setEditingProject({ ...editingProject, demoVideo: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            placeholder="https://youtube.com/watch?v=..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[8px] text-zinc-555 uppercase">Documentation URL</label>
                          <input 
                            type="text" 
                            value={editingProject.docsUrl || ""}
                            onChange={e => setEditingProject({ ...editingProject, docsUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            placeholder="https://docs.site"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[8px] text-zinc-555 uppercase">Thumbnail Image URL</label>
                          <input 
                            type="text" 
                            value={editingProject.thumbnailUrl || ""}
                            onChange={e => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            placeholder="https://images.site/photo.png"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <label className="block text-[8px] text-zinc-555 uppercase">Project Stars</label>
                            <input 
                              type="number" 
                              value={editingProject.stars || 0}
                              onChange={e => setEditingProject({ ...editingProject, stars: parseInt(e.target.value) || 0 })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] text-zinc-555 uppercase">Downloads Count</label>
                            <input 
                              type="number" 
                              value={editingProject.downloads || 0}
                              onChange={e => setEditingProject({ ...editingProject, downloads: parseInt(e.target.value) || 0 })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 pb-3">
                          <label className="flex items-center gap-2 cursor-pointer text-[9px] uppercase font-bold text-zinc-450">
                            <input
                              type="checkbox"
                              checked={!!editingProject.isFeatured}
                              onChange={e => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                              className="rounded bg-zinc-900 border-zinc-800 text-emerald-500"
                            />
                            <span>Featured Project</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-[9px] uppercase font-bold text-zinc-450">
                            <input
                              type="checkbox"
                              checked={!!editingProject.isOpenSource}
                              onChange={e => setEditingProject({ ...editingProject, isOpenSource: e.target.checked })}
                              className="rounded bg-zinc-900 border-zinc-800 text-emerald-500"
                            />
                            <span>Open Source</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-[9px] uppercase font-bold text-zinc-450">
                            <input
                              type="checkbox"
                              checked={editingProject.showGithub !== false}
                              onChange={e => setEditingProject({ ...editingProject, showGithub: e.target.checked })}
                              className="rounded bg-zinc-900 border-zinc-800 text-emerald-500"
                            />
                            <span>Show GitHub Button</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-[9px] uppercase font-bold text-zinc-450">
                            <input
                              type="checkbox"
                              checked={editingProject.showLive !== false}
                              onChange={e => setEditingProject({ ...editingProject, showLive: e.target.checked })}
                              className="rounded bg-zinc-900 border-zinc-800 text-emerald-500"
                            />
                            <span>Show Live Button</span>
                          </label>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if (!isValidUrl(editingProject.githubUrl) || 
                              !isValidUrl(editingProject.liveUrl) || 
                              !isValidUrl(editingProject.demoVideo) || 
                              !isValidUrl(editingProject.docsUrl) || 
                              !isValidUrl(editingProject.thumbnailUrl)) {
                            setToast({ message: "Validation Fault: URL parameters must be formatted with secure protocol wrappers (http/https).", type: "error" });
                            return;
                          }
                          const updated = profile.projects.map(p => p.id === editingProject.id ? editingProject : p);
                          saveProfile({ ...profile, projects: updated });
                          setToast({ message: "Project variables updated.", type: "success" });
                          setEditingProject(null);
                        }}
                        className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-[10px] font-bold text-black uppercase rounded"
                      >
                        Save Project Variables
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.projects.map((proj) => (
                        <div key={proj.id} className="p-3 border border-zinc-900 bg-zinc-950/60 rounded flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-white font-mono">{proj.title}</h4>
                            <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{proj.category}</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingProject(proj)}
                              className="text-emerald-500 hover:text-emerald-400 text-[10px] uppercase font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                const updated = profile.projects.filter(p => p.id !== proj.id);
                                saveProfile({ ...profile, projects: updated });
                              }}
                              className="text-red-500 hover:text-red-400 text-[10px] uppercase font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {adminTab === "crm" && (
                <div className="space-y-4 font-mono text-[11px] text-zinc-400">
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-center">
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={crmSearch}
                      onChange={e => setCrmSearch(e.target.value)}
                      className="bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white"
                    />
                    <div className="flex gap-1">
                      <select
                        value={crmTypeFilter}
                        onChange={e => setCrmTypeFilter(e.target.value)}
                        className="bg-zinc-950 border border-zinc-900 rounded p-1 text-[10px] text-white"
                      >
                        <option value="all">All Types</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                      <select
                        value={crmStatusFilter}
                        onChange={e => setCrmStatusFilter(e.target.value)}
                        className="bg-zinc-950 border border-zinc-900 rounded p-1 text-[10px] text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                    <button
                      onClick={exportCRMToCSV}
                      className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded text-[10px]"
                    >
                      Export CSV
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {filteredRecruiters.length === 0 ? (
                      <p className="text-zinc-600 p-4 text-center">No recruiter leads stored.</p>
                    ) : (
                      filteredRecruiters.map(r => (
                        <div key={r.id || r.email} className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-3">
                          <div className="flex justify-between items-start border-b border-zinc-900 pb-2">
                            <div>
                              <h4 className="text-white font-bold text-xs">{r.name}</h4>
                              <span className="text-[10px] text-zinc-555">{r.company} • {r.recruitmentType}</span>
                            </div>
                            <span className={cn(
                              "px-1.5 py-0.5 rounded text-[8px] uppercase border font-bold",
                              r.status === "scheduled" && "bg-sky-500/10 text-sky-400 border-sky-500/20",
                              r.status === "contacted" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                              r.status === "pending" && "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
                            )}>
                              {r.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-zinc-400">
                            <div><span className="text-zinc-655 font-bold">Email:</span> {r.email}</div>
                            <div><span className="text-zinc-655 font-bold">Phone:</span> {r.phone || "N/A"}</div>
                            <div><span className="text-zinc-655 font-bold">Country:</span> {r.country}</div>
                            <div><span className="text-zinc-655 font-bold">Subject:</span> {r.subject}</div>
                            <div className="col-span-2"><span className="text-zinc-655 font-bold">LinkedIn:</span> <a href={r.linkedinUrl} target="_blank" rel="noreferrer" className="text-sky-400 break-all">{r.linkedinUrl || "N/A"}</a></div>
                          </div>

                          <p className="text-[10px] bg-zinc-950 p-2.5 rounded border border-zinc-900 text-zinc-300 break-words">{r.message}</p>

                          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900">
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateRecruiterCRM(r.id, "contacted", r.notes || "")}
                                className="px-2 py-1 bg-amber-950/20 border border-amber-900/30 text-amber-400 rounded text-[9px] uppercase"
                              >
                                Mark Contacted
                              </button>
                              <button
                                onClick={() => updateRecruiterCRM(r.id, "scheduled", r.notes || "")}
                                className="px-2 py-1 bg-sky-955/20 border border-sky-900/30 text-sky-400 rounded text-[9px] uppercase"
                              >
                                Mark Scheduled
                              </button>
                              <button
                                onClick={() => deleteRecruiterCRM(r.id)}
                                className="px-2 py-1 bg-red-955/20 border border-red-900/30 text-red-400 rounded text-[9px] uppercase ml-auto"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                            <textarea
                              placeholder="Follow up notes..."
                              defaultValue={r.notes || ""}
                              onBlur={e => updateRecruiterCRM(r.id, r.status, e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded p-1.5 text-[10px] text-white"
                              rows={1}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {adminTab === "analytics" && (
                <div className="space-y-6 font-mono text-[11px]">
                  {/* Traffic scorecard summary */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 border border-zinc-900 bg-zinc-955 rounded text-center">
                      <span className="text-zinc-600 text-[8px] uppercase">TOTAL TRAFFIC</span>
                      <span className="block text-white text-lg font-bold">{visitors.length}</span>
                    </div>
                    <div className="p-3 border border-zinc-900 bg-zinc-955 rounded text-center">
                      <span className="text-zinc-600 text-[8px] uppercase">BOUNCE RATE</span>
                      <span className="block text-white text-lg font-bold">28.4%</span>
                    </div>
                    <div className="p-3 border border-zinc-900 bg-zinc-955 rounded text-center relative">
                      <span className="text-zinc-650 text-[8px] uppercase flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        LIVE USERS
                      </span>
                      <span className="block text-emerald-400 text-lg font-bold">{liveVisitorCount}</span>
                    </div>
                  </div>

                  {/* SVG Bar Chart representing traffic trend */}
                  <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-xl space-y-2">
                    <span className="text-zinc-600 text-[9px] uppercase tracking-wider block font-bold">7-Day Traffic Velocity</span>
                    <div className="h-28 w-full flex items-end justify-between pt-4 border-b border-l border-zinc-900 px-2">
                      {visitorChartData.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 mx-1 group">
                          <span className="text-[8px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">{val}</span>
                          <div 
                            className="w-4 bg-emerald-500/80 group-hover:bg-[#CCFF00] transition-colors rounded-t"
                            style={{ height: `${Math.max(val * 4, 8)}px` }}
                          />
                          <span className="text-[7px] text-zinc-600 mt-1">D{idx+1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distribution Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-xl space-y-2">
                      <span className="text-zinc-600 text-[8px] uppercase tracking-wider block font-bold">Referrers</span>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between"><span>LinkedIn</span><span className="text-white">45%</span></div>
                        <div className="flex justify-between"><span>Direct</span><span className="text-white">28%</span></div>
                        <div className="flex justify-between"><span>GitHub</span><span className="text-white">18%</span></div>
                        <div className="flex justify-between"><span>Telegram</span><span className="text-white">9%</span></div>
                      </div>
                    </div>

                    <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-xl space-y-2">
                      <span className="text-zinc-600 text-[8px] uppercase tracking-wider block font-bold">Device Profile</span>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between"><span>Desktop</span><span className="text-white">72%</span></div>
                        <div className="flex justify-between"><span>Mobile</span><span className="text-white">25%</span></div>
                        <div className="flex justify-between"><span>Tablet</span><span className="text-white">3%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === "settings" && (
                <form onSubmit={handleSettingsSave} className="space-y-4 font-mono text-[11px]">
                  <div>
                    <label className="block text-[9px] text-zinc-555 uppercase mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      value={settings.telegramBotToken}
                      onChange={e => setSettings({ ...settings, telegramBotToken: e.target.value })}
                      placeholder="ENTER BOT TOKEN"
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-zinc-555 uppercase mb-1">Telegram Chat ID</label>
                    <input
                      type="text"
                      value={settings.telegramChatId}
                      onChange={e => setSettings({ ...settings, telegramChatId: e.target.value })}
                      placeholder="ENTER CHAT ID"
                      className="w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-zinc-555 uppercase mb-1">Contact Receiver Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full bg-zinc-955 border border-zinc-900 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] text-zinc-650 block uppercase tracking-widest font-bold">Feature Toggles</span>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableNotifications}
                        onChange={e => setSettings({ ...settings, enableNotifications: e.target.checked })}
                        className="rounded bg-zinc-950 border-zinc-900 text-emerald-500 outline-none"
                      />
                      <span>Enable Telegram Notification Dispatch</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableAnalytics}
                        onChange={e => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                        className="rounded bg-zinc-950 border-zinc-900 text-emerald-500 outline-none"
                      />
                      <span>Enable Traffic Analytics Logging</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-500 text-black text-[10px] font-bold uppercase rounded hover:bg-emerald-600 transition-colors"
                  >
                    Save Integration Parameters
                  </button>
                </form>
              )}

              {adminTab === "resume" && (
                <div className="space-y-6 font-mono text-[11px]">
                  <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-4">
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest block border-b border-zinc-900 pb-2">
                      Active Resume Details
                    </span>
                    {resumeBase64 ? (
                      <div className="space-y-2 text-[10px] text-zinc-400">
                        <div>
                          <span className="text-zinc-600 block text-[8px] uppercase">File Name</span>
                          <span className="text-white font-bold">Vivek_Goud_Shaganti_CV.pdf</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-zinc-600 block text-[8px] uppercase">Active Version</span>
                            <span className="text-[#CCFF00] font-bold">v{resumeHistory.length + 1}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600 block text-[8px] uppercase">Payload Size</span>
                            <span className="text-white">{Math.round(resumeBase64.length * 0.75 / 1024)} KB</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-zinc-600 block text-[8px] uppercase">Last Synchronization</span>
                          <span className="text-white">{resumeUpdatedAt || "Just now"}</span>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleResumeAction("view")}
                            className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white rounded hover:border-zinc-700 text-[9px] uppercase"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => {
                              if (!isAuthorized) {
                                setToast({ message: "Security Fault: Admin signature required.", type: "error" });
                                return;
                              }
                              setIsResumeUploadModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-[#CCFF00] text-black font-bold rounded hover:bg-[#8dfa00] text-[9px] uppercase"
                          >
                            Replace File
                          </button>
                          <button
                            onClick={() => {
                              if (!isAuthorized) {
                                setToast({ message: "Security Fault: Admin signature required.", type: "error" });
                                return;
                              }
                              if (window.confirm("Permanently delete active resume payload?")) {
                                handleResumeAction("delete");
                              }
                            }}
                            className="px-2.5 py-1 bg-red-955/20 border border-red-900/30 text-red-400 rounded hover:bg-red-955/40 text-[9px] uppercase ml-auto"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 space-y-3">
                        <p className="text-zinc-650 text-xs font-bold">No active resume payload hosted in local storage.</p>
                        <button
                          onClick={() => {
                            if (!isAuthorized) {
                              setToast({ message: "Security Fault: Admin signature required.", type: "error" });
                              return;
                            }
                            setIsResumeUploadModalOpen(true);
                          }}
                          className="px-4 py-2 bg-[#CCFF00] text-black rounded text-[10px] font-bold uppercase hover:bg-[#8dfa00]"
                        >
                          Upload First Version
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Version Rollback Segment */}
                  <div className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-3">
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest block border-b border-zinc-900 pb-2">
                      Version Rollback Vault ({resumeHistory.length} Backups)
                    </span>
                    {resumeHistory.length === 0 ? (
                      <p className="text-zinc-655 text-center py-2 text-[9px]">No historical rollback nodes cataloged.</p>
                    ) : (
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                        {resumeHistory.map((item, idx) => (
                          <div key={idx} className="p-2 border border-zinc-900 bg-zinc-950 rounded flex items-center justify-between hover:border-zinc-800 transition-colors">
                            <div className="space-y-0.5">
                              <span className="text-white font-bold">Version {item.version || `v${idx + 1}`}</span>
                              <span className="text-[8px] text-zinc-555 block">{item.timestamp} • {item.size}</span>
                            </div>
                            <button
                              onClick={() => {
                                if (!isAuthorized) {
                                  setToast({ message: "Security Fault: Admin signature required.", type: "error" });
                                  return;
                                }
                                if (window.confirm(`Rollback active resume to version ${item.version}?`)) {
                                  setResumeBase64(item.base64);
                                  setResumeUpdatedAt(item.timestamp);
                                  localStorage.setItem("portfolio_resume_base64", item.base64);
                                  localStorage.setItem("portfolio_resume_updated_at", item.timestamp);
                                  setToast({ message: `Active CV restored to version ${item.version}`, type: "success" });
                                  window.dispatchEvent(new Event("storage"));
                                }
                              }}
                              className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded text-[8px] uppercase"
                            >
                              Restore
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {adminTab === "blogs" && (
                <div className="space-y-4">
                  <span className="text-[9px] text-zinc-500 uppercase font-mono block">Currently configured blog logs</span>
                  {profile.blogs?.map((blog, idx) => (
                    <div key={blog.id} className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white">Post #{idx + 1}</span>
                        <button 
                          onClick={() => {
                            const newBlogs = profile.blogs.filter(b => b.id !== blog.id);
                            saveProfile({ ...profile, blogs: newBlogs });
                          }}
                          className="text-red-500 hover:text-red-400 text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                      <input 
                        type="text" 
                        value={blog.title}
                        onChange={e => {
                          const newBlogs = [...profile.blogs];
                          newBlogs[idx].title = e.target.value;
                          saveProfile({ ...profile, blogs: newBlogs });
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newB = [...(profile.blogs || []), { id: `blog-${Date.now()}`, title: "New Blog Post", category: "AI", date: "June 2026", readingTime: "4 min read", summary: "Summary here.", tags: ["AI"], content: "Markdown content here." }];
                      saveProfile({ ...profile, blogs: newB });
                    }}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-855 text-[10px] font-bold text-white uppercase rounded border border-zinc-800"
                  >
                    + Create Blog Post
                  </button>
                </div>
              )}

              {adminTab === "timeline" && (
                <div className="space-y-4">
                  {profile.timeline?.map((node, idx) => (
                    <div key={idx} className="p-4 border border-zinc-900 bg-zinc-955 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white">Node #{idx + 1}</span>
                        <button 
                          onClick={() => {
                            const newT = profile.timeline.filter((_, i) => i !== idx);
                            saveProfile({ ...profile, timeline: newT });
                          }}
                          className="text-red-500 hover:text-red-400 text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="text" 
                          value={node.year}
                          onChange={e => {
                            const newT = [...profile.timeline];
                            newT[idx].year = e.target.value;
                            saveProfile({ ...profile, timeline: newT });
                          }}
                          placeholder="Year"
                          className="bg-zinc-900 border border-zinc-850 rounded p-1.5 text-xs text-white"
                        />
                        <input 
                          type="text" 
                          value={node.type}
                          onChange={e => {
                            const newT = [...profile.timeline];
                            newT[idx].type = e.target.value;
                            saveProfile({ ...profile, timeline: newT });
                          }}
                          placeholder="Type"
                          className="bg-zinc-900 border border-zinc-850 rounded p-1.5 text-xs text-white"
                        />
                        <input 
                          type="text" 
                          value={node.title}
                          onChange={e => {
                            const newT = [...profile.timeline];
                            newT[idx].title = e.target.value;
                            saveProfile({ ...profile, timeline: newT });
                          }}
                          placeholder="Title"
                          className="bg-zinc-900 border border-zinc-850 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newT = [...(profile.timeline || []), { year: "2026", type: "Experience", title: "New Roadmap Node", subtitle: "Company Name", details: "Detail text." }];
                      saveProfile({ ...profile, timeline: newT });
                    }}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-855 text-[10px] font-bold text-white uppercase rounded border border-zinc-800"
                  >
                    + Add Timeline Node
                  </button>
                </div>
              )}

            </div>

            <div className="p-6 border-t border-zinc-900 bg-black/60 flex items-center justify-between gap-4">
              <button 
                onClick={() => {
                  if (window.confirm("Restore default parameters and delete customized edits?")) {
                    saveProfile(INITIAL_PROFILE);
                    setToast({ message: "System profile parameters reset to defaults.", type: "success" });
                  }
                }}
                className="text-red-500 hover:text-red-400 text-[10px] uppercase font-bold tracking-widest"
              >
                Factory Reset
              </button>
              <button 
                onClick={() => {
                  setShowAdminPanel(false);
                  setToast({ message: "Parameters compiled and saved.", type: "success" });
                }}
                className={cn(
                  "px-4 py-2 text-[10px] font-bold text-black rounded uppercase tracking-widest",
                  themeMode === "volt" && "bg-[#CCFF00] hover:bg-[#8dfa00]",
                  themeMode === "amber" && "bg-[#FFDE21] hover:bg-yellow-400",
                  themeMode === "chrome" && "bg-sky-400 hover:bg-sky-500"
                )}
              >
                Apply Changes
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#09090b] border border-zinc-900 p-6 md:p-8 rounded-xl w-full max-w-sm shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              <div className="space-y-2 text-center relative">
                <KeyRound className={cn("h-8 w-8 mx-auto", currentTheme.primary)} />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                  DECRYPTION SIGNATURE REQUIRED
                </h3>
                <p className="text-[10px] text-zinc-550 leading-relaxed font-mono">
                  Enter authorization security password.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                console.log("[CUSTOMIZER] Authentication form submitted. Input:", passwordInput);
                if (passwordInput === "vivek2006") {
                  console.log("[CUSTOMIZER] Password correct. Open editor.");
                  setIsAuthorized(true);
                  sessionStorage.setItem("portfolio_edit_auth", "true");
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
                  <label className="block text-[9px] text-zinc-555 uppercase tracking-wider">
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
                      "w-full bg-zinc-955 border rounded p-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-opacity-50",
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
                  : "bg-zinc-955/70 border-sky-400/40 text-[#38bdf8] hover:bg-zinc-900/80 shadow-sky-400/10 hover:shadow-sky-400/20"
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
              <span className="text-[9px] text-zinc-550 uppercase tracking-widest">
                {uploadProgress}% COMPLETE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="ml-2 text-zinc-450 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Robot Companion Floating Mascot */}
      <div className="fixed bottom-20 right-6 z-50">
        <RobotCompanion themeMode={themeMode} />
      </div>

      <ResumeUploadModal
        isOpen={isResumeUploadModalOpen}
        onClose={() => setIsResumeUploadModalOpen(false)}
        onUploadSuccess={(base64, timestamp) => {
          const size = Math.round(base64.length * 0.75 / 1024) + " KB";
          const version = `v${resumeHistory.length + 1}`;
          const newEntry = { base64, timestamp, size, version };
          
          const updatedHistory = [...resumeHistory, newEntry];
          setResumeHistory(updatedHistory);
          localStorage.setItem("portfolio_resume_history", JSON.stringify(updatedHistory));
          
          setResumeBase64(base64);
          setResumeUpdatedAt(timestamp);
          localStorage.setItem("portfolio_resume_base64", base64);
          localStorage.setItem("portfolio_resume_updated_at", timestamp);
          
          setToast({ message: `Resume uploaded as version ${version}.`, type: "success" });
          window.dispatchEvent(new Event("storage"));
        }}
        themeMode={themeMode}
      />

    </div>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

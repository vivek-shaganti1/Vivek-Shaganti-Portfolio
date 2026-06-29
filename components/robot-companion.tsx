"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RobotCompanionProps {
  themeMode?: "volt" | "amber" | "chrome";
}

export default function RobotCompanion({ themeMode = "volt" }: RobotCompanionProps) {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - robotCenterX;
      const dy = e.clientY - robotCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // Limit eye offset travel
      const maxTravel = 4;
      setEyeOffset({
        x: (dx / dist) * maxTravel,
        y: (dy / dist) * maxTravel
      });
    };

    const handleChatState = (e: any) => {
      const { isOpen, isSpeaking: speaking } = e.detail || {};
      if (isOpen !== undefined) setIsChatOpen(isOpen);
      if (speaking !== undefined) setIsSpeaking(speaking);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("recruiter-chat-state", handleChatState);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("recruiter-chat-state", handleChatState);
    };
  }, []);

  const themeColors = {
    volt: { glow: "shadow-[#CCFF00]/20", stroke: "#CCFF00", fill: "fill-[#CCFF00]" },
    amber: { glow: "shadow-[#FFDE21]/20", stroke: "#FFDE21", fill: "fill-[#FFDE21]" },
    chrome: { glow: "shadow-sky-400/20", stroke: "#38bdf8", fill: "fill-sky-400" }
  };

  const currentTheme = themeColors[themeMode];

  return (
    <div 
      ref={robotRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center select-none z-30"
    >
      {/* Floating Holographic Grid Ring */}
      <motion.div 
        className={cn(
          "absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border border-dashed opacity-25 animate-[spin_10s_linear_infinite]",
          themeMode === "volt" && "border-[#CCFF00]",
          themeMode === "amber" && "border-[#FFDE21]",
          themeMode === "chrome" && "border-sky-400"
        )}
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles around robot */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full",
                themeMode === "volt" && "bg-[#CCFF00]",
                themeMode === "amber" && "bg-[#FFDE21]",
                themeMode === "chrome" && "bg-sky-400"
              )}
              initial={{ x: 80, y: 80, opacity: 0 }}
              animate={{
                x: [80, 80 + (Math.random() - 0.5) * 120],
                y: [80, 80 + (Math.random() - 0.5) * 120],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}

      {/* Animated robot body */}
      <motion.div
        animate={{
          y: isSpeaking ? [-3, 3, -3] : [-6, 6, -6],
          rotate: isSpeaking ? [-1, 1, -1] : 0
        }}
        transition={{
          duration: isSpeaking ? 1.5 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 relative flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          // Open chatbot
          window.dispatchEvent(new CustomEvent("recruiter-chat-trigger"));
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(204,255,0,0.2)]">
          {/* Antenna */}
          <line x1="50" y1="20" x2="50" y2="35" stroke={currentTheme.stroke} strokeWidth="3" />
          <motion.circle 
            cx="50" 
            cy="18" 
            r="4" 
            fill={currentTheme.stroke}
            animate={{
              scale: isSpeaking ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: isSpeaking ? [0.6, 1, 0.6] : 1
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Ears */}
          <rect x="20" y="45" width="6" height="12" rx="3" fill="none" stroke={currentTheme.stroke} strokeWidth="2.5" />
          <rect x="74" y="45" width="6" height="12" rx="3" fill="none" stroke={currentTheme.stroke} strokeWidth="2.5" />

          {/* Head */}
          <rect 
            x="26" 
            y="35" 
            width="48" 
            height="36" 
            rx="12" 
            fill="#09090b" 
            stroke={currentTheme.stroke} 
            strokeWidth="3.5" 
          />

          {/* Visor Area */}
          <rect 
            x="32" 
            y="42" 
            width="36" 
            height="18" 
            rx="6" 
            fill="#18181b" 
            stroke={currentTheme.stroke} 
            strokeWidth="1.5" 
          />

          {/* Eyes (Look at Cursor) */}
          <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
            {/* Left Eye */}
            <motion.circle 
              cx="43" 
              cy="51" 
              r="3.5" 
              fill={currentTheme.stroke} 
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
            {/* Right Eye */}
            <motion.circle 
              cx="57" 
              cy="51" 
              r="3.5" 
              fill={currentTheme.stroke}
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </g>

          {/* Holographic scanner line in head */}
          <motion.line 
            x1="28" 
            y1="40" 
            x2="72" 
            y2="40" 
            stroke={currentTheme.stroke} 
            strokeWidth="1" 
            opacity="0.3"
            animate={{
              y: [40, 68, 40]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Speaking Audio Wave mouth / Idle mouth */}
          {isSpeaking ? (
            <path 
              d="M 40,63 Q 45,58 50,63 T 60,63" 
              fill="none" 
              stroke={currentTheme.stroke} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-pulse"
            />
          ) : (
            <line x1="42" y1="62" x2="58" y2="62" stroke={currentTheme.stroke} strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Body neck */}
          <rect x="44" y="71" width="12" height="6" fill="#18181b" stroke={currentTheme.stroke} strokeWidth="2" />

          {/* Chest holographic core */}
          <path d="M 36,77 L 64,77 L 58,92 L 42,92 Z" fill="#09090b" stroke={currentTheme.stroke} strokeWidth="3" />
          <motion.polygon
            points="44,82 56,82 52,89 48,89"
            fill={currentTheme.stroke}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
        </svg>

        {/* Small floating status label */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-7 text-[8px] font-bold tracking-widest text-center uppercase bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-900 text-white"
            >
              {isSpeaking ? "ACTIVE DECRYPT" : "SYSTEM MASCOT"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Futuristic floating shadow underneath */}
      <motion.div 
        className="absolute bottom-6 w-14 h-1.5 bg-black/45 rounded-full blur-[3px]"
        animate={{
          scaleX: isSpeaking ? [0.9, 1.1, 0.9] : [0.8, 1.2, 0.8],
          opacity: isSpeaking ? [0.4, 0.6, 0.4] : [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: isSpeaking ? 1.5 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

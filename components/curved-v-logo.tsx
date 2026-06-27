import React from "react";
import { cn } from "@/lib/utils";

interface CurvedVLogoProps {
  className?: string;
  glow?: boolean;
}

export default function CurvedVLogo({ className, glow = true }: CurvedVLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none transition-all duration-300", className)}
    >
      <path
        d="M18 22 C 32 48, 42 78, 50 78 C 58 78, 68 48, 82 22"
        stroke="url(#curved-v-gradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(glow && "drop-shadow-[0_0_8px_rgba(140,255,0,0.6)]")}
      />
      <defs>
        <linearGradient id="curved-v-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8FF00" />
          <stop offset="50%" stopColor="#8CFF00" />
          <stop offset="100%" stopColor="#49FF4D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
